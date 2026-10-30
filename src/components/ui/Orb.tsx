"use client";

import React from "react";
import { motion } from "framer-motion";

interface OrbProps {
  size?: number;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  delay?: number;
  duration?: number;
}

export function Orb({
  size = 380,
  top,
  left,
  right,
  bottom,
  delay = 0,
  duration = 18,
}: OrbProps) {
  return (
    <motion.div
      animate={{
        x: [0, 24, -18, 0],
        y: [0, -20, 16, 0],
        scale: [1, 1.05, 0.96, 1],
      }}
      transition={{
        duration,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
        delay,
      }}
      className="absolute rounded-full pointer-events-none blur-[90px] opacity-40 -z-10"
      style={{
        position: "absolute",
        width: size,
        height: size,
        top,
        left,
        right,
        bottom,
        background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
      }}
    />
  );
}
