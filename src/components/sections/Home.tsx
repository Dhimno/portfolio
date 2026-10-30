"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FolderGit2, Mail } from "lucide-react";
import { useI18n } from "../../lib/i18n";
import { RippleGrid } from "../ui/RippleGrid";
import { PixelParallaxLandscape } from "../ui/PixelParallaxLandscape";

export function HomeSection() {
  const { t, locale } = useI18n();

  const springTransition = { type: "spring" as const, stiffness: 380, damping: 20 };

  return (
    <section id="home" className="relative min-h-[calc(100vh-64px)] w-full flex flex-col justify-center scroll-mt-16 overflow-hidden">
      <RippleGrid cellSize={54} className="min-h-[calc(100vh-64px)] w-full flex flex-col justify-center">
        <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 my-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Headline & Value Proposition (7 cols) */}
            <motion.div
              initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ ...springTransition, duration: 0.5 }}
              data-disable-ripple="true"
              className="lg:col-span-7 space-y-6 select-text pointer-events-auto"
            >
              {/* Main Headline with Large, Bold Typography & Terminal Cursor */}
              <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-[-0.04em] text-[var(--ink)] leading-[1.03]">
                {locale === "id" ? (
                  <>
                    Hai! Saya{" "}
                    <span className="inline-block whitespace-nowrap">
                      Dhimas Reza
                      <motion.span
                        animate={{ opacity: [1, 1, 0, 0] }}
                        transition={{
                          repeat: Infinity,
                          duration: 0.9,
                          times: [0, 0.5, 0.5, 1],
                          ease: "linear",
                        }}
                        className="inline-block w-[0.35em] h-[0.85em] bg-[var(--accent)] ml-2 translate-y-[0.06em] select-none align-baseline"
                        aria-hidden="true"
                      />
                    </span>
                  </>
                ) : (
                  <>
                    Hi! I&apos;m{" "}
                    <span className="inline-block whitespace-nowrap">
                      Dhimas Reza
                      <motion.span
                        animate={{ opacity: [1, 1, 0, 0] }}
                        transition={{
                          repeat: Infinity,
                          duration: 0.9,
                          times: [0, 0.5, 0.5, 1],
                          ease: "linear",
                        }}
                        className="inline-block w-[0.35em] h-[0.85em] bg-[var(--accent)] ml-2 translate-y-[0.06em] select-none align-baseline"
                        aria-hidden="true"
                      />
                    </span>
                  </>
                )}
              </h1>

              {/* Subtitle / Bio */}
              <p className="font-body text-base sm:text-xl text-[var(--ink-muted)] font-normal leading-relaxed max-w-xl">
                {locale === "id"
                  ? "Mahasiswa S1 Informatika Universitas Diponegoro. Memadukan investigasi ancaman digital (SOC) dengan rekayasa model AI dan pengembangan perangkat lunak berkinerja tinggi."
                  : "Undergraduate Informatics student at Diponegoro University. Bridging cybersecurity threat triage (SOC) with AI model engineering and high-performance software systems."}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-3">
                <motion.a
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  transition={springTransition}
                  href="#projects"
                  className="inline-flex items-center justify-center px-6 py-3.5 bg-[var(--accent)] hover:bg-[var(--accent-strong)] text-white font-pixel text-xs tracking-wider border-2 border-[var(--ink)] shadow-[3px_3px_0px_var(--ink)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_var(--ink)] rounded-none transition-all min-h-[44px]"
                >
                  <FolderGit2 className="w-4 h-4 mr-2" />
                  <span>{t.hero.ctaProjects}</span>
                </motion.a>

                <motion.a
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  transition={springTransition}
                  href="#contacts"
                  className="inline-flex items-center justify-center px-6 py-3.5 bg-[var(--surface)] border-2 border-[var(--ink)] hover:border-[var(--accent)] text-[var(--ink)] hover:text-[var(--accent)] font-pixel text-xs tracking-wider shadow-[3px_3px_0px_var(--ink)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_var(--ink)] rounded-none transition-all min-h-[44px]"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  <span>{locale === "id" ? "Hubungi Saya" : "Get in Touch"}</span>
                </motion.a>
              </div>
            </motion.div>

            {/* Right Column: Clean Photographic Portrait Card (5 cols) */}
            <motion.div
              initial={{ opacity: 0, y: 32, scale: 0.98, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ ...springTransition, duration: 0.6, delay: 0.15 }}
              data-disable-ripple="true"
              className="lg:col-span-5 flex justify-center lg:justify-end select-text pointer-events-auto"
            >
              <div className="relative w-72 sm:w-80 lg:w-92 aspect-[2/3] rounded-none overflow-hidden bg-[var(--surface)] border-2 border-[var(--line)] shadow-[6px_6px_0px_var(--line)] group">
                <Image
                  src="/foto.png"
                  alt="Dhimas Reza Nafi Wahyudi"
                  fill
                  priority
                  sizes="(max-width: 640px) 288px, (max-width: 1024px) 320px, 368px"
                  className="object-cover object-top select-none group-hover:scale-102 transition-transform duration-500"
                />

                {/* Subtle protective bottom gradient for contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                {/* Bottom title inside card */}
                <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between text-white">
                  <div>
                    <p className="font-display font-bold text-base text-white drop-shadow-sm">
                      Dhimas Reza
                    </p>
                    <p className="text-xs text-white/80 font-mono">
                      Informatics Student
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </RippleGrid>

      {/* Minecraft Pixel Art Parallax Landscape (Footing / Floor transition to About) */}
      <PixelParallaxLandscape />
    </section>
  );
}
