"use client";

import React from "react";

interface MarqueeProps {
  items: string[];
  speed?: number;
  reverse?: boolean;
}

export function Marquee({ items, speed = 28, reverse = false }: MarqueeProps) {
  // Quadruple items to ensure seamless infinite looping without visible gaps
  const repeated = [...items, ...items, ...items, ...items];

  return (
    <div className="relative w-full overflow-hidden py-3 select-none [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
      <div
        className={`flex items-center gap-4 w-max ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        } hover:[animation-play-state:paused]`}
        style={{
          animationDuration: `${speed}s`,
        }}
      >
        {repeated.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--surface-2)] text-[var(--ink)] border border-[var(--line)] text-sm font-medium whitespace-nowrap"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
