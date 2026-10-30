"use client";

import React, { useRef } from "react";
import { flushSync } from "react-dom";
import { motion } from "framer-motion";
import { useTheme } from "../../lib/theme";
import { playClickSound } from "../../lib/sound";

const LAMP_OFF_SRC =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAQABADASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAIG/8QAIxAAAgIABQQDAAAAAAAAAAAAAQMCBAAREiExBUFRcROBsf/EABQBAQAAAAAAAAAAAAAAAAAAAAX/xAAWEQADAAAAAAAAAAAAAAAAAAAAEiL/2gAMAwEAAhEDEQA/AMBTp03dNglMVuttjqnKQ2UPOfntkOThbqVVUJ12BKnogZQZpy+Ucc8knwePWJrWqyqEHVmrTahEBqpbBoAH1n635wt3a9mjN1p8X2pw0qVEbKB/CO/c4OphSVP/2Q==";

const LAMP_ON_SRC =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAQABADASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAQIEBf/EACMQAAEDAwQDAQEAAAAAAAAAAAQBAgUDESEAEjFBBlFhMkL/xAAUAQEAAAAAAAAAAAAAAAAAAAAF/8QAGBEAAwEBAAAAAAAAAAAAAAAAABIiMUH/2gAMAwEAAhEDEQA/AM+Bg4mS8coRccMOdNG01qVyH/kRvHPKKmMdr8uujPwUTG+NkRpw1AKWCbvHKa2zTGphc9u9p0q+rLqeMl4kSCGkYgtoE0HTahIz3bWGNanPrdyqWzn7p5ibh5CArnyZNMyVLpK0QSkt2BNXtVX+7ol1wuLJiyaHt+6Kyp//2Q==";

export function ThemeToggle() {
  const { theme, toggleTheme, setTheme } = useTheme();
  // In our portfolio:
  // Dark mode = Redstone Lamp OFF (left side), Red on right side
  // Light mode = Redstone Lamp ON (right side), Green on left side
  const isLight = theme === "light";
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    playClickSound();

    const rect = buttonRef.current?.getBoundingClientRect();
    const x = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
    const y = rect ? rect.top + rect.height / 2 : window.innerHeight / 2;

    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const next = isLight ? "dark" : "light";

    // 1. If View Transitions API is supported, use circular clip-path transition
    if (
      typeof document !== "undefined" &&
      document.startViewTransition &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      const transition = document.startViewTransition(() => {
        flushSync(() => {
          if (next === "dark") {
            document.documentElement.classList.add("dark");
          } else {
            document.documentElement.classList.remove("dark");
          }
          setTheme(next);
        });
      });

      transition.ready.then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${Math.ceil(endRadius)}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 800,
            easing: "cubic-bezier(0.16, 1, 0.3, 1)",
            pseudoElement: "::view-transition-new(root)",
          }
        );
      });
      return;
    }

    // 2. Fallback
    toggleTheme();
  };

  return (
    <button
      ref={buttonRef}
      type="button"
      role="switch"
      aria-checked={isLight}
      onClick={handleToggle}
      title={isLight ? "Ganti ke Dark Mode (Mati)" : "Ganti ke Light Mode (Nyala)"}
      aria-label={isLight ? "Ganti ke Dark Mode (Mati)" : "Ganti ke Light Mode (Nyala)"}
      className="relative inline-flex items-center w-[58px] h-[30px] p-[2px] rounded-none bg-[#18181b] border-2 border-[var(--line)] shadow-[2px_2px_0px_var(--line)] hover:border-[var(--accent)] hover:shadow-[3px_3px_0px_var(--accent)] cursor-pointer select-none overflow-hidden shrink-0 transition-all focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
    >
      {/* Background Track: Left is Green (revealed in Light mode), Right is Red (revealed in Dark mode) */}
      <div className="absolute inset-[2px] flex rounded-none overflow-hidden">
        {/* Left Box: Green */}
        <div className="w-1/2 h-full bg-[#16a34a] border-r border-[#14532d]/40 flex items-center justify-center">
          <span className="w-1.5 h-1.5 rounded-none bg-emerald-100/80 shadow-[0_0_2px_#34d399]" />
        </div>
        {/* Right Box: Red */}
        <div className="w-1/2 h-full bg-[#dc2626] border-l border-[#7f1d1d]/40 flex items-center justify-center">
          <span className="w-1.5 h-1.5 rounded-none bg-rose-100/80 shadow-[0_0_2px_#f87171]" />
        </div>
      </div>

      {/* Sliding Knob: Minecraft Redstone Lamp block */}
      <motion.div
        animate={{ x: isLight ? 25 : 0 }}
        transition={{ type: "spring", stiffness: 450, damping: 30 }}
        className="relative z-10 w-[25px] h-[22px] rounded-none overflow-hidden shadow-md border border-black/80"
      >
        {/* Lamp OFF (Dark mode) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={LAMP_OFF_SRC}
          alt="Redstone Lamp Off"
          style={{ imageRendering: "pixelated" }}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
            isLight ? "opacity-0" : "opacity-100"
          }`}
        />
        {/* Lamp ON (Light mode) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={LAMP_ON_SRC}
          alt="Redstone Lamp On"
          style={{ imageRendering: "pixelated" }}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
            isLight ? "opacity-100" : "opacity-0"
          }`}
        />
      </motion.div>
    </button>
  );
}
