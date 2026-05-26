"use client";

import { ExternalLink, ShieldAlert, X } from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";
import { getProviderWebsite } from "@/lib/data/providerWebsites";

export function ReportDialog({
  operadora,
  onClose,
}: {
  operadora: string;
  onClose: () => void;
}) {
  const website = getProviderWebsite(operadora);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={onClose}
      onKeyDown={(e) => {
        if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
          onClose();
        }
      }}
      aria-modal="true"
      role="dialog"
      aria-label={`Opciones ARCO para ${operadora}`}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.15 }}
        className="bg-white rounded-2xl shadow-xl border border-zinc-200 p-6 max-w-sm w-full space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-bold text-zinc-900 text-base">
              Desconocer línea
            </h3>
            <p className="text-sm text-zinc-500 mt-0.5">{operadora}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 hover:bg-zinc-100 rounded-lg transition-colors text-zinc-400 hover:text-zinc-900"
            aria-label="Cerrar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-sm text-zinc-600 leading-relaxed">
          Puedes ejercer tus derechos ARCO (Acceso, Rectificación, Cancelación,
          Oposición) directamente ante la operadora o reportar fraude al CRT.
        </p>

        <div className="space-y-2">
          {website && (
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-700 text-white text-sm font-medium py-2.5 rounded-xl transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Ir al sitio de {operadora}
            </a>
          )}
          <a
            href="https://portal.crt.gob.mx/reporte-fallas-plataforma-registro"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium py-2.5 rounded-xl transition-colors"
          >
            <ShieldAlert className="w-4 h-4" />
            Reportar fraude en portal CRT
          </a>
          <button
            type="button"
            onClick={onClose}
            className="w-full text-sm text-zinc-500 hover:text-zinc-900 py-2 transition-colors"
          >
            Cancelar
          </button>
        </div>
      </motion.div>
    </div>
  );
}
