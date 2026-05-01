import type { LineResult } from "@/types";

const possibleProviders = ["Newww", "RedAguila", "Link Movil"];

export async function loookupCURPInTalentoNetMVNO(
  curp: string,
): Promise<LineResult> {
  const validationResponse = await fetch(
    `https://core.newww.mx/api/core/consulta_lineas_vinculacion?curp=${curp}`,
  );

  if (validationResponse.status === 404) {
    const errorData = await validationResponse.json();

    if (errorData.msg === "No se encontraron registros para esta CURP.") {
      return {
        company: "Newww",
        lines: [],
        possibleProviders,
        isRegistered: false,
      };
    }
  }

  if (!validationResponse.ok) {
    console.error(
      "Failed to validate CURP with Newww:",
      validationResponse.statusText,
    );

    return {
      company: "Newww",
      lines: [],
      possibleProviders,
      error: "Failed to validate CURP with Newww",
    };
  }

  const positiveData = await validationResponse.json().catch(() => null);
  return {
    company: "Newww",
    lines: [],
    possibleProviders: possibleProviders,
    isRegistered: true,
    rawApiResponse: positiveData,
  };
}
