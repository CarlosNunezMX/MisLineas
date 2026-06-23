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

// Single endpoint covers all VINCULATULINEA_PROVIDERS
export async function lookupCURPInVinculatulinea(
  curp: string,
): Promise<LineResult> {
  const processId = generateProcessId();
  const encryptedCURP = encryptCURP(curp);

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
      processId,
      OPERATION_CONTEXT: "MY_LINES",
    },
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    console.error(
      `[vinculatulinea] HTTP ${response.status} — body:`,
      JSON.stringify(stripCURPs(data), null, 2),
    );
    return {
      company: "Vinculatulinea",
      lines: [],
      error: "Failed to validate CURP with Vinculatulinea",
    };
  }

  if (!data) {
    console.error("[vinculatulinea] Empty or invalid JSON response");
    return {
      company: "Vinculatulinea",
      lines: [],
      error: "Invalid response from Vinculatulinea",
    };
  }

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

  if (data.responseCode === 3) {
    console.error(
      "[vinculatulinea] External service error:",
      data.responseMessage,
    );
    return {
      company: "Vinculatulinea",
      lines: [],
      error: "External service error from Vinculatulinea",
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

  const lines: string[] = (data.subscription ?? []).map(
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
