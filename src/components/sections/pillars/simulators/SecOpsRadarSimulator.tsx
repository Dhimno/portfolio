"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { playPokeSound } from "../../../../lib/sound";

interface Anomaly {
  id: string;
  r: number; // distance ratio from center [0..1]
  angle: number; // angle in radians [0..2PI]
  type: string;
  ip: string;
  discovered: boolean;
  intensity: number; // phosphor fade [0..1]
  status: "idle" | "locking" | "neutralizing" | "destroyed";
  lockProgress: number; // 0 to 1
  burstRadius?: number;
}

const THREAT_TYPES = [
  "CVE_PROBE",
  "PORT_SCAN",
  "MAL_PKT",
  "BRUTE_FRC",
  "SYN_FLOOD",
  "RANSOM_SIG",
];

export function SecOpsRadarSimulator() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [neutralizedCount, setNeutralizedCount] = useState<number>(0);
  const [activeBanner, setActiveBanner] = useState<string | null>(null);
  const [systemStatus, setSystemStatus] = useState<string>("MONITORING // STANDBY");

  // Keep state refs for 60fps animation loop
  const anomaliesRef = useRef<Anomaly[]>([]);
  const sweepAngleRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const nextSpawnTimeRef = useRef<number>(0);
  const rafIdRef = useRef<number | null>(null);
  const bannerTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const triggerNeutralization = useCallback((target: Anomaly) => {
    target.status = "neutralizing";
    target.burstRadius = 4;

    // Trigger sound effect
    try {
      playPokeSound();
    } catch {
      // AudioContext unavailable or muted
    }

    setNeutralizedCount((prev) => prev + 1);
    const bannerMsg = `THREAT NEUTRALIZED // LOGGED [${target.type}]`;
    setActiveBanner(bannerMsg);
    setSystemStatus(`CONTAINED // ${target.ip}`);

    if (bannerTimeoutRef.current) {
      clearTimeout(bannerTimeoutRef.current);
    }
    bannerTimeoutRef.current = setTimeout(() => {
      setActiveBanner(null);
      setSystemStatus("MONITORING // STANDBY");
    }, 2400);
  }, []);

  const spawnAnomaly = useCallback((canvasRadius: number, customAngle?: number, customDistRatio?: number) => {
    if (anomaliesRef.current.filter((a) => a.status !== "destroyed").length >= 3) return;

    const angle = customAngle !== undefined ? customAngle : Math.random() * Math.PI * 2;
    const r = customDistRatio !== undefined ? customDistRatio : 0.28 + Math.random() * 0.58;
    const type = THREAT_TYPES[Math.floor(Math.random() * THREAT_TYPES.length)];
    const ip = `192.168.${Math.floor(Math.random() * 20) + 1}.${Math.floor(Math.random() * 240) + 10}`;

    const newAnomaly: Anomaly = {
      id: Math.random().toString(36).substring(2, 9),
      r,
      angle,
      type,
      ip,
      discovered: false,
      intensity: 0,
      status: "idle",
      lockProgress: 0,
    };

    anomaliesRef.current.push(newAnomaly);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let width = container.clientWidth || 280;
    let height = container.clientHeight || 280;

    const updateCanvasDimensions = () => {
      if (!canvas || !container) return;
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(rect.width, 220);
      height = Math.max(rect.height, 220);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.scale(dpr, dpr);
      }
    };

    updateCanvasDimensions();

    const resizeObserver = new ResizeObserver(() => {
      updateCanvasDimensions();
    });
    resizeObserver.observe(container);

    // Initial spawn
    spawnAnomaly(Math.min(width, height) / 2);
    nextSpawnTimeRef.current = performance.now() + 2500;

    const render = (time: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = time;
      const dt = Math.min((time - lastTimeRef.current) / 1000, 0.1);
      lastTimeRef.current = time;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        rafIdRef.current = requestAnimationFrame(render);
        return;
      }

      const cx = width / 2;
      const cy = height / 2;
      const maxRadius = Math.min(width, height) / 2 - 14;

      if (maxRadius <= 10) {
        rafIdRef.current = requestAnimationFrame(render);
        return;
      }

      // Check spawn
      if (time > nextSpawnTimeRef.current) {
        spawnAnomaly(maxRadius);
        nextSpawnTimeRef.current = time + 4000 + Math.random() * 3500;
      }

      // Rotate sweep beam (approx 1 rotation every ~3.4 seconds)
      const sweepSpeed = 1.85; // rad/sec
      const prevSweep = sweepAngleRef.current;
      sweepAngleRef.current = (sweepAngleRef.current + sweepSpeed * dt) % (Math.PI * 2);
      const currentSweep = sweepAngleRef.current;

      // Clear frame
      ctx.clearRect(0, 0, width, height);

      // 1. Radar PPI Backdrop Scope
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, maxRadius, 0, Math.PI * 2);
      const bgGrad = ctx.createRadialGradient(cx, cy, 4, cx, cy, maxRadius);
      bgGrad.addColorStop(0, "#081b11");
      bgGrad.addColorStop(0.7, "#04100a");
      bgGrad.addColorStop(1, "#020704");
      ctx.fillStyle = bgGrad;
      ctx.fill();

      // Outer bezel ring
      ctx.strokeStyle = "rgba(34, 197, 94, 0.6)";
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.restore();

      // 2. Concentric Range Rings
      const ringSteps = [0.25, 0.5, 0.75, 1.0];
      const rangeLabels = ["25km", "50km", "75km", "100km"];
      ctx.save();
      ringSteps.forEach((step, idx) => {
        const ringR = maxRadius * step;
        ctx.beginPath();
        ctx.arc(cx, cy, ringR, 0, Math.PI * 2);
        ctx.strokeStyle = step === 1.0 ? "rgba(34, 197, 94, 0.45)" : "rgba(34, 197, 94, 0.18)";
        ctx.lineWidth = 1;
        ctx.stroke();

        // Distance text on 12 o'clock radial axis
        if (ringR > 25) {
          ctx.font = "8px monospace";
          ctx.fillStyle = "rgba(34, 197, 94, 0.4)";
          ctx.textAlign = "center";
          ctx.fillText(rangeLabels[idx], cx + 18, cy - ringR + 10);
        }
      });

      // 3. Crosshairs & Angle Tick Marks
      ctx.strokeStyle = "rgba(34, 197, 94, 0.22)";
      ctx.lineWidth = 1;

      // Horizontal axis
      ctx.beginPath();
      ctx.moveTo(cx - maxRadius, cy);
      ctx.lineTo(cx + maxRadius, cy);
      ctx.stroke();

      // Vertical axis
      ctx.beginPath();
      ctx.moveTo(cx, cy - maxRadius);
      ctx.lineTo(cx, cy + maxRadius);
      ctx.stroke();

      // Outer degree ticks every 30 deg
      for (let deg = 0; deg < 360; deg += 30) {
        const rad = (deg * Math.PI) / 180;
        const tickInner = maxRadius - (deg % 90 === 0 ? 8 : 4);
        const x1 = cx + Math.cos(rad) * tickInner;
        const y1 = cy + Math.sin(rad) * tickInner;
        const x2 = cx + Math.cos(rad) * maxRadius;
        const y2 = cy + Math.sin(rad) * maxRadius;

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = deg % 90 === 0 ? "rgba(74, 222, 128, 0.55)" : "rgba(34, 197, 94, 0.28)";
        ctx.stroke();
      }

      // Cardinal labels (N, E, S, W)
      ctx.font = "9px monospace";
      ctx.fillStyle = "rgba(74, 222, 128, 0.75)";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("000°", cx, cy - maxRadius + 14);
      ctx.fillText("090°", cx + maxRadius - 14, cy);
      ctx.fillText("180°", cx, cy + maxRadius - 14);
      ctx.fillText("270°", cx - maxRadius + 14, cy);
      ctx.restore();

      // 4. Sweep Beam with Phosphor Trailing Glow Wedge
      ctx.save();
      // Clip to radar circle
      ctx.beginPath();
      ctx.arc(cx, cy, maxRadius, 0, Math.PI * 2);
      ctx.clip();

      // Trailing phosphor fade arc (draw 20 thin triangular segments trailing behind)
      const trailAngle = 0.75; // radians (~43 deg)
      const segments = 18;
      for (let i = 0; i < segments; i++) {
        const segAlpha = (1 - i / segments) * 0.18;
        const startA = currentSweep - ((i + 1) / segments) * trailAngle;
        const endA = currentSweep - (i / segments) * trailAngle;

        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, maxRadius, startA, endA);
        ctx.closePath();
        ctx.fillStyle = `rgba(34, 197, 94, ${segAlpha})`;
        ctx.fill();
      }

      // Main sweep line
      const sweepX = cx + Math.cos(currentSweep) * maxRadius;
      const sweepY = cy + Math.sin(currentSweep) * maxRadius;

      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(sweepX, sweepY);
      ctx.strokeStyle = "#4ade80";
      ctx.lineWidth = 1.8;
      ctx.shadowColor = "#4ade80";
      ctx.shadowBlur = 6;
      ctx.stroke();
      ctx.restore();

      // 5. Update & Draw Anomalies
      let activeTarget: Anomaly | null = null;

      anomaliesRef.current.forEach((target) => {
        if (target.status === "destroyed") return;

        // Check if sweep line passed over anomaly
        // Target angle in [0, 2PI]
        const targetAngle = (target.angle % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);
        const swept =
          (prevSweep <= currentSweep && targetAngle >= prevSweep && targetAngle <= currentSweep) ||
          (prevSweep > currentSweep && (targetAngle >= prevSweep || targetAngle <= currentSweep));

        if (swept) {
          target.discovered = true;
          target.intensity = 1.0;
        } else {
          // Phosphor fade
          target.intensity = Math.max(target.intensity - dt * 0.35, target.discovered ? 0.3 : 0);
        }

        const dist = target.r * maxRadius;
        const tx = cx + Math.cos(target.angle) * dist;
        const ty = cy + Math.sin(target.angle) * dist;

        if (!target.discovered) return;

        // Anomaly blip
        ctx.save();
        const isThreat = true;
        const blipColor = isThreat
          ? `rgba(239, 68, 68, ${0.4 + target.intensity * 0.6})`
          : `rgba(74, 222, 128, ${0.4 + target.intensity * 0.6})`;

        ctx.beginPath();
        ctx.arc(tx, ty, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = blipColor;
        ctx.shadowColor = isThreat ? "#ef4444" : "#4ade80";
        ctx.shadowBlur = 8 * target.intensity;
        ctx.fill();

        // Ping ripple when fresh illuminated
        if (target.intensity > 0.8) {
          ctx.beginPath();
          ctx.arc(tx, ty, (1 - target.intensity) * 22 + 4, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(239, 68, 68, ${(target.intensity - 0.8) * 4})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
        ctx.restore();

        // Find candidate for reticle lock
        if (!activeTarget) {
          activeTarget = target;
        }
      });

      // 6. Targeting Reticle & Takedown Execution
      if (activeTarget) {
        const target = activeTarget as Anomaly;
        const dist = target.r * maxRadius;
        const tx = cx + Math.cos(target.angle) * dist;
        const ty = cy + Math.sin(target.angle) * dist;

        if (target.status === "idle") {
          target.status = "locking";
          target.lockProgress = 0;
        }

        if (target.status === "locking") {
          target.lockProgress = Math.min(target.lockProgress + dt * 1.25, 1);
          setSystemStatus(`LOCKING // ${target.type} (${Math.round(target.lockProgress * 100)}%)`);

          // Draw animated acquiring brackets
          const bracketSize = 22 - target.lockProgress * 8; // collapses from 22 down to 14
          ctx.save();
          ctx.strokeStyle = target.lockProgress >= 1 ? "#ef4444" : "#eab308";
          ctx.lineWidth = 1.5;
          ctx.shadowColor = ctx.strokeStyle;
          ctx.shadowBlur = 5;

          // Corner brackets
          const arm = 4;
          // Top-Left
          ctx.beginPath();
          ctx.moveTo(tx - bracketSize, ty - bracketSize + arm);
          ctx.lineTo(tx - bracketSize, ty - bracketSize);
          ctx.lineTo(tx - bracketSize + arm, ty - bracketSize);
          ctx.stroke();

          // Top-Right
          ctx.beginPath();
          ctx.moveTo(tx + bracketSize - arm, ty - bracketSize);
          ctx.lineTo(tx + bracketSize, ty - bracketSize);
          ctx.lineTo(tx + bracketSize, ty - bracketSize + arm);
          ctx.stroke();

          // Bottom-Left
          ctx.beginPath();
          ctx.moveTo(tx - bracketSize, ty + bracketSize - arm);
          ctx.lineTo(tx - bracketSize, ty + bracketSize);
          ctx.lineTo(tx - bracketSize + arm, ty + bracketSize);
          ctx.stroke();

          // Bottom-Right
          ctx.beginPath();
          ctx.moveTo(tx + bracketSize - arm, ty + bracketSize);
          ctx.lineTo(tx + bracketSize, ty + bracketSize);
          ctx.lineTo(tx + bracketSize, ty + bracketSize - arm);
          ctx.stroke();

          // Target tag text
          ctx.font = "8px monospace";
          ctx.fillStyle = ctx.strokeStyle;
          ctx.textAlign = "center";
          ctx.fillText(`[ ${target.type} ]`, tx, ty - bracketSize - 4);
          ctx.restore();

          if (target.lockProgress >= 1) {
            triggerNeutralization(target);
          }
        } else if (target.status === "neutralizing") {
          // Neutralization containment burst animation
          target.burstRadius = (target.burstRadius || 4) + dt * 45;
          const burstAlpha = Math.max(1 - (target.burstRadius - 4) / 28, 0);

          ctx.save();
          ctx.beginPath();
          ctx.arc(tx, ty, target.burstRadius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(239, 68, 68, ${burstAlpha})`;
          ctx.lineWidth = 2;
          ctx.stroke();

          // Crosshair containment snap
          ctx.beginPath();
          ctx.moveTo(tx - 8, ty);
          ctx.lineTo(tx + 8, ty);
          ctx.moveTo(tx, ty - 8);
          ctx.lineTo(tx, ty + 8);
          ctx.strokeStyle = `rgba(74, 222, 128, ${burstAlpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
          ctx.restore();

          if (burstAlpha <= 0) {
            target.status = "destroyed";
          }
        }
      }

      // Cleanup destroyed anomalies
      anomaliesRef.current = anomaliesRef.current.filter((a) => a.status !== "destroyed");

      rafIdRef.current = requestAnimationFrame(render);
    };

    rafIdRef.current = requestAnimationFrame(render);

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      if (bannerTimeoutRef.current) clearTimeout(bannerTimeoutRef.current);
      resizeObserver.disconnect();
    };
  }, [spawnAnomaly, triggerNeutralization]);

  // Click handler to manually ping / trigger anomaly at cursor location
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const maxRadius = Math.min(rect.width, rect.height) / 2 - 14;

    const dx = x - cx;
    const dy = y - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist <= maxRadius) {
      const angle = (Math.atan2(dy, dx) + Math.PI * 2) % (Math.PI * 2);
      const r = Math.min(Math.max(dist / maxRadius, 0.2), 0.88);
      spawnAnomaly(maxRadius, angle, r);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex flex-col justify-between select-none font-mono"
    >
      {/* Top Telemetry Header */}
      <div className="flex items-center justify-between pb-1.5 border-b border-dashed border-[var(--line)] text-[10px] text-[var(--ink-muted)]">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-pixel text-[9px] text-[var(--accent)] tracking-wider">
            RADAR // PPI-90
          </span>
        </div>
        <span className="text-[10px] text-emerald-500/90 font-mono tracking-tight">
          BAND: 9.4 GHz
        </span>
      </div>

      {/* Main Radar Display Viewport */}
      <div className="relative my-auto py-1 flex items-center justify-center w-full min-h-[210px] sm:min-h-[230px]">
        <canvas
          ref={canvasRef}
          onClick={handleCanvasClick}
          role="img"
          aria-label="Security Operations radar simulator displaying rotating sweep and threat detection"
          className="cursor-crosshair rounded-full shadow-inner shadow-black/60 touch-none"
        />

        {/* Transient Status Banner Overlay */}
        {activeBanner && (
          <div
            role="status"
            aria-live="polite"
            className="absolute top-2 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-red-950/90 border border-red-500/80 text-red-200 text-[10px] font-pixel tracking-wider shadow-lg shadow-red-950/50 flex items-center gap-1.5 pointer-events-none transition-all duration-200 animate-in fade-in zoom-in-95"
          >
            <span className="inline-block w-1.5 h-1.5 bg-red-400 animate-ping" />
            <span>{activeBanner}</span>
          </div>
        )}
      </div>

      {/* Bottom Telemetry HUD Status */}
      <div className="pt-1.5 border-t border-dashed border-[var(--line)] text-[10px] text-[var(--ink-muted)] flex items-center justify-between">
        <div className="flex items-center gap-1.5 truncate max-w-[65%]">
          <span className="text-[9px] text-[var(--ink-muted)]">LOG:</span>
          <span className="font-mono text-[10px] text-[var(--ink)] truncate">
            {systemStatus}
          </span>
        </div>
        <div className="flex items-center gap-1 text-[9px] text-emerald-500/90 font-pixel shrink-0">
          <span>MITIGATED:</span>
          <span className="text-[10px] text-[var(--ink)] font-mono font-bold">
            {neutralizedCount}
          </span>
        </div>
      </div>
    </div>
  );
}
