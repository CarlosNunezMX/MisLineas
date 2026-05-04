"use client";

import { cn } from "@/lib/utils";
import type { FilterTab } from "@/types";

interface Tab {
  key: FilterTab;
  label: string;
  count: number;
}

interface Props {
  tabs: Tab[];
  active: FilterTab;
  onChange: (k: FilterTab) => void;
}

export function FilterTabs({ tabs, active, onChange }: Props) {
  return (
    <div
      className="flex gap-2 flex-wrap"
      role="tablist"
      aria-label="Filtrar resultados"
    >
      {tabs.map((tab) => (
        <button
          key={tab.key}
          type="button"
          role="tab"
          aria-selected={active === tab.key}
          onClick={() => onChange(tab.key)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onChange(tab.key);
            }
          }}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all",
            active === tab.key
              ? "bg-zinc-900 text-white border-zinc-900"
              : "bg-white text-zinc-600 border-zinc-200 hover:border-zinc-400 hover:text-zinc-900",
          )}
        >
          {tab.label}
          <span
            className={cn(
              "text-[10px] font-bold tabular-nums px-1.5 py-0.5 rounded-full",
              active === tab.key
                ? "bg-white/20 text-white"
                : "bg-zinc-100 text-zinc-500",
            )}
          >
            {tab.count}
          </span>
        </button>
      ))}
    </div>
  );
}
