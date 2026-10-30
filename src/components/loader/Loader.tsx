"use client";

import React, { useEffect, useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "../ui/Logo";

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

const COLS = 8;
const ROWS = 10;
const TOTAL_TILES = COLS * ROWS; // 80 tiles

export function Loader() {
  const [loading, setLoading] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const numRef = useRef<HTMLSpanElement>(null);
  const hasFinishedRef = useRef(false);

  // Consistent, deterministic scatter order for all 80 tiles (0.05 to 0.85s delay)
  const order = useMemo(() => {
    const rng = seededRandom(80 * 79 + 13);
    return Array.from({ length: TOTAL_TILES }, () => 0.05 + rng() * 0.8);
  }, []);

  useEffect(() => {
    // 1. Lock scroll on mount
    document.body.style.overflow = "hidden";

    const completeLoader = () => {
      if (hasFinishedRef.current) return;
      hasFinishedRef.current = true;
      setIsExiting(true);
      setTimeout(() => {
        setLoading(false);
        if (typeof document !== "undefined") {
          document.body.style.overflow = "";
        }
      }, 220);
    };

    // 2. Hard absolute safety fallback (1.8s) - guarantees dismissal on any device
    const safetyTimer = setTimeout(() => {
      completeLoader();
    }, 1800);

    // 3. Ultra-lightweight direct DOM updater (ZERO React re-renders during count-up)
    const startTime = performance.now();
    const duration = 1250; // 1.25s count-up
    let rafId: number;
    let lastPercent = -1;

    const tick = (now: number) => {
      const elapsed = Math.max(0, now - startTime);
      const progress = Math.min(1, elapsed / duration);

      // Smooth ease-out cubic deceleration
      const eased = 1 - Math.pow(1 - progress, 2.5);
      const currentPercent = Math.min(100, Math.round(eased * 100));

      if (currentPercent !== lastPercent) {
        lastPercent = currentPercent;
        if (numRef.current) {
          numRef.current.textContent = String(currentPercent);
        }
      }

      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        completeLoader();
      }
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(safetyTimer);
      if (typeof document !== "undefined") {
        document.body.style.overflow = "";
      }
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="originkit-tiles-loader"
          initial={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[99999] select-none overflow-hidden bg-[#15191E]"
          style={{ isolation: "isolate" }}
        >
          {/* Tiles Grid */}
          <div className="relative w-full h-full overflow-hidden isolate">
            {Array.from({ length: TOTAL_TILES }, (_, i) => {
              const col = i % COLS;
              const row = Math.floor(i / COLS);
              const delay = order[i] ?? 0.4;

              return (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    left: `${(col * 100) / COLS}%`,
                    top: `${(row * 100) / ROWS}%`,
                    width: `calc(${100 / COLS}% + 1px)`,
                    height: `calc(${100 / ROWS}% + 1px)`,
                    backgroundColor: "#F4F7FC",
                  }}
                >
                  {/* Hardware-accelerated CSS opacity animation for instant 60/120fps tile flips */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      backgroundColor: "#15191E",
                      animation: `tileInkFlip 0.26s ease-out ${delay}s forwards`,
                    }}
                  />
                </div>
              );
            })}

            {/* Difference Blend Centerpiece: Bouncy Dhimno Logo + Lowered Percentage */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                mixBlendMode: "difference",
                color: "#ffffff",
                pointerEvents: "none",
                whiteSpace: "nowrap",
                letterSpacing: "-0.04em",
                zIndex: 10,
              }}
            >
              <motion.div
                animate={
                  isExiting
                    ? { x: -30, scale: 0.95, opacity: 0.9 }
                    : { x: 0, scale: 1, opacity: 1 }
                }
                transition={
                  isExiting
                    ? { duration: 0.22, ease: "easeIn" }
                    : { duration: 0.35, ease: "easeOut" }
                }
                className="flex flex-col items-center justify-center"
              >
                {/* Bouncy Spring Dhimno Logo */}
                <motion.div
                  initial={{ scale: 0.55, opacity: 0, y: 16 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 340, damping: 20 }}
                  className="mb-2 sm:mb-4"
                >
                  <Logo className="w-14 h-14 sm:w-20 sm:h-20" fill="currentColor" />
                </motion.div>

                {/* Lowered Percentage Counter */}
                <div
                  style={{
                    fontFamily: "var(--font-display), sans-serif",
                    fontWeight: 900,
                    fontSize: "clamp(3.5rem, 14vw, 8.5rem)",
                    fontVariantNumeric: "tabular-nums",
                    display: "inline-flex",
                    alignItems: "flex-start",
                    lineHeight: 1,
                  }}
                >
                  <span ref={numRef}>0</span>
                  <span
                    style={{
                      fontSize: "0.32em",
                      fontStyle: "italic",
                      marginTop: "0.45em",
                      marginLeft: "0.08em",
                    }}
                  >
                    %
                  </span>
                </div>
              </motion.div>
            </div>
          </div>

          <style jsx>{`
            @keyframes tileInkFlip {
              0% {
                opacity: 1;
              }
              100% {
                opacity: 0;
              }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
