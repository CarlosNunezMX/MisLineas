"use client";

import { MessageSquareWarning, Search } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { FilterTabs } from "@/components/home/FilterTabs";
import { ResultsHeader } from "@/components/home/ResultsHeader";
import { ResultsList } from "@/components/home/ResultsList";
import type { DisplayLine, FilterTab } from "@/types";

interface Props {
  results: DisplayLine[];
  curp: string;
  loading: boolean;
  scannedCount: number;
  queryTime: Date | null;
  onNuevaConsulta: () => void;
  onReport: (operadora: string) => void;
}

export function ResultsPanel({
  results,
  curp,
  loading,
  scannedCount,
  queryTime,
  onNuevaConsulta,
  onReport,
}: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterTab>("all");

  const confirmedLines = results.filter(
    (l) => !l.isPossible && !l.isNotFound && !l.isError && !l.isUnavailable,
  );
  const possibleLines = results.filter(
    (l) => l.isPossible && !l.isNotFound && !l.isError && !l.isUnavailable,
  );
  const errorLines = results.filter((l) => l.isError);
  const unavailableLines = results.filter((l) => l.isUnavailable);
  const notFoundLines = results.filter((l) => l.isNotFound);

  const filterTabs: { key: FilterTab; label: string; count: number }[] = [
    { key: "all", label: "Todos", count: results.length },
    { key: "confirmed", label: "Confirmados", count: confirmedLines.length },
    { key: "possible", label: "Posibles", count: possibleLines.length },
    { key: "errors", label: "Errores", count: errorLines.length },
  ];

  const getActiveResults = (): DisplayLine[] => {
    let base: DisplayLine[];
    switch (activeFilter) {
      case "confirmed":
        base = [...confirmedLines, ...notFoundLines];
        break;
      case "possible":
        base = possibleLines;
        break;
      case "errors":
        base = errorLines;
        break;
      default:
        base = results;
    }
    if (!searchQuery) return base;
    const q = searchQuery.toLowerCase();
    return base.filter(
      (l) =>
        l.operadora.toLowerCase().includes(q) ||
        l.numero.toLowerCase().includes(q),
    );
  };

  const activeResults = getActiveResults();
  const visibleResults =
    activeFilter === "all"
      ? activeResults.filter((l) => !l.isNotFound)
      : activeResults;
  const collapsedNotFound = activeFilter === "all" ? notFoundLines : [];

  return (
    <motion.div
      key="results"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <ResultsHeader
        results={results}
        curp={curp}
        loading={loading}
        scannedCount={scannedCount}
        queryTime={queryTime}
        onNuevaConsulta={onNuevaConsulta}
      />

      {!loading &&
        (errorLines.length > 0 ||
          unavailableLines.length > 0 ||
          notFoundLines.length > 0) && (
          <div className="bg-blue-50 text-blue-900 text-sm p-4 rounded-2xl border border-blue-100 flex gap-3 text-left shadow-sm">
            <MessageSquareWarning className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <p>
              <strong>
                ¿Una línea no aparece o una operadora estuvo temporalmente no
                disponible?
              </strong>{" "}
              Al ser un proyecto independiente dependemos del feedback de la
              comunidad.{" "}
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSdI1KnQDXHA6lnAD29JZLokvf5NRCeLb_wPuTiDQ1bs8os6_A/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold underline underline-offset-2 hover:text-blue-700"
              >
                Repórtanos el problema aquí
              </a>{" "}
              para investigar y buscar una solución.
            </p>
          </div>
        )}

      <FilterTabs
        tabs={filterTabs}
        active={activeFilter}
        onChange={setActiveFilter}
      />

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
        <input
          type="text"
          placeholder="Buscar operadora o número..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white border border-zinc-200 px-10 py-3 rounded-xl text-sm outline-none transition-all placeholder:text-zinc-400 focus:border-black focus:ring-1 focus:ring-black shadow-sm"
        />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-zinc-400 bg-zinc-100 px-2 py-1 rounded-md">
          {activeResults.length} resultados
        </span>
      </div>

      <ResultsList
        loading={loading}
        visibleResults={visibleResults}
        collapsedNotFound={collapsedNotFound}
        activeFilter={activeFilter}
        activeResultsCount={activeResults.length}
        searchQuery={searchQuery}
        onReport={onReport}
      />
    </motion.div>
  );
}
