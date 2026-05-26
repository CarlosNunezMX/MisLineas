process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

import crypto from "node:crypto";
import https from "node:https";

import type { LineResult } from "@/types";

const BASE_HOST = "registro.telcel.com";
const LOG_PREFIX = "[telcel]";
const CAPTCHA_ATTEMPTS_PER_ROUND = 4;
const CAPTCHA_MAX_ROUNDS = 2;
const CAPTCHA_RETRY_DELAYS_MS = [250];
const CAPTCHA_READY_DELAY_MS = 250;
const VALIDATION_ATTEMPTS_PER_ROUND = 2;
const VALIDATION_MAX_ROUNDS = 2;
const VALIDATION_RETRY_DELAYS_MS = [250];

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

function summarizeAttempts<
  T extends { index: number; status: number; ok: boolean },
>(attempts: T[]) {
  return attempts.map((attempt) => ({
    index: attempt.index,
    status: attempt.status,
    ok: attempt.ok,
  }));
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

type CaptchaAttemptResult = {
  index: number;
  status: number;
  raw: string;
  signature: string | null;
};

type ValidationResponseData = {
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

type ValidationAttemptResult = {
  index: number;
  ok: boolean;
  status: number;
  data: ValidationResponseData | null;
  raw: string;
};

async function generateCaptchaParallel(
  frontToken: string,
  attempts = CAPTCHA_ATTEMPTS_PER_ROUND,
): Promise<{
  signature: string | null;
  attempts: CaptchaAttemptResult[];
}> {
  const controllers = Array.from(
    {
      length: attempts,
    },
    () => new AbortController(),
  );

  return new Promise((resolve) => {
    let pending = attempts;
    let finished = false;
    const results: CaptchaAttemptResult[] = [];

    const complete = (signature: string | null) => {
      if (finished) {
        return;
      }

      finished = true;

      controllers.forEach((controller) => {
        controller.abort();
      });

      resolve({
        signature,
        attempts: results,
      });
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
            results.push({
              index: i,
              status: response.status,
              raw: response.raw,
              signature: response.data?.signature || null,
            });
          }

          if (response.ok && response.data?.signature) {
            complete(response.data.signature);
            return;
          }
        } catch (error) {
          if (!(error instanceof Error) || error.message !== "aborted") {
            results.push({
              index: i,
              status: 0,
              raw: error instanceof Error ? error.message : String(error),
              signature: null,
            });
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

function isRetryableCaptchaFailure(attempts: CaptchaAttemptResult[]) {
  return attempts.every(
    (attempt) =>
      attempt.status === 0 ||
      attempt.status >= 500 ||
      attempt.raw === "timeout",
  );
}

function isRetryableResponse(status: number, raw: string) {
  return status === 0 || status >= 500 || raw === "timeout";
}

async function generateCaptcha() {
  for (let round = 0; round < CAPTCHA_MAX_ROUNDS; round += 1) {
    const frontToken = randomFrontToken();
    const result = await generateCaptchaParallel(frontToken);
    const summary = summarizeAttempts(
      result.attempts.map((attempt) => ({
        index: attempt.index,
        status: attempt.status,
        ok: Boolean(attempt.signature),
      })),
    );

    if (result.signature) {
      if (round > 0) {
        logTelcel(`captcha recovered on round ${round + 1}`, {
          attempts: summary,
        });
      }

      return {
        frontToken,
        signature: result.signature,
      };
    }

    if (
      round < CAPTCHA_MAX_ROUNDS - 1 &&
      isRetryableCaptchaFailure(result.attempts)
    ) {
      const delay =
        CAPTCHA_RETRY_DELAYS_MS[round] ||
        CAPTCHA_RETRY_DELAYS_MS.at(-1) ||
        1500;

      logTelcel(`captcha transient failure on round ${round + 1}`, {
        attempts: summary,
        retryInMs: delay,
      });
      await sleep(delay);
      continue;
    }

    logTelcel("captcha failed", {
      attempts: summary,
    });

    break;
  }

  return null;
}

async function validateEligibility(
  curp: string,
  captcha: {
    frontToken: string;
    signature: string;
  },
) {
  const body = {
    typePerson: "F",
    claveIdentidad: curp,
    processSpecs: {
      type: "CONS",
      category: "AUTO",
    },
    signature: captcha.signature,
  };

  for (let round = 0; round < VALIDATION_MAX_ROUNDS; round += 1) {
    const controllers = Array.from(
      {
        length: VALIDATION_ATTEMPTS_PER_ROUND,
      },
      () => new AbortController(),
    );

    const result = await new Promise<{
      winner: ValidationAttemptResult | null;
      attempts: ValidationAttemptResult[];
    }>((resolve) => {
      let pending = controllers.length;
      let finished = false;
      const attempts: ValidationAttemptResult[] = [];

      const complete = (winner: ValidationAttemptResult | null) => {
        if (finished) {
          return;
        }

        finished = true;
        controllers.forEach((controller) => {
          controller.abort();
        });
        resolve({
          winner,
          attempts,
        });
      };

      controllers.forEach((controller, i) => {
        void (async () => {
          try {
            await sleepWithSignal(Math.random() * 120, controller.signal);

            const response = await postJSON<ValidationResponseData>(
              "/process-api/v1/process/elegibility",
              body,
              buildHeaders(captcha.frontToken),
              controller.signal,
            );

            if (response.raw === "aborted") {
              return;
            }

            const attempt: ValidationAttemptResult = {
              index: i,
              ok: response.ok,
              status: response.status,
              data: response.data,
              raw: response.raw,
            };

            attempts.push(attempt);

            if (attempt.ok) {
              complete(attempt);
            }
          } catch (error) {
            if (!(error instanceof Error) || error.message !== "aborted") {
              attempts.push({
                index: i,
                ok: false,
                status: 0,
                data: null,
                raw: error instanceof Error ? error.message : String(error),
              });
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
    const summary = summarizeAttempts(
      result.attempts.map((attempt) => ({
        index: attempt.index,
        status: attempt.status,
        ok: attempt.ok,
      })),
    );

    if (result.winner) {
      if (round > 0) {
        logTelcel(`validation recovered on round ${round + 1}`, {
          attempts: summary,
        });
      }

      return result.winner;
    }

    const terminalAttempt = result.attempts.find(
      (attempt) => !isRetryableResponse(attempt.status, attempt.raw),
    );

    if (terminalAttempt) {
      logTelcel("validation failed with terminal response", {
        attempts: summary,
      });
      return terminalAttempt;
    }

    if (round < VALIDATION_MAX_ROUNDS - 1) {
      const delay =
        VALIDATION_RETRY_DELAYS_MS[round] ||
        VALIDATION_RETRY_DELAYS_MS.at(-1) ||
        250;

      logTelcel(`validation transient failure on round ${round + 1}`, {
        attempts: summary,
        retryInMs: delay,
      });
      await sleep(delay);
    }
  }

  logTelcel("validation exhausted retries");
  return {
    ok: false,
    status: 0,
    data: null,
    raw: "validation exhausted retries",
  };
}

export async function lookupCURPInTelcel(curp: string): Promise<LineResult> {
  try {
    const captcha = await generateCaptcha();

    if (!captcha) {
      return {
        company: "Telcel",
        lines: [],
        error: "Could not generate captcha signature",
        temporaryUnavailable: true,
      };
    }

    logTelcel("captcha signature", captcha.signature);
    await sleep(CAPTCHA_READY_DELAY_MS);

    const validationResponse = await validateEligibility(curp, captcha);

    if (!validationResponse.ok) {
      return {
        company: "Telcel",
        lines: [],
        error: `Validation failed (${validationResponse.status})`,
        temporaryUnavailable: isRetryableResponse(
          validationResponse.status,
          validationResponse.raw,
        ),
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
      temporaryUnavailable: true,
    };
  }
}
