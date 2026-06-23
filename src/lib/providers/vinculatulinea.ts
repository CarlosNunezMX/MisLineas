import { createCipheriv } from "node:crypto";
import { stripCURPs } from "@/lib/sanitize";
import type { LineResult } from "@/types";

const SECRET_KEY = "key_t3lcel_prod";

const VINCULATULINEA_PROVIDERS = [
  "AhorroCel",
  "Chedraui Móvil",
  "Freedompop",
  "OXXO CEL",
  "OUI",
  "Uber Cel",
  "Yobi Telecom",
];

function encryptCURP(curp: string): string {
  const key = Buffer.from(SECRET_KEY.substring(0, 16).padEnd(16, "\0"), "utf8");
  const cipher = createCipheriv("aes-128-ecb", key, null);
  cipher.setAutoPadding(true);
  const encrypted = Buffer.concat([
    cipher.update(curp, "utf8"),
    cipher.final(),
  ]);
  return encrypted.toString("base64");
}

function generateProcessId(): string {
  let id = "";
  for (let i = 0; i < 15; i++) id += Math.floor(Math.random() * 10).toString();
  return `OMV${id}`;
}

const MAX_ATTEMPTS = 3;
const RETRY_DELAY_MS = 500;

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

type FetchResult =
  | { ok: true; data: Record<string, unknown> }
  | { ok: false; transient: boolean; status?: number };

async function fetchSubscriptions(
  encryptedCURP: string,
): Promise<FetchResult> {
  const url =
    "https://vinculatulinea.com/omv-lineas/v1/omv-services/subscriptions-by-curp?pathName=freedompop&apiName=getSubscriptionsbyCURP";
  const auth = Buffer.from("admin:admin123").toString("base64");

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/json",
      Accept: "application/json",
      Referer: "https://vinculatulinea.com/freedompop/my-lines",
      "X-Client-Data": encryptedCURP,
      "Y-Client-Data": "false",
      processId: generateProcessId(),
      OPERATION_CONTEXT: "MY_LINES",
    },
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    console.error(
      `[vinculatulinea] HTTP ${response.status} — body:`,
      JSON.stringify(stripCURPs(data), null, 2),
    );
    // 403/5xx from this provider are typically a transient upstream hiccup
    return { ok: false, transient: true, status: response.status };
  }

  if (!data) {
    console.error("[vinculatulinea] Empty or invalid JSON response");
    return { ok: false, transient: false };
  }

  if (data.responseCode === 3) {
    console.error(
      "[vinculatulinea] External service error:",
      data.responseMessage,
    );
    return { ok: false, transient: true };
  }

  return { ok: true, data };
}

// Single endpoint covers all VINCULATULINEA_PROVIDERS
export async function lookupCURPInVinculatulinea(
  curp: string,
): Promise<LineResult> {
  const encryptedCURP = encryptCURP(curp);

  let result = await fetchSubscriptions(encryptedCURP);
  for (
    let attempt = 1;
    !result.ok && result.transient && attempt < MAX_ATTEMPTS;
    attempt++
  ) {
    await sleep(RETRY_DELAY_MS * attempt);
    result = await fetchSubscriptions(encryptedCURP);
  }

  if (!result.ok) {
    return {
      company: "Vinculatulinea",
      lines: [],
      error: result.transient
        ? "External service error from Vinculatulinea"
        : "Invalid response from Vinculatulinea",
    };
  }

  const data = result.data;

  if (
    data.responseCode === 0 &&
    Array.isArray(data.subscription) &&
    data.subscription.length === 0
  ) {
    return {
      company: "Vinculatulinea",
      lines: [],
      isRegistered: false,
      notFoundProviders: VINCULATULINEA_PROVIDERS,
    };
  }

  const BRAND_MAP: Record<string, string> = {
    oxxocel: "OXXO CEL",
    freedompop: "Freedompop",
    oui: "OUI",
    "uber cel": "Uber Cel",
    ahorrocel: "AhorroCel",
    "chedraui móvil": "Chedraui Móvil",
    "yobi telecom": "Yobi Telecom",
  };

  const subscriptions = (data.subscription ?? []) as Array<{
    descripcion: string;
    msisdn: string;
  }>;

  const lines: string[] = subscriptions.map(
    (sub: { descripcion: string; msisdn: string }) => {
      const raw = sub.descripcion
        .replace(/^Número\s+/i, "")
        .replace(/:\s*$/, "")
        .trim();
      const brand = BRAND_MAP[raw.toLowerCase()] ?? raw;
      return `${brand}: ${sub.msisdn}`;
    },
  );

  return {
    company: "Vinculatulinea",
    lines,
    isRegistered: true,
    rawApiResponse: data,
  };
}
