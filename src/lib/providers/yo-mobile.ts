import { stripCURPs } from "@/lib/sanitize";
import type { LineResult } from "@/types";

export async function lookupCURPINYoMobile(curp: string): Promise<LineResult> {
  const validationResponse = await fetch(
    `https://play.prod.yomobile.xyz/api/v1.0/crm/lines/by-personal-id/${curp}/`,
  );

  if (!validationResponse.ok) {
    console.error(
      "Failed to validate CURP with Yo Mobile:",
      validationResponse.statusText,
    );

    return {
      company: "Yo Mobile",
      lines: [],
      error: "Failed to validate CURP with Yo Mobile",
    };
  }

  const validationData = await validationResponse.json();

  if (validationData.count === 0) {
    return {
      company: "Yo Mobile",
      lines: [],
      isRegistered: false,
    };
  }

  console.log(
    "[yo-mobile] registered response:",
    JSON.stringify(stripCURPs(validationData), null, 2),
  );
  return {
    company: "Yo Mobile",
    lines: [],
    isRegistered: true,
    rawApiResponse: validationData,
  };
}
