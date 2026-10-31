"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CharacterId } from "./types";
import { playSpeechBlip } from "../../lib/sound";

interface DialogueBoxProps {
  speaker: CharacterId;
  speakerName: string;
  text: string;
  onDismiss?: () => void;
  position?: "top" | "bottom";
}

const speakerColors: Record<CharacterId, { border: string; accent: string; text: string }> = {
  dhimas: {
    border: "#C2410C",
    accent: "#FB923C",
    text: "#FFFFFF",
  },
  omori: {
    border: "#18181B",
    accent: "#E4E4E7",
    text: "#FFFFFF",
  },
  sans: {
    border: "#1E3A8A",
    accent: "#38BDF8",
    text: "#F0F9FF",
  },
  steve: {
    border: "#065F46",
    accent: "#34D399",
    text: "#ECFDF5",
  },
  claude: {
    border: "#7C2D12",
    accent: "#FB923C",
    text: "#FFF7ED",
  },
  creeper: {
    border: "#14532D",
    accent: "#4ADE80",
    text: "#F0FDF4",
  },
  dog: {
    border: "#3F3F46",
    accent: "#FDE047",
    text: "#FFFFFF",
  },
  enderman: {
    border: "#581C87",
    accent: "#C084FC",
    text: "#FAF5FF",
  },
  ralsei: {
    border: "#065F46",
    accent: "#34D399",
    text: "#ECFDF5",
  },
  papyrus: {
    border: "#9A3412",
    accent: "#FB923C",
    text: "#FFF7ED",
  },
  frisk: {
    border: "#4338CA",
    accent: "#F43F5E",
    text: "#FFF1F2",
  },
  pig: {
    border: "#9D174D",
    accent: "#F472B6",
    text: "#FDF2F8",
  },
};

export function DialogueBox({
  speaker,
  speakerName,
  text,
  onDismiss,
  position = "top",
}: DialogueBoxProps) {
  const [charCount, setCharCount] = useState(0);
  const [horizontalShift, setHorizontalShift] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto horizontal clamping for mobile & responsive viewports to prevent screen edge overflow
  useEffect(() => {
    const updateClamping = () => {
      if (typeof window === "undefined" || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const safeMargin = 12;
      const viewportWidth = window.innerWidth;

      // Base unshifted bounding rect coordinates
      const baseLeft = rect.left - horizontalShift;
      const baseRight = rect.right - horizontalShift;

      let shift = 0;
      if (baseLeft < safeMargin) {
        shift = safeMargin - baseLeft;
      } else if (baseRight > viewportWidth - safeMargin) {
        shift = (viewportWidth - safeMargin) - baseRight;
      }

      if (Math.abs(shift - horizontalShift) > 0.5) {
        setHorizontalShift(shift);
      }
    };

    updateClamping();
    const raf1 = requestAnimationFrame(updateClamping);
    const raf2 = requestAnimationFrame(() => requestAnimationFrame(updateClamping));

    window.addEventListener("resize", updateClamping);

    // Watch for size changes as typewriter text expands
    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined" && containerRef.current) {
      resizeObserver = new ResizeObserver(() => {
        updateClamping();
      });
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      window.removeEventListener("resize", updateClamping);
      resizeObserver?.disconnect();
    };
  }, [text, charCount, horizontalShift]);

  // Typewriter effect using slice counter with 8-bit speech blip
  useEffect(() => {
    const interval = setInterval(() => {
      setCharCount((prev) => {
        if (prev < text.length) {
          if (prev % 2 === 0 && text[prev] !== " " && text[prev] !== "*") {
            playSpeechBlip(speaker);
          }
          return prev + 1;
        }
        clearInterval(interval);
        return prev;
      });
    }, 28);

    return () => clearInterval(interval);
  }, [text, speaker]);

  // 1. Auto dismiss after exactly 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss?.();
    }, 5000);
    return () => clearTimeout(timer);
  }, [text, onDismiss]);

  // 2. Click outside listener to immediately close the dialog
  useEffect(() => {
    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        onDismiss?.();
      }
    };

    const timer = setTimeout(() => {
      document.addEventListener("mousedown", handlePointerDown);
      document.addEventListener("touchstart", handlePointerDown);
    }, 50);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
    };
  }, [onDismiss]);

  const displayedText = text.slice(0, charCount);
  const isTyping = charCount < text.length;
  const colors = speakerColors[speaker] || speakerColors.omori;

  return (
    <AnimatePresence>
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0, scale: 0.85, y: position === "top" ? 8 : -8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.85, y: position === "top" ? 8 : -8 }}
        transition={{ duration: 0.18, ease: "easeOut" }}
        onClick={(e) => {
          e.stopPropagation();
          onDismiss?.();
        }}
        style={{
          marginLeft: `${horizontalShift}px`,
        }}
        className={`absolute z-50 pointer-events-auto cursor-pointer max-w-[calc(100vw-24px)] sm:max-w-[340px] w-max select-none ${
          position === "top"
            ? "bottom-full mb-3 left-1/2 -translate-x-1/2"
            : "top-full mt-3 left-1/2 -translate-x-1/2"
        }`}
      >
        {/* Retro Undertale / Omori Pixel Dialogue Bubble */}
        <div
          className="relative px-3.5 py-2.5 rounded-none bg-black/95 text-white font-pixel text-[11px] sm:text-xs leading-relaxed shadow-2xl"
          style={{
            border: "3px solid #FFFFFF",
            boxShadow: `0 0 0 2px ${colors.border}, 4px 6px 0px rgba(0, 0, 0, 0.4)`,
          }}
        >
          {/* Speaker Tag */}
          <div className="flex items-center justify-between gap-2 mb-1.5 pb-1 border-b border-white/20">
            <span
              className="text-[10px] tracking-wider uppercase font-bold"
              style={{ color: colors.accent }}
            >
              {speakerName}
            </span>
            <span className="text-[9px] text-white/40 tracking-tighter">
              [5s / click to close]
            </span>
          </div>

          {/* Dialogue Text */}
          <p className="min-h-[1.5rem] tracking-tight whitespace-pre-wrap font-pixel">
            {displayedText}
            {isTyping && (
              <span className="inline-block w-2 h-3.5 bg-white ml-1 animate-pulse align-middle" />
            )}
          </p>

          {/* Retro RPG Advance Prompt Cursor */}
          {!isTyping && (
            <div className="text-right mt-1">
              <span className="inline-block text-[10px] text-white animate-bounce">
                ▼
              </span>
            </div>
          )}

          {/* Pointer Triangle Arrow (Pixel style) with dynamic center clamping */}
          <div
            className={`absolute w-0 h-0 border-x-[6px] border-x-transparent ${
              position === "top"
                ? "top-full border-t-[8px] border-t-white"
                : "bottom-full border-b-[8px] border-b-white"
            }`}
            style={{
              left: `clamp(14px, calc(50% - ${horizontalShift}px), calc(100% - 14px))`,
              transform: "translateX(-50%)",
            }}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
