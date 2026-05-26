"use client";

import { Github, Search } from "lucide-react";
import { motion } from "motion/react";

export function Hero() {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/5 border border-black/10 text-xs font-medium text-zinc-700 shadow-sm"
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
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-medium text-emerald-700 shadow-sm hover:bg-emerald-100 transition-colors"
        >
          <Github className="w-3.5 h-3.5" />
          <span>Código Abierto y Auditable</span>
        </motion.a>
      </div>
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 leading-tight">
        El control de tu <span className="text-zinc-500">identidad móvil</span>{" "}
        centralizado.
      </h1>
      <p className="text-zinc-600 leading-relaxed">
        Debido a la nueva regulación federal, es tu derecho y obligación conocer
        qué números están vinculados a tu nombre. Evita cargos o suplantación de
        identidad.
      </p>
    </div>
  );
}
