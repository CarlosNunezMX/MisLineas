import type { LineResult } from "@/types";

export async function lookupCURPInMegamovil(curp: string): Promise<LineResult> {
  const validationResponse = await fetch(
    `https://consultavinculacion.megamovil.mx/validaCURP?curp=${curp}`,
  );

  if (!validationResponse.ok) {
    console.error(
      "Failed to validate CURP with Megamovil:",
      validationResponse.statusText,
    );

    return {
      company: "Megamovil",
      lines: [],
      error: "Failed to validate CURP with Megamovil",
    };
  }

  const validationData = await validationResponse.json();

  if (
    validationData.message ===
    "La CURP ingresada no cuenta con líneas Mega móvil vinculadas."
  ) {
    return {
      company: "Megamovil",
      lines: [],
      isRegistered: false,
    };
  }

  console.log("[megamovil] registered response:", JSON.stringify(validationData, null, 2));
  return {
    company: "Megamovil",
    lines: [],
    isRegistered: true,
    rawApiResponse: validationData,
  };
}
