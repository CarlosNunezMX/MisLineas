"use client";

import { Github, Search } from "lucide-react";
import { motion } from "motion/react";

export function Hero() {
  return (
    <div className="space-y-5 text-center">
      <div className="flex flex-wrap justify-center gap-2">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/80 px-3 py-1.5 text-xs font-medium text-zinc-700 shadow-sm backdrop-blur"
        >
          <Search className="w-3.5 h-3.5" />
          <span>
            Antes buscabas en +100 sitios, ahora <strong>solo en uno</strong>.
          </span>
        </motion.div>
        <motion.a
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          href="https://github.com/moraxh/MisLineas"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50/90 px-3 py-1.5 text-xs font-medium text-emerald-700 shadow-sm transition-colors hover:bg-emerald-100"
        >
          <Github className="w-3.5 h-3.5" />
          <span>Código Abierto y Auditable</span>
        </motion.a>
      </div>

      <div className="space-y-3">
        <h1 className="mx-auto max-w-3xl text-4xl font-bold leading-tight tracking-tight text-zinc-950 sm:text-5xl">
          Consulta las líneas registradas a tu nombre en segundos.
        </h1>
        <p className="mx-auto max-w-2xl text-base leading-7 text-zinc-600 sm:text-lg">
          Ingresa tu CURP y revisa si hay números vinculados contigo, sin andar
          saltando entre decenas de portales.
        </p>
      </div>
    </div>
  );
}
