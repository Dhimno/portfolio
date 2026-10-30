"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, GraduationCap, MapPin, Calendar } from "lucide-react";
import { useI18n } from "../../lib/i18n";
import { experiences } from "../../data/experience";
import { BlurReveal } from "../ui/BlurReveal";
import { Orb } from "../ui/Orb";

export function ExperienceSection() {
  const { t, locale } = useI18n();
  const [filter, setFilter] = useState<"all" | "work" | "education">("all");

  const filteredExperiences = experiences.filter((item) => {
    if (filter === "all") return true;
    return item.type === filter;
  });

  return (
    <section
      id="experience"
      className="relative w-full pt-16 pb-20 sm:pt-20 sm:pb-24 px-4 sm:px-6 lg:px-8 border-t border-[var(--line)]/50 overflow-hidden scroll-mt-16"
    >
      <Orb bottom="10%" right="-10%" size={450} delay={1} />

      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <BlurReveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div>
              <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-[var(--ink)] tracking-[-0.04em]">
                {t.experience.title}
              </h2>
              <p className="text-[var(--ink-muted)] mt-2 text-base max-w-lg">
                {t.experience.subtitle}
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center p-1 rounded-xl bg-[var(--surface-2)] border border-[var(--line)] self-start sm:self-auto">
              {(
                [
                  { id: "all", label: t.experience.tabAll },
                  { id: "work", label: t.experience.tabWork },
                  { id: "education", label: t.experience.tabEducation },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setFilter(tab.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    filter === tab.id
                      ? "bg-[var(--surface)] text-[var(--accent)] font-semibold shadow-sm"
                      : "text-[var(--ink-muted)] hover:text-[var(--ink)]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </BlurReveal>

        {/* Timeline Items Container */}
        <div className="relative">
          {/* Continuous vertical timeline bar centered at x = 16px */}
          <div className="absolute left-4 top-4 bottom-4 w-0.5 -translate-x-1/2 bg-[var(--line)]" />

          <div className="space-y-12">
            <AnimatePresence mode="popLayout">
            {filteredExperiences.map((exp) => (
              <motion.div
                key={exp.id}
                layout
                initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: false, amount: 0.2 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4 }}
                className="relative pl-12 sm:pl-14 group"
              >
                {/* Timeline node icon centered perfectly at x = 16px */}
                  <div className="absolute left-4 top-6 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[var(--surface)] border-2 border-[var(--accent)] flex items-center justify-center text-[var(--accent)] shadow-sm z-10">
                    {exp.type === "work" ? (
                      <Briefcase className="w-3.5 h-3.5" />
                    ) : (
                      <GraduationCap className="w-4 h-4" />
                    )}
                  </div>

                  {/* Card Container */}
                  <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--line)] shadow-sm hover:border-[var(--accent)]/40 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                    <h3 className="font-display font-bold text-lg sm:text-xl text-[var(--ink)]">
                      {exp.role[locale]}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs font-mono text-[var(--accent)] font-medium">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{exp.period[locale]}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[var(--ink-muted)] mb-4">
                    <span className="font-semibold text-[var(--ink)]">
                      {exp.organization}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {exp.location}
                    </span>
                  </div>

                  {/* Highlights */}
                  <ul className="space-y-2 mb-5">
                    {exp.highlights[locale].map((point, idx) => (
                      <li
                        key={idx}
                        className="text-sm text-[var(--ink-muted)] flex items-start gap-2.5 leading-relaxed"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] mt-2 flex-shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Focus & Tools - Clean inline text */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-3 border-t border-[var(--line)]/50 text-xs font-mono text-[var(--ink-muted)]">
                    <span className="font-semibold text-[var(--ink)]">Fokus:</span>
                    <span>{exp.tags.join(" • ")}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        </div>
      </div>
    </section>
  );
}
