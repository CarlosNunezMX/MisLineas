import https from "node:https";
import type { LineResult } from "@/types";

export async function lookupCURPInTelcel(curp: string): Promise<LineResult> {
  const validationBody = {
    typePerson: "F",
    claveIdentidad: curp,
    processSpecs: {
      type: "CONS",
      category: "AUTO",
    },
  };

  const validationHeaders = {
    applicationid: "PRB",
    channel: "OSA",
    "content-type": "application/json",
    messageuuid: "SIS_RANDOM",
    sendby: "random-id",
    origin: "https://registro.telcel.com",
    referer: "https://registro.telcel.com/vinculatulinea/",
    token: "token",
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    Accept: "*/*",
  };

  const validationResponse = await new Promise<{
    ok: boolean;
    statusText: string;
    data?: {
      errorList?: Array<{ code: string; description: string }>;
      [key: string]: unknown;
    };
  }>((resolve) => {
    const req = https.request(
      {
        hostname: "registro.telcel.com",
        path: "/process-api/v1/process/elegibility",
        method: "POST",
        headers: validationHeaders,
        rejectUnauthorized: false,
      },
      (res) => {
        let data = "";
        res.on("data", (chunk) => {
          data += chunk;
        });
        res.on("end", () => {
          try {
            resolve({
              ok: res.statusCode === 200,
              statusText: res.statusMessage || "Unknown",
              data: JSON.parse(data),
            });
          } catch (_e) {
            resolve({ ok: false, statusText: "Invalid JSON" });
          }
        });
      },
    );

    req.on("error", (e) => {
      resolve({ ok: false, statusText: e.message });
    });

    req.write(JSON.stringify(validationBody));
    req.end();
  });

  if (!validationResponse.ok) {
    console.error(
      "Failed to validate CURP with Telcel:",
      validationResponse.statusText,
    );

    return {
      company: "Telcel",
      lines: [],
      error: "Failed to validate CURP with Telcel",
    };
  }

  const validationData = validationResponse.data;

  if (!validationData) {
    return {
      company: "Telcel",
      lines: [],
      error: "Empty response data from Telcel",
    };
  }

  if (validationData.errorList && validationData.errorList.length > 0) {
    return {
      company: "Telcel",
      lines: [],
      isRegistered: false,
    };
  }

  return {
    company: "Telcel",
    lines: [],
    isRegistered: true,
    rawApiResponse: validationData,
  };
}
