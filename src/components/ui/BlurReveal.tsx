"use client";

import React from "react";
import { motion } from "framer-motion";
import { TRANSITION_EASE } from "../../lib/motion";

interface BlurRevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  yOffset?: number;
}

export function BlurReveal({
  children,
  delay = 0,
  className = "",
  yOffset = 20,
}: BlurRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{
        duration: 0.5,
        delay,
        ease: TRANSITION_EASE,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
