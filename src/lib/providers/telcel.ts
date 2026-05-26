import https from "node:https";
import type { LineResult } from "@/types";

export async function lookupCURPInTelcel(curp: string): Promise<LineResult> {
  const CAPTCHA_MAX_RETRIES = 3;

  const generateRandomHex = (size: number) =>
    [...Array(size)]
      .map(() =>
        Math.floor(Math.random() * 16)
          .toString(16)
          .toUpperCase(),
      )
      .join("");

  const generateRandomAlphanumeric = (size: number) =>
    [...Array(size)]
      .map(() => Math.floor(Math.random() * 36).toString(36))
      .join("");

  const commonHeaders = {
    applicationid: "PRB",
    channel: "Q36",
    "content-type": "application/json",
    messageuuid: `SIS${generateRandomHex(24)}`,
    sendby: `t3l-${generateRandomAlphanumeric(8)}-${generateRandomAlphanumeric(4)}-${generateRandomAlphanumeric(6)}-${generateRandomAlphanumeric(6)}-${generateRandomAlphanumeric(8)}`,
    origin: "https://registro.telcel.com",
    referer: "https://registro.telcel.com/vinculatulinea/",
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36",
    Accept: "application/json, text/plain, */*",
    token: "token",
  };

  const sleep = (ms: number) =>
    new Promise((resolve) => {
      setTimeout(resolve, ms);
    });

  const generateCaptcha = async (frontToken: string) => {
    let lastResponse: {
      ok: boolean;
      statusCode?: number;
      data?: { signature?: string };
    } = { ok: false };

    for (let attempt = 0; attempt <= CAPTCHA_MAX_RETRIES; attempt += 1) {
      const captchaResponse = await new Promise<{
        ok: boolean;
        statusCode?: number;
        data?: { signature?: string };
      }>((resolve) => {
        const req = https.request(
          {
            hostname: "registro.telcel.com",
            path: "/process-api/v1/process/captcha/generate",
            method: "POST",
            headers: commonHeaders,
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
                  statusCode: res.statusCode,
                  data: JSON.parse(data),
                });
              } catch (_e) {
                resolve({
                  ok: false,
                  statusCode: res.statusCode,
                });
              }
            });
          },
        );

        req.on("error", () => {
          resolve({ ok: false });
        });

        req.write(JSON.stringify({ frontToken }));
        req.end();
      });

      if (captchaResponse.ok && captchaResponse.data?.signature) {
        return captchaResponse;
      }

      lastResponse = captchaResponse;

      if (attempt < CAPTCHA_MAX_RETRIES) {
        await sleep(300 * (attempt + 1));
      }
    }

    return lastResponse;
  };

  const frontTokenLocal = `captcha_${Date.now()}_${generateRandomAlphanumeric(15)}`;
  const captchaResponse = await generateCaptcha(frontTokenLocal);

  const signature = captchaResponse.data?.signature || "";

  const validationBody = {
    typePerson: "F",
    claveIdentidad: curp,
    processSpecs: {
      type: "CONS",
      category: "AUTO",
    },
    signature,
  };

  const validationHeaders = {
    ...commonHeaders,
    token: frontTokenLocal,
  };

  const validationResponse = await new Promise<{
    ok: boolean;
    statusText: string;
    data?: {
      errorList?: Array<{
        code: string;
        description: string;
        businessMeaning?: string;
      }>;
      process?: {
        id?: string;
      };
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
    const isNoLinesError = validationData.errorList.some(
      (err: { code: string }) => err.code === "BE_MP_BPS_0041",
    );

    if (isNoLinesError) {
      return {
        company: "Telcel",
        lines: [],
        isRegistered: false,
      };
    }

    return {
      company: "Telcel",
      lines: [],
      error: `Telcel error: ${validationData.errorList[0].businessMeaning || validationData.errorList[0].description}`,
    };
  }

  if (validationData.process?.id) {
    return {
      company: "Telcel",
      lines: [],
      isRegistered: true,
      rawApiResponse: validationData,
    };
  }

  return {
    company: "Telcel",
    lines: [],
    error: "Respuesta inesperada de Telcel",
    rawApiResponse: validationData,
  };
}
