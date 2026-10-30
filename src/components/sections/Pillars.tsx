"use client";

import React from "react";
import { Shield, Cpu, Terminal } from "lucide-react";
import { useI18n } from "../../lib/i18n";
import { BlurReveal } from "../ui/BlurReveal";

export function PillarsSection() {
  const { locale } = useI18n();

  const pillars = [
    {
      icon: Shield,
      tag: "Security Operations",
      title: "Cybersecurity & SOC",
      desc:
        locale === "id"
          ? "Pemantauan ancaman endpoint via EDR, investigasi anomali, triase insiden, dan penerapan tata kelola akses least-privilege di lingkungan terdistribusi."
          : "Endpoint threat monitoring via EDR, anomaly triage, incident escalation, and least-privilege credential governance across enterprise environments.",
    },
    {
      icon: Cpu,
      tag: "Machine Learning & LLM",
      title: "Artificial Intelligence",
      desc:
        locale === "id"
          ? "Eksplorasi arsitektur Large Language Model, pembuatan AI Agent modular, serta implementasi pipeline pemrosesan data science terstruktur."
          : "Architecting modular LLM agents, exploring generative AI workflows, and structuring end-to-end data science processing pipelines.",
    },
    {
      icon: Terminal,
      tag: "Software & Infrastructure",
      title: "Systems & Engineering",
      desc:
        locale === "id"
          ? "Pengembangan software native dengan Rust dan Tauri, manajemen server homelab Linux 24/7, dan perancangan sistem web performa tinggi."
          : "Crafting native desktop software with Rust and Tauri, managing 24/7 Linux homelab infrastructure, and building scalable full-stack web platforms.",
    },
  ];

  return (
    <section id="pillars" className="w-full border-t border-[var(--line)]/80 bg-[var(--surface-2)]/40 pt-16 pb-20 sm:pt-20 sm:pb-24 scroll-mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <BlurReveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div className="max-w-3xl space-y-2">
              <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black tracking-[-0.04em] text-[var(--ink)]">
                {locale === "id"
                  ? "Fondasi Rekayasa & Fokus Spesialisasi"
                  : "Engineering Foundations & Specialization Focus"}
              </h2>
              <p className="font-body text-sm sm:text-base text-[var(--ink-muted)] leading-relaxed">
                {locale === "id"
                  ? "Tiga pilar kompetensi utama yang mendasari setiap sistem, audit keamanan, dan perangkat lunak yang saya bangun."
                  : "Three core competencies anchoring every system architecture, security audit, and software project I develop."}
              </p>
            </div>
          </div>
        </BlurReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((pillar, idx) => {
            const IconComponent = pillar.icon;
            return (
              <BlurReveal key={pillar.title} delay={idx * 0.1}>
                <div className="h-full p-6 sm:p-7 rounded-2xl bg-[var(--surface)] border border-[var(--line)] shadow-sm hover:border-[var(--accent)]/50 transition-all duration-300 flex flex-col justify-between">
                  <div className="space-y-4">
                    <IconComponent className="w-6 h-6 text-[var(--accent)] stroke-[1.8]" />

                    <div>
                      <span className="font-mono text-xs text-[var(--accent)] font-semibold block mb-1">
                        {pillar.tag}
                      </span>
                      <h3 className="font-display text-lg font-bold text-[var(--ink)]">
                        {pillar.title}
                      </h3>
                    </div>

                    <p className="text-xs sm:text-sm text-[var(--ink-muted)] leading-relaxed">
                      {pillar.desc}
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
