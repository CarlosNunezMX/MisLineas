import { CheckCircle2, Lock } from "lucide-react";
import { SECURITY_BULLETS } from "@/lib/data/content";

export function SecuritySection() {
  return (
    <section
      id="seguridad"
      className="bg-black text-white rounded-3xl p-8 sm:p-12 scroll-mt-24"
    >
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <Lock className="w-8 h-8 text-zinc-400 mb-6" />
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Seguridad Zero-Knowledge
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            No contamos con una base de datos de usuarios; cada consulta
            orquesta conexiones cifradas de punto a punto con los registros
            oficiales de las operadoras.
          </p>
          <ul className="space-y-3">
            {SECURITY_BULLETS.map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 text-sm text-zinc-300"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />{" "}
                {item}
              </li>
            ))}
          </ul>
          <p className="text-sm text-zinc-400 mt-6">
            Puedes revisar el código y validar cómo operamos en nuestro
            repositorio público de GitHub:{" "}
            <a
              href="https://github.com/moraxh/MisLineas"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-200 underline underline-offset-4 hover:text-white transition-colors"
            >
              github.com/moraxh/MisLineas
            </a>
            .
          </p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl">
          <div className="flex justify-between items-center text-xs font-mono text-zinc-500 mb-4 pb-4 border-b border-zinc-800">
            <span>STATUS: SECURE</span>
            <span className="text-emerald-400">● ENCRYPTED TUNNEL</span>
          </div>
          <div className="space-y-4">
            <div className="h-2 bg-zinc-800 rounded w-3/4" />
            <div className="h-2 bg-zinc-800 rounded w-5/6" />
            <div className="h-2 bg-zinc-800 rounded w-1/2" />
          </div>
        </div>
      </div>
    </section>
  );
}
