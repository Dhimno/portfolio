"use client";

import React, { useState, useEffect } from "react";

interface TypeWriterProps {
  phrases: string[];
  typingSpeed?: number;
  pauseDuration?: number;
}

export function TypeWriter({
  phrases,
  typingSpeed = 65,
  pauseDuration = 2200,
}: TypeWriterProps) {
  const [index, setIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[index % phrases.length];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && displayedText === currentPhrase) {
      timeout = setTimeout(() => setIsDeleting(true), pauseDuration);
    } else if (isDeleting && displayedText === "") {
      timeout = setTimeout(() => {
        setIsDeleting(false);
        setIndex((prev) => (prev + 1) % phrases.length);
      }, 300);
    } else {
      const nextChar = isDeleting
        ? currentPhrase.substring(0, displayedText.length - 1)
        : currentPhrase.substring(0, displayedText.length + 1);

      timeout = setTimeout(
        () => setDisplayedText(nextChar),
        isDeleting ? typingSpeed / 1.6 : typingSpeed
      );
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, index, phrases, typingSpeed, pauseDuration]);

  return (
    <span className="inline-flex items-center text-[var(--accent)] font-semibold min-h-[1.5em]">
      <span>{displayedText}</span>
      <span className="inline-block w-[2.5px] h-[1.1em] ml-1 bg-[var(--accent)] animate-pulse" />
    </span>
  );
}
