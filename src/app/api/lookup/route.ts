import type { NextRequest } from "next/server";
import {
  lookupCURPInAltanMVNO,
  lookupCURPInATT,
  lookupCURPInTelcel,
} from "@/lib/providers";
import { validateCURP } from "@/lib/providers/curp";
import type { LineResult } from "@/types";

const providers: Array<{
  provider: string;
  lookupFunction: (curp: string) => Promise<LineResult>;
}> = [
  {
    provider: "AT&T",
    lookupFunction: lookupCURPInATT,
  },
  {
    provider: "Telcel",
    lookupFunction: lookupCURPInTelcel,
  },
  {
    provider: "Altan MVNO",
    lookupFunction: lookupCURPInAltanMVNO,
  },
];

export const runtime = "edge";

export async function POST(req: NextRequest) {
  const { curp } = await req.json();

  if (!curp || typeof curp !== "string") {
    return new Response(
      JSON.stringify({ error: "CURP is required and must be a string" }),
      { status: 400 },
    );
  }

  // Validate the CURP
  const isValidCURP = validateCURP(curp);

  if (!isValidCURP) {
    return new Response(JSON.stringify({ error: "Invalid CURP format" }), {
      status: 400,
    });
  }

  // Lookup in all providers concurrently
  const lookupResponses = await Promise.all(
    providers.map((p) =>
      p.lookupFunction(curp).then(
        (result) => ({ provider: p.provider, result }),
        (error) => ({
          provider: p.provider,
          result: {
            company: p.provider,
            lines: [],
            error: `Lookup failed: ${error.message}`,
          },
        }),
      ),
    ),
  );

  return new Response(JSON.stringify(lookupResponses), {
    headers: { "Content-Type": "application/json" },
  });
}
