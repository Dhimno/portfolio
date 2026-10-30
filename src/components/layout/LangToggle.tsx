"use client";

import React from "react";
import { useI18n } from "../../lib/i18n";
import { playPokeSound } from "../../lib/sound";

export function LangToggle() {
  const { locale, toggleLocale } = useI18n();

  const handleToggle = () => {
    try {
      playPokeSound();
    } catch {
      // Ignore audio errors
    }
    toggleLocale();
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label="Toggle language between ID and EN"
      className="inline-flex items-center justify-center min-h-[40px] px-2.5 py-1 text-xs font-pixel tracking-wider bg-[var(--surface-2)] text-[var(--ink)] border-2 border-[var(--line)] hover:border-[var(--accent)] shadow-[2px_2px_0px_var(--line)] hover:shadow-[3px_3px_0px_var(--accent)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_var(--accent)] transition-all cursor-pointer select-none focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
    >
      <span
        className={`px-1 py-0.5 transition-colors ${
          locale === "id"
            ? "bg-[var(--surface)] text-[var(--accent)] font-bold shadow-[inset_0_0_0_1px_var(--line)]"
            : "text-[var(--ink-muted)] hover:text-[var(--ink)]"
        }`}
      >
        {locale === "id" ? "[ID]" : "ID"}
      </span>
      <span className="mx-1 text-[var(--line)] font-mono">/</span>
      <span
        className={`px-1 py-0.5 transition-colors ${
          locale === "en"
            ? "bg-[var(--surface)] text-[var(--accent)] font-bold shadow-[inset_0_0_0_1px_var(--line)]"
            : "text-[var(--ink-muted)] hover:text-[var(--ink)]"
        }`}
      >
        {locale === "en" ? "[EN]" : "EN"}
      </span>
    </button>
  );
}
