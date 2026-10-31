"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { GithubIcon } from "../ui/Icons";
import { projects, Project } from "../../data/projects";
import { useI18n } from "../../lib/i18n";
import { playPokeSound, playBootChime, playCartridgeEject } from "../../lib/sound";
import { GlitchTitle } from "../ui/GlitchTitle";
import { ConsolePeeker } from "../ui/ConsolePeeker";
import "./gameboy.css";

export interface GameboyConsoleProps {
  className?: string;
  activeProject?: Project | null;
  onEject?: () => void;
  onSlot?: (project: Project) => void;
  isSlotHovered?: boolean;
  slotRef?: React.Ref<HTMLDivElement>;
}

export function GameboyConsole({
  className = "",
  activeProject: controlledActiveProject,
  onEject,
  onSlot,
  isSlotHovered = false,
  slotRef,
}: GameboyConsoleProps) {
  const { locale } = useI18n();
  const [internalIndex, setInternalIndex] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const prevProjectRef = useRef<Project | null>(null);

  // Controlled mode vs standalone mode
  const isControlled = controlledActiveProject !== undefined;
  const currentProject = isControlled
    ? controlledActiveProject
    : internalIndex !== null
    ? projects[internalIndex]
    : null;

  const total = projects.length;
  const currentIndex = currentProject
    ? projects.findIndex((p) => p.slug === currentProject.slug)
    : -1;

  // Trigger CRT boot flash when project loads
  useEffect(() => {
    if (currentProject && currentProject.slug !== prevProjectRef.current?.slug) {
      setIsTransitioning(true);
      try {
        playBootChime();
      } catch {}
      const timer = setTimeout(() => setIsTransitioning(false), 280);
      prevProjectRef.current = currentProject;
      return () => clearTimeout(timer);
    }
    prevProjectRef.current = currentProject;
  }, [currentProject]);

  const go = useCallback(
    (n: number) => {
      try {
        playPokeSound();
      } catch {}
      if (isControlled && onSlot) {
        const nextIdx = (currentIndex + n + total) % total;
        onSlot(projects[nextIdx]);
      } else {
        setIsTransitioning(true);
        setInternalIndex((prev) => ((prev ?? 0) + n + total) % total);
        setTimeout(() => setIsTransitioning(false), 280);
      }
    },
    [currentIndex, total, isControlled, onSlot]
  );

  const handleEjectClick = useCallback(() => {
    try {
      playCartridgeEject();
    } catch {}
    if (onEject) {
      onEject();
    } else {
      setInternalIndex(null);
    }
  }, [onEject]);

  const openPrimaryLink = useCallback(() => {
    if (!currentProject) return;
    try {
      playPokeSound();
    } catch {}
    const target = currentProject.links.live || currentProject.links.repo;
    if (target) window.open(target, "_blank", "noopener,noreferrer");
  }, [currentProject]);

  const openSecondaryLink = useCallback(() => {
    if (!currentProject) return;
    try {
      playPokeSound();
    } catch {}
    const target = currentProject.links.repo || currentProject.links.live;
    if (target) window.open(target, "_blank", "noopener,noreferrer");
  }, [currentProject]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        document.activeElement &&
        ["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)
      ) {
        return;
      }

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(-1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        go(1);
      } else if (e.key === "Enter" || e.key.toLowerCase() === "a") {
        e.preventDefault();
        openPrimaryLink();
      } else if (e.key === "Escape" || e.key.toLowerCase() === "b") {
        e.preventDefault();
        if (currentProject) {
          handleEjectClick();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [go, openPrimaryLink, currentProject, handleEjectClick]);

  return (
    <div className={`gb-stage select-none ${className}`}>
      {/* Console with Container Query Units (cqw) */}
      <div className="gb-console">
        {/* Playful Mascot Peeking from top-left or top-right */}
        <ConsolePeeker triggerIndex={currentIndex >= 0 ? currentIndex : 0} />

        {/* Top Shoulder Bumpers */}
        <div className="gb-sh l" />
        <div className="gb-sh r" />

        {/* Cartridge Slot Bay along top bezel */}
        <div
          ref={slotRef}
          className={`gb-slot-bay ${isSlotHovered ? "highlight" : ""}`}
          data-testid="cartridge-slot-bay"
        >
          {currentProject && (
            <div
              className="gb-docked-cart"
              onClick={handleEjectClick}
              title="Klik untuk mencabut cartridge (Eject)"
            >
              <div className="gb-docked-cart-notch" />
              <span className="gb-docked-cart-label">{currentProject.title}</span>
            </div>
          )}
        </div>

        {/* DMG Shell */}
        <div className="gb-shell">
          {/* Left Controls (D-PAD & SELECT/START) */}
          <div className="gb-left">
            <div className="gb-dpad">
              <button
                type="button"
                onClick={() => go(-1)}
                className="gb-u"
                aria-label="Atas"
              />
              <button
                type="button"
                onClick={() => go(-1)}
                className="gb-l"
                aria-label="Sebelumnya"
              />
              <div className="gb-c" />
              <button
                type="button"
                onClick={() => go(1)}
                className="gb-r"
                aria-label="Berikutnya"
              />
              <button
                type="button"
                onClick={() => go(1)}
                className="gb-d"
                aria-label="Bawah"
              />
            </div>

            {/* SELECT & START in Left Wing */}
            <div className="gb-ss">
              <button
                type="button"
                onClick={() => go(-1)}
                data-label="SELECT"
                aria-label="SELECT"
              />
              <button
                type="button"
                onClick={() => go(1)}
                data-label="START"
                aria-label="START"
              />
            </div>
          </div>

          {/* Center Bezel & Visual Screen */}
          <div className="gb-bezel flex flex-col items-center">
            <div className="gb-bt w-full">
              <span className="gb-pw">
                <b className={currentProject ? "" : "opacity-40 animate-pulse"} />
                BATTERY
              </span>
            </div>

            {/* LCD Screen (3:2 Aspect Ratio) */}
            <div
              className={`gb-scr ${currentProject ? "has-cart" : ""} ${isTransitioning ? "transitioning" : ""}`}
              onClick={openPrimaryLink}
              title={currentProject ? `Buka ${currentProject.title}` : "Layar kosong (masukkan cartridge)"}
            >
              {currentProject ? (
                /* Project Visual Image with True-to-Sticker 1:1 Rendering */
                <div className="absolute inset-0 z-0 bg-[#121210]">
                  <Image
                    src={currentProject.cover}
                    alt={currentProject.title}
                    fill
                    priority
                    sizes="(max-width: 768px) 92vw, 680px"
                    className="object-cover object-top transition-all duration-200"
                  />
                </div>
              ) : (
                /* Authentic Idle Blink Screen */
                <div className="gb-empty-scr font-pixel">
                  <div className="text-[12px] sm:text-[14px] text-[#0f380f] font-bold tracking-widest leading-loose uppercase gb-empty-scr-blink">
                    MASUKKAN<br />CARTRIDGE
                  </div>
                  <div className="mt-3 text-[#0f380f] text-xs font-pixel tracking-wider opacity-60">
                    <span className="md:hidden">[ PILIH KASET DI ATAS ]</span>
                    <span className="hidden md:inline">[ PILIH KASET DI BAWAH ]</span>
                  </div>
                </div>
              )}
            </div>

            {/* Dots Indicator */}
            <div className="gb-dots">
              {projects.map((_, idx) => (
                <i key={idx} className={idx === currentIndex ? "on" : ""} />
              ))}
            </div>
          </div>

          {/* Right Controls (A/B Buttons inside Carved Oval Groove + Speaker Slits) */}
          <div className="gb-right">
            <div className="gb-ab">
              <button
                type="button"
                onClick={openSecondaryLink}
                className="gb-b"
                aria-label="Tombol B"
              />
              <span className="lb">B</span>
              <button
                type="button"
                onClick={openPrimaryLink}
                className="gb-a"
                aria-label="Tombol A"
              />
              <span className="la">A</span>
            </div>

            <div className="gb-spk">
              <i />
              <i />
              <i />
              <i />
              <i />
              <i />
            </div>
          </div>
        </div>
      </div>

      {/* PROJECT INFO & ACTION SECTION BELOW GAMEBOY */}
      {currentProject ? (
        <div className="w-full max-w-xl text-center px-4 mt-2 sm:mt-4 flex flex-col items-center">
          {/* Clean Pixel Title with Glitch/Scramble Effect */}
          <h3 className="font-pixel text-lg sm:text-2xl text-[var(--ink)] tracking-wider mb-2">
            <GlitchTitle text={currentProject.title} />
          </h3>

          {/* 1-2 Sentence Clear Explanation (Clean, no glitch) */}
          <p className="font-sans text-sm sm:text-base text-[var(--ink-muted)] leading-relaxed max-w-lg mb-4">
            {currentProject.description[locale]}
          </p>

          {/* Action Links */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {currentProject.links.repo && (
              <a
                href={currentProject.links.repo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--surface-2)] border-2 border-[var(--line)] shadow-[3px_3px_0px_var(--line)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_var(--line)] font-pixel text-xs text-[var(--ink)] transition-all"
              >
                <GithubIcon className="w-4 h-4 text-[var(--accent)]" />
                <span>GITHUB REPO</span>
              </a>
            )}

            {currentProject.links.live && (
              <a
                href={currentProject.links.live}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--surface-2)] border-2 border-[var(--line)] shadow-[3px_3px_0px_var(--line)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_var(--line)] font-pixel text-xs text-[var(--ink)] transition-all"
              >
                <ExternalLink className="w-4 h-4 text-[var(--accent)]" />
                <span>LIVE DEMO</span>
              </a>
            )}
          </div>
        </div>
      ) : (
        <div className="w-full max-w-xl text-center px-4 mt-2 sm:mt-4 flex flex-col items-center">
          <h3 className="font-pixel text-lg sm:text-2xl text-[var(--ink)] tracking-wider mb-2">
            {locale === "id" ? "[ MASUKKAN CARTRIDGE ]" : "[ ENTER A CARTRIDGE ]"}
          </h3>
          <p className="font-sans text-sm sm:text-base text-[var(--ink-muted)] leading-relaxed max-w-lg">
            {locale === "id" ? (
              <>
                <span className="md:hidden">Pilih salah satu cartridge kaset di atas untuk dimasukkan ke slot GameBoy.</span>
                <span className="hidden md:inline">Pilih atau seret salah satu cartridge kaset di bawah ke slot GameBoy.</span>
              </>
            ) : (
              <>
                <span className="md:hidden">Select any cartridge above to insert into the GameBoy slot.</span>
                <span className="hidden md:inline">Select or drag any cartridge below into the GameBoy slot.</span>
              </>
            )}
          </p>
        </div>
      )}
    </div>
  );
}
