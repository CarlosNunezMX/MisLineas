"use client";

import { Coffee, HeartHandshake } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";

const KOFI_URL = "https://ko-fi.com/moraxh";

export default function DonarPage() {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fafaf9_0%,#f4f4f5_40%,#ffffff_100%)] font-sans text-zinc-900">
      <div className="mx-auto flex min-h-screen max-w-xl flex-col px-4 py-12 sm:px-6">
        <Link
          href="/"
          className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors"
        >
          ← Volver al inicio
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-1 flex-col items-center justify-center gap-6 text-center"
        >
          <div className="flex items-center justify-center w-14 h-14 rounded-full bg-pink-50 text-pink-600">
            <HeartHandshake className="w-7 h-7" />
          </div>

          <div className="space-y-3">
            <h1 className="text-2xl font-bold tracking-tight text-zinc-950 sm:text-3xl">
              Apoya a MisLíneas
            </h1>
            <p className="max-w-md text-sm leading-7 text-zinc-600 sm:text-base">
              Debido al gran uso de MisLíneas, los costos de infraestructura
              (hosting, dominio y proxies) se han disparado. Si el servicio
              te ha sido útil, considera apoyar el proyecto para que sigamos
              en línea.
            </p>
          </div>

          <a
            href={KOFI_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-pink-600 px-5 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-pink-700"
          >
            <Coffee className="w-4 h-4" />
            Continuar a Ko-fi
          </a>

          <p className="text-xs text-zinc-400">
            Las donaciones son voluntarias. MisLíneas sigue siendo un
            proyecto sin fines de lucro.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
