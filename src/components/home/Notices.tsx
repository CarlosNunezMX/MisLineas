import { Server, ShieldAlert } from "lucide-react";

export function Notices() {
  return (
    <>
      <div className="grid gap-4">
        <div className="bg-amber-50 text-amber-900 text-sm p-4 rounded-xl border border-amber-100 flex gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0" />
          <p>
            <strong>Protocolo de Identidad Digital:</strong> Plataforma
            ciudadana sin afiliación al Gobierno. Automatizamos la verificación
            pública para facilitar este derecho.
          </p>
        </div>
        <div className="bg-zinc-100 text-zinc-600 text-sm p-4 rounded-xl border border-zinc-200 flex gap-3">
          <Server className="w-5 h-5 text-zinc-400 shrink-0" />
          <p>
            <strong>Aviso de investigación:</strong> Formatos de respuesta se
            documentan (sin datos personales) para mapear APIs públicas y
            mejorar nuestra cobertura de código abierto.
          </p>
        </div>
      </div>

      <div className="hidden lg:flex items-center gap-1 text-sm text-zinc-400">
        <span>Hecho por</span>
        <a
          href="https://github.com/moraxh"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-zinc-700 hover:text-zinc-900 transition-colors underline underline-offset-2 decoration-zinc-300 hover:decoration-zinc-500"
        >
          Jorge Mora
        </a>
        <span>&amp;</span>
        <a
          href="https://github.com/HadassahGarcia"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-zinc-700 hover:text-zinc-900 transition-colors underline underline-offset-2 decoration-zinc-300 hover:decoration-zinc-500"
        >
          Hadassah Garcia
        </a>
      </div>
    </>
  );
}
