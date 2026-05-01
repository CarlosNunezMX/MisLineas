import type { LineResult } from "@/types";

export async function lookupCURPInTelcel(curp: string): Promise<LineResult> {
  const validationBody = {
    typePerson: "F",
    claveIdentidad: curp,
    processSpecs: {
      type: "CONS",
      category: "AUTO",
    },
  };

  const validationHeaders = {
    applicationid: "PRB",
    channel: "OSA",
    "content-type": "application/json",
    messageuuid: "SIS_RANDOM",
    sendby: "random-id",
    origin: "https://registro.telcel.com",
    referer: "https://registro.telcel.com/vinculatulinea/",
    token: "token",
  };

  const validationResponse = await fetch(
    "https://registro.telcel.com/process-api/v1/process/elegibility",
    {
      method: "POST",
      headers: validationHeaders,
      body: JSON.stringify(validationBody),
    },
  );

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

  const validationData = await validationResponse.json();

  if (validationData.errorList && validationData.errorList.length > 0) {
    return {
      company: "Telcel",
      lines: [],
      isRegistered: false,
    };
  }

  console.log("[telcel] registered response:", JSON.stringify(validationData, null, 2));
  return {
    company: "Telcel",
    lines: [],
    isRegistered: true,
    rawApiResponse: validationData,
  };
}
