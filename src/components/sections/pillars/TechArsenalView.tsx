"use client";

import React from "react";
import { PillarData } from "./types";
import { playPokeSound } from "../../../lib/sound";
import { useI18n } from "../../../lib/i18n";

interface TechArsenalViewProps {
  pillar: PillarData;
}

export function TechArsenalView({ pillar }: TechArsenalViewProps) {
  const { locale } = useI18n();

  const handleChipClick = () => {
    try {
      playPokeSound();
    } catch {
      // Ignore if audio is muted or unavailable
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-between select-none font-mono text-xs">
      {/* Top Description & Domain Summary */}
      <div className="space-y-2">
        <div className="flex items-center justify-between pb-1.5 border-b border-dashed border-[var(--line)] text-[10px] text-[var(--ink-muted)]">
          <span className="font-pixel text-[9px] text-[var(--accent)] tracking-wider">
            {locale === "id" ? "ARSENAL TEKNIS" : "ARSENAL MATRIX"} {"//"} {pillar.id.toUpperCase()}
          </span>
          <span className="text-[10px] text-emerald-500 font-mono">
            {locale === "id" ? "STATUS: TERVERIFIKASI" : "STATUS: VERIFIED"}
          </span>
        </div>

        <p className="font-body text-xs sm:text-[13px] text-[var(--ink-muted)] leading-relaxed line-clamp-3">
          {pillar.desc}
        </p>
      </div>

      {/* Categorized Tools Grid */}
      <div className="space-y-3 my-auto py-1">
        {pillar.categories && pillar.categories.length > 0 ? (
          pillar.categories.map((cat, idx) => (
            <div key={idx} className="space-y-1.5">
              <span className="block font-pixel text-[9px] text-[var(--accent)] tracking-wider uppercase">
                {"// "}{cat.category}
              </span>
              <div className="flex flex-wrap gap-1 sm:gap-1.5">
                {cat.items.map((tool) => (
                  <button
                    key={tool}
                    type="button"
                    onClick={handleChipClick}
                    className="font-mono text-[10px] sm:text-[11px] px-2 py-0.5 bg-[var(--surface-2)] text-[var(--ink)] border border-[var(--line)] hover:border-[var(--accent)] hover:text-[var(--accent)] hover:bg-[var(--surface)] active:scale-95 transition-all duration-150 cursor-pointer text-left focus-visible:outline-1 focus-visible:outline-[var(--accent)]"
                    title={`Inspect ${tool}`}
                  >
                    {tool}
                  </button>
                ))}
              </div>
            </div>
          ))
        ) : pillar.tools && pillar.tools.length > 0 ? (
          <div className="space-y-1.5">
            <span className="block font-pixel text-[9px] text-[var(--accent)] tracking-wider uppercase">
              {"// "}{locale === "id" ? "KOMPETENSI INTI" : "CORE COMPETENCIES"}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {pillar.tools.map((tool) => (
                <button
                  key={tool}
                  type="button"
                  onClick={handleChipClick}
                  className="font-mono text-[10px] sm:text-[11px] px-2 py-0.5 bg-[var(--surface-2)] text-[var(--ink)] border border-[var(--line)] hover:border-[var(--accent)] hover:text-[var(--accent)] active:scale-95 transition-all duration-150 cursor-pointer focus-visible:outline-1 focus-visible:outline-[var(--accent)]"
                >
                  {tool}
                </button>
              ))}
            </div>
          </div>
        ) : null}
      </div>

      {/* Footer Spec Bar */}
      <div className="pt-2 border-t border-dashed border-[var(--line)] flex items-center justify-between text-[10px] text-[var(--ink-muted)]">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 bg-emerald-500 animate-pulse rounded-full" />
          <span className="font-mono text-[9px] uppercase tracking-wider text-[var(--ink-muted)]">
            STACK: OPERATIONAL
          </span>
        </div>
        <span className="font-pixel text-[9px] text-[var(--accent)]">
          {locale === "id" ? "SIAP DIGUNAKAN" : "PRODUCTION READY"}
        </span>
      </div>
    </div>
  );
}
