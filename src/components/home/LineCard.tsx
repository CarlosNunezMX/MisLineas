"use client";

import { ExternalLink, Flag, Phone } from "lucide-react";
import { motion } from "motion/react";
import { CopyButton } from "@/components/ui/CopyButton";
import { getProviderWebsite } from "@/lib/data/providerWebsites";
import { cn } from "@/lib/utils";
import type { DisplayLine } from "@/types";

interface Props {
  linea: DisplayLine;
  idx: number;
  onReport: (operadora: string) => void;
}

export function LineCard({ linea, idx, onReport }: Props) {
  const isConfirmed =
    !linea.isPossible &&
    !linea.isNotFound &&
    !linea.isError &&
    linea.numero !== "Número no confirmado";
  const website = isConfirmed ? getProviderWebsite(linea.operadora) : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.22, delay: Math.min(idx * 0.04, 0.3) }}
      className="bg-white border border-zinc-200 shadow-sm p-4 sm:p-5 rounded-2xl flex items-center justify-between gap-4"
    >
      <div className="flex items-center gap-4 min-w-0">
        <div className="w-10 h-10 bg-zinc-100 rounded-full flex items-center justify-center shrink-0">
          <Phone className="w-5 h-5 text-zinc-500" />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <span className="font-semibold text-zinc-900">
              {linea.operadora}
            </span>
            {linea.isPossible ? (
              <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-medium">
                Posible
              </span>
            ) : linea.isNotFound ? (
              <span className="text-[10px] bg-zinc-100 text-zinc-600 px-2 py-0.5 rounded-full font-medium">
                No encontrada
              </span>
            ) : linea.isError ? (
              <span className="text-[10px] bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-medium">
                Error
              </span>
            ) : (
              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-medium">
                Registrada
              </span>
            )}
          </div>
          <p
            className={cn(
              "font-mono text-base text-zinc-600",
              linea.numero === "Número no confirmado" &&
                "italic text-sm text-zinc-400",
              (linea.isNotFound || linea.isError) &&
                "italic text-sm text-zinc-400",
            )}
          >
            {linea.numero}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1 shrink-0">
        {isConfirmed && <CopyButton text={linea.numero} />}
        {(isConfirmed || linea.isPossible) && (
          <button
            type="button"
            onClick={() => onReport(linea.operadora)}
            className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
            aria-label={`Desconocer línea de ${linea.operadora}`}
            title="Desconocer / Derechos ARCO"
          >
            <Flag className="w-4 h-4" />
          </button>
        )}
        {website && isConfirmed && (
          <a
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg transition-colors"
            aria-label={`Ir al sitio de ${linea.operadora}`}
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        )}
      </div>
    </motion.div>
  );
}
