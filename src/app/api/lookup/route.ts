import type { NextRequest } from "next/server";
import {
  lookupCURPINMobig,
  lookupCURPINNextorMovil,
  lookupCURPINYoMobile,
  lookupCURPInABIB,
  lookupCURPInAltanMVNO,
  lookupCURPInATT,
  lookupCURPInDialo,
  lookupCURPInIENTC,
  lookupCURPInLogisticaACN,
  lookupCURPInMegamovil,
  lookupCURPInMirlo,
  lookupCURPInSorcel,
  lookupCURPInTelcel,
  loookupCURPINWeeex,
  loookupCURPInTalentoNetMVNO,
  loookupCURPInVirginMobile,
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
  {
    provider: "ABIB",
    lookupFunction: lookupCURPInABIB,
  },
  {
    provider: "Dialo",
    lookupFunction: lookupCURPInDialo,
  },
  {
    provider: "IENTC",
    lookupFunction: lookupCURPInIENTC,
  },
  {
    provider: "Logistica ACN (FedeGo!, Flash Mobile, Dua)",
    lookupFunction: lookupCURPInLogisticaACN,
  },
  {
    provider: "Mega Móvil",
    lookupFunction: lookupCURPInMegamovil,
  },
  {
    provider: "Mirlo",
    lookupFunction: lookupCURPInMirlo,
  },
  // {
  //   provider: "MoBig",
  //   lookupFunction: lookupCURPINMobig,
  // },
  {
    provider: "Nextor Movil",
    lookupFunction: lookupCURPINNextorMovil,
  },
  {
    provider: "Sorcel",
    lookupFunction: lookupCURPInSorcel,
  },
  {
    provider: "TalentoNet (Newww, Red Aguila, Link Móvil)",
    lookupFunction: loookupCURPInTalentoNetMVNO,
  },
  {
    provider: "Virgin Mobile",
    lookupFunction: loookupCURPInVirginMobile,
  },
  {
    provider: "Weex",
    lookupFunction: loookupCURPINWeeex,
  },
  // {
  //   provider: "Yo Mobile",
  //   lookupFunction: lookupCURPINYoMobile,
  // },
];

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

  // Use a streaming response to return results as soon as they resolve
  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();

      const promises = providers.map((p) =>
        p
          .lookupFunction(curp)
          .then(
            (result) => ({ provider: p.provider, result }),
            (error) => {
              console.error(`Lookup failed for ${p.provider}:`, error);
              return {
                provider: p.provider,
                result: {
                  company: p.provider,
                  lines: [],
                  error: `Lookup failed: ${error.message}`,
                },
              };
            },
          )
          .catch((error) => {
            console.error(`Unexpected error looking up CURP in ${p.provider}:`, error);
            return {
              provider: p.provider,
              result: {
                company: p.provider,
                lines: [],
                error: "An unexpected error occurred during lookup",
              },
            };
          })
          .then((response) => {
            // Write the individual response as a JSON line
            controller.enqueue(encoder.encode(JSON.stringify(response) + "\n"));
          }),
      );

      await Promise.allSettled(promises);
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "application/x-ndjson",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
