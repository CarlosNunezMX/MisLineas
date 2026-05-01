import type { LineResult } from "@/types";

export async function lookupCURPINNextorMovil(
  curp: string,
): Promise<LineResult> {
  const authResponse = await fetch(
    "https://vinculacion.nextormovil.mx/api/consulta/iniciar",
    {
      method: "POST",
    },
  );

  if (!authResponse.ok) {
    return {
      company: "Nextor Movil",
      lines: [],
      error: "Failed to initiate session with Nextor Movil",
    };
  }

  const authData = await authResponse.json();
  const sessionId = authData.sessionId;

  const validationBody = {
    tipo: "curp",
    valor: curp,
  };

  const validationHeaders = {
    "X-Session-Id": sessionId,
    "Content-Type": "application/json",
  };

  const validationResponse = await fetch(
    "https://vinculacion.nextormovil.mx/api/consulta/pre-check",
    {
      method: "POST",
      headers: validationHeaders,
      body: JSON.stringify(validationBody),
    },
  );

  if (!validationResponse.ok) {
    console.error(
      "Failed to validate CURP with Nextor Movil:",
      validationResponse.statusText,
    );

    return {
      company: "Nextor Movil",
      lines: [],
      error: "Failed to validate CURP with Nextor Movil",
    };
  }

  const validationData = await validationResponse.json();

  if (validationData.encontrado) {
    return {
      company: "Nextor Movil",
      lines: [],
      isRegistered: true,
      rawApiResponse: validationData,
    };
  }

  return {
    company: "Nextor Movil",
    lines: [],
    isRegistered: false,
  };
}
