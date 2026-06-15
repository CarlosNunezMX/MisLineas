import { ShieldAlert } from "lucide-react";
import { ARCO_RIGHTS } from "@/lib/data/content";

export function ArcoSection() {
  return (
    <div className="pt-4">
      <div className="grid md:grid-cols-2 gap-6 items-start">
        <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-6">
          <p className="text-sm text-zinc-600 mb-6 leading-relaxed">
            La Ley Federal de Protección de Datos Personales en Posesión de los
            Particulares (LFPDPPP) te permite ejercer derechos ARCO ante
            cualquier operadora. Tienes total soberanía sobre el uso de tu
            identidad.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {ARCO_RIGHTS.map((a) => (
              <div
                key={a.t}
                className="bg-white p-4 rounded-xl border border-zinc-200"
              >
                <h4 className="font-semibold text-sm text-zinc-900 mb-1">
                  {a.t}
                </h4>
                <p className="text-xs text-zinc-500">{a.d}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-6 flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <ShieldAlert className="w-6 h-6 text-red-500" />
              <h3 className="font-semibold text-zinc-900">
                ¿Detectaste una línea desconocida?
              </h3>
            </div>
            <p className="text-sm text-zinc-600 leading-relaxed mb-6">
              Este es un problema grave. Alguien podría estar usando tu
              identidad para cometer delitos o fraudes. Tienes el derecho,
              conforme a la LFPDPPP, de exigir la cancelación inmediata y
              levantar un reporte formal ante la operadora.
            </p>
          </div>
          <div className="space-y-3 mt-auto">
            <a
              href="https://portal.crt.gob.mx/reporte-fallas-plataforma-registro"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors text-sm"
            >
              <ShieldAlert className="w-4 h-4" /> Entrar al portal del CRT
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
