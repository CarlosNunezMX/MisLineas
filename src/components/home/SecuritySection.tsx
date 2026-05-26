import { CheckCircle2, Lock } from "lucide-react";
import { SECURITY_BULLETS } from "@/lib/data/content";

export function SecuritySection() {
  return (
    <div className="pt-4">
      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div>
          <Lock className="w-8 h-8 text-zinc-900 mb-4" />
          <p className="text-zinc-600 leading-relaxed mb-6 text-sm">
            No contamos con una base de datos de usuarios; cada consulta
            orquesta conexiones cifradas de punto a punto con los registros
            oficiales de las operadoras. Si notas un historial de búsquedas,
            <strong> solo se guarda localmente en tu navegador</strong>{" "}
            (LocalStorage), jamás toca nuestros servidores.
          </p>
          <ul className="space-y-3">
            {SECURITY_BULLETS.map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 text-sm text-zinc-700"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />{" "}
                {item}
              </li>
            ))}
          </ul>
          <p className="text-sm text-zinc-500 mt-6">
            Puedes revisar el código y validar cómo operamos en nuestro
            repositorio público de GitHub:{" "}
            <a
              href="https://github.com/moraxh/MisLineas"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-900 font-medium underline underline-offset-4 hover:opacity-80 transition-opacity"
            >
              github.com/moraxh/MisLineas
            </a>
            .
          </p>
        </div>
        <div className="bg-zinc-900 text-white border border-zinc-800 rounded-2xl p-6 shadow-xl">
          <div className="flex justify-between items-center text-xs font-mono text-zinc-400 mb-4 pb-4 border-b border-zinc-700">
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
    </div>
  );
}
