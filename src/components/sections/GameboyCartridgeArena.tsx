"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import Matter from "matter-js";
import { projects, Project } from "../../data/projects";
import { GameboyConsole } from "./GameboyConsole";
import {
  ProjectCartridge,
  CARTRIDGE_WIDTH,
  CARTRIDGE_HEIGHT,
  MOBILE_CARTRIDGE_WIDTH,
  MOBILE_CARTRIDGE_HEIGHT,
} from "../ui/ProjectCartridge";
import {
  playCartridgeSnap,
  playBootChime,
  playCartridgeEject,
  playCartridgeBounce,
} from "../../lib/sound";

const { Engine, World, Bodies, Body } = Matter;

export function GameboyCartridgeArena() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [isSlotHovered, setIsSlotHovered] = useState(false);
  const [dockedSlug, setDockedSlug] = useState<string | null>(null);
  const [draggingSlug, setDraggingSlug] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Mobile guided docking and ejection animation state
  const shelfCellRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [animatingInsertSlug, setAnimatingInsertSlug] = useState<string | null>(null);
  const [animatingEjectSlug, setAnimatingEjectSlug] = useState<string | null>(null);
  const [insertDelta, setInsertDelta] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [ejectDelta, setEjectDelta] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const arenaRef = useRef<HTMLDivElement>(null);
  const slotBayRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const bodiesRef = useRef<Record<string, Matter.Body>>({});
  const cartridgeElsRef = useRef<Record<string, HTMLDivElement | null>>({});
  const rafIdRef = useRef<number | null>(null);
  const hasSpawnedRef = useRef(false);

  // Active drag state (desktop physics only)
  const dragInfoRef = useRef<{
    slug: string;
    pointerId: number;
    startX: number;
    startY: number;
    prevX: number;
    prevY: number;
    prevTime: number;
    vx: number;
    vy: number;
    isClick: boolean;
  } | null>(null);

  const activeProjectRef = useRef<Project | null>(null);
  const dockedSlugRef = useRef<string | null>(null);

  useEffect(() => {
    activeProjectRef.current = activeProject;
    dockedSlugRef.current = dockedSlug;
  }, [activeProject, dockedSlug]);

  // Viewport mode listener (< 768px disables Matter.js simulation completely)
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Matter.js 2D World Setup (Desktop only)
  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      hasSpawnedRef.current = false;
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      if (engineRef.current) {
        World.clear(engineRef.current.world, false);
        Engine.clear(engineRef.current);
        engineRef.current = null;
      }
      bodiesRef.current = {};
      return;
    }

    if (isMobile || !arenaRef.current) return;

    const width = arenaRef.current.clientWidth || 900;
    const height = arenaRef.current.clientHeight || 820;

    const engine = Engine.create({
      gravity: { x: 0, y: 0.85, scale: 0.001 },
    });
    engineRef.current = engine;

    // Boundaries: floor, left and right walls
    const floor = Bodies.rectangle(width / 2, height + 25, width * 3, 60, {
      isStatic: true,
      friction: 0.85,
      restitution: 0.38,
    });
    const wallHeight = height * 10;
    const leftWall = Bodies.rectangle(-25, height / 2 - wallHeight / 2 + height, 60, wallHeight, {
      isStatic: true,
      friction: 0.5,
    });
    const rightWall = Bodies.rectangle(
      width + 25,
      height / 2 - wallHeight / 2 + height,
      60,
      wallHeight,
      {
        isStatic: true,
        friction: 0.5,
      }
    );

    // Physical Shields: GameBoy Console Chassis & Project Dossier Colliders
    const consoleWidth = Math.min(width * 0.72, 540);
    const consoleHeight = Math.min(consoleWidth * 0.65, 340);
    const consoleTop = width < 640 ? 64 : 80;
    const consoleY = consoleTop + consoleHeight / 2;
    const consoleShield = Bodies.rectangle(
      width / 2,
      consoleY,
      consoleWidth,
      consoleHeight,
      {
        isStatic: true,
        chamfer: { radius: 36 },
        friction: 0.15,
        restitution: 0.35,
      }
    );

    const dossierWidth = Math.min(width * 0.68, 500);
    const dossierHeight = 240;
    const dossierY = consoleY + consoleHeight / 2 + dossierHeight / 2 + 15;
    const dossierShield = Bodies.rectangle(
      width / 2,
      dossierY,
      dossierWidth,
      dossierHeight,
      {
        isStatic: true,
        chamfer: { radius: 28 },
        friction: 0.15,
        restitution: 0.3,
      }
    );

    World.add(engine.world, [floor, leftWall, rightWall, consoleShield, dossierShield]);

    // Collision sound trigger
    Matter.Events.on(engine, "collisionStart", (event) => {
      event.pairs.forEach((pair) => {
        const speedA = pair.bodyA.speed || 0;
        const speedB = pair.bodyB.speed || 0;
        const maxSpeed = Math.max(speedA, speedB);
        if (maxSpeed > 2.2) {
          try {
            playCartridgeBounce(Math.min(1, maxSpeed / 10));
          } catch {}
        }
      });
    });

    // Sync loop: updates cartridge DOM transforms directly on RAF (zero React re-render)
    let lastTime = performance.now();
    const updatePhysics = (now: number) => {
      const delta = Math.min(1000 / 60, Math.max(1, now - lastTime));
      lastTime = now;

      Engine.update(engine, delta);

      projects.forEach((p) => {
        const body = bodiesRef.current[p.slug];
        const el = cartridgeElsRef.current[p.slug];
        const isCurrentDocked = dockedSlugRef.current === p.slug;

        if (body && el) {
          if (isCurrentDocked) {
            el.style.opacity = "0";
            el.style.pointerEvents = "none";
          } else {
            el.style.opacity = "1";
            el.style.pointerEvents = "auto";
            el.style.transform = `translate3d(${body.position.x - CARTRIDGE_WIDTH / 2}px, ${
              body.position.y - CARTRIDGE_HEIGHT / 2
            }px, 0) rotate(${body.angle}rad)`;
          }
        }
      });

      rafIdRef.current = requestAnimationFrame(updatePhysics);
    };

    rafIdRef.current = requestAnimationFrame(updatePhysics);

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      if (engineRef.current) {
        World.clear(engineRef.current.world, false);
        Engine.clear(engineRef.current);
        engineRef.current = null;
      }
    };
  }, [isMobile]);

  // Staggered Spawning when Arena enters viewport (Desktop only)
  const spawnCartridges = useCallback(() => {
    if (isMobile) return;
    const engine = engineRef.current;
    if (hasSpawnedRef.current || !engine || !arenaRef.current) return;
    hasSpawnedRef.current = true;

    const width = arenaRef.current.clientWidth || 900;
    const height = arenaRef.current.clientHeight || 820;
    const deflectorWidth = Math.min(width * 0.54, 540);
    const gutterWidth = Math.max(130, (width - deflectorWidth) / 2);

    projects.forEach((p, idx) => {
      const isLeft = idx < 3;
      let x: number;
      if (isLeft) {
        x = 40 + idx * ((gutterWidth - 50) / 2.5) + (Math.random() - 0.5) * 15;
      } else {
        const rightIdx = idx - 3;
        x = width - gutterWidth + 20 + rightIdx * ((gutterWidth - 50) / 2.5) + (Math.random() - 0.5) * 15;
      }
      const y = Math.max(100, height - 320) - (idx % 3) * 70;
      const angle = (Math.random() - 0.5) * 0.25;

      const body = Bodies.rectangle(x, y, CARTRIDGE_WIDTH, CARTRIDGE_HEIGHT, {
        chamfer: { radius: 6 },
        friction: 0.6,
        frictionAir: 0.02,
        restitution: 0.42,
        density: 0.002,
        angle,
      });

      Body.setVelocity(body, {
        x: (isLeft ? -1 : 1) * (0.8 + Math.random() * 1.5),
        y: 1.5 + Math.random() * 2,
      });
      Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.05);

      bodiesRef.current[p.slug] = body;
      World.add(engine.world, body);
    });
  }, [isMobile]);

  // Viewport Observer for spawning trigger (Desktop only)
  useEffect(() => {
    if (isMobile) return;
    const el = arenaRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          spawnCartridges();
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [isMobile, spawnCartridges]);

  // Desktop ejection logic: Resets isStatic to false and applies upward + outward impulse
  const handleEject = useCallback(() => {
    const currentSlug = dockedSlugRef.current;
    if (!currentSlug) return;

    try {
      playCartridgeEject();
    } catch {}

    const slotEl = slotBayRef.current;
    const arenaRect = arenaRef.current?.getBoundingClientRect();
    let slotX = arenaRect ? arenaRect.width / 2 : 450;
    let slotY = 140;

    if (slotEl && arenaRect) {
      const slotRect = slotEl.getBoundingClientRect();
      slotX = slotRect.left - arenaRect.left + slotRect.width / 2;
      slotY = slotRect.top - arenaRect.top + slotRect.height / 2;
    }

    const body = bodiesRef.current[currentSlug];
    if (body) {
      Body.setStatic(body, false);
      Matter.Sleeping.set(body, false);
      Body.setPosition(body, { x: slotX, y: slotY - 35 });
      const impulseX = (Math.random() > 0.5 ? 1 : -1) * (4 + Math.random() * 3);
      Body.setVelocity(body, {
        x: impulseX,
        y: -10 - Math.random() * 3,
      });
      Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.25);
    }

    setDockedSlug(null);
    setActiveProject(null);
  }, []);

  // Desktop docking logic: slots a cartridge and ejects previous if present
  const handleDock = useCallback(
    (project: Project) => {
      const currentSlug = dockedSlugRef.current;

      if (currentSlug && currentSlug !== project.slug) {
        const prevBody = bodiesRef.current[currentSlug];
        if (prevBody && arenaRef.current) {
          const slotEl = slotBayRef.current;
          const arenaRect = arenaRef.current.getBoundingClientRect();
          let slotX = arenaRect.width / 2;
          let slotY = 140;
          if (slotEl) {
            const slotRect = slotEl.getBoundingClientRect();
            slotX = slotRect.left - arenaRect.left + slotRect.width / 2;
            slotY = slotRect.top - arenaRect.top + slotRect.height / 2;
          }
          Body.setStatic(prevBody, false);
          Matter.Sleeping.set(prevBody, false);
          Body.setPosition(prevBody, { x: slotX, y: slotY - 35 });
          const impulseX = (Math.random() > 0.5 ? 1 : -1) * (4 + Math.random() * 3);
          Body.setVelocity(prevBody, {
            x: impulseX,
            y: -10,
          });
          Body.setAngularVelocity(prevBody, (Math.random() - 0.5) * 0.2);
        }
      }

      try {
        playCartridgeSnap();
        playBootChime();
      } catch {}

      setDockedSlug(project.slug);
      setActiveProject(project);
      setIsSlotHovered(false);
    },
    []
  );

  // Mobile Ejection handler: animates docked cartridge back to its shelf matrix slot
  const handleMobileEject = useCallback(() => {
    const current = dockedSlugRef.current;
    if (!current) return;

    try {
      playCartridgeEject();
    } catch {}

    const slotEl = slotBayRef.current;
    const cellEl = shelfCellRefs.current[current];

    if (slotEl && cellEl) {
      const slotRect = slotEl.getBoundingClientRect();
      const cellRect = cellEl.getBoundingClientRect();
      const dx = slotRect.left + slotRect.width / 2 - (cellRect.left + cellRect.width / 2);
      const dy = slotRect.top + slotRect.height / 2 - (cellRect.top + cellRect.height / 2);

      setEjectDelta({ x: dx, y: dy });
      setAnimatingEjectSlug(current);
      setDockedSlug(null);
      setActiveProject(null);

      setTimeout(() => {
        setAnimatingEjectSlug(null);
      }, 340);
    } else {
      setDockedSlug(null);
      setActiveProject(null);
    }
  }, []);

  // Mobile Cartridge Click handler: slides cartridge down into slot, swapping previous if docked
  const handleMobileCartridgeClick = useCallback(
    (p: Project) => {
      if (animatingInsertSlug) return;

      const currentSlug = dockedSlugRef.current;

      if (currentSlug === p.slug) {
        handleMobileEject();
        return;
      }

      const slotEl = slotBayRef.current;
      const targetCell = shelfCellRefs.current[p.slug];

      if (!slotEl || !targetCell) {
        handleDock(p);
        return;
      }

      const slotRect = slotEl.getBoundingClientRect();
      const targetRect = targetCell.getBoundingClientRect();
      const newDx = slotRect.left + slotRect.width / 2 - (targetRect.left + targetRect.width / 2);
      const newDy = slotRect.top + slotRect.height / 2 - (targetRect.top + targetRect.height / 2);

      if (currentSlug && currentSlug !== p.slug) {
        const oldCell = shelfCellRefs.current[currentSlug];
        if (oldCell) {
          const oldRect = oldCell.getBoundingClientRect();
          const oldDx = slotRect.left + slotRect.width / 2 - (oldRect.left + oldRect.width / 2);
          const oldDy = slotRect.top + slotRect.height / 2 - (oldRect.top + oldRect.height / 2);
          setEjectDelta({ x: oldDx, y: oldDy });
          setAnimatingEjectSlug(currentSlug);
        }
        try {
          playCartridgeEject();
        } catch {}
      }

      setDockedSlug(null);
      setInsertDelta({ x: newDx, y: newDy });
      setAnimatingInsertSlug(p.slug);

      setTimeout(() => {
        try {
          playCartridgeSnap();
          playBootChime();
        } catch {}
        setDockedSlug(p.slug);
        setActiveProject(p);
        setAnimatingInsertSlug(null);
        setAnimatingEjectSlug(null);
      }, 340);
    },
    [animatingInsertSlug, handleDock, handleMobileEject]
  );

  // Check if position is within magnetic snap radius of the slot bay (Desktop only)
  const checkSnapZone = useCallback((clientX: number, clientY: number): boolean => {
    const slotEl = slotBayRef.current;
    if (!slotEl) return false;
    const rect = slotEl.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dist = Math.hypot(clientX - centerX, clientY - centerY);
    return dist < 95;
  }, []);

  // Pointer drag & fling event handlers (Desktop only)
  const handlePointerDown = useCallback((slug: string, e: React.PointerEvent<HTMLDivElement>) => {
    const body = bodiesRef.current[slug];
    if (!body || !arenaRef.current) return;

    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);

    Body.setStatic(body, true);
    setDraggingSlug(slug);

    dragInfoRef.current = {
      slug,
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      prevX: e.clientX,
      prevY: e.clientY,
      prevTime: performance.now(),
      vx: 0,
      vy: 0,
      isClick: true,
    };
  }, []);

  const handlePointerMove = useCallback((slug: string, e: React.PointerEvent<HTMLDivElement>) => {
    const info = dragInfoRef.current;
    if (!info || info.slug !== slug || !arenaRef.current) return;

    const now = performance.now();
    const dt = Math.max(1, now - info.prevTime);
    const vx = ((e.clientX - info.prevX) / dt) * 16;
    const vy = ((e.clientY - info.prevY) / dt) * 16;

    info.prevX = e.clientX;
    info.prevY = e.clientY;
    info.prevTime = now;
    info.vx = vx;
    info.vy = vy;

    if (Math.hypot(e.clientX - info.startX, e.clientY - info.startY) > 6) {
      info.isClick = false;
    }

    const rect = arenaRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const body = bodiesRef.current[slug];
    if (body) {
      Body.setPosition(body, { x, y });
    }

    setIsSlotHovered(checkSnapZone(e.clientX, e.clientY));
  }, [checkSnapZone]);

  const handlePointerUp = useCallback((slug: string, e: React.PointerEvent<HTMLDivElement>) => {
    const info = dragInfoRef.current;
    if (!info || info.slug !== slug) return;

    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(info.pointerId);
    } catch {}

    dragInfoRef.current = null;
    setDraggingSlug(null);

    const body = bodiesRef.current[slug];
    if (!body) return;

    const targetProject = projects.find((p) => p.slug === slug);
    if (!targetProject) return;

    if (info.isClick) {
      handleDock(targetProject);
      return;
    }

    const inSnap = checkSnapZone(e.clientX, e.clientY);
    if (inSnap) {
      handleDock(targetProject);
      return;
    }

    Body.setStatic(body, false);
    Matter.Sleeping.set(body, false);
    Body.setVelocity(body, {
      x: Math.max(-18, Math.min(18, info.vx)),
      y: Math.max(-18, Math.min(18, info.vy)),
    });
    Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.15);
    setIsSlotHovered(false);
  }, [checkSnapZone, handleDock]);

  return (
    <div
      ref={arenaRef}
      className="relative w-screen max-w-[100vw] left-1/2 -translate-x-1/2 min-h-[760px] md:min-h-[820px] flex flex-col items-center justify-start overflow-visible pt-4 sm:pt-10 md:pt-20 select-none pb-12"
    >
      {/* Central DMG Console & Dossier with Protected Z-Index */}
      <div className="relative z-20 flex flex-col items-center w-full max-w-2xl px-4 pointer-events-auto">
        {/* Mobile 3x2 ROM Cartridge Shelf Rack (rendered strictly on < 768px viewports) */}
        {isMobile && (
          <div className="w-full max-w-[340px] px-1 mb-12 sm:mb-14 flex flex-col items-center z-30">
            <div className="w-full flex items-center justify-between px-1 mb-2.5">
              <div className="flex items-center gap-1.5">
                <span className="inline-block w-2 h-2 bg-[var(--accent)] animate-pulse" />
                <span className="font-pixel text-[8.5px] text-[var(--accent)] tracking-wider">
                  RAK CARTRIDGE (3x2)
                </span>
              </div>
              <span className="font-pixel text-[7px] text-[var(--ink-muted)] tracking-widest">
                {dockedSlug ? "[ 1 TERPASANG ]" : "[ PILIH ROM ]"}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2.5 justify-items-center w-full">
              {projects.map((p, idx) => {
                const isCurrentDocked = dockedSlug === p.slug;
                const isInserting = animatingInsertSlug === p.slug;
                const isEjecting = animatingEjectSlug === p.slug;
                const showCartridge = !isCurrentDocked || isInserting;

                return (
                  <div
                    key={p.slug}
                    ref={(el) => {
                      shelfCellRefs.current[p.slug] = el;
                    }}
                    className="relative"
                    style={{
                      width: `${MOBILE_CARTRIDGE_WIDTH}px`,
                      height: `${MOBILE_CARTRIDGE_HEIGHT}px`,
                    }}
                  >
                    {/* Ghost Shelf Receptacle */}
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => {
                        if (isCurrentDocked) {
                          handleMobileEject();
                        } else {
                          handleMobileCartridgeClick(p);
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          if (isCurrentDocked) handleMobileEject();
                          else handleMobileCartridgeClick(p);
                        }
                      }}
                      aria-label={`Slot rak kaset ${p.title}`}
                      className={`absolute inset-0 rounded-[5px] border-2 border-dashed flex flex-col items-center justify-center transition-all duration-200 cursor-pointer select-none ${
                        isCurrentDocked
                          ? "border-[var(--accent)] bg-[var(--accent)]/15 shadow-[0_0_12px_rgba(var(--accent-rgb),0.25)]"
                          : "border-[#6c6962]/40 bg-[#1c1b18]/10 dark:bg-white/5 opacity-70 hover:opacity-100"
                      }`}
                    >
                      <span className="font-pixel text-[8px] text-[var(--accent)] font-bold">
                        ROM #{idx + 1}
                      </span>
                      <span className="font-pixel text-[6px] text-[var(--ink-muted)] mt-1 tracking-wider uppercase">
                        {isCurrentDocked ? "TERPASANG" : "SLOT KOSONG"}
                      </span>
                    </div>

                    {/* Cartridge: stationary in shelf, inserting downward, or ejecting back to origin */}
                    {showCartridge && (
                      <motion.div
                        className="absolute inset-0"
                        style={{
                          zIndex: isInserting || isEjecting ? 50 : 20,
                          pointerEvents: isInserting || isEjecting ? "none" : "auto",
                        }}
                        initial={
                          isEjecting
                            ? { x: ejectDelta.x, y: ejectDelta.y, scale: 0.85, opacity: 0.8 }
                            : false
                        }
                        animate={
                          isInserting
                            ? { x: insertDelta.x, y: insertDelta.y, scale: 0.85, opacity: 0 }
                            : { x: 0, y: 0, scale: 1, opacity: 1 }
                        }
                        transition={{
                          duration: 0.34,
                          ease: isInserting ? [0.22, 1, 0.36, 1] : [0.34, 1.56, 0.64, 1],
                        }}
                      >
                        <ProjectCartridge
                          project={p}
                          isMobile={true}
                          isDocked={false}
                          onClick={() => handleMobileCartridgeClick(p)}
                        />
                      </motion.div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <GameboyConsole
          activeProject={activeProject}
          onEject={isMobile ? handleMobileEject : handleEject}
          onSlot={isMobile ? handleMobileCartridgeClick : handleDock}
          isSlotHovered={isSlotHovered}
          slotRef={slotBayRef}
        />
      </div>

      {/* Physics Sandbox Arena: 6 Persistent GameBoy Cartridges (Desktop only) */}
      {!isMobile && (
        <div className="absolute inset-0 pointer-events-none z-30 overflow-visible">
          {projects.map((p) => (
            <div
              key={p.slug}
              ref={(el) => {
                cartridgeElsRef.current[p.slug] = el;
              }}
              onPointerDown={(e) => handlePointerDown(p.slug, e)}
              onPointerMove={(e) => handlePointerMove(p.slug, e)}
              onPointerUp={(e) => handlePointerUp(p.slug, e)}
              onPointerCancel={(e) => handlePointerUp(p.slug, e)}
              className="absolute top-0 left-0 pointer-events-auto will-change-transform"
              style={{
                width: `${CARTRIDGE_WIDTH}px`,
                height: `${CARTRIDGE_HEIGHT}px`,
                zIndex: draggingSlug === p.slug ? 40 : 30,
              }}
            >
              <ProjectCartridge
                project={p}
                isDocked={dockedSlug === p.slug}
                isDragging={draggingSlug === p.slug}
                onClick={() => handleDock(p)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
