"use client";

import { Check, Copy } from "lucide-react";
import type React from "react";
import { useCallback, useState } from "react";

export function CopyButton({ text }: { text: string }) {
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
