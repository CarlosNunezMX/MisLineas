import { ShieldAlert } from "lucide-react";
import { ARCO_RIGHTS } from "@/lib/data/content";

export function ArcoSection() {
  return (
    <section id="arco" className="scroll-mt-24">
      <h2 className="text-2xl font-bold text-zinc-900 mb-6">
        Derechos ARCO y Denuncias
      </h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm">
          <p className="text-sm text-zinc-600 mb-6 leading-relaxed">
            La protección de datos personales te permite ejercer derechos ARCO
            (Acceso, Rectificación, Cancelación, Oposición) ante cualquier
            operadora.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {ARCO_RIGHTS.map((a) => (
              <div
                key={a.t}
                className="bg-zinc-50 p-4 rounded-xl border border-zinc-100"
              >
                <h4 className="font-semibold text-sm text-zinc-900 mb-1">
                  {a.t}
                </h4>
                <p className="text-xs text-zinc-500">{a.d}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <ShieldAlert className="w-6 h-6 text-red-500" />
              <h3 className="font-semibold text-zinc-900">
                ¿Detectaste fraude?
              </h3>
            </div>
            <p className="text-sm text-zinc-600 leading-relaxed mb-6">
              Si encontraste una línea que no reconoces, debes presentar una
              denuncia ante la operadora responsable. El uso indebido de
              identidad es un delito.
            </p>
          </div>
          <a
            href="https://portal.crt.gob.mx/reporte-fallas-plataforma-registro"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
          >
            <ShieldAlert className="w-4 h-4" /> Reportar fraude en portal CRT
          </a>
        </div>
      </div>
    </section>
  );
}
