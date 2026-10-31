"use client";

import React from "react";
import { Shield, Cpu, Terminal } from "lucide-react";
import { BlurReveal } from "../ui/BlurReveal";

export function PillarsSection() {
  const pillars = [
    {
      id: "secops",
      icon: Shield,
      title: "SECURITY OPERATIONS",
      subtitle: "DEFENSIVE SENTINEL",
      accentColor: "#ef4444",
    },
    {
      id: "ai",
      icon: Cpu,
      title: "APPLIED ARTIFICIAL INTELLIGENCE",
      subtitle: "AGENTIC INTELLIGENCE",
      accentColor: "#3b82f6",
    },
    {
      id: "systems",
      icon: Terminal,
      title: "SYSTEMS & INFRASTRUCTURE",
      subtitle: "LOW-LEVEL RESILIENCE",
      accentColor: "#10b981",
    },
  ];

  return (
    <section
      id="pillars"
      className="w-full border-t border-[var(--line)]/80 bg-[var(--surface-2)]/30 py-16 sm:py-20 scroll-mt-16"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <BlurReveal>
          <div className="text-center space-y-2">
            <p className="font-mono text-xs text-[var(--accent)] tracking-widest uppercase">
              [ FOKUS SPESIALISASI ]
            </p>
            <h2 className="font-pixel text-xl sm:text-2xl lg:text-3xl font-bold tracking-wider text-[var(--ink)]">
              CORE ENGINEERING PILLARS
            </h2>
          </div>
        </BlurReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 sm:gap-14 pt-4">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <BlurReveal key={item.id} delay={idx * 0.1}>
                <div className="group flex flex-col items-center justify-center space-y-4 cursor-default transition-transform duration-200 hover:-translate-y-1">
                  {/* Centered Minimalist Logo Glyph */}
                  <div
                    className="w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{
                      filter: `drop-shadow(0 0 16px ${item.accentColor}40)`,
                    }}
                  >
                    <Icon
                      className="w-12 h-12 sm:w-16 sm:h-16 transition-colors duration-200"
                      style={{ color: item.accentColor }}
                      strokeWidth={1.75}
                    />
                  </div>

                  {/* Pixelated Label Underneath */}
                  <div className="space-y-1 text-center">
                    <h3 className="font-pixel text-sm sm:text-base font-bold text-[var(--ink)] tracking-wider group-hover:text-[var(--accent)] transition-colors">
                      {item.title}
                    </h3>
                    <p className="font-pixel text-[10px] sm:text-[11px] text-[var(--ink-muted)] tracking-widest uppercase">
                      {"//"} {item.subtitle}
                    </p>
                  </div>
                </div>
              </BlurReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
