process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

import crypto from "node:crypto";
import https from "node:https";

import type { LineResult } from "@/types";

const BASE_HOST = "registro.telcel.com";
const LOG_PREFIX = "[telcel]";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function sleepWithSignal(ms: number, signal?: AbortSignal) {
  return new Promise<void>((resolve, reject) => {
    if (signal?.aborted) {
      reject(new Error("aborted"));
      return;
    }

    const timeout = setTimeout(() => {
      cleanup();
      resolve();
    }, ms);

    const onAbort = () => {
      clearTimeout(timeout);
      cleanup();
      reject(new Error("aborted"));
    };

    const cleanup = () => {
      signal?.removeEventListener("abort", onAbort);
    };

    signal?.addEventListener("abort", onAbort, {
      once: true,
    });
  });
}

function randomHex(size: number) {
  return crypto.randomBytes(size).toString("hex").toUpperCase();
}

function randomAlphaNum(size: number) {
  return crypto
    .randomBytes(size * 2)
    .toString("base64url")
    .replace(/[^a-zA-Z0-9]/g, "")
    .slice(0, size);
}

function randomChannel() {
  return randomAlphaNum(3).toUpperCase();
}

function randomFrontToken() {
  return `captcha_${Date.now()}_${randomAlphaNum(16)}`;
}

function randomSendBy() {
  return [
    "t3l",
    randomAlphaNum(8),
    randomAlphaNum(4),
    randomAlphaNum(6),
    randomAlphaNum(6),
    randomAlphaNum(8),
  ].join("-");
}

function randomToken() {
  return crypto.randomBytes(32).toString("hex");
}

function logTelcel(message: string, payload?: unknown) {
  if (payload === undefined) {
    console.log(`${LOG_PREFIX} ${message}`);
    return;
  }

  console.log(`${LOG_PREFIX} ${message}`, payload);
}

function buildHeaders(token?: string) {
  return {
    applicationid: "PRB",

    channel: randomChannel(),

    "content-type": "application/json",

    messageuuid: `SIS${randomHex(12)}`,

    sendby: randomSendBy(),

    origin: "https://registro.telcel.com",

    referer: "https://registro.telcel.com/vinculatulinea/",

    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36",

    Accept: "application/json, text/plain, */*",

    token: token || randomToken(),
  };
}

async function postJSON<T>(
  path: string,
  body: unknown,
  headers: Record<string, string>,
  signal?: AbortSignal,
): Promise<{
  ok: boolean;
  status: number;
  data: T | null;
  raw: string;
}> {
  return new Promise((resolve) => {
    let settled = false;

    const finalize = (result: {
      ok: boolean;
      status: number;
      data: T | null;
      raw: string;
    }) => {
      if (settled) {
        return;
      }

      settled = true;
      signal?.removeEventListener("abort", onAbort);
      resolve(result);
    };

    const onAbort = () => {
      req.destroy(new Error("aborted"));
      finalize({
        ok: false,
        status: 0,
        data: null,
        raw: "aborted",
      });
    };

    const req = https.request(
      {
        hostname: BASE_HOST,
        path,
        method: "POST",

        headers,

        rejectUnauthorized: false,

        timeout: 10000,
      },
      (res) => {
        let data = "";

        res.on("data", (chunk) => {
          data += chunk;
        });

        res.on("end", () => {
          let parsed: T | null = null;

          try {
            parsed = JSON.parse(data);
          } catch {}

          finalize({
            ok: res.statusCode === 200,
            status: res.statusCode || 0,
            data: parsed,
            raw: data,
          });
        });
      },
    );

    req.on("timeout", () => {
      req.destroy();

      finalize({
        ok: false,
        status: 0,
        data: null,
        raw: "timeout",
      });
    });

    req.on("error", (e) => {
      finalize({
        ok: false,
        status: 0,
        data: null,
        raw: String(e),
      });
    });

    if (signal?.aborted) {
      onAbort();
      return;
    }

    signal?.addEventListener("abort", onAbort, {
      once: true,
    });

    req.write(JSON.stringify(body));

    req.end();
  });
}

async function generateCaptchaParallel(
  frontToken: string,
  attempts = 6,
): Promise<string | null> {
  const controllers = Array.from(
    {
      length: attempts,
    },
    () => new AbortController(),
  );

  return new Promise((resolve) => {
    let pending = attempts;
    let finished = false;

    const complete = (signature: string | null) => {
      if (finished) {
        return;
      }

      finished = true;

      controllers.forEach((controller) => {
        controller.abort();
      });

      resolve(signature);
    };

    controllers.forEach((controller, i) => {
      void (async () => {
        try {
          await sleepWithSignal(Math.random() * 300, controller.signal);

          const headers = buildHeaders();

          const response = await postJSON<{
            signature?: string;
          }>(
            "/process-api/v1/process/captcha/generate",
            {
              frontToken,
            },
            headers,
            controller.signal,
          );

          if (response.raw !== "aborted") {
            logTelcel(`captcha ${i} status`, response.status);
            logTelcel(`captcha ${i} raw`, response.raw);
          }

          if (response.ok && response.data?.signature) {
            complete(response.data.signature);
            return;
          }
        } catch (error) {
          if (!(error instanceof Error) || error.message !== "aborted") {
            logTelcel(`captcha ${i} error`, error);
          }
        } finally {
          pending -= 1;

          if (!finished && pending === 0) {
            complete(null);
          }
        }
      })();
    });
  });
}

export async function lookupCURPInTelcel(curp: string): Promise<LineResult> {
  try {
    const frontToken = randomFrontToken();
    const signature = await generateCaptchaParallel(frontToken, 6);

    if (!signature) {
      return {
        company: "Telcel",
        lines: [],
        error: "Could not generate captcha signature",
      };
    }

    logTelcel("captcha signature", signature);
    await sleep(1000);

    const validationHeaders = buildHeaders(frontToken);
    const validationResponse = await postJSON<{
      errorList?: Array<{
        code: string;
        description: string;
        businessMeaning?: string;
      }>;

      process?: {
        id?: string;
      };

      [key: string]: unknown;
    }>(
      "/process-api/v1/process/elegibility",
      {
        typePerson: "F",

        claveIdentidad: curp,

        processSpecs: {
          type: "CONS",
          category: "AUTO",
        },

        signature,
      },
      validationHeaders,
    );

    logTelcel("validation status", validationResponse.status);
    logTelcel("validation raw", validationResponse.raw);

    if (!validationResponse.ok) {
      return {
        company: "Telcel",
        lines: [],
        error: `Validation failed (${validationResponse.status})`,
        rawApiResponse: validationResponse.raw,
      };
    }

    const data = validationResponse.data;

    if (!data) {
      return {
        company: "Telcel",
        lines: [],
        error: "Empty validation response",
      };
    }

    if (data.errorList && data.errorList.length > 0) {
      const noLines = data.errorList.some(
        (err) => err.code === "BE_MP_BPS_0041",
      );

      if (noLines) {
        return {
          company: "Telcel",
          lines: [],
          isRegistered: false,
        };
      }

      return {
        company: "Telcel",
        lines: [],
        error:
          data.errorList[0].businessMeaning || data.errorList[0].description,
        rawApiResponse: data,
      };
    }

    if (data.process?.id) {
      return {
        company: "Telcel",
        lines: [],
        isRegistered: true,
        rawApiResponse: data,
      };
    }

    return {
      company: "Telcel",
      lines: [],
      error: "Unexpected Telcel response",
      rawApiResponse: data,
    };
  } catch (e) {
    return {
      company: "Telcel",
      lines: [],
      error: e instanceof Error ? e.message : "Unknown error",
    };
  }
}
