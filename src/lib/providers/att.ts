import { HttpsProxyAgent } from "https-proxy-agent";
import type { LineResult } from "@/types";

function getProxyAgent(): HttpsProxyAgent<string> | undefined {
  const raw = process.env.ATT_PROXIES;
  if (!raw) return undefined;

  const proxies = raw.split(",").map((p) => p.trim()).filter(Boolean);
  if (proxies.length === 0) return undefined;

  const entry = proxies[Math.floor(Math.random() * proxies.length)];
  const [host, port, user, pass] = entry.split(":");
  return new HttpsProxyAgent(`http://${user}:${pass}@${host}:${port}`);
}

export async function lookupCURPInATT(curp: string): Promise<LineResult> {
  // Generate a UUIDv4 for the request
  const uuid = crypto.randomUUID();

  const sessionBody = {
    operation: "sessionInitLines",
    request: {
      uuid: uuid,
      timestamp: new Date().toISOString(),
      msisdn: null,
    },
  };

  const BASE_HEADERS = {
    "Content-Type": "application/json",
    "origin": "https://att.com.mx",
    "referer": "https://att.com.mx/controlpersonal/",
  };

  const agent = getProxyAgent();

  // Init the session
  const sessionResponse = await fetch(
    "https://att.com.mx/controlpersonal/api/session/initlines",
    {
      method: "POST",
      headers: BASE_HEADERS,
      body: JSON.stringify(sessionBody),
      // @ts-expect-error Node fetch accepts agent
      agent,
    },
  );

  if (!sessionResponse.ok) {
    console.error(
      "Failed to initialize session with AT&T:",
      sessionResponse.statusText,
    );

    return {
      company: "AT&T",
      lines: [],
      error: "Failed to initialize session with AT&T",
    };
  }

  const sessionData = await sessionResponse.json();

  if (sessionData.status !== "SUCCESS") {
    console.error(
      "AT&T session initialization returned non-success status:",
      sessionData,
    );

    return {
      company: "AT&T",
      lines: [],
      error: "AT&T session initialization failed",
    };
  }

  const cookies = sessionResponse.headers
    .getSetCookie()
    .map((c) => c.split(";")[0])
    .join("; ");

  const validationBody = {
    operation: "validateCustomer",
    request: {
      uuid: uuid,
      timestamp: new Date().toISOString(),
      idDoc: "DOC01",
      identificationId: curp,
      sourceSystem: "SS01",
    },
  };

  const validationResponse = await fetch(
    "https://att.com.mx/controlpersonal/api/validatecustomer",
    {
      method: "POST",
      headers: { ...BASE_HEADERS, cookie: cookies },
      body: JSON.stringify(validationBody),
      // @ts-expect-error Node fetch accepts agent
      agent,
    },
  );

  if (!validationResponse.ok) {
    console.error(
      "Failed to validate customer with AT&T:",
      validationResponse.statusText,
    );

    return {
      company: "AT&T",
      lines: [],
      error: "Failed to validate customer with AT&T",
    };
  }

  const validationData = await validationResponse.json();

  const isSuccess =
    validationData.status === "COMPLETED" ||
    validationData.status === "SUCCESS" ||
    validationData.data?.resultCode === "00";

  if (!isSuccess) {
    console.error(
      "AT&T customer validation returned non-completed status:",
      JSON.stringify(validationData, null, 2),
    );

    return {
      company: "AT&T",
      lines: [],
      error: "AT&T customer validation failed",
    };
  }

  const data = validationData.data;

  if (data.countLines > 0) {
    const lines: string[] =
      data.customerInfo?.associatedLines
        ?.map((l: { phoneNumber?: string }) => l.phoneNumber)
        .filter((p: string | undefined): p is string => Boolean(p))
        .map((p: string) => `******${p.slice(-4)}`) ?? [];

    return {
      company: "AT&T",
      lines,
      isRegistered: true,
      rawApiResponse: validationData,
    };
  }

  return {
    company: "AT&T",
    lines: [],
    isRegistered: false,
  };
}
