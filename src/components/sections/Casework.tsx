"use client";

import React from "react";
import { CheckCircle2, ShieldAlert, Lock } from "lucide-react";
import { useI18n } from "../../lib/i18n";
import { BlurReveal } from "../ui/BlurReveal";

export function CaseworkSection() {
  const { locale } = useI18n();

  const isIndo = locale === "id";

  const checklist = isIndo
    ? [
        "Endpoint Detection & Response (EDR) Monitoring",
        "Endpoint Privilege Management (EPM) Least-Privilege",
        "Incident Triage & Threat Escalation Protocol",
        "Enterprise Banking Infrastructure Resilience",
      ]
    : [
        "Endpoint Detection & Response (EDR) Monitoring",
        "Endpoint Privilege Management (EPM) Least-Privilege",
        "Incident Triage & Threat Escalation Protocol",
        "Enterprise Banking Infrastructure Resilience",
      ];

  return (
    <section id="casework" className="w-full border-t border-[var(--line)]/80 bg-[var(--surface)] py-20 lg:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <BlurReveal>
          <div className="max-w-3xl space-y-2">
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--accent)] font-semibold">
              02 • Industrial Case Study
            </span>
            <h2 className="font-display text-2xl sm:text-4xl font-extrabold tracking-tight text-[var(--ink)]">
              {isIndo
                ? "Investigasi Operasional & Pertahanan Siber Perbankan"
                : "Operational Threat Triage & Banking Cyber Defense"}
            </h2>
            <p className="font-body text-sm sm:text-base text-[var(--ink-muted)] leading-relaxed">
              {isIndo
                ? "Penerapan metodologi keamanan informasi di lingkungan operasional enterprise sektor finansial."
                : "Practical information security execution within mission-critical banking infrastructure."}
            </p>
          </div>
        </BlurReveal>

        {/* Featured Case Card */}
        <BlurReveal delay={0.15}>
          <div className="rounded-none p-6 sm:p-10 border-2 border-[var(--line)] bg-[var(--surface-2)]/50 shadow-[5px_5px_0px_var(--line)] space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-[var(--line)] pb-6">
              <div className="space-y-1.5">
                <span className="font-pixel text-xs text-[var(--accent)] font-semibold tracking-wide block">
                  {isIndo ? "STUDI KASUS INDUSTRI" : "INDUSTRIAL CASE STUDY"}
                </span>
                <h3 className="font-display font-bold text-2xl sm:text-3xl text-[var(--ink)]">
                  PT Bank Mega Tbk
                </h3>
                <p className="text-sm font-semibold text-[var(--ink-muted)] font-mono">
                  Security Operation Center (SOC) Intern • Jakarta ({isIndo ? "Juni 2026 – Juli 2026" : "June 2026 – July 2026"})
                </p>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-none bg-[var(--surface)] border-2 border-[var(--line)] shadow-[2px_2px_0px_var(--line)] text-xs font-pixel text-[var(--ink)] self-start sm:self-auto">
                <Lock className="w-3.5 h-3.5 text-[var(--accent)]" />
                <span>Enterprise SOC</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Narrative Breakdown (7 cols) */}
              <div className="lg:col-span-7 space-y-4 text-sm sm:text-base text-[var(--ink-muted)] leading-relaxed font-body">
                <p>
                  {isIndo
                    ? "Mempelajari dan mengoperasikan solusi Endpoint Detection and Response (EDR) untuk memantau, mendeteksi, dan menginvestigasi aktivitas anomali pada ribuan endpoint di lingkungan perbankan nasional."
                    : "Operated and evaluated enterprise Endpoint Detection and Response (EDR) solutions to monitor, detect, and investigate behavioral anomalies across high-assurance banking nodes."}
                </p>
                <p>
                  {isIndo
                    ? "Mendalami penerapan Endpoint Privilege Management (EPM) untuk menegakkan prinsip least privilege secara konsisten, meniadakan hak akses admin lokal yang tidak perlu, dan menekan vektor serangan eskalasi privilese."
                    : "Deepened enforcement of Endpoint Privilege Management (EPM) governance, systematically revoking unnecessary local administrative rights to eliminate credential escalation attack vectors."}
                </p>
                <p>
                  {isIndo
                    ? "Mengamati secara langsung prosedur alur kerja tim SOC tier-1 dan tier-2, mulai dari deteksi alert, klasifikasi false positive, hingga mitigasi risiko terukur."
                    : "Observed tier-1 and tier-2 operational incident triage flows, alert correlation, false-positive suppression, and risk escalation procedures under banking security standards."}
                </p>
              </div>

              {/* Verified Protocols Sub-card (5 cols) */}
              <div className="lg:col-span-5 bg-[var(--surface)] rounded-none p-6 border-2 border-[var(--line)] space-y-4 shadow-[3px_3px_0px_var(--line)]">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-[var(--accent)]" />
                  <span className="font-mono text-xs font-bold text-[var(--ink)] uppercase tracking-wider">
                    {isIndo ? "Protokol & Telemetri Terverifikasi" : "Verified Protocols & Telemetry"}
                  </span>
                </div>

                <ul className="space-y-3 text-xs sm:text-sm text-[var(--ink-muted)]">
                  {checklist.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
                      <span className="font-medium text-[var(--ink)]">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-3 border-t border-[var(--line)]/60 text-[11px] font-mono text-[var(--ink-muted)]">
                  Environment: Enterprise Windows &amp; Linux Endpoints, SIEM, EDR Agents
                </div>
              </div>
            </div>
          </div>
        </BlurReveal>
      </div>
    </section>
  );
}
