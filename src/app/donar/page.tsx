"use client";

import { Coffee } from "lucide-react";

const KOFI_URL = "https://ko-fi.com/moraxh";

export default function DonarPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md text-center space-y-6">
        <h1 className="text-xl font-semibold text-zinc-900">
          Apoya a MisLíneas
        </h1>
        <p className="text-sm text-zinc-600">
          Debido al gran uso de MisLíneas, los costos de infraestructura
          (hosting, dominio y proxies) se han disparado. Si el servicio te ha
          sido útil, considera apoyar el proyecto para que sigamos en línea.
        </p>
        <a
          href={KOFI_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-pink-50 text-pink-600 hover:bg-pink-100 px-5 py-3 rounded-lg font-medium transition-colors"
        >
          <Coffee className="w-4 h-4" />
          Continuar a Ko-fi
        </a>
      </div>
    </main>
  );
}
