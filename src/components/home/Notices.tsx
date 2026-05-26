import { Server, ShieldAlert } from "lucide-react";

export function Notices() {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-zinc-600">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5">
          <ShieldAlert className="h-3.5 w-3.5 text-amber-600" />
          <span>Proyecto ciudadano independiente</span>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1.5">
          <Server className="h-3.5 w-3.5 text-zinc-500" />
          <span>Las respuestas se verifican en tiempo real</span>
        </div>
      </div>

      <div className="flex items-center justify-center gap-1 text-sm text-zinc-400">
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
    </div>
  );
}
