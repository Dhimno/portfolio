"use client";

import React from "react";
import { useI18n } from "../../lib/i18n";
import { BlurReveal } from "../ui/BlurReveal";
import { TechMarquee } from "../ui/TechMarquee";
import { Orb } from "../ui/Orb";
import { DynamicCompanion } from "../companions/DynamicCompanion";

export function AboutSection() {
  const { t, locale } = useI18n();

  const isIndo = locale === "id";

  return (
    <section
      id="about"
      className="relative w-full pt-16 pb-20 sm:pt-20 sm:pb-24 px-4 sm:px-6 lg:px-8 border-t border-[var(--line)]/50 overflow-hidden scroll-mt-16"
    >
      <Orb top="20%" left="-10%" size={400} delay={3} />

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <BlurReveal>
          <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-[var(--ink)] tracking-[-0.04em] mb-8">
            {t.about.title}
          </h2>
        </BlurReveal>

        {/* Narrative - Full Width & High Contrast Black Text */}
        <div className="max-w-4xl space-y-6 mb-14">
          <BlurReveal delay={0.1}>
            <p className="font-body text-base sm:text-lg lg:text-xl text-[var(--ink)] leading-relaxed">
              {t.about.p1}
            </p>
          </BlurReveal>

          <BlurReveal delay={0.2}>
            <p className="font-body text-base sm:text-lg lg:text-xl text-[var(--ink)] leading-relaxed">
              {t.about.p2}
            </p>
          </BlurReveal>
        </div>

        {/* Miniature Dhimas character pacing along the divider line */}
        <DynamicCompanion slot="about-divider" defaultCharacter="dhimas" />

        {/* Dual-Direction Tech Logos (Moving right and left) */}
        <div className="pt-8 border-t border-[var(--line)]/60 space-y-2">
          <BlurReveal delay={0.2}>
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-mono uppercase tracking-wider text-[var(--ink-muted)] font-semibold">
                {isIndo ? "Kemampuan & Perangkat Rekayasa" : "Engineering Toolkit & Technologies"}
              </p>
            </div>
            <TechMarquee />
          </BlurReveal>
        </div>
      </div>
    </section>
  );
}
