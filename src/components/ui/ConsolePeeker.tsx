"use client";

import React, { useEffect, useState } from "react";

interface ConsolePeekerProps {
  triggerIndex: number;
  variant?: "A" | "B" | "C";
}

export function ConsolePeeker({ triggerIndex, variant = "A" }: ConsolePeekerProps) {
  // Randomly peek from left or right shoulder
  const [prevIndex, setPrevIndex] = useState(triggerIndex);
  const [side, setSide] = useState<"left" | "right">("right");
  const [isPeeking, setIsPeeking] = useState(true);

  if (prevIndex !== triggerIndex) {
    setPrevIndex(triggerIndex);
    setIsPeeking(false);
  }

  useEffect(() => {
    if (!isPeeking) {
      const timer = setTimeout(() => {
        setSide(Math.random() > 0.5 ? "left" : "right");
        setIsPeeking(true);
      }, 180);
      return () => clearTimeout(timer);
    }
  }, [isPeeking]);

  // Different mascot skins per variant
  return (
    <div
      className={`absolute pointer-events-none transition-all duration-300 ease-out z-0 ${
        side === "left" ? "left-[10%] sm:left-[14%]" : "right-[10%] sm:right-[14%]"
      } ${
        isPeeking
          ? "top-[-38px] sm:top-[-46px] opacity-100 translate-y-0"
          : "top-[-10px] opacity-0 translate-y-4"
      }`}
      aria-hidden="true"
    >
      {variant === "A" && (
        /* Cute Pixel Ghost / Gengar Peeker */
        <div className="relative flex flex-col items-center">
          <svg
            width="44"
            height="38"
            viewBox="0 0 22 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)]"
            style={{ imageRendering: "pixelated" }}
          >
            {/* Horns / Ears */}
            <rect x="2" y="2" width="2" height="4" fill="#a3235a" />
            <rect x="18" y="2" width="2" height="4" fill="#a3235a" />
            <rect x="4" y="4" width="2" height="3" fill="#c43b78" />
            <rect x="16" y="4" width="2" height="3" fill="#c43b78" />

            {/* Body */}
            <rect x="4" y="6" width="14" height="13" fill="#a3235a" />
            <rect x="6" y="5" width="10" height="2" fill="#c43b78" />

            {/* Red Glowing Eyes */}
            <rect x="6" y="9" width="3" height="3" fill="#ff3030" />
            <rect x="7" y="10" width="1" height="1" fill="#fff" />
            <rect x="13" y="9" width="3" height="3" fill="#ff3030" />
            <rect x="14" y="10" width="1" height="1" fill="#fff" />

            {/* Mischievous Grin */}
            <rect x="8" y="14" width="6" height="2" fill="#220011" />
            <rect x="9" y="14" width="1" height="1" fill="#fff" />
            <rect x="12" y="14" width="1" height="1" fill="#fff" />

            {/* Little Hands Clinging to Shell */}
            <rect x="2" y="16" width="3" height="3" fill="#d9619a" />
            <rect x="17" y="16" width="3" height="3" fill="#d9619a" />
          </svg>
          <span className="font-pixel text-[8px] text-[var(--accent)] tracking-tighter opacity-80 mt-[-2px]">
            {side === "left" ? "◄ PEEK!" : "PEEK! ►"}
          </span>
        </div>
      )}

      {variant === "B" && (
        /* Cute Pixel Pikachu-style Peeker with Cheeks */
        <div className="relative flex flex-col items-center">
          <svg
            width="44"
            height="40"
            viewBox="0 0 22 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)]"
            style={{ imageRendering: "pixelated" }}
          >
            {/* Long Ears */}
            <rect x="3" y="1" width="2" height="5" fill="#facc15" />
            <rect x="3" y="0" width="2" height="2" fill="#18181b" />
            <rect x="17" y="1" width="2" height="5" fill="#facc15" />
            <rect x="17" y="0" width="2" height="2" fill="#18181b" />

            {/* Head */}
            <rect x="5" y="6" width="12" height="14" fill="#facc15" />
            <rect x="7" y="5" width="8" height="2" fill="#fde047" />

            {/* Eyes */}
            <rect x="7" y="9" width="2" height="3" fill="#18181b" />
            <rect x="7" y="9" width="1" height="1" fill="#fff" />
            <rect x="13" y="9" width="2" height="3" fill="#18181b" />
            <rect x="13" y="9" width="1" height="1" fill="#fff" />

            {/* Red Cheeks */}
            <rect x="5" y="12" width="2" height="2" fill="#ef4444" />
            <rect x="15" y="12" width="2" height="2" fill="#ef4444" />

            {/* Cute Mouth */}
            <rect x="10" y="13" width="2" height="1" fill="#18181b" />

            {/* Paws on Console */}
            <rect x="4" y="17" width="3" height="3" fill="#eab308" />
            <rect x="15" y="17" width="3" height="3" fill="#eab308" />
          </svg>
          <span className="font-pixel text-[8px] text-amber-500 tracking-tighter opacity-80 mt-[-2px]">
            ⚡ HI!
          </span>
        </div>
      )}

      {variant === "C" && (
        /* Cute Pixel Robot Peeker with Antenna */
        <div className="relative flex flex-col items-center">
          <svg
            width="44"
            height="38"
            viewBox="0 0 22 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)]"
            style={{ imageRendering: "pixelated" }}
          >
            {/* Antenna with Pulsing Tip */}
            <rect x="10" y="0" width="2" height="2" fill="#22c55e" />
            <rect x="10" y="2" width="2" height="4" fill="#71717a" />

            {/* Robot Head */}
            <rect x="4" y="6" width="14" height="13" fill="#52525b" />
            <rect x="5" y="7" width="12" height="2" fill="#71717a" />

            {/* Visor Screen with Matrix Cyan Eyes */}
            <rect x="6" y="9" width="10" height="4" fill="#09090b" />
            <rect x="7" y="10" width="2" height="2" fill="#06b6d4" />
            <rect x="13" y="10" width="2" height="2" fill="#06b6d4" />

            {/* Metallic Claws Gripping Console */}
            <rect x="3" y="16" width="3" height="3" fill="#a1a1aa" />
            <rect x="16" y="16" width="3" height="3" fill="#a1a1aa" />
          </svg>
          <span className="font-pixel text-[8px] text-cyan-400 tracking-tighter opacity-80 mt-[-2px]">
            [0101]
          </span>
        </div>
      )}
    </div>
  );
}
