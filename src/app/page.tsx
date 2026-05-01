"use client";

import {
  AlertCircle,
  ArrowRight,
  Building2,
  Check,
  CheckCircle2,
  ClipboardPaste,
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
  Search,
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
import { useCallback, useEffect, useRef, useState } from "react";
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
  isPossible?: boolean;
  isNotFound?: boolean;
  isError?: boolean;
}

interface ProviderResult {
  company: string;
  lines: string[];
  isRegistered?: boolean;
  possibleProviders?: string[];
  notFoundProviders?: string[];
  error?: string;
}

interface ProviderResponse {
  provider: string;
  result: ProviderResult;
}

function transformApiResponse(responses: ProviderResponse[]): DisplayLine[] {
  const lines: DisplayLine[] = [];

  for (const { provider, result } of responses) {
    if (result.error) {
      if (result.possibleProviders && result.possibleProviders.length > 0) {
        for (const posible of result.possibleProviders) {
          lines.push({
            id: `${provider}-error-${posible}`,
            operadora: posible,
            numero: "Error al consultar",
            isError: true,
          });
        }
      } else {
        lines.push({
          id: `${provider}-error`,
          operadora: provider,
          numero: "Error al consultar",
          isError: true,
        });
      }
      continue;
    }

    const hasLines = result.lines && result.lines.length > 0;
    const hasPossible =
      result.isRegistered &&
      result.possibleProviders &&
      result.possibleProviders.length > 0;
    const isRegisteredWithoutLinesOrPossible =
      result.isRegistered && !hasLines && !(result.possibleProviders && result.possibleProviders.length > 0);

    if (!hasLines && !hasPossible && !isRegisteredWithoutLinesOrPossible) {
      if (result.possibleProviders && result.possibleProviders.length > 0) {
        for (const posible of result.possibleProviders) {
          lines.push({
            id: `${provider}-notfound-${posible}`,
            operadora: posible,
            numero: "Sin registro",
            isNotFound: true,
          });
        }
      } else {
        lines.push({
          id: `${provider}-notfound`,
          operadora: provider,
          numero: "Sin registro",
          isNotFound: true,
        });
      }
      continue;
    }

    for (const lineStr of result.lines ?? []) {
      const colonIdx = lineStr.indexOf(": ");
      const isAltanMVNO = result.company === "Red Altan (MVNOs)" && colonIdx !== -1;
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

    if (result.isRegistered) {
      if (result.possibleProviders && result.possibleProviders.length > 0) {
        for (const posible of result.possibleProviders) {
          lines.push({
            id: `${provider}-possible-${posible}`,
            operadora: posible,
            numero: "Número no confirmado",
            isPossible: true,
          });
        }
      } else if (!hasLines) {
        lines.push({
          id: `${provider}-hidden`,
          operadora: result.company || provider,
          numero: "Número oculto",
          isPossible: false,
        });
      }
    }

    for (const notFound of result.notFoundProviders ?? []) {
      lines.push({
        id: `${provider}-notfound-${notFound}`,
        operadora: notFound,
        numero: "Sin registro",
        isNotFound: true,
      });
    }
  }

  // Sort: confirmed lines first, then possible, then not found, then errors
  lines.sort((a, b) => {
    const aScore = a.isError ? 3 : a.isNotFound ? 2 : a.isPossible ? 1 : 0;
    const bScore = b.isError ? 3 : b.isNotFound ? 2 : b.isPossible ? 1 : 0;
    if (aScore !== bScore) return aScore - bScore;
    return a.operadora.localeCompare(b.operadora);
  });

  return lines;
}

function getRiskLevel(lines: DisplayLine[]): {
  label: string;
  color: string;
  description: string;
} {
  const confirmed = lines.filter(
    (l) => !l.isPossible && !l.isNotFound && !l.isError,
  ).length;
  const possible = lines.filter(
    (l) => l.isPossible && !l.isNotFound && !l.isError,
  ).length;
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
  { name: "+80 MVNOs (Red Altan)", icon: Building2 },
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
  const [, setRawResponses] = useState<ProviderResponse[] | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [queryTime, setQueryTime] = useState<Date | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    try {
      const storedHistory = localStorage.getItem("curp_history");
      if (storedHistory) {
        setHistory(JSON.parse(storedHistory));
      }
    } catch {}
  }, []);

  const saveToHistory = (newCurp: string) => {
    setHistory((prev) => {
      const updated = [newCurp, ...prev.filter((c) => c !== newCurp)].slice(
        0,
        5,
      );
      try {
        localStorage.setItem("curp_history", JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const curpValidationError = getCurpValidationError(curp);
  const curpIsValid = curp.length === 18 && !curpValidationError;

  const handlePasteCurp = async () => {
    try {
      const text = await navigator.clipboard.readText();
      const sanitized = text
        .toUpperCase()
        .replace(/[^A-Z0-9]/g, "")
        .slice(0, 18);
      if (sanitized) {
        setCurp(sanitized);
      }
    } catch {
      // Ignore if clipboard access fails or is denied
    }
  };

  const handleConsultar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!curpIsValid) return;

    setError(null);
    setResults([]); // Array vacío para inicio de stream
    setRawResponses([]);
    setSearchQuery("");
    setTimedOut(false);
    setLoading(true);
    setQueryTime(null);

    const controller = new AbortController();
    abortRef.current = controller;

    // Ampliamos el timeout global porque el streaming toma su tiempo dependiendo de la API más lenta
    const timeoutId = setTimeout(() => {
      controller.abort();
      setTimedOut(true);
      setLoading(false);
    }, QUERY_TIMEOUT_MS * 2);

    try {
      saveToHistory(curp);
      const response = await fetch("/api/lookup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ curp: curp.toUpperCase() }),
        signal: controller.signal,
      });

      if (!response.body) throw new Error("No body in response");

      setQueryTime(new Date());

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      const accumulatedResponses: ProviderResponse[] = [];

      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const parts = buffer.split("\n");
        // El último elemento podría estar incompleto, así que lo guardamos en el buffer
        buffer = parts.pop() || "";

        for (const line of parts) {
          if (!line.trim()) continue;
          try {
            const parsed = JSON.parse(line) as ProviderResponse;
            accumulatedResponses.push(parsed);
          } catch (e) {
            console.error("Error parsing NDJSON chunk", line, e);
          }
        }

        // Actualizamos estado en tiempo real
        setRawResponses([...accumulatedResponses]);
        setResults(transformApiResponse([...accumulatedResponses]));
      }

      clearTimeout(timeoutId);
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
    setSearchQuery("");
    setError(null);
    setTimedOut(false);
  };

  const riskLevel = results ? getRiskLevel(results) : null;
  const detectedCount = results
    ? results.filter((l) => !l.isNotFound && !l.isError).length
    : 0;

  const filteredResults = results
    ? results.filter((l) => {
        if (!searchQuery) return true;
        const q = searchQuery.toLowerCase();
        return (
          l.operadora.toLowerCase().includes(q) ||
          l.numero.toLowerCase().includes(q)
        );
      })
    : [];
  // hasNoLines is no longer needed since we want to show what was searched even if 0 lines found

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 selection:bg-zinc-900 selection:text-white font-sans">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer">
            <Image
              src={logo}
              alt="MisLíneas"
              width={28}
              height={28}
              className="rounded-md transition-transform group-hover:scale-105"
            />
            <span className="font-semibold text-lg tracking-tight">
              MisLíneas
            </span>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <a
              href="#seguridad"
              className="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors"
            >
              Seguridad
            </a>
            <a
              href="#arco"
              className="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors"
            >
              Derechos ARCO
            </a>
            <a
              href="https://portal.crt.gob.mx/reporte-fallas-plataforma-registro"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-zinc-800 transition-all flex items-center gap-2"
            >
              <ShieldAlert className="w-4 h-4" />
              Reportar Fraude
            </a>
          </div>

          <button
            type="button"
            className="md:hidden p-2 text-zinc-600 hover:bg-zinc-100 rounded-md transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
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
            className="md:hidden bg-white border-b border-zinc-200 px-4 py-6 space-y-4 overflow-hidden z-40 relative"
          >
            <button
              type="button"
              onClick={() => {
                setIsMenuOpen(false);
                window.location.hash = "seguridad";
              }}
              className="block w-full text-left font-medium text-zinc-700"
            >
              Seguridad
            </button>
            <button
              type="button"
              onClick={() => {
                setIsMenuOpen(false);
                window.location.hash = "arco";
              }}
              className="block w-full text-left font-medium text-zinc-700"
            >
              Derechos ARCO
            </button>
            <a
              href="https://portal.crt.gob.mx/reporte-fallas-plataforma-registro"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMenuOpen(false)}
              className="bg-black text-white w-full py-3 rounded-lg font-medium flex items-center justify-center gap-2"
            >
              <ShieldAlert className="w-4 h-4" />
              Reportar Fraude
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          {/* Left Column */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 leading-tight">
                El control de tu{" "}
                <span className="text-zinc-500">identidad móvil</span>{" "}
                centralizado.
              </h1>
              <p className="text-zinc-600 leading-relaxed">
                Debido a la nueva regulación federal, es tu derecho y obligación
                conocer qué números están vinculados a tu nombre. Evita cargos o
                suplantación de identidad.
              </p>
            </div>

            {/* Form */}
            <div className="bg-white border border-zinc-200 shadow-sm rounded-2xl p-6">
              <form onSubmit={handleConsultar} className="space-y-5">
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
                        "w-full bg-zinc-50 border border-zinc-200 px-4 py-3 rounded-xl text-base outline-none transition-all placeholder:text-zinc-400",
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
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                      {curpIsValid && (
                        <span className="px-1">
                          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={handlePasteCurp}
                        className="p-1.5 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-200/50 rounded-lg transition-colors"
                        title="Pegar desde el portapapeles"
                      >
                        <ClipboardPaste className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  {curpValidationError && (
                    <p className="text-xs text-red-600 font-medium">
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
                      {history.map((h, i) => (
                        <button
                          key={h}
                          type="button"
                          onClick={() => setCurp(h)}
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

              {/* Errors */}
              {(error || timedOut) && (
                <div className="mt-4 flex gap-3 text-sm text-red-600 bg-red-50 p-4 rounded-xl border border-red-100">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <div>
                    <p>
                      {timedOut
                        ? "La consulta excedió el tiempo límite. Intenta de nuevo."
                        : error}
                    </p>
                    <button
                      type="button"
                      onClick={handleRetry}
                      className="mt-1 font-medium underline"
                    >
                      Reintentar
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Notices */}
            <div className="grid gap-4">
              <div className="bg-amber-50 text-amber-900 text-sm p-4 rounded-xl border border-amber-100 flex gap-3">
                <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0" />
                <p>
                  <strong>Protocolo de Identidad Digital:</strong> Plataforma
                  ciudadana sin afiliación al Gobierno. Automatizamos la
                  verificación pública para facilitar este derecho.
                </p>
              </div>
              <div className="bg-zinc-100 text-zinc-600 text-sm p-4 rounded-xl border border-zinc-200 flex gap-3">
                <Server className="w-5 h-5 text-zinc-400 shrink-0" />
                <p>
                  <strong>Aviso de investigación:</strong> Formatos de respuesta
                  se documentan (sin datos personales) para mapear APIs públicas
                  y mejorar nuestra cobertura de código abierto.
                </p>
              </div>
            </div>

            {/* Authors */}
            <div className="hidden lg:flex items-center gap-1 text-sm text-zinc-400">
              <span>Hecho por</span>
              <a
                href="https://github.com/moraxh"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-zinc-700 hover:text-zinc-900 transition-colors underline underline-offset-2 decoration-zinc-300 hover:decoration-zinc-500"
              >
                Jorge Mora
              </a>
              <span>&amp;</span>
              <a
                href="https://github.com/HadassahGarcia"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-zinc-700 hover:text-zinc-900 transition-colors underline underline-offset-2 decoration-zinc-300 hover:decoration-zinc-500"
              >
                Hadassah Garcia
              </a>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {!results && !loading && !timedOut ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-full min-h-[400px] border border-dashed border-zinc-300 bg-zinc-50/50 rounded-2xl flex flex-col p-8 justify-center items-center text-center"
                >
                  <div className="w-12 h-12 bg-white rounded-full border border-zinc-200 flex items-center justify-center justify-center mb-4 shadow-sm">
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
              ) : results ? (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  {/* Results Header */}
                  <div className="bg-white border border-zinc-200 shadow-sm rounded-2xl p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
                      <div>
                        <div className="flex items-center gap-3">
                          <h2 className="text-2xl font-bold text-zinc-900">
                            {detectedCount}{" "}
                            {detectedCount === 1
                              ? "Línea detectada"
                              : "Líneas detectadas"}
                          </h2>
                          {loading && (
                            <span className="flex items-center justify-center bg-zinc-100 text-zinc-500 rounded-full px-3 py-1 text-xs font-medium gap-1.5 animate-pulse border border-zinc-200">
                              <Loader2 className="w-3 h-3 animate-spin text-zinc-400" />{" "}
                              Consultando
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-2 text-zinc-600 text-sm font-mono bg-zinc-50 px-3 py-1.5 rounded-lg border border-zinc-200 w-fit">
                          <UserCheck className="w-4 h-4" />
                          <span>{curp}</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={handleNuevaConsulta}
                        className="text-sm font-medium text-zinc-500 hover:text-black flex items-center gap-1.5 transition-colors"
                      >
                        <RotateCcw className="w-4 h-4" /> Nueva consulta
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-zinc-50 border border-zinc-200 p-4 rounded-xl flex items-center justify-between">
                        <div>
                          <p className="text-xs text-zinc-500 font-medium mb-1">
                            Estatus de riesgo
                          </p>
                          <p className="text-base font-bold text-zinc-900">
                            {riskLevel?.label}
                          </p>
                        </div>
                        <div
                          className={cn(
                            "w-3 h-3 rounded-full",
                            riskLevel?.color,
                          )}
                        />
                      </div>
                      <div className="bg-zinc-50 border border-zinc-200 p-4 rounded-xl">
                        <p className="text-xs text-zinc-500 font-medium mb-1">
                          Hora de consulta
                        </p>
                        <p className="text-base font-bold text-zinc-900">
                          {queryTime?.toLocaleTimeString("es-MX", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Search Bar */}
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
                      {filteredResults.length} de {results.length} resultados
                    </span>
                  </div>

                  {/* List of lines */}
                  <div className="space-y-3 max-h-[650px] overflow-y-auto pr-2 custom-scrollbar">
                    {filteredResults.length === 0 ? (
                      <div className="bg-white border border-zinc-200 p-8 rounded-2xl flex flex-col items-center justify-center text-center shadow-sm">
                        <Search className="w-8 h-8 text-zinc-300 mb-3" />
                        <p className="text-sm font-medium text-zinc-900">
                          Sin coincidencias
                        </p>
                        <p className="text-xs text-zinc-500 mt-1">
                          No hay resultados para "{searchQuery}"
                        </p>
                      </div>
                    ) : (
                      filteredResults.map((linea, idx) => {
                        const website = !linea.isPossible
                          ? getProviderWebsite(linea.operadora)
                          : null;
                        return (
                          <motion.div
                            key={linea.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
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

                            <div className="flex items-center gap-2 shrink-0">
                              {!linea.isPossible &&
                                !linea.isNotFound &&
                                !linea.isError &&
                                linea.numero !== "Número no confirmado" && (
                                  <CopyButton text={linea.numero} />
                                )}
                              {website && (
                                <a
                                  href={website}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-2 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg transition-colors"
                                >
                                  <ExternalLink className="w-4 h-4" />
                                </a>
                              )}
                            </div>
                          </motion.div>
                        );
                      })
                    )}
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>

        {/* Explain sections */}
        <div className="mt-20 space-y-16">
          <section className="grid sm:grid-cols-3 gap-6">
            <div className="sm:col-span-3 mb-2">
              <h2 className="text-2xl font-bold text-zinc-900">
                ¿Por qué usar MisLíneas?
              </h2>
              <p className="text-zinc-600">
                Centralizamos la fragmentación del ecosistema móvil mexicano.
              </p>
            </div>
            {WHY_CARDS.map((card) => (
              <div
                key={card.title}
                className="bg-white border border-zinc-200 p-6 rounded-2xl shadow-sm"
              >
                <card.icon className="w-6 h-6 text-black mb-4" />
                <h3 className="font-semibold text-zinc-900 mb-2">
                  {card.title}
                </h3>
                <p className="text-sm text-zinc-600">{card.body}</p>
              </div>
            ))}
          </section>

          {/* Seguridad */}
          <section
            id="seguridad"
            className="bg-black text-white rounded-3xl p-8 sm:p-12 scroll-mt-24"
          >
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <Lock className="w-8 h-8 text-zinc-400 mb-6" />
                <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                  Seguridad Zero-Knowledge
                </h2>
                <p className="text-zinc-400 leading-relaxed mb-6">
                  No contamos con una base de datos de usuarios; cada consulta
                  orquesta conexiones cifradas de punto a punto con los
                  registros oficiales de las operadoras.
                </p>
                <ul className="space-y-3">
                  {[
                    "Cifrado AES-256 de extremo a extremo.",
                    "Sesión destruida automáticamente.",
                    "No almacenamos CURP ni números.",
                    "Cumplimiento de privacidad.",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 text-sm text-zinc-300"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />{" "}
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl">
                <div className="flex justify-between items-center text-xs font-mono text-zinc-500 mb-4 pb-4 border-b border-zinc-800">
                  <span>STATUS: SECURE</span>
                  <span className="text-emerald-400">● ENCRYPTED TUNNEL</span>
                </div>
                <div className="space-y-4">
                  <div className="h-2 bg-zinc-800 rounded w-3/4" />
                  <div className="h-2 bg-zinc-800 rounded w-5/6" />
                  <div className="h-2 bg-zinc-800 rounded w-1/2" />
                </div>
              </div>
            </div>
          </section>

          {/* Derechos ARCO */}
          <section id="arco" className="scroll-mt-24">
            <h2 className="text-2xl font-bold text-zinc-900 mb-6">
              Derechos ARCO y Denuncias
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm">
                <p className="text-sm text-zinc-600 mb-6 leading-relaxed">
                  La protección de datos personales te permite ejercer derechos
                  ARCO (Acceso, Rectificación, Cancelación, Oposición) ante
                  cualquier operadora.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { t: "Acceso", d: "Conoce qué datos tienen de ti" },
                    { t: "Rectificación", d: "Corrige lo inexacto" },
                    { t: "Cancelación", d: "Elimina tus datos" },
                    { t: "Oposición", d: "Niégate al uso" },
                  ].map((a) => (
                    <div
                      key={a.t}
                      className="bg-zinc-50 p-4 rounded-xl border border-zinc-100"
                    >
                      <h4 className="font-semibold text-sm text-zinc-900 mb-1">
                        {a.t}
                      </h4>
                      <p className="text-xs text-zinc-500">{a.d}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <ShieldAlert className="w-6 h-6 text-red-500" />
                    <h3 className="font-semibold text-zinc-900">
                      ¿Detectaste fraude?
                    </h3>
                  </div>
                  <p className="text-sm text-zinc-600 leading-relaxed mb-6">
                    Si encontraste una línea que no reconoces, debes presentar
                    una denuncia ante la operadora responsable. El uso indebido
                    de identidad es un delito.
                  </p>
                </div>
                <a
                  href="https://portal.crt.gob.mx/reporte-fallas-plataforma-registro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
                >
                  <ShieldAlert className="w-4 h-4" /> Reportar fraude en portal
                  CRT
                </a>
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <footer className="mt-20 pt-8 border-t border-zinc-200 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-zinc-500">
          <div className="flex items-center gap-2 font-medium text-zinc-900">
            <Image
              src={logo}
              alt="MisLíneas"
              width={20}
              height={20}
              className="rounded"
            />{" "}
            MisLíneas
          </div>
          <div className="flex flex-col md:flex-row items-center gap-4 text-xs font-medium">
            <span>Plataforma ciudadana independiente</span>
            <span className="hidden md:block text-zinc-300">&bull;</span>
            <span>No afiliado al Gobierno de México</span>
            <span className="hidden md:block text-zinc-300">&bull;</span>
            <a
              href="https://github.com/moraxh/MisLineas"
              className="hover:text-black transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Repositorio Open Source
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
}
