"use client";

import { History } from "lucide-react";
import { motion } from "motion/react";
import { KNOWN_PROVIDERS } from "@/lib/data/content";

export function EmptyState() {
  return (
    <motion.div
      key="empty"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-full min-h-[400px] border border-dashed border-zinc-300 bg-zinc-50/50 rounded-2xl flex flex-col p-8 justify-center items-center text-center"
    >
      <div className="w-12 h-12 bg-white rounded-full border border-zinc-200 flex items-center justify-center mb-4 shadow-sm">
        <History className="w-5 h-5 text-zinc-400" />
      </div>
      <h3 className="font-semibold text-zinc-900 text-lg mb-1">
        Listo para verificar
      </h3>
      <p className="text-sm text-zinc-500 mb-6">
        Ingresa tu CURP para conocer las líneas a tu nombre.
      </p>

      <div className="w-full max-w-sm space-y-2 text-left">
        <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wide">
          Consultando +80 Proveedores
        </p>
        {KNOWN_PROVIDERS.map((p) => (
          <div
            key={p.name}
            className="flex items-center justify-between bg-white px-4 py-2.5 rounded-lg border border-zinc-200 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <p.icon className="w-4 h-4 text-zinc-400" />
              <span className="text-sm font-medium text-zinc-700">
                {p.name}
              </span>
            </div>
            <span className="text-xs text-zinc-400 bg-zinc-100 px-2 py-0.5 rounded-md">
              En espera
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
