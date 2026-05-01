import type { LineResult } from "@/types";

const possibleProviders = ["FedeGo!", "Flash Mobile", "Dua"];

export async function lookupCURPInLogisticaACN(
  curp: string,
): Promise<LineResult> {
  const validationResponse = await fetch(
    `https://ku.diri.mx/consultaRNU/${curp}`,
  );

  if (!validationResponse.ok) {
    console.error(
      "Failed to validate CURP with Logistica ACN:",
      validationResponse.statusText,
    );

    return {
      company: "Logistica ACN",
      lines: [],
      error: "Failed to validate CURP with Logistica ACN",
    };
  }

  const validationData = await validationResponse.json();

  if (validationData.length > 0) {
    console.log("[logisticaacn] registered response:", JSON.stringify(validationData, null, 2));
    return {
      company: "Logistica ACN",
      possibleProviders: possibleProviders,
      lines: [],
      isRegistered: true,
      rawApiResponse: validationData,
    };
  }

  return {
    company: "Logistica ACN",
    possibleProviders: possibleProviders,
    lines: [],
    isRegistered: false,
  };
}
