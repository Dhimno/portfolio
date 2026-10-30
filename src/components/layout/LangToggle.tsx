"use client";

import React from "react";
import { useI18n } from "../../lib/i18n";

export function LangToggle() {
  const { locale, toggleLocale } = useI18n();

  return (
    <button
      type="button"
      onClick={toggleLocale}
      aria-label="Toggle language between ID and EN"
      className="inline-flex items-center justify-center min-h-[44px] min-w-[52px] px-3 py-1.5 text-xs font-mono font-medium rounded-full bg-[var(--surface-2)] text-[var(--ink)] hover:text-[var(--accent)] border border-[var(--line)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--accent)] cursor-pointer"
    >
      <span className={locale === "id" ? "font-bold text-[var(--accent)]" : "opacity-60"}>
        ID
      </span>
      <span className="mx-1 opacity-40">/</span>
      <span className={locale === "en" ? "font-bold text-[var(--accent)]" : "opacity-60"}>
        EN
      </span>
    </button>
  );
}
