"use client";

import {
  AlertCircle,
  ArrowRight,
  ClipboardPaste,
  Loader2,
  X,
} from "lucide-react";
import type React from "react";
import { getCurpValidationError } from "@/lib/curp";
import { cn } from "@/lib/utils";

interface CurpFormProps {
  curp: string;
  setCurp: (v: string) => void;
  loading: boolean;
  error: string | null;
  timedOut: boolean;
  history: string[];
  onSubmit: (e: React.FormEvent) => void;
  onRetry: () => void;
}

export function CurpForm({
  curp,
  setCurp,
  loading,
  error,
  timedOut,
  history,
  onSubmit,
  onRetry,
}: CurpFormProps) {
  const curpValidationError = getCurpValidationError(curp);
  const curpIsValid = curp.length === 18 && !curpValidationError;
  const curpCountColor =
    curp.length === 18 && !curpValidationError
      ? "text-emerald-500"
      : curp.length === 18
        ? "text-red-500"
        : "text-zinc-400";

  const handlePasteCurp = async () => {
    try {
      const text = await navigator.clipboard.readText();
      const sanitized = text
        .toUpperCase()
        .replace(/[^A-Z0-9]/g, "")
        .slice(0, 18);
      if (sanitized) setCurp(sanitized);
    } catch {}
  };

  return (
    <div className="bg-white border border-zinc-200 shadow-sm rounded-2xl p-6">
      <form onSubmit={onSubmit} className="space-y-5">
        <div className="space-y-2">
          <label
            htmlFor="curp-input"
            className="text-sm font-medium text-zinc-700"
          >
            Ingresa tu CURP
          </label>
          <div className="relative">
            <input
              type="text"
              id="curp-input"
              autoComplete="off"
              autoCapitalize="characters"
              placeholder="Ej. XXXX000000XXXXXX00"
              className={cn(
                "w-full bg-zinc-50 border border-zinc-200 px-4 py-3 pr-24 rounded-xl text-base outline-none transition-all placeholder:text-zinc-400",
                "focus:border-black focus:ring-1 focus:ring-black",
                "font-mono uppercase",
                curpValidationError
                  ? "border-red-300 focus:border-red-500 focus:ring-red-500 bg-red-50"
                  : "",
              )}
              value={curp}
              onChange={(e) =>
                setCurp(
                  e.target.value
                    .toUpperCase()
                    .replace(/[^A-Z0-9]/g, "")
                    .slice(0, 18),
                )
              }
              maxLength={18}
              disabled={loading}
              aria-describedby={curpValidationError ? "curp-error" : undefined}
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <span
                className={cn(
                  "text-xs font-mono font-medium tabular-nums transition-colors",
                  curpCountColor,
                )}
                aria-label={`${curp.length} de 18 caracteres`}
              >
                {curp.length}/18
              </span>
              {curp.length > 0 && !loading && (
                <button
                  type="button"
                  onClick={() => setCurp("")}
                  className="p-1.5 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-200/50 rounded-lg transition-colors"
                  aria-label="Limpiar CURP"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
              <button
                type="button"
                onClick={handlePasteCurp}
                className="p-1.5 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-200/50 rounded-lg transition-colors"
                title="Pegar desde el portapapeles"
                aria-label="Pegar CURP desde portapapeles"
              >
                <ClipboardPaste className="w-4 h-4" />
              </button>
            </div>
          </div>
          {curpValidationError && (
            <p
              id="curp-error"
              className="text-xs text-red-600 font-medium"
              role="alert"
            >
              {curpValidationError}
            </p>
          )}
          <div className="flex items-center justify-between text-xs">
            <p className="text-zinc-500">
              ¿No recuerdas tu CURP?{" "}
              <a
                href="https://www.gob.mx/curp"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-zinc-900 transition-colors"
              >
                Consúltala en gob.mx
              </a>
            </p>
          </div>
        </div>

        {history.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-medium text-zinc-500">
              Búsquedas recientes:
            </p>
            <div className="flex flex-wrap gap-2">
              {history.map((h) => (
                <button
                  key={h}
                  type="button"
                  onClick={() => setCurp(h)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setCurp(h);
                    }
                  }}
                  className="text-xs font-mono px-2.5 py-1 bg-zinc-100/80 text-zinc-600 border border-zinc-200 rounded-lg hover:bg-zinc-200 hover:text-zinc-900 transition-colors"
                >
                  {h}
                </button>
              ))}
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={loading || !curpIsValid}
          className="w-full py-3.5 bg-black text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-zinc-800 disabled:opacity-50 disabled:hover:bg-black transition-colors"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Validando...</span>
            </>
          ) : (
            <>
              <span>Realizar Consulta</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      {(error || timedOut) && (
        <div
          className="mt-4 flex gap-3 text-sm text-red-600 bg-red-50 p-4 rounded-xl border border-red-100"
          role="alert"
          aria-live="polite"
        >
          <AlertCircle className="w-5 h-5 shrink-0" />
          <div>
            <p>
              {timedOut
                ? "La consulta excedió el tiempo límite. Intenta de nuevo."
                : error}
            </p>
            <button
              type="button"
              onClick={onRetry}
              className="mt-1 font-medium underline"
            >
              Reintentar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
