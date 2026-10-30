"use client";

import React, { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { RefreshCw, QrCode } from "lucide-react";
import { useI18n } from "../../lib/i18n";

export function LanyardFallback() {
  const { t } = useI18n();
  const [isFlipped, setIsFlipped] = useState(false);

  // Drag physics with spring recovery
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 260, damping: 20 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const rotateZ = useTransform(springX, [-150, 150], [-18, 18]);

  return (
    <div className="relative w-full h-[520px] sm:h-[600px] flex flex-col items-center justify-start select-none touch-none">
      {/* Top Anchor Point */}
      <div className="absolute top-0 z-20 flex flex-col items-center">
        <div className="w-4 h-4 rounded-full bg-[var(--line)] border-2 border-[var(--ink-muted)] shadow-sm" />
      </div>

      {/* SVG Braided Ribbon Strap */}
      <svg
        className="w-48 h-32 -mb-2 overflow-visible pointer-events-none z-10"
        viewBox="0 0 100 80"
      >
        <defs>
          <linearGradient id="strapGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1D4FD8" />
            <stop offset="50%" stopColor="#2F6BFF" />
            <stop offset="100%" stopColor="#1D4FD8" />
          </linearGradient>
        </defs>
        <motion.path
          d="M 50 0 C 48 35, 49 55, 50 80"
          stroke="url(#strapGrad)"
          strokeWidth="10"
          strokeLinecap="round"
          fill="none"
        />
        {/* Ribbon stitched edge accent */}
        <motion.path
          d="M 50 0 C 48 35, 49 55, 50 80"
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="1.5"
          strokeDasharray="3 3"
          fill="none"
        />
      </svg>

      {/* Metallic Badge Clip */}
      <div className="w-8 h-4 bg-gradient-to-b from-slate-200 to-slate-400 dark:from-slate-600 dark:to-slate-800 rounded-t-sm shadow-md z-20 border border-slate-300 dark:border-slate-700" />
      <div className="w-4 h-3 bg-gradient-to-b from-slate-300 to-slate-500 rounded-full shadow-inner -mt-1 z-20" />

      {/* Draggable & Flippable Badge Card */}
      <motion.div
        drag
        dragConstraints={{ left: -120, right: 120, top: -40, bottom: 120 }}
        dragElastic={0.4}
        onDrag={(_, info) => {
          x.set(info.offset.x);
          y.set(info.offset.y);
        }}
        onDragEnd={() => {
          x.set(0);
          y.set(0);
        }}
        style={{
          x: springX,
          y: springY,
          rotateZ,
          perspective: 1000,
        }}
        animate={{
          rotateY: isFlipped ? 180 : 0,
        }}
        transition={{
          rotateY: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
        }}
        className="relative w-64 sm:w-72 h-[380px] sm:h-[410px] cursor-grab active:cursor-grabbing transform-gpu z-30"
      >
        <div
          className="w-full h-full rounded-2xl p-5 shadow-2xl transition-all duration-300 border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] flex flex-col justify-between"
          style={{
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden",
          }}
        >
          {/* Card Front Side */}
          {!isFlipped ? (
            <div className="flex flex-col h-full justify-between">
              {/* Badge Header */}
              <div className="flex items-center justify-between border-b border-[var(--line)] pb-3">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent)]" />
                  <span className="text-[10px] font-mono tracking-widest uppercase font-bold text-[var(--ink-muted)]">
                    UNDIP • INFORMATICS
                  </span>
                </div>
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-[var(--surface-2)] text-[var(--accent)]">
                  DHM-2026
                </span>
              </div>

              {/* Photo & Identity */}
              <div className="flex flex-col items-center text-center my-auto py-2">
                <div className="relative w-28 h-36 sm:w-32 sm:h-40 rounded-xl overflow-hidden border-2 border-[var(--line)] shadow-md bg-[var(--surface-2)] mb-3">
                  <Image
                    src="/foto.png"
                    alt="Dhimas Reza Nafi Wahyudi"
                    fill
                    sizes="(max-width: 640px) 120px, 140px"
                    className="object-cover object-top"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                </div>

                <h3 className="font-display font-extrabold text-lg sm:text-xl text-[var(--ink)] tracking-tight">
                  Dhimas Reza
                </h3>
                <p className="text-xs font-medium text-[var(--accent)] mt-0.5">
                  Informatics Student
                </p>
                <p className="text-[11px] text-[var(--ink-muted)]">
                  Universitas Diponegoro
                </p>
              </div>

              {/* Card Footer Bar */}
              <div className="pt-2 border-t border-[var(--line)] flex items-center justify-between text-[10px] text-[var(--ink-muted)]">
                <span className="font-mono">Security & Systems</span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsFlipped(true);
                  }}
                  className="flex items-center gap-1 text-[var(--accent)] hover:underline font-semibold cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>{t.hero.flipHint}</span>
                </button>
              </div>
            </div>
          ) : (
            /* Card Back Side (Flipped) */
            <div
              className="flex flex-col h-full justify-between rotate-y-180"
              style={{ transform: "rotateY(180deg)" }}
            >
              <div className="flex items-center justify-between border-b border-[var(--line)] pb-3">
                <span className="text-[10px] font-mono tracking-widest uppercase font-bold text-[var(--ink-muted)]">
                  SECURITY CREDENTIAL
                </span>
                <span className="text-[10px] font-mono font-semibold text-[var(--accent)]">
                  SOC VERIFIED
                </span>
              </div>

              <div className="flex flex-col items-center justify-center my-auto text-center gap-3">
                <div className="p-3 rounded-xl bg-white text-black shadow-inner">
                  <QrCode className="w-24 h-24 stroke-[1.5]" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[var(--ink)]">
                    Open to collaborate
                  </p>
                  <p className="text-[11px] text-[var(--ink-muted)] mt-1">
                    dhimnooo@gmail.com
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-[var(--line)] flex items-center justify-between text-[10px] text-[var(--ink-muted)]">
                <span className="font-mono">DHM-2026-UNDIP</span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsFlipped(false);
                  }}
                  className="flex items-center gap-1 text-[var(--accent)] hover:underline font-semibold cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Depan</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
