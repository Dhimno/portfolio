"use client";

import React, { useState, useEffect, useRef } from "react";

const GLYPHS = "!<>-_\\/[]{}—=+*^?#01X_~%&";

interface GlitchTitleProps {
  text: string;
  className?: string;
}

export function GlitchTitle({ text, className = "" }: GlitchTitleProps) {
  const [displayText, setDisplayText] = useState(text);
  const prevTextRef = useRef(text);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (prevTextRef.current === text) {
      setDisplayText(text);
      return;
    }
    prevTextRef.current = text;

    let frame = 0;
    const totalFrames = 18; // ~300ms at 60fps
    const targetLength = text.length;

    const animate = () => {
      frame++;
      const progress = frame / totalFrames;

      // Characters before progress*targetLength are settled; others are random glitch
      const settledCount = Math.floor(progress * targetLength);

      let scrambled = "";
      for (let i = 0; i < targetLength; i++) {
        if (text[i] === " " || text[i] === "-" || text[i] === "—") {
          scrambled += text[i];
        } else if (i < settledCount) {
          scrambled += text[i];
        } else {
          scrambled += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
      }

      setDisplayText(scrambled);

      if (frame < totalFrames) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayText(text);
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [text]);

  return <span className={className}>{displayText}</span>;
}
