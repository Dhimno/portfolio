"use client";

import React, { useSyncExternalStore } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

const subscribe = () => () => {};

export function ScrollProgress() {
  const isMounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  if (!isMounted) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2.5px] bg-[var(--accent)] origin-left z-50 pointer-events-none"
      style={{ scaleX }}
    />
  );
}
