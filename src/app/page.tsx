"use client";

import { AlertCircle } from "lucide-react";
import { AnimatePresence } from "motion/react";
import type React from "react";
import { useState } from "react";
import { AccordionItem } from "@/components/home/AccordionItem";
import { ArcoSection } from "@/components/home/ArcoSection";
import { CurpForm } from "@/components/home/CurpForm";
import { EmptyState } from "@/components/home/EmptyState";
import { Footer } from "@/components/home/Footer";
import { Hero } from "@/components/home/Hero";
import { Navbar } from "@/components/home/Navbar";
import { Notices } from "@/components/home/Notices";
import { OperatorsSection } from "@/components/home/OperatorsSection";
import { ResultsPanel } from "@/components/home/ResultsPanel";
import { SecuritySection } from "@/components/home/SecuritySection";
import { WhySection } from "@/components/home/WhySection";
import { ReportDialog } from "@/components/ui/ReportDialog";
import { getCurpValidationError } from "@/lib/curp";
import { useCurpHistory } from "@/lib/hooks/useCurpHistory";
import { useLookup } from "@/lib/hooks/useLookup";

export default function MisLineas() {
  const [curp, setCurp] = useState("");
  const [reportTarget, setReportTarget] = useState<string | null>(null);
  const { history, saveToHistory } = useCurpHistory();
  const {
    loading,
    timedOut,
    error,
    results,
    queryTime,
    scannedCount,
    liveMessage,
    consultar,
    retry,
    reset,
  } = useLookup(saveToHistory);

  const curpValidationError = getCurpValidationError(curp);
  const curpIsValid = curp.length === 18 && !curpValidationError;

  const handleConsultar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!curpIsValid) return;
    consultar(curp);
  };

  const handleNuevaConsulta = () => {
    reset();
    setCurp("");
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 selection:bg-zinc-900 selection:text-white font-sans">
      <div className="bg-red-600 text-white text-sm py-3 px-4 flex justify-center items-center gap-3">
        <AlertCircle className="w-5 h-5 shrink-0" />
        <p className="text-center max-w-4xl font-medium">
          <strong>Aviso de servicio:</strong> Telcel y Weex están experimentando
          fallas debido a la alta demanda. Dado que consumimos directamente sus
          servicios, este problema de capacidad en sus servidores está fuera de
          nuestro control.
        </p>
      </div>

      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {liveMessage}
      </div>

      <AnimatePresence>
        {reportTarget && (
          <ReportDialog
            operadora={reportTarget}
            onClose={() => setReportTarget(null)}
          />
        )}
      </AnimatePresence>

      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          <div className="lg:col-span-5 space-y-8">
            <Hero />
            <CurpForm
              curp={curp}
              setCurp={setCurp}
              loading={loading}
              error={error}
              timedOut={timedOut}
              history={history}
              onSubmit={handleConsultar}
              onRetry={retry}
            />
            <Notices />
          </div>

          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {!results && !loading && !timedOut ? (
                <EmptyState />
              ) : results !== null ? (
                <ResultsPanel
                  results={results}
                  curp={curp}
                  loading={loading}
                  scannedCount={scannedCount}
                  queryTime={queryTime}
                  onNuevaConsulta={handleNuevaConsulta}
                  onReport={setReportTarget}
                />
              ) : null}
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-20 space-y-12">
          <OperatorsSection />

          <div className="max-w-4xl mx-auto space-y-4">
            <h2 className="text-xl font-bold text-zinc-900 mb-6 px-2 text-center md:text-left">
              Centro de Información
            </h2>
            <AccordionItem title="¿Por qué usar MisLíneas y cómo funciona?">
              <WhySection />
            </AccordionItem>
            <AccordionItem title="Seguridad y Privacidad">
              <SecuritySection />
            </AccordionItem>
            <AccordionItem title="Derechos ARCO y Denuncias">
              <ArcoSection />
            </AccordionItem>
          </div>
        </div>

        <Footer />
      </main>
    </div>
  );
}
