"use client";

import { ChevronDown, Search } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { LineCard } from "@/components/home/LineCard";
import { SkeletonCard } from "@/components/ui/SkeletonCard";
import type { DisplayLine, FilterTab } from "@/types";

interface Props {
  loading: boolean;
  visibleResults: DisplayLine[];
  collapsedNotFound: DisplayLine[];
  activeFilter: FilterTab;
  activeResultsCount: number;
  searchQuery: string;
  onReport: (operadora: string) => void;
}

export function ResultsList({
  loading,
  visibleResults,
  collapsedNotFound,
  activeFilter,
  activeResultsCount,
  searchQuery,
  onReport,
}: Props) {
  const [notFoundExpanded, setNotFoundExpanded] = useState(false);

  return (
    <div className="space-y-3 max-h-[650px] overflow-y-auto pr-2 custom-scrollbar">
      {loading && visibleResults.length === 0 && (
        <div className="space-y-3">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      )}

      {!loading && activeResultsCount === 0 ? (
        <div className="bg-white border border-zinc-200 p-8 rounded-2xl flex flex-col items-center justify-center text-center shadow-sm">
          <Search className="w-8 h-8 text-zinc-300 mb-3" />
          <p className="text-sm font-medium text-zinc-900">Sin coincidencias</p>
          <p className="text-xs text-zinc-500 mt-1">
            {searchQuery
              ? `No hay resultados para "${searchQuery}"`
              : "No hay resultados en esta categoría"}
          </p>
        </div>
      ) : (
        <>
          <AnimatePresence initial={false}>
            {visibleResults.map((linea, idx) => (
              <LineCard
                key={linea.id}
                linea={linea}
                idx={idx}
                onReport={onReport}
              />
            ))}
          </AnimatePresence>

          {activeFilter === "all" && collapsedNotFound.length > 0 && (
            <div className="border border-zinc-200 rounded-2xl overflow-hidden bg-white shadow-sm">
              <button
                type="button"
                onClick={() => setNotFoundExpanded((v) => !v)}
                className="w-full flex items-center justify-between px-5 py-4 text-sm font-medium text-zinc-600 hover:bg-zinc-50 transition-colors"
                aria-expanded={notFoundExpanded}
              >
                <span>
                  {collapsedNotFound.length} operadora
                  {collapsedNotFound.length !== 1 ? "s" : ""} sin líneas
                  registradas
                </span>
                <motion.span
                  animate={{ rotate: notFoundExpanded ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-4 h-4" />
                </motion.span>
              </button>
              <AnimatePresence>
                {notFoundExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-4 space-y-2 max-h-72 overflow-y-auto">
                      {collapsedNotFound.map((linea) => (
                        <div
                          key={linea.id}
                          className="flex items-center justify-between py-2 border-b border-zinc-100 last:border-0"
                        >
                          <span className="text-sm text-zinc-600">
                            {linea.operadora}
                          </span>
                          <span className="text-xs text-zinc-400 italic">
                            Sin registro
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </>
      )}
    </div>
  );
}
