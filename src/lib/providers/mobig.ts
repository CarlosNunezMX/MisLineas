import type { LineResult } from "@/types";

export async function lookupCURPINMobig(curp: string): Promise<LineResult> {
  const validationBody = {
    curp: curp,
  };

  const validationResponse = await fetch(
    `https://mobig.mx/api/vinculacion/search-by-curp`,
    {
      method: "POST",
      body: JSON.stringify(validationBody),
    },
  );

  if (!validationResponse.ok) {
    console.error(
      "Failed to validate CURP with Mobig:",
      validationResponse.statusText,
    );

    return {
      company: "Mobig",
      lines: [],
      error: "Failed to validate CURP with Mobig",
    };
  }

  const validationData = await validationResponse.json();

  if (validationData.data.length === 0) {
    return {
      company: "Mobig",
      lines: [],
      isRegistered: false,
    };
  }

  return {
    company: "Mobig",
    lines: [],
    isRegistered: true,
    rawApiResponse: validationData,
  };
}
