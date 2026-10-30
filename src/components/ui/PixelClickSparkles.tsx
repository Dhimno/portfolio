"use client";

import React, { useEffect, useRef } from "react";

interface SparkleParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  life: number;
  maxLife: number;
}

const SPARKLE_COLORS = ["#facc15", "#f97316", "#ef4444", "#ffffff", "#38bdf8"];

export function PixelClickSparkles() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<SparkleParticle[]>([]);
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Crisp pixel rendering
    ctx.imageSmoothingEnabled = false;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const handlePointerDown = (e: MouseEvent) => {
      // Respect reduced motion
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      const count = 7;
      const originX = e.clientX;
      const originY = e.clientY;

      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.6;
        const speed = 1.6 + Math.random() * 2.8;
        const color = SPARKLE_COLORS[Math.floor(Math.random() * SPARKLE_COLORS.length)];

        particlesRef.current.push({
          x: originX,
          y: originY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.5,
          size: Math.random() > 0.4 ? 4 : 3,
          color,
          alpha: 1,
          life: 0,
          maxLife: 26 + Math.floor(Math.random() * 12),
        });
      }
    };

    window.addEventListener("pointerdown", handlePointerDown, { passive: true });

    let isRunning = true;

    const render = () => {
      if (!isRunning) return;

      if (particlesRef.current.length > 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = particlesRef.current.length - 1; i >= 0; i--) {
          const p = particlesRef.current[i];
          p.life++;
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.12; // Gravity
          p.alpha = Math.max(0, 1 - p.life / p.maxLife);

          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha;
          // Crisp pixel block
          ctx.fillRect(Math.round(p.x), Math.round(p.y), p.size, p.size);

          if (p.life >= p.maxLife) {
            particlesRef.current.splice(i, 1);
          }
        }
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      isRunning = false;
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointerdown", handlePointerDown);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999]"
      aria-hidden="true"
      style={{ imageRendering: "pixelated" }}
    />
  );
}
