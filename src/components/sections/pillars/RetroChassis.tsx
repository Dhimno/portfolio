"use client";

import React from "react";
import { RetroChassisProps } from "./types";
import { playPokeSound } from "../../../lib/sound";

export const PIXEL_CUT_POLYGON = `polygon(
  0 8px,
  4px 8px,
  4px 4px,
  8px 4px,
  8px 0,
  calc(100% - 8px) 0,
  calc(100% - 8px) 4px,
  calc(100% - 4px) 4px,
  calc(100% - 4px) 8px,
  100% 8px,
  100% calc(100% - 8px),
  calc(100% - 4px) calc(100% - 8px),
  calc(100% - 4px) calc(100% - 4px),
  calc(100% - 8px) calc(100% - 4px),
  calc(100% - 8px) 100%,
  8px 100%,
  8px calc(100% - 4px),
  4px calc(100% - 4px),
  4px calc(100% - 8px),
  0 calc(100% - 8px)
)`;

export function RetroChassis({
  code,
  statusText = "active",
  activeTab,
  onTabChange,
  children,
  className = "",
  headerSlot,
  tabLabels = {
    telemetry: "[ LIVE TELEMETRY ]",
    arsenal: "[ TECH ARSENAL ]",
  },
}: RetroChassisProps) {
  const handleTabClick = (tab: "telemetry" | "arsenal") => {
    if (tab === activeTab) return;
    playPokeSound();
    onTabChange(tab);
  };

  return (
    <div
      className={`relative p-[1px] bg-[var(--line)] transition-all duration-300 group hover:border-[var(--accent)] hover:shadow-md ${className}`}
      style={{ clipPath: PIXEL_CUT_POLYGON }}
    >
      <div
        className="relative flex flex-col w-full h-full bg-[var(--surface)] text-[var(--ink)] overflow-hidden"
        style={{ clipPath: PIXEL_CUT_POLYGON }}
      >
        {/* Chassis Top Status Header */}
        <div className="flex items-center justify-between px-3.5 py-2 border-b border-[var(--line)] bg-[var(--surface-2)]/80 text-xs select-none">
          <span className="font-pixel text-[10px] sm:text-[11px] tracking-wider text-[var(--ink-muted)]">
            {code}
          </span>
          <div className="flex items-center gap-1.5" title={`System status: ${statusText}`}>
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-none bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-none h-2 w-2 bg-emerald-500" />
            </span>
            <span className="font-mono text-[10px] tracking-widest uppercase text-emerald-600 dark:text-emerald-400 font-medium">
              status: {statusText}
            </span>
          </div>
        </div>

        {/* Optional Sub-header / Title slot */}
        {headerSlot && <div className="p-4 sm:p-5 pb-3">{headerSlot}</div>}

        {/* Dual Mode Switcher Bar */}
        <div
          role="tablist"
          aria-label="Chassis view mode"
          className="flex items-center justify-between gap-1 px-3 py-1.5 bg-[var(--surface-2)]/50 border-y border-[var(--line)]"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "telemetry"}
            onClick={() => handleTabClick("telemetry")}
            className={`flex-1 py-1.5 px-2 text-center font-mono text-[10px] sm:text-xs tracking-wider transition-colors cursor-pointer select-none border ${
              activeTab === "telemetry"
                ? "bg-[var(--surface)] text-[var(--accent)] font-semibold border-[var(--line)] shadow-xs"
                : "text-[var(--ink-muted)] hover:text-[var(--ink)] border-transparent"
            } focus-visible:outline-2 focus-visible:outline-[var(--accent)]`}
          >
            {tabLabels.telemetry}
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "arsenal"}
            onClick={() => handleTabClick("arsenal")}
            className={`flex-1 py-1.5 px-2 text-center font-mono text-[10px] sm:text-xs tracking-wider transition-colors cursor-pointer select-none border ${
              activeTab === "arsenal"
                ? "bg-[var(--surface)] text-[var(--accent)] font-semibold border-[var(--line)] shadow-xs"
                : "text-[var(--ink-muted)] hover:text-[var(--ink)] border-transparent"
            } focus-visible:outline-2 focus-visible:outline-[var(--accent)]`}
          >
            {tabLabels.arsenal}
          </button>
        </div>

        {/* Viewport Container with Fixed Height and Scanlines */}
        <div className="relative flex-1 h-[340px] sm:h-[350px] max-h-[350px] min-h-0 flex flex-col bg-[var(--surface)] overflow-hidden">
          {/* Phosphor CRT Scanlines Overlay */}
          <div
            className="absolute inset-0 pointer-events-none z-20 select-none opacity-20 dark:opacity-40"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.4) 0px, rgba(0, 0, 0, 0.4) 1px, transparent 1px, transparent 3px)",
            }}
            aria-hidden="true"
          />

          {/* CRT Screen Edge Vignette */}
          <div
            className="absolute inset-0 pointer-events-none z-20 select-none shadow-[inset_0_0_12px_rgba(0,0,0,0.25)] dark:shadow-[inset_0_0_16px_rgba(0,0,0,0.5)]"
            aria-hidden="true"
          />

          {/* Viewport Content */}
          <div className="relative z-10 flex-1 min-h-0 flex flex-col w-full h-full p-4 sm:p-5 overflow-hidden">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
