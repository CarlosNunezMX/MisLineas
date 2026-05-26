"use client";

import { History } from "lucide-react";
import { motion } from "motion/react";
import { KNOWN_PROVIDERS, TOTAL_PROVIDERS } from "@/lib/data/content";

export function EmptyState() {
  return (
    <motion.div
      key="empty"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-[28px] border border-zinc-200 bg-zinc-50/70 p-8"
    >
      <div className="space-y-6">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-zinc-200 bg-white text-zinc-500 shadow-sm">
          <History className="h-6 w-6" />
        </div>

        <div className="space-y-2 text-center">
          <h3 className="text-2xl font-semibold tracking-tight text-zinc-950">
            Listo para verificar tus líneas
          </h3>
          <p className="mx-auto max-w-2xl text-sm leading-6 text-zinc-600">
            Aquí aparecerán los resultados de tu consulta con líneas
            confirmadas, coincidencias posibles y operadoras revisadas.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-zinc-200 bg-white p-4 text-center shadow-sm">
            <p className="text-xs uppercase tracking-[0.18em] text-zinc-400">
              Cobertura
            </p>
            <p className="mt-2 text-3xl font-semibold text-zinc-950">
              {TOTAL_PROVIDERS}+
            </p>
            <p className="mt-1 text-sm text-zinc-500">
              Proveedores monitoreados
            </p>
          </div>
          <div className="rounded-2xl border border-zinc-200 bg-white p-4 text-center shadow-sm">
            <p className="text-xs uppercase tracking-[0.18em] text-zinc-400">
              Resultado
            </p>
            <p className="mt-2 text-lg font-semibold text-zinc-950">
              Confirmadas
            </p>
            <p className="mt-1 text-sm text-zinc-500">
              Líneas detectadas a tu nombre
            </p>
          </div>
          <div className="rounded-2xl border border-zinc-200 bg-white p-4 text-center shadow-sm">
            <p className="text-xs uppercase tracking-[0.18em] text-zinc-400">
              Revisión
            </p>
            <p className="mt-2 text-lg font-semibold text-zinc-950">
              Posibles y errores
            </p>
            <p className="mt-1 text-sm text-zinc-500">
              Casos que conviene validar
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
            Cobertura destacada
          </p>
          <div className="grid gap-2 sm:grid-cols-3">
            {KNOWN_PROVIDERS.map((p) => (
              <div
                key={p.name}
                className="flex items-center justify-center gap-3 rounded-2xl border border-zinc-200 bg-white px-4 py-3 shadow-sm"
              >
                <div className="rounded-xl bg-zinc-100 p-2">
                  <p.icon className="h-4 w-4 text-zinc-500" />
                </div>
                <span className="text-sm font-medium text-zinc-700">
                  {p.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
