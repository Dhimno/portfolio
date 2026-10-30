"use client";

import React from "react";
import { Shield, Cpu, Terminal } from "lucide-react";
import { useI18n } from "../../lib/i18n";
import { BlurReveal } from "../ui/BlurReveal";
import { PillarCard } from "./pillars/PillarCard";
import { PillarData } from "./pillars/types";

export function PillarsSection() {
  const { locale } = useI18n();

  const pillars: PillarData[] = [
    {
      id: "secops",
      code: "SYS_SEC // 01",
      icon: Shield,
      tag: "Security Operations",
      title: "Cybersecurity & SOC",
      desc:
        locale === "id"
          ? "Pemantauan ancaman endpoint via EDR, investigasi anomali, triase insiden, dan penerapan tata kelola akses least-privilege di lingkungan terdistribusi."
          : "Endpoint threat monitoring via EDR, anomaly triage, incident escalation, and least-privilege credential governance across enterprise environments.",
      tools: ["EDR", "Wazuh", "Suricata", "Wireshark", "Splunk", "SIEM"],
      statusText: "active",
    },
    {
      id: "ai",
      code: "AI_CORE // 02",
      icon: Cpu,
      tag: "Machine Learning & LLM",
      title: "Artificial Intelligence",
      desc:
        locale === "id"
          ? "Eksplorasi arsitektur Large Language Model, pembuatan AI Agent modular, serta implementasi pipeline pemrosesan data science terstruktur."
          : "Architecting modular LLM agents, exploring generative AI workflows, and structuring end-to-end data science processing pipelines.",
      tools: ["PyTorch", "Transformers", "LangChain", "Hugging Face", "RAG", "Ollama"],
      statusText: "active",
    },
    {
      id: "systems",
      code: "NATIVE_SYS // 03",
      icon: Terminal,
      tag: "Software & Infrastructure",
      title: "Systems & Engineering",
      desc:
        locale === "id"
          ? "Pengembangan software native dengan Rust dan Tauri, manajemen server homelab Linux 24/7, dan perancangan sistem web performa tinggi."
          : "Crafting native desktop software with Rust and Tauri, managing 24/7 Linux homelab infrastructure, and building scalable full-stack web platforms.",
      tools: ["Rust", "Tauri", "Linux", "Docker", "Proxmox", "WireGuard"],
      statusText: "active",
    },
  ];

  return (
    <section
      id="pillars"
      className="w-full border-t border-[var(--line)]/80 bg-[var(--surface-2)]/40 pt-16 pb-20 sm:pt-20 sm:pb-24 scroll-mt-16"
    >
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {pillars.map((pillar, idx) => (
            <BlurReveal key={pillar.id} delay={idx * 0.1} className="h-full">
              <PillarCard pillar={pillar} className="h-full" />
            </BlurReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
