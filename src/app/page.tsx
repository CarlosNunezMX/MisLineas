"use client";

import {
  AlertCircle,
  ArrowRight,
  Building2,
  Check,
  CheckCircle2,
  Copy,
  ExternalLink,
  Eye,
  Github,
  History,
  Loader2,
  Lock,
  Menu,
  Phone,
  RotateCcw,
  Scale,
  Server,
  ShieldAlert,
  ShieldCheck,
  Signal,
  UserCheck,
  Wifi,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import type React from "react";
import { useCallback, useRef, useState } from "react";
import logo from "@/assets/logo.png";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Provider website map
// ---------------------------------------------------------------------------
const PROVIDER_WEBSITES: Record<string, string> = {
  "2y2x": "https://2y2x.tel",
  Abafon: "https://abafon.com",
  Abib: "https://abib.com.mx",
  Abix: "https://abix.mx",
  Addinteli: "https://addinteli.com.mx",
  AhorroCel: "https://ahorrocel.com",
  "AI Telecomm": "https://aitelecom.net",
  ALLCE: "https://allce.mx",
  "AT&T": "https://att.com.mx",
  Unefon: "https://att.com.mx",
  WIM: "https://att.com.mx",
  Bait: "https://bait.com.mx",
  "Beneleit Móvil": "https://beneleit.mx",
  Bestel: "https://bestel.com.mx",
  BienCel: "https://biencel.mx",
  Bigcel: "https://bigcel.mx",
  Bromovil: "https://bromovil.com",
  Cablecom: "https://cablecom.net.mx",
  CFE: "https://cfeinternet.mx",
  "Chedraui Móvil": "https://chedrauimovil.com",
  "Chip Macropay": "https://chipmacropay.mx",
  CoolMobile: "https://coolmobile.mx",
  Dalefon: "https://dalefon.mx",
  Dialo: "https://dialo.mx",
  "Diri Móvil": "https://diri.mx",
  Dua: "https://dua.mx",
  "ENI Networks": "https://eninetworks.com",
  "Fangio Mobile": "https://fangiomobile.com",
  "Fedego!": "https://fedego.mx",
  Fibracell: "https://fibracell.com.mx",
  "Flash Mobile": "https://flash-mobile.com.mx",
  "FRC Mobile": "https://frcmobile.com",
  Freedompop: "https://freedompop.mx",
  Gamers: "https://gameplanet.com.mx",
  Gane: "https://gane.com",
  "Glovo Telecom": "https://internetparaelbienestar.cc/bienestar",
  Gmovil: "https://gmovil.mx",
  "Grupo Inten": "https://intenmovil.com",
  Hashtag: "https://hashtagtechs.com/internetparaelbienestar",
  "I AM Abundance": "https://yosoybienestar.com",
  IENTC: "https://ientc.net",
  Interlinked: "https://interlinked.mx",
  Inxel: "https://inxel.mx",
  Iusatel: "https://iusatel.mx",
  Izzi: "https://izzi.mx",
  "Link Móvil": "https://linkteconectamos.com",
  "Kolors Mobile": "https://kolorsmobile.com.mx",
  Maifon: "https://maifon.mx",
  "Mega Móvil": "https://megamovil.mx",
  "México Móvil": "https://mexicomovil.shop",
  Mexfon: "https://planesmexfon.mx",
  "Mi Móvil": "https://mimovil.com.mx",
  Mirlo: "https://mirlo.com",
  MoBig: "https://mobig.mx",
  Mosi: "https://mosi.mx",
  MobileArionet: "https://mobilearionet.com.mx",
  Movired: "https://movired.mx",
  Nabi: "https://naby.mx",
  Netmas: "https://netmas.mx",
  Newww: "https://newww.mx",
  "Nextor Movil": "https://nextormovil.mx",
  "On-Link": "https://on-link.mx",
  OUI: "https://oui.com.mx",
  "Othisi Mobile": "https://othisimobile.com",
  Oxio: "https://oxiomobile.com",
  "OXXO CEL": "https://oxxocel.com",
  PilloFon: "https://pillofon.mx",
  Playcell: "https://playcell.mx",
  "Red Aguila": "https://redaguila.com.mx",
  "Red Blak": "https://rblak.com",
  "Red Dog": "https://reddog.si",
  "Red Potencia": "https://redpotencia.net",
  Redphone: "https://redphone.com.mx",
  Redicoppel: "https://redicoppel.com",
  Retemex: "https://retemex.mx",
  Rincel: "https://rincel.com.mx",
  Sfon: "https://sfon.mx",
  Sky: "https://sky.com.mx",
  Sorcel: "https://soriup.mx",
  Starline: "https://starlinemx.com",
  Telcel: "https://telcel.com",
  "Telefónica Luna": "https://milunaa.com",
  "Telefónica Movistar": "https://movistar.com.mx",
  Telgen: "https://telgen.mx",
  Telmovil: "https://telmovil.mx",
  "TIC-OMV": "https://red.tic-ac.org",
  Tokamóvil: "https://tokamovil.mx",
  Tuis: "https://tuis.com.mx",
  TurboCel: "https://turbocel.mx",
  Turbored: "https://turbored.com",
  "Uber Cel": "https://ubercel.com",
  Ultracel: "https://ultracel.com.mx",
  Vasanta: "https://vasanta.com.mx",
  "Viral Cel": "https://viralcel.com",
  "Virgin Mobile": "https://virginmobile.mx",
  VivaMX: "https://vivamx.com.mx",
  Weex: "https://weex.mx",
  Wiicel: "https://wiicel.com",
  "Wiki Katat": "https://wikikatat.mx",
  Wimotelecom: "https://wimotelecom.com",
  "Yo Mobile": "https://mx.yomobile.com",
  "Yobi Telecom": "https://yobitelecom.com",
  "Yu Movil": "https://yumovil.com.mx",
};

function getProviderWebsite(operadora: string): string | null {
  const key = Object.keys(PROVIDER_WEBSITES).find(
    (k) =>
      operadora.toLowerCase().includes(k.toLowerCase()) ||
      k.toLowerCase().includes(operadora.toLowerCase()),
  );
  return key ? PROVIDER_WEBSITES[key] : null;
}

// CURP real-time validation
const CURP_REGEX = /^[A-Z]{4}\d{6}[HM][A-Z]{5}[A-Z0-9]\d$/;

function getCurpValidationError(curp: string): string | null {
  if (curp.length === 0) return null;
  if (curp.length < 18) return null; // handled by counter
  if (!/^[A-Z]{4}/.test(curp))
    return "Los primeros 4 caracteres deben ser letras.";
  if (!/^[A-Z]{4}\d{6}/.test(curp))
    return "Los caracteres 5–10 deben ser la fecha de nacimiento (AAMMDD).";
  if (!/^[A-Z]{4}\d{6}[HMX]/.test(curp))
    return "El carácter 11 debe ser H (hombre), M (mujer) o X.";
  if (!CURP_REGEX.test(curp))
    return "Formato de CURP inválido. Verifica que los 18 caracteres sean correctos.";
  return null;
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface DisplayLine {
  id: string;
  operadora: string;
  numero: string;
  isPossible: boolean;
}

interface ProviderResult {
  company: string;
  lines: string[];
  isRegistered?: boolean;
  possibleProviders?: string[];
  error?: string;
}

interface ProviderResponse {
  provider: string;
  result: ProviderResult;
}

function transformApiResponse(responses: ProviderResponse[]): DisplayLine[] {
  const lines: DisplayLine[] = [];

  for (const { provider, result } of responses) {
    if (result.error) continue;
    if (
      !result.isRegistered &&
      (!result.lines || result.lines.length === 0) &&
      (!result.possibleProviders || result.possibleProviders.length === 0)
    )
      continue;

    for (const lineStr of result.lines ?? []) {
      const colonIdx = lineStr.indexOf(": ");
      const isAltanMVNO = result.company === "Altan MVNO" && colonIdx !== -1;
      const operadora = isAltanMVNO
        ? lineStr.slice(0, colonIdx)
        : result.company;
      const numero = isAltanMVNO ? lineStr.slice(colonIdx + 2) : lineStr;
      lines.push({
        id: `${provider}-confirmed-${lineStr}`,
        operadora,
        numero,
        isPossible: false,
      });
    }

    for (const posible of result.possibleProviders ?? []) {
      lines.push({
        id: `${provider}-possible-${posible}`,
        operadora: posible,
        numero: "Número no confirmado",
        isPossible: true,
      });
    }
  }

  return lines;
}

function getRiskLevel(lines: DisplayLine[]): {
  label: string;
  color: string;
  description: string;
} {
  const confirmed = lines.filter((l) => !l.isPossible).length;
  const possible = lines.filter((l) => l.isPossible).length;
  if (confirmed === 0 && possible === 0)
    return {
      label: "Sin Registro",
      color: "bg-slate-400",
      description: "Sin líneas vinculadas",
    };
  if (confirmed <= 2 && possible === 0)
    return {
      label: "Bajo",
      color: "bg-emerald-500",
      description: "Identidad protegida y consistente",
    };
  return {
    label: "Moderado",
    color: "bg-amber-500",
    description: "Revisar líneas detectadas",
  };
}

const KNOWN_PROVIDERS = [
  { name: "Telcel", icon: Signal },
  { name: "AT&T", icon: Wifi },
  { name: "+70 MVNOs (Red Altan)", icon: Building2 },
];

const WHY_CARDS = [
  {
    icon: Zap,
    title: "Un solo lugar",
    body: "Antes debías visitar múltiples sitios distintos. Hoy solo necesitas tu CURP.",
  },
  {
    icon: Scale,
    title: "Protección Federal",
    body: "Procesos bajo la Ley Federal de Telecomunicaciones. Orquestación efímera y segura.",
  },
  {
    icon: Eye,
    title: "Transparencia Total",
    body: "No somos una operadora ni vendemos planes. Solo devolvemos la información a su dueño: el ciudadano.",
  },
];

const QUERY_TIMEOUT_MS = 15000;

// ---------------------------------------------------------------------------
// Copy button component
// ---------------------------------------------------------------------------
function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(
    async (e: React.MouseEvent) => {
      e.stopPropagation();
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {}
    },
    [text],
  );

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? "Copiado" : `Copiar número ${text}`}
      className="p-2 rounded-xl hover:bg-slate-100 transition-colors shrink-0"
    >
      {copied ? (
        <Check className="w-4 h-4 text-emerald-500" aria-hidden="true" />
      ) : (
        <Copy className="w-4 h-4 text-slate-400" aria-hidden="true" />
      )}
    </button>
  );
}

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------
export default function MisLineas() {
  const [curp, setCurp] = useState("");
  const [loading, setLoading] = useState(false);
  const [timedOut, setTimedOut] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<DisplayLine[] | null>(null);
  const [rawResponses, setRawResponses] = useState<ProviderResponse[] | null>(
    null,
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [queryTime, setQueryTime] = useState<Date | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const curpValidationError = getCurpValidationError(curp);
  const curpIsValid = curp.length === 18 && !curpValidationError;

  const handleConsultar = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResults(null);
    setRawResponses(null);
    setTimedOut(false);
    setLoading(true);

    const controller = new AbortController();
    abortRef.current = controller;

    const timeoutId = setTimeout(() => {
      controller.abort();
      setTimedOut(true);
      setLoading(false);
    }, QUERY_TIMEOUT_MS);

    try {
      const response = await fetch("/api/lookup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ curp: curp.toUpperCase() }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.error || "Error en el servidor central.");

      const providerResponses = data as ProviderResponse[];
      setRawResponses(providerResponses);
      const transformed = transformApiResponse(providerResponses);
      setResults(transformed);
      setQueryTime(new Date());
    } catch (err: unknown) {
      clearTimeout(timeoutId);
      if ((err as Error)?.name === "AbortError") return;
      setError(
        err instanceof Error
          ? err.message
          : "Error de conexión. Verifica tu red.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    setTimedOut(false);
    setError(null);
  };

  const handleNuevaConsulta = () => {
    setResults(null);
    setRawResponses(null);
    setQueryTime(null);
    setCurp("");
    setError(null);
    setTimedOut(false);
  };

  const riskLevel = results ? getRiskLevel(results) : null;
  const hasNoLines = results !== null && results.length === 0;

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#1a1a1a] selection:bg-slate-900 selection:text-white font-sans">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-300 mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer">
            <Image
              src={logo}
              alt="MisLíneas"
              width={32}
              height={32}
              className="rounded-lg transition-transform group-hover:rotate-6"
            />
            <span className="font-bold text-lg tracking-tight">MisLíneas</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a
              href="#seguridad"
              className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              Seguridad
            </a>
            <a
              href="#arco"
              className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              Derechos ARCO
            </a>
            <a
              href="https://portal.crt.gob.mx/reporte-fallas-plataforma-registro"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-900 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-800 hover:shadow-lg hover:shadow-slate-200 transition-all active:scale-95 flex items-center gap-2"
            >
              <ShieldAlert className="w-4 h-4" />
              Reportar Fraude
            </a>
          </div>

          <button
            type="button"
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {isMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-100 px-6 py-8 space-y-6 overflow-hidden z-40 relative"
          >
            <div className="flex flex-col gap-6">
              <button
                type="button"
                onClick={() => {
                  setIsMenuOpen(false);
                  window.location.hash = "seguridad";
                }}
                className="text-lg font-semibold text-slate-700 text-left"
              >
                Seguridad
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsMenuOpen(false);
                  window.location.hash = "arco";
                }}
                className="text-lg font-semibold text-slate-700 text-left"
              >
                Derechos ARCO
              </button>
              <a
                href="https://portal.crt.gob.mx/reporte-fallas-plataforma-registro"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
                className="bg-slate-900 text-white w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2"
              >
                <ShieldAlert className="w-5 h-5" />
                Reportar Fraude
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="max-w-300 mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Hero + Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="lg:col-span-5 space-y-6 sm:space-y-8"
          >
            <div>
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.1] mb-5">
                El control de tu{" "}
                <span className="text-slate-400">identidad móvil</span> en un
                solo lugar.
              </h1>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-medium">
                Debido a la nueva regulación federal, es tu derecho y obligación
                conocer qué números están vinculados a tu nombre. Evita el robo
                de identidad y cargos no reconocidos.
              </p>
            </div>

            {/* Form Card */}
            <div className="bg-white border border-slate-200 rounded-4xl p-6 sm:p-8 shadow-2xl shadow-slate-100/60 ring-1 ring-slate-100">
              <form onSubmit={handleConsultar} className="space-y-5">
                <div className="space-y-2">
                  <label
                    htmlFor="curp-input"
                    className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1"
                  >
                    Ingresa tu CURP (18 caracteres)
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="curp-input"
                      autoComplete="off"
                      autoCapitalize="characters"
                      inputMode="text"
                      placeholder="Ej. XXXX000000XXXXXX00"
                      aria-label="CURP — Clave Única de Registro de Población, 18 caracteres"
                      aria-describedby={
                        curpValidationError ? "curp-error" : undefined
                      }
                      aria-invalid={curpValidationError ? "true" : undefined}
                      className={cn(
                        "w-full bg-slate-50 border-2 border-slate-100 px-5 py-4 sm:px-6 sm:py-5 rounded-2xl text-lg sm:text-xl outline-none transition-all duration-300",
                        "focus:border-slate-900 focus:bg-white focus:ring-8 focus:ring-slate-50",
                        "font-mono tracking-widest text-slate-900",
                        curpValidationError
                          ? "border-red-200 focus:border-red-300 focus:ring-red-50"
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
                    />
                    {curp.length > 0 && curp.length < 18 && (
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                        {curp.length}/18
                      </span>
                    )}
                    {curpIsValid && (
                      <span className="absolute right-4 top-1/2 -translate-y-1/2">
                        <CheckCircle2
                          className="w-5 h-5 text-emerald-500"
                          aria-hidden="true"
                        />
                      </span>
                    )}
                  </div>

                  {/* Inline CURP validation error */}
                  <AnimatePresence>
                    {curpValidationError && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-xs text-red-600 font-medium ml-1 overflow-hidden"
                        role="alert"
                      >
                        {curpValidationError}
                      </motion.p>
                    )}
                  </AnimatePresence>

                  {/* CURP lookup link */}
                  <p className="text-[11px] text-slate-400 font-medium ml-1">
                    ¿No recuerdas tu CURP?{" "}
                    <a
                      href="https://www.gob.mx/curp"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-600 underline underline-offset-2 hover:text-slate-900 transition-colors font-bold"
                    >
                      Consúltala en gob.mx
                    </a>
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading || !curpIsValid}
                  aria-disabled={loading || !curpIsValid}
                  aria-label={
                    !curpIsValid
                      ? "Ingresa un CURP válido de 18 caracteres para continuar"
                      : "Realizar consulta unificada"
                  }
                  className={cn(
                    "w-full py-4 sm:py-5 rounded-2xl font-bold text-base sm:text-lg transition-all duration-300 flex items-center justify-center gap-3",
                    "bg-slate-900 text-white hover:bg-slate-800 hover:shadow-xl hover:shadow-slate-200 active:scale-[0.98]",
                    "disabled:opacity-40 disabled:cursor-not-allowed",
                  )}
                >
                  {loading ? (
                    <div
                      className="flex items-center gap-3"
                      aria-live="polite"
                      aria-busy="true"
                    >
                      <Loader2
                        className="w-5 h-5 sm:w-6 sm:h-6 animate-spin"
                        aria-hidden="true"
                      />
                      <span>Validando identidad...</span>
                    </div>
                  ) : (
                    <>
                      <span>Realizar Consulta Unificada</span>
                      <ArrowRight className="w-5 h-5" aria-hidden="true" />
                    </>
                  )}
                </button>
              </form>

              <AnimatePresence>
                {(error || timedOut) && (
                  <motion.div
                    id="curp-error"
                    role="alert"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-5 overflow-hidden"
                  >
                    <div className="flex items-start gap-3 bg-red-50 text-red-700 p-4 rounded-xl border border-red-100">
                      <AlertCircle
                        className="w-5 h-5 shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <div className="flex-1 space-y-2">
                        <span className="text-sm font-medium leading-relaxed block">
                          {timedOut
                            ? "La consulta tardó demasiado. Verifica tu conexión e intenta de nuevo."
                            : error}
                        </span>
                        <button
                          type="button"
                          onClick={handleRetry}
                          className="text-sm font-bold text-red-700 underline underline-offset-2 hover:text-red-900 transition-colors"
                        >
                          Intentar de nuevo
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Identity Protocol Notice */}
            <div className="p-5 bg-amber-50 border border-amber-100 rounded-2xl">
              <div className="flex gap-3">
                <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center shrink-0 mt-0.5">
                  <ShieldAlert
                    className="w-4 h-4 text-amber-700"
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-amber-800 uppercase tracking-widest block mb-1">
                    Protocolo de Identidad Digital
                  </span>
                  <p className="text-xs text-amber-900/70 leading-relaxed">
                    Plataforma ciudadana independiente. No estamos afiliados al
                    Gobierno de México. Este servicio automatiza la verificación
                    de registros públicos para facilitar el ejercicio de tus
                    derechos digitales.
                  </p>
                </div>
              </div>
            </div>

            {/* Authors — visible on desktop left column */}
            <div className="hidden lg:flex flex-col gap-3">
              <AuthorCard
                name="Jorge Mora"
                github="moraxh"
                href="https://github.com/moraxh"
                delay={0.2}
              />
              <AuthorCard
                name="Hadassah García"
                github="HadassahGarcia"
                href="https://github.com/HadassahGarcia"
                delay={0.3}
              />
            </div>
          </motion.div>

          {/* Right Column: Dashboard */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
            className="lg:col-span-7"
          >
            <AnimatePresence mode="wait">
              {!results && !loading && !timedOut ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-full min-h-100 border-2 border-dashed border-slate-200 rounded-[3rem] flex flex-col p-8 sm:p-10"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100">
                      <History
                        className="w-5 h-5 text-slate-300"
                        aria-hidden="true"
                      />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-800">
                        Listo para verificar
                      </h3>
                      <p className="text-slate-600 text-xs">
                        Ingresa tu CURP para iniciar el escaneo
                      </p>
                    </div>
                  </div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">
                    Operadoras consultadas
                  </p>
                  <div className="space-y-2">
                    {KNOWN_PROVIDERS.map((p) => (
                      <div
                        key={p.name}
                        className="flex items-center justify-between px-4 py-3 bg-slate-50 rounded-2xl border border-slate-100"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center">
                            <p.icon
                              className="w-3.5 h-3.5 text-slate-500"
                              aria-hidden="true"
                            />
                          </div>
                          <span className="text-sm font-semibold text-slate-700">
                            {p.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                            En espera
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ) : loading ? (
                <motion.output
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  aria-live="polite"
                  aria-label="Consultando operadoras, por favor espera"
                  className="h-full min-h-100 bg-slate-50/50 rounded-[3rem] p-8 sm:p-12 flex flex-col items-center justify-center space-y-10"
                >
                  <div className="relative">
                    <div
                      className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-slate-100 border-t-slate-900 animate-spin"
                      aria-hidden="true"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Server
                        className="w-9 h-9 sm:w-10 sm:h-10 text-slate-300"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                  <div className="text-center space-y-3">
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                      Validando identidad
                    </h3>
                    <div className="flex flex-col gap-2">
                      {[
                        "Consultando Telcel...",
                        "Verificando AT&T...",
                        "Escaneando +70 MVNOs (Red Altan)...",
                      ].map((text) => (
                        <div
                          key={text}
                          className="flex items-center justify-center gap-2 text-xs font-bold text-slate-400 tracking-widest uppercase"
                        >
                          <Loader2
                            className="w-3 h-3 animate-spin"
                            aria-hidden="true"
                          />
                          {text}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.output>
              ) : hasNoLines ? (
                <motion.div
                  key="no-lines"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="h-full min-h-100 border-2 border-dashed border-slate-200 rounded-[3rem] flex flex-col items-center justify-center p-8 sm:p-12 text-center gap-5"
                >
                  <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center">
                    <ShieldCheck
                      className="w-8 h-8 text-slate-400"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold text-slate-800 mb-2">
                      Sin líneas detectadas
                    </h3>
                    <p className="text-sm text-slate-500 font-medium max-w-xs leading-relaxed">
                      No se encontraron líneas activas vinculadas a esta CURP en
                      ninguna de las operadoras consultadas.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleNuevaConsulta}
                    className="flex items-center gap-2 text-sm font-bold text-slate-600 underline underline-offset-2 hover:text-slate-900 transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" aria-hidden="true" />
                    Nueva consulta
                  </button>
                </motion.div>
              ) : results ? (
                <motion.section
                  key="results"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  aria-live="polite"
                  aria-label="Resultados de la consulta"
                  className="space-y-5"
                >
                  {/* Results Header */}
                  <div className="bg-slate-900 text-white p-8 sm:p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
                    <div className="relative z-10 flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
                      <div className="space-y-2">
                        <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-[0.35em]">
                          Resumen de Identidad
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
                          {results.length}{" "}
                          {results.length === 1
                            ? "Línea Detectada"
                            : "Líneas Detectadas"}
                        </h2>
                        <div className="flex items-center gap-2 text-slate-300 font-mono text-xs font-medium">
                          <UserCheck
                            className="w-4 h-4 text-emerald-400"
                            aria-hidden="true"
                          />
                          <span className="truncate max-w-65">
                            Identidad validada: {curp}
                          </span>
                        </div>
                      </div>
                      {/* Nueva consulta button in results header */}
                      <button
                        type="button"
                        onClick={handleNuevaConsulta}
                        className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors shrink-0"
                      >
                        <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                        Nueva consulta
                      </button>
                    </div>
                    <div
                      className="text-[10rem] sm:text-[22rem] font-black text-white/3 absolute -right-4 -bottom-4 translate-y-1/4 select-none leading-none"
                      aria-hidden="true"
                    >
                      MEX
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    <div className="bg-white border border-slate-200 p-5 sm:p-6 rounded-3xl hover:border-slate-400 transition-colors shadow-sm">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                          Estatus
                        </span>
                        <div
                          className={cn(
                            "w-2.5 h-2.5 rounded-full shadow-lg",
                            riskLevel?.color ?? "bg-slate-400",
                          )}
                          aria-hidden="true"
                        />
                      </div>
                      <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                        {riskLevel?.label ?? "Sin Registro"}
                      </p>
                      <p className="text-[11px] text-slate-500 mt-1 font-medium leading-tight">
                        {riskLevel?.description}
                      </p>
                    </div>
                    <div className="bg-white border border-slate-200 p-5 sm:p-6 rounded-3xl hover:border-slate-400 transition-colors shadow-sm">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-3">
                        Consulta realizada
                      </span>
                      <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                        {queryTime
                          ? queryTime.toLocaleTimeString("es-MX", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : "—"}
                      </p>
                      <p className="text-[11px] text-slate-500 mt-1 font-medium">
                        {queryTime
                          ? queryTime.toLocaleDateString("es-MX", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })
                          : ""}
                      </p>
                    </div>
                  </div>

                  {/* Lines list */}
                  <div className="relative">
                    <div className="max-h-125 overflow-y-auto space-y-3 pr-1 scroll-smooth">
                      {results.map((linea, idx) => {
                        const website = !linea.isPossible
                          ? getProviderWebsite(linea.operadora)
                          : null;
                        return (
                          <motion.div
                            key={linea.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.08 }}
                            className="group bg-white border border-slate-100 p-5 sm:p-6 rounded-4xl hover:border-slate-300 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6"
                          >
                            <div className="flex items-center gap-4 sm:gap-5 flex-1 min-w-0">
                              <div className="w-14 h-14 shrink-0 rounded-[1.25rem] bg-slate-50 flex items-center justify-center border border-slate-200 transition-all duration-300 group-hover:bg-slate-900 group-hover:border-slate-900">
                                <Phone
                                  className="w-6 h-6 text-slate-400 group-hover:text-white transition-colors"
                                  aria-hidden="true"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1 flex-wrap">
                                  <span className="text-lg font-extrabold text-slate-900 tracking-tight">
                                    {linea.operadora}
                                  </span>
                                  {linea.isPossible ? (
                                    <span className="bg-amber-50 text-amber-700 text-[10px] font-bold px-3 py-0.5 rounded-full border border-amber-100 uppercase tracking-widest">
                                      Posible
                                    </span>
                                  ) : (
                                    <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-3 py-0.5 rounded-full border border-emerald-100 uppercase tracking-widest">
                                      Registrado
                                    </span>
                                  )}
                                </div>
                                <div
                                  className={cn(
                                    "font-mono font-bold tracking-tighter",
                                    linea.numero === "Número no confirmado"
                                      ? "text-sm text-slate-400 italic"
                                      : "text-xl text-slate-800",
                                  )}
                                >
                                  {linea.numero}
                                </div>
                                {linea.isPossible && (
                                  <p className="text-xs text-amber-600 font-medium mt-1">
                                    Operadora posible — número no confirmado
                                  </p>
                                )}
                              </div>
                            </div>

                            {/* Actions: copy + website link */}
                            <div className="flex items-center gap-1 shrink-0">
                              {!linea.isPossible &&
                                linea.numero !== "Número no confirmado" && (
                                  <CopyButton text={linea.numero} />
                                )}
                              {website && (
                                <a
                                  href={website}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  aria-label={`Sitio oficial de ${linea.operadora}`}
                                  className="p-2 rounded-xl hover:bg-slate-100 transition-colors"
                                >
                                  <ExternalLink
                                    className="w-4 h-4 text-slate-400"
                                    aria-hidden="true"
                                  />
                                </a>
                              )}
                            </div>
                          </motion.div>
                        );
                      })}

                      {/* Providers with no lines */}
                      {rawResponses &&
                        (() => {
                          const noMatch = rawResponses.filter(
                            (r) =>
                              !r.result.error &&
                              (r.result.lines?.length ?? 0) === 0 &&
                              (r.result.possibleProviders?.length ?? 0) === 0,
                          );
                          if (noMatch.length === 0) return null;
                          return (
                            <>
                              <div
                                className="flex items-center gap-3 pt-2"
                                aria-hidden="true"
                              >
                                <div className="flex-1 h-px bg-slate-100" />
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">
                                  Sin registro
                                </span>
                                <div className="flex-1 h-px bg-slate-100" />
                              </div>
                              {noMatch.map((r) => (
                                <div
                                  key={r.provider}
                                  className="flex items-center justify-between bg-slate-50 border border-slate-100 px-5 py-4 rounded-2xl"
                                >
                                  <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center">
                                      <Phone
                                        className="w-4 h-4 text-slate-300"
                                        aria-hidden="true"
                                      />
                                    </div>
                                    <span className="text-sm font-semibold text-slate-500">
                                      {r.result.company}
                                    </span>
                                  </div>
                                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                    No registrado
                                  </span>
                                </div>
                              ))}
                            </>
                          );
                        })()}
                    </div>
                    {/* Scroll fade indicator */}
                    <div
                      className="pointer-events-none absolute bottom-0 left-0 right-0 h-12 bg-linear-to-t from-[#FAFAFA] to-transparent rounded-b-4xl"
                      aria-hidden="true"
                    />
                  </div>
                </motion.section>
              ) : null}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Authors on mobile */}
        <div className="lg:hidden mt-8 flex flex-col gap-3">
          <AuthorCard
            name="Jorge Mora"
            github="moraxh"
            href="https://github.com/moraxh"
            delay={0.2}
          />
          <AuthorCard
            name="Hadassah García"
            github="HadassahGarcia"
            href="https://github.com/HadassahGarcia"
            delay={0.3}
          />
        </div>

        {/* Sections */}
        <div className="mt-24 sm:mt-40 space-y-24 sm:space-y-32">
          {/* Why cards */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="mb-10">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 mb-3">
                ¿Por qué usar MisLíneas?
              </h2>
              <p className="text-slate-500 text-base sm:text-lg font-medium max-w-xl">
                Centralizamos la fragmentación del ecosistema móvil mexicano.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {WHY_CARDS.map((card, i) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white border border-slate-200 rounded-3xl p-7 hover:border-slate-400 hover:shadow-lg hover:shadow-slate-100 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center mb-5 group-hover:bg-slate-900 transition-colors">
                    <card.icon
                      className="w-5 h-5 text-slate-600 group-hover:text-white transition-colors"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-lg mb-2 tracking-tight">
                    {card.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed font-medium">
                    {card.body}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Seguridad */}
          <motion.section
            id="seguridad"
            className="scroll-mt-24"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16 items-center">
              <div>
                <div className="w-11 h-11 rounded-2xl bg-slate-900 flex items-center justify-center mb-6">
                  <Lock className="w-5 h-5 text-white" aria-hidden="true" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-5">
                  Seguridad y Cifrado Efímero
                </h2>
                <p className="text-slate-600 leading-relaxed mb-6 font-medium text-sm sm:text-base">
                  Nuestra arquitectura está diseñada bajo el principio de{" "}
                  <span className="text-slate-900 font-bold italic underline decoration-slate-300 underline-offset-4">
                    Zero-Knowledge
                  </span>
                  . No contamos con una base de datos de usuarios; cada consulta
                  orquesta conexiones cifradas de punto a punto con los
                  registros oficiales de las operadoras.
                </p>
                <ul
                  className="space-y-3 font-medium"
                  aria-label="Características de seguridad"
                >
                  {[
                    "Cifrado AES-256 para el tráfico de datos.",
                    "Destrucción automática de la sesión al finalizar.",
                    "No almacenamos CURPs ni números telefónicos.",
                    "Cumplimiento con estándares internacionales de privacidad.",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm text-slate-700"
                    >
                      <CheckCircle2
                        className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-slate-900 rounded-[3rem] p-6 sm:p-8 flex flex-col gap-4 shadow-2xl shadow-slate-200">
                <div className="p-5 sm:p-6 bg-slate-800 rounded-2xl border border-slate-700">
                  <div className="flex gap-2 mb-4" aria-hidden="true">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/70" />
                  </div>
                  <div className="space-y-2" aria-hidden="true">
                    <div className="h-3 bg-slate-700 rounded-full w-3/4 animate-pulse" />
                    <div className="h-3 bg-slate-700 rounded-full w-1/2 animate-pulse" />
                    <div className="h-3 bg-slate-700 rounded-full w-5/6 animate-pulse" />
                  </div>
                  <div className="text-[10px] text-emerald-400 font-mono mt-5 uppercase tracking-widest">
                    ▶ Encrypted_Tunnel_Active
                  </div>
                </div>

                <div className="p-6 sm:p-8 border-2 border-dashed border-slate-600 rounded-2xl flex flex-col items-center justify-center py-10 sm:py-14 gap-3">
                  <ShieldCheck
                    className="w-12 h-12 text-emerald-400"
                    aria-hidden="true"
                  />
                  <span className="text-[11px] font-bold text-slate-300 uppercase tracking-widest">
                    End-to-End Encryption
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {[
                    { val: "AES-256", lbl: "Cifrado" },
                    { val: "0", lbl: "Datos guardados" },
                    { val: "100%", lbl: "Efímero" },
                  ].map((s) => (
                    <div
                      key={s.val}
                      className="bg-slate-800 rounded-2xl p-4 text-center border border-slate-700"
                    >
                      <div className="text-white font-extrabold text-sm sm:text-base">
                        {s.val}
                      </div>
                      <div className="text-slate-400 text-[10px] font-medium mt-1 leading-tight">
                        {s.lbl}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>

          {/* Derechos ARCO */}
          <motion.section
            id="arco"
            className="scroll-mt-24"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="bg-slate-900 rounded-[3rem] sm:rounded-[3.5rem] p-8 sm:p-12 text-white overflow-hidden relative shadow-2xl shadow-slate-200">
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 items-start">
                <div>
                  <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-5 underline decoration-slate-700 underline-offset-8">
                    Derechos ARCO
                  </h2>
                  <p className="text-slate-400 text-base sm:text-lg leading-relaxed mb-8 font-medium">
                    La protección de datos personales es un derecho
                    constitucional (Art. 16 CPEUM) desarrollado por la LFPDPPP.
                    Puedes ejercer derechos ARCO ante cualquier empresa que
                    trate tus datos para exigir acceso, corrección o eliminación
                    de información personal.
                  </p>
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    {[
                      { t: "Acceso", d: "Conoce qué datos tienen sobre ti." },
                      {
                        t: "Rectificación",
                        d: "Corrige información inexacta.",
                      },
                      { t: "Cancelación", d: "Elimina datos innecesarios." },
                      { t: "Oposición", d: "Niégate al uso de tus datos." },
                    ].map((arco) => (
                      <div
                        key={arco.t}
                        className="bg-white/5 border border-white/10 p-4 sm:p-5 rounded-2xl hover:bg-white/10 transition-colors"
                      >
                        <div className="font-bold text-base sm:text-lg mb-1">
                          {arco.t}
                        </div>
                        <div className="text-xs text-slate-400 leading-tight font-medium">
                          {arco.d}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-6 sm:p-8 bg-white/5 border border-white/10 rounded-3xl flex items-start gap-4">
                    <ShieldAlert
                      className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <div>
                      <h4 className="font-bold text-base sm:text-lg mb-2">
                        ¿Detectaste una línea que no es tuya?
                      </h4>
                      <p className="text-sm text-slate-400 leading-relaxed font-medium">
                        Presenta una denuncia directamente ante la operadora y,
                        si es necesario, ante el IFT o autoridades competentes.
                        Ellos evaluarán la suspensión conforme a la normativa
                        aplicable. ARCO aplica sobre tus datos personales, no
                        sobre servicios de terceros.
                      </p>
                    </div>
                  </div>
                  <a
                    href="https://portal.crt.gob.mx/reporte-fallas-plataforma-registro"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-6 sm:p-8 bg-red-500/10 border border-red-500/20 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:bg-red-500/20 transition-all"
                  >
                    <span className="font-bold text-red-400 text-base sm:text-lg">
                      ¿Detectaste fraude o línea no autorizada?
                    </span>
                    <div className="bg-white text-slate-900 px-6 py-3 rounded-2xl text-sm font-bold hover:bg-red-400 hover:text-white transition-all shadow-lg active:scale-95 shrink-0 flex items-center gap-2">
                      <ShieldAlert className="w-4 h-4" aria-hidden="true" />
                      Reportar Fraude
                    </div>
                  </a>
                </div>
              </div>
              <div
                className="absolute -bottom-20 -right-20 opacity-[0.03] select-none text-[22rem] font-black leading-none"
                aria-hidden="true"
              >
                IFT
              </div>
            </div>
          </motion.section>
        </div>

        {/* Footer */}
        <footer className="mt-24 sm:mt-40 pt-12 border-t border-slate-100">
          <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
            <div className="flex items-center gap-2">
              <Image
                src={logo}
                alt="MisLíneas"
                width={28}
                height={28}
                className="rounded-lg"
              />
              <span className="font-bold text-slate-900">MisLíneas</span>
            </div>
            <p className="text-xs text-slate-400 font-medium tracking-widest uppercase text-center sm:text-right">
              Plataforma ciudadana independiente · México 2026
            </p>
          </div>
          <div className="mt-8 pb-8 text-center">
            <p className="text-[10px] text-slate-500 font-medium tracking-widest uppercase">
              No afiliado al Gobierno de México
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}

interface AuthorCardProps {
  name: string;
  github: string;
  href: string;
  delay?: number;
}

function AuthorCard({ name, github, href, delay = 0 }: AuthorCardProps) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${name} — github.com/${github}`}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="group flex items-center gap-4 p-5 bg-slate-900 text-white rounded-2xl hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 cursor-pointer"
    >
      <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center shrink-0 group-hover:bg-white/20 transition-colors">
        <Github className="w-5 h-5 text-white" aria-hidden="true" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">
          {github === "moraxh" ? "Autor del proyecto" : "Autora del proyecto"}
        </div>
        <div className="font-extrabold text-base tracking-tight truncate">
          {name}
        </div>
        <div className="text-xs text-slate-400 font-medium">
          github.com/{github}
        </div>
      </div>
      <ExternalLink
        className="w-4 h-4 text-slate-500 group-hover:text-slate-300 transition-colors shrink-0"
        aria-hidden="true"
      />
    </motion.a>
  );
}
