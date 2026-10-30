"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PillarCardProps, PillarMode } from "./types";
import { RetroChassis } from "./RetroChassis";
import {
  SecOpsRadarSimulator,
  AiSynapseSimulator,
  SystemsTelemetrySimulator,
} from "./simulators";
import { TechArsenalView } from "./TechArsenalView";
import { useI18n } from "../../../lib/i18n";

export function PillarCard({
  pillar,
  telemetryContent,
  arsenalContent,
  defaultTab = "telemetry",
  className = "",
}: PillarCardProps) {
  const { locale } = useI18n();
  const [activeTab, setActiveTab] = useState<PillarMode>(defaultTab);
  const Icon = pillar.icon;

  const headerSlot = (
    <div className="flex items-start gap-3">
      <div className="p-2 border border-[var(--line)] bg-[var(--surface-2)] text-[var(--accent)] shrink-0">
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1 min-w-0">
        <span className="block font-pixel text-[10px] text-[var(--accent)] tracking-wider uppercase mb-0.5">
          {pillar.tag}
        </span>
        <h3 className="font-display font-bold text-base sm:text-lg text-[var(--ink)] leading-snug">
          {pillar.title}
        </h3>
      </div>
    </div>
  );

  return (
    <RetroChassis
      code={pillar.code}
      statusText={pillar.statusText || "active"}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      headerSlot={headerSlot}
      tabLabels={{
        telemetry: locale === "id" ? "[ TELEMETRI LIVE ]" : "[ LIVE TELEMETRY ]",
        arsenal: locale === "id" ? "[ ARSENAL TEKNIS ]" : "[ TECH ARSENAL ]",
      }}
      className={className}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, filter: "brightness(1.35)" }}
          animate={{ opacity: 1, filter: "brightness(1)" }}
          exit={{ opacity: 0, filter: "brightness(0.7)" }}
          transition={{ duration: 0.18 }}
          className="w-full h-full flex flex-col flex-1"
        >
          {activeTab === "telemetry" ? (
            telemetryContent ? (
              <div className="w-full h-full flex flex-col flex-1">{telemetryContent}</div>
            ) : pillar.id === "secops" ? (
              <SecOpsRadarSimulator />
            ) : pillar.id === "ai" ? (
              <AiSynapseSimulator />
            ) : pillar.id === "systems" ? (
              <SystemsTelemetrySimulator />
            ) : (
              <div className="w-full h-full flex flex-col justify-between flex-1 font-mono text-xs text-[var(--ink-muted)]">
                {/* Fallback Cockpit Standby Telemetry HUD */}
                <div className="flex items-center justify-between border-b border-dashed border-[var(--line)] pb-2 text-[10px]">
                  <span className="tracking-widest uppercase text-[var(--accent)]">
                    CHANNEL // {pillar.id.toUpperCase()}
                  </span>
                  <span className="text-[var(--ink-muted)]">FREQ: 142.80 MHz</span>
                </div>

                <div className="my-auto py-4 flex flex-col items-center justify-center text-center">
                  <div className="w-12 h-12 mb-3 border border-dashed border-[var(--line)] flex items-center justify-center text-[var(--accent)]">
                    <Icon className="w-6 h-6 animate-pulse" />
                  </div>
                  <span className="font-pixel text-[11px] text-[var(--ink)] tracking-wider mb-1">
                    [ TELEMETRY FEED STANDBY ]
                  </span>
                  <p className="font-mono text-[11px] text-[var(--ink-muted)] max-w-xs leading-relaxed">
                    Interactive simulation module ready. Calibrating real-time signal stream...
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-dashed border-[var(--line)] pt-2 text-[10px]">
                  <span>BUFFER: 100% OK</span>
                  <span className="text-emerald-500">SYS_LINK // STABLE</span>
                </div>
              </div>
            )
          ) : arsenalContent ? (
            <div className="w-full h-full flex flex-col flex-1">{arsenalContent}</div>
          ) : (
            <TechArsenalView pillar={pillar} />
          )}
        </motion.div>
      </AnimatePresence>
    </RetroChassis>
  );
}
