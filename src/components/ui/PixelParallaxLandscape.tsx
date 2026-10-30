"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useTheme } from "../../lib/theme";
import { playCampfireCrack } from "../../lib/sound";

interface Ember {
  id: number;
  x: number;
  y: number;
  size: number;
}

export function PixelParallaxLandscape() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Campfire interactive sparks state
  const [embers, setEmbers] = useState<Ember[]>([]);
  const emberIdRef = useRef(0);

  // Shooting star timing state
  const [shootingStarKey, setShootingStarKey] = useState(0);

  useEffect(() => {
    if (!isDark) return;
    // Launch a shooting star every 15 to 20 seconds in Dark Mode
    const interval = setInterval(() => {
      setShootingStarKey((k) => k + 1);
    }, 16000);
    return () => clearInterval(interval);
  }, [isDark]);

  // Track scroll position of the Hero section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Differential parallax translation speeds:
  const yFar = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const yMid = useTransform(scrollYProgress, [0, 1], [0, 95]);
  const yNear = useTransform(scrollYProgress, [0, 1], [0, 145]);

  const handleCampfireClick = () => {
    playCampfireCrack();
    const newEmbers: Ember[] = Array.from({ length: 8 }, () => {
      emberIdRef.current += 1;
      return {
        id: emberIdRef.current,
        x: (Math.random() - 0.5) * 36,
        y: -(28 + Math.random() * 45),
        size: Math.random() > 0.5 ? 3 : 2,
      };
    });
    setEmbers((prev) => [...prev, ...newEmbers]);
    setTimeout(() => {
      setEmbers((prev) => prev.filter((e) => !newEmbers.some((ne) => ne.id === e.id)));
    }, 850);
  };

  return (
    <div
      ref={containerRef}
      className="absolute bottom-0 left-0 right-0 h-[220px] sm:h-[260px] lg:h-[300px] pointer-events-none select-none overflow-hidden z-0"
      aria-hidden="true"
    >
      {/* Soft gradient fade so the top blends cleanly into the ripple grid */}
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-transparent to-[var(--bg)]/80 pointer-events-none z-10" />

      {/* =========================================================================
          DARK MODE: SHOOTING STAR (METEOR PIXEL)
          ========================================================================= */}
      {isDark && (
        <div key={shootingStarKey} className="absolute inset-0 pointer-events-none z-[1] overflow-hidden">
          <motion.div
            initial={{ x: "90vw", y: -20, opacity: 0 }}
            animate={{
              x: ["90vw", "45vw"],
              y: [-20, 140],
              opacity: [0, 1, 0.8, 0],
            }}
            transition={{
              duration: 1.1,
              ease: "easeOut",
              delay: 3.5,
            }}
            className="absolute flex items-center -rotate-[32deg] will-change-transform"
          >
            {/* Meteor Head */}
            <span className="w-2 h-2 bg-white shadow-[0_0_8px_#ffffff]" />
            {/* Stepped Pixel Tail */}
            <span className="w-4 h-1.5 bg-yellow-200/90" />
            <span className="w-6 h-1 bg-amber-400/60" />
            <span className="w-8 h-0.5 bg-orange-500/30" />
          </motion.div>
        </div>
      )}

      {/* =========================================================================
          LAYER 1: FAR VOXEL MOUNTAINS & HORIZON
          ========================================================================= */}
      <motion.div
        style={{ y: yFar }}
        className="absolute inset-x-0 bottom-0 h-[190px] sm:h-[220px] flex items-end will-change-transform opacity-70"
      >
        <svg
          viewBox="0 0 1200 200"
          preserveAspectRatio="none"
          className="w-full h-full"
          style={{ shapeRendering: "crispEdges" }}
        >
          {/* Far stepped voxel mountains */}
          <path
            d="M0,200 
               L0,140 
               H120 V120 H240 V100 H320 V90 H420 V110 H540 V130 H660 V80 H760 V70 H860 V90 H980 V120 H1080 V140 H1200 V200 Z"
            fill={isDark ? "#121b24" : "#cbd5e1"}
          />
          {/* Distant blocky mountain caps */}
          <path
            d="M320,90 H380 V100 H320 Z 
               M760,70 H820 V80 H760 Z"
            fill={isDark ? "#1e293b" : "#e2e8f0"}
          />
        </svg>
      </motion.div>

      {/* =========================================================================
          LAYER 2: MID-GROUND VOXEL RIDGES & BLOCKY PINE TREES
          ========================================================================= */}
      <motion.div
        style={{ y: yMid }}
        className="absolute inset-x-0 bottom-0 h-[140px] sm:h-[170px] flex items-end will-change-transform z-[2] opacity-85"
      >
        <svg
          viewBox="0 0 1200 160"
          preserveAspectRatio="none"
          className="w-full h-full"
          style={{ shapeRendering: "crispEdges" }}
        >
          {/* Middle stepped hill contour */}
          <path
            d="M0,160 
               L0,90 
               H80 V80 H180 V70 H260 V80 H360 V90 H480 V60 H560 V50 H640 V60 H720 V80 H820 V90 H920 V60 H1020 V70 H1120 V80 H1200 V160 Z"
            fill={isDark ? "#142918" : "#4a7c29"}
          />

          {/* Minecraft-style blocky pine trees */}
          <g transform="translate(190, 20)">
            <rect x="12" y="32" width="8" height="24" fill={isDark ? "#1c140e" : "#5c3d1e"} />
            <rect x="0" y="20" width="32" height="12" fill={isDark ? "#1a3820" : "#2f631b"} />
            <rect x="4" y="8" width="24" height="12" fill={isDark ? "#224729" : "#3c7e22"} />
            <rect x="10" y="0" width="12" height="8" fill={isDark ? "#2a5933" : "#469129"} />
          </g>

          <g transform="translate(570, 0)">
            <rect x="12" y="36" width="8" height="24" fill={isDark ? "#1c140e" : "#5c3d1e"} />
            <rect x="0" y="22" width="32" height="14" fill={isDark ? "#1a3820" : "#2f631b"} />
            <rect x="4" y="10" width="24" height="12" fill={isDark ? "#224729" : "#3c7e22"} />
            <rect x="10" y="0" width="12" height="10" fill={isDark ? "#2a5933" : "#469129"} />
          </g>

          <g transform="translate(940, 10)">
            <rect x="12" y="34" width="8" height="24" fill={isDark ? "#1c140e" : "#5c3d1e"} />
            <rect x="0" y="20" width="32" height="14" fill={isDark ? "#1a3820" : "#2f631b"} />
            <rect x="4" y="8" width="24" height="12" fill={isDark ? "#224729" : "#3c7e22"} />
            <rect x="10" y="0" width="12" height="8" fill={isDark ? "#2a5933" : "#469129"} />
          </g>
        </svg>
      </motion.div>

      {/* =========================================================================
          LAYER 3: FOREGROUND MINECRAFT GRASS BLOCKS & FLORA
          ========================================================================= */}
      <motion.div
        style={{ y: yNear }}
        className="absolute inset-x-0 bottom-0 h-[80px] sm:h-[100px] flex items-end will-change-transform z-[3]"
      >
        <svg
          viewBox="0 0 1200 100"
          preserveAspectRatio="none"
          className="w-full h-full"
          style={{ shapeRendering: "crispEdges" }}
        >
          {/* Dirt substrate */}
          <path
            d="M0,100 L0,32 
               H100 V38 H220 V30 H340 V36 H460 V28 H580 V34 H700 V30 H820 V38 H940 V28 H1060 V34 H1200 V100 Z"
            fill={isDark ? "#1c1611" : "#79553a"}
          />

          {/* Dirt pixel blocks */}
          <g fill={isDark ? "#140f0c" : "#5d4029"} opacity="0.65">
            <rect x="40" y="52" width="12" height="12" />
            <rect x="160" y="60" width="16" height="12" />
            <rect x="300" y="48" width="14" height="14" />
            <rect x="480" y="58" width="12" height="12" />
            <rect x="640" y="52" width="16" height="14" />
            <rect x="800" y="64" width="14" height="12" />
            <rect x="980" y="50" width="12" height="12" />
            <rect x="1120" y="62" width="16" height="14" />
          </g>

          {/* Stepped green grass top cover */}
          <path
            d="M0,32 
               H100 V38 H220 V30 H340 V36 H460 V28 H580 V34 H700 V30 H820 V38 H940 V28 H1060 V34 H1200 
               V46 
               H1160 V52 H1140 V44 H1040 V50 H1020 V42 H920 V48 H900 V40 H800 V50 H780 V42 H680 V48 H660 V42 H560 V50 H540 V42 H440 V48 H420 V42 H320 V50 H300 V42 H200 V48 H180 V42 H80 V50 H60 V42 H0 Z"
            fill={isDark ? "#234c22" : "#5b8c32"}
          />

          {/* Grass highlight */}
          <path
            d="M0,32 H100 V34 H0 Z 
               M100,38 H220 V40 H100 Z 
               M220,30 H340 V32 H220 Z 
               M340,36 H460 V38 H340 Z 
               M460,28 H580 V30 H460 Z 
               M580,34 H700 V36 H580 Z 
               M700,30 H820 V32 H700 Z 
               M820,38 H940 V40 H820 Z 
               M940,28 H1060 V30 H940 Z 
               M1060,34 H1200 V36 H1060 Z"
            fill={isDark ? "#326e30" : "#7db343"}
          />

          {/* Flowers */}
          <g transform="translate(140, 14)">
            <rect x="4" y="6" width="3" height="10" fill={isDark ? "#1e4020" : "#387023"} />
            <rect x="2" y="0" width="7" height="6" fill="#e11d48" />
            <rect x="4" y="2" width="3" height="2" fill="#fda4af" />
          </g>

          <g transform="translate(480, 16)">
            <rect x="4" y="6" width="3" height="10" fill={isDark ? "#1e4020" : "#387023"} />
            <rect x="2" y="0" width="7" height="6" fill="#e11d48" />
            <rect x="4" y="2" width="3" height="2" fill="#fda4af" />
          </g>

          <g transform="translate(320, 18)">
            <rect x="4" y="6" width="3" height="10" fill={isDark ? "#1e4020" : "#387023"} />
            <rect x="2" y="0" width="7" height="6" fill="#eab308" />
            <rect x="4" y="2" width="3" height="2" fill="#fef08a" />
          </g>

          <g transform="translate(740, 20)">
            <rect x="4" y="6" width="3" height="10" fill={isDark ? "#1e4020" : "#387023"} />
            <rect x="2" y="0" width="7" height="6" fill="#eab308" />
            <rect x="4" y="2" width="3" height="2" fill="#fef08a" />
          </g>
        </svg>

        {/* =========================================================================
            ITEM 1: INTERACTIVE PIXEL CAMPFIRE & REST AREA
            ========================================================================= */}
        <div
          onClick={handleCampfireClick}
          title="Klik api unggun untuk menyalakan bara!"
          className="absolute right-8 sm:right-24 bottom-3 sm:bottom-4 z-[5] pointer-events-auto cursor-pointer group flex flex-col items-center"
        >
          {/* Rising Pixel Smoke */}
          <div className="relative w-8 h-8 pointer-events-none mb-[-4px]">
            <motion.span
              animate={{ y: [-4, -22], x: [0, -6, 2], opacity: [0.7, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
              className="absolute left-3 bottom-1 w-1.5 h-1.5 bg-stone-400/70"
            />
            <motion.span
              animate={{ y: [-2, -26], x: [0, 5, -3], opacity: [0.6, 0] }}
              transition={{ duration: 2.1, repeat: Infinity, ease: "easeOut", delay: 0.6 }}
              className="absolute left-4 bottom-1 w-2 h-2 bg-stone-300/60"
            />
          </div>

          {/* Campfire Flame & Logs SVG */}
          <div className="relative transition-transform group-hover:scale-110 active:scale-95">
            <svg
              width="28"
              height="24"
              viewBox="0 0 28 24"
              className="drop-shadow-[0_0_8px_rgba(249,115,22,0.6)]"
              style={{ shapeRendering: "crispEdges" }}
            >
              {/* Crossed Wood Logs */}
              <rect x="2" y="18" width="24" height="4" fill="#451a03" />
              <rect x="4" y="16" width="20" height="4" fill="#78350f" />
              <rect x="6" y="20" width="16" height="3" fill="#291102" />

              {/* Animated Pixel Fire: Outer Red Flame */}
              <motion.rect
                animate={{
                  height: [12, 15, 13, 16, 12],
                  y: [4, 1, 3, 0, 4],
                }}
                transition={{ duration: 0.45, repeat: Infinity, ease: "linear" }}
                x="8"
                y="4"
                width="12"
                height="12"
                fill="#dc2626"
              />

              {/* Mid Orange Flame */}
              <motion.rect
                animate={{
                  height: [8, 11, 7, 10, 8],
                  y: [8, 5, 9, 6, 8],
                  x: [10, 9, 11, 10, 10],
                }}
                transition={{ duration: 0.35, repeat: Infinity, ease: "linear" }}
                x="10"
                y="8"
                width="8"
                height="8"
                fill="#ea580c"
              />

              {/* Core Yellow Flame */}
              <motion.rect
                animate={{
                  height: [5, 7, 4, 6, 5],
                  y: [11, 9, 12, 10, 11],
                }}
                transition={{ duration: 0.25, repeat: Infinity, ease: "linear" }}
                x="12"
                y="11"
                width="4"
                height="5"
                fill="#fde047"
              />
            </svg>

            {/* Ember Sparks on Click */}
            <AnimatePresence>
              {embers.map((ember) => (
                <motion.span
                  key={ember.id}
                  initial={{ x: 12, y: 10, opacity: 1, scale: 1 }}
                  animate={{ x: 12 + ember.x, y: 10 + ember.y, opacity: 0, scale: 0.3 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.75, ease: "easeOut" }}
                  style={{ width: ember.size, height: ember.size }}
                  className="absolute bg-amber-300 shadow-[0_0_6px_#f59e0b] pointer-events-none"
                />
              ))}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* =========================================================================
          ITEM 4: PERBANYAK FIREFLIES DI DARK MODE (14 DIVERSE PARTICLES)
          ========================================================================= */}
      {isDark && (
        <div className="absolute inset-0 z-[4] pointer-events-none">
          {[
            { left: "6%", bottom: "24px", dur: 4.2, delay: 0.2, size: 2 },
            { left: "14%", bottom: "68px", dur: 5.1, delay: 1.1, size: 2.5 },
            { left: "21%", bottom: "42px", dur: 3.8, delay: 2.4, size: 1.5 },
            { left: "28%", bottom: "84px", dur: 4.7, delay: 0.5, size: 2 },
            { left: "37%", bottom: "36px", dur: 5.4, delay: 1.8, size: 2 },
            { left: "44%", bottom: "72px", dur: 4.1, delay: 2.8, size: 2.5 },
            { left: "52%", bottom: "50px", dur: 3.9, delay: 0.7, size: 1.5 },
            { left: "59%", bottom: "90px", dur: 5.8, delay: 1.4, size: 2 },
            { left: "67%", bottom: "38px", dur: 4.3, delay: 2.2, size: 2.5 },
            { left: "74%", bottom: "76px", dur: 4.9, delay: 0.3, size: 2 },
            { left: "81%", bottom: "46px", dur: 3.7, delay: 1.9, size: 1.5 },
            { left: "87%", bottom: "88px", dur: 5.2, delay: 2.7, size: 2 },
            { left: "93%", bottom: "32px", dur: 4.6, delay: 1.0, size: 2.5 },
            { left: "97%", bottom: "62px", dur: 4.0, delay: 0.6, size: 2 },
          ].map((fly, idx) => (
            <motion.div
              key={idx}
              animate={{
                y: [-7, 7, -7],
                x: [-5, 5, -5],
                opacity: [0.2, 0.95, 0.2],
              }}
              transition={{
                duration: fly.dur,
                repeat: Infinity,
                ease: "easeInOut",
                delay: fly.delay,
              }}
              style={{
                left: fly.left,
                bottom: fly.bottom,
                width: fly.size,
                height: fly.size,
              }}
              className="absolute bg-yellow-300 shadow-[0_0_8px_#fde047] rounded-none will-change-transform"
            />
          ))}
        </div>
      )}
    </div>
  );
}
