"use client";

import React from "react";
import Image from "next/image";
import { Project } from "../../data/projects";

export const CARTRIDGE_WIDTH = 136;
export const CARTRIDGE_HEIGHT = 158;
export const MOBILE_CARTRIDGE_WIDTH = 96;
export const MOBILE_CARTRIDGE_HEIGHT = 112;

export interface ProjectCartridgeProps {
  project: Project;
  isDocked?: boolean;
  isDragging?: boolean;
  isMobile?: boolean;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export function ProjectCartridge({
  project,
  isDocked = false,
  isDragging = false,
  isMobile = false,
  onClick,
  className = "",
  style,
}: ProjectCartridgeProps) {
  const currentWidth = isMobile ? MOBILE_CARTRIDGE_WIDTH : CARTRIDGE_WIDTH;
  const currentHeight = isMobile ? MOBILE_CARTRIDGE_HEIGHT : CARTRIDGE_HEIGHT;

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.();
        }
      }}
      aria-label={`Cartridge ${project.title}. Klik untuk memasang ke GameBoy.`}
      className={`group relative select-none rounded-[5px] sm:rounded-[6px] transition-all duration-150 cursor-pointer ${
        isDragging
          ? "shadow-2xl scale-[1.03] z-40"
          : "shadow-[0_3px_8px_rgba(0,0,0,0.22)] sm:shadow-[0_4px_12px_rgba(0,0,0,0.25)] hover:shadow-[0_6px_16px_rgba(0,0,0,0.3)] hover:-translate-y-0.5 active:translate-y-0"
      } ${isDocked ? "opacity-0 pointer-events-none" : "opacity-100"} ${className}`}
      style={{
        width: `${currentWidth}px`,
        height: `${currentHeight}px`,
        backgroundColor: "#b8b5ab",
        border: isMobile ? "1.5px solid #6c6962" : "2px solid #6c6962",
        boxShadow: isDragging
          ? "0 14px 28px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.4)"
          : "0 3px 8px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.35)",
        touchAction: isMobile ? "auto" : "none",
        ...style,
      }}
    >
      {/* Top Grip Ridges */}
      <div className={`absolute ${isMobile ? "top-1.5" : "top-2"} left-1/2 -translate-x-1/2 w-[72%] flex flex-col ${isMobile ? "gap-[2px]" : "gap-[3px]"} pointer-events-none`}>
        <div className={`${isMobile ? "h-[2px]" : "h-[3px]"} bg-[#8a877e] rounded-sm shadow-[inset_0_1px_1px_rgba(0,0,0,0.3)]`} />
        <div className={`${isMobile ? "h-[2px]" : "h-[3px]"} bg-[#8a877e] rounded-sm shadow-[inset_0_1px_1px_rgba(0,0,0,0.3)]`} />
        <div className={`${isMobile ? "h-[2px]" : "h-[3px]"} bg-[#8a877e] rounded-sm shadow-[inset_0_1px_1px_rgba(0,0,0,0.3)]`} />
      </div>

      {/* Classic Right Corner Notch */}
      <div
        className={`absolute top-0 right-0 ${isMobile ? "w-2.5 h-2.5 border-t-[1.5px] border-r-[1.5px]" : "w-3 h-3 border-t-2 border-r-2"} bg-transparent border-[#6c6962] pointer-events-none`}
        style={{
          borderTopRightRadius: "3px",
        }}
      />

      {/* Recessed Sticker Well */}
      <div
        className={`absolute ${isMobile ? "top-[18px]" : "top-[28px]"} left-1/2 -translate-x-1/2 w-[86%] h-[74%] rounded-[3px] ${isMobile ? "p-[2px]" : "p-[3px]"} flex flex-col overflow-hidden pointer-events-none`}
        style={{
          backgroundColor: "#a09d94",
          boxShadow: "inset 0 1px 3px rgba(0,0,0,0.4), 0 1px 0 rgba(255,255,255,0.25)",
        }}
      >
        {/* Glossy Project Sticker */}
        <div
          className="relative w-full h-full rounded-[2px] bg-white overflow-hidden flex flex-col shadow-sm"
          style={{
            background: "linear-gradient(180deg, #fefefe 0%, #eceae4 100%)",
          }}
        >
          {/* Top Banner */}
          <div className={`${isMobile ? "px-1 py-[1px]" : "px-1.5 py-[2px]"} bg-[#2d2b27] text-white flex items-center justify-between border-b border-[#1c1a17]`}>
            <span className={`font-pixel ${isMobile ? "text-[5px]" : "text-[6px]"} tracking-wider text-[#e6e4dc]`}>
              ROM CARTRIDGE
            </span>
            <span className={`font-pixel ${isMobile ? "text-[4.5px]" : "text-[5px]"} text-[#9bbc0f] tracking-widest`}>
              DMG-01
            </span>
          </div>

          {/* Project Screenshot / Artwork */}
          <div className="relative w-full flex-1 bg-[#1a1917] overflow-hidden">
            <Image
              src={project.cover}
              alt={project.title}
              fill
              sizes={isMobile ? "90px" : "120px"}
              className="object-cover object-top"
              loading="lazy"
            />
            {/* Sticker Gloss Effect */}
            <div
              className="absolute inset-0 pointer-events-none opacity-20"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 60%)",
              }}
            />
          </div>

          {/* Bottom Title Label & Stamp */}
          <div className={`${isMobile ? "px-1 py-0.5" : "px-1.5 py-1"} bg-[#f4f2ec] border-t border-[#d8d5cb] flex items-center justify-between`}>
            <div className="flex flex-col overflow-hidden mr-1">
              <span className={`font-pixel ${isMobile ? "text-[6.5px] leading-tight" : "text-[8px]"} text-[#22211d] font-bold truncate tracking-wide`}>
                {project.title}
              </span>
              <span className={`font-sans ${isMobile ? "text-[5px]" : "text-[6px]"} text-[#706e67] truncate uppercase tracking-wider font-semibold`}>
                {project.category[0] || "PORTFOLIO"}
              </span>
            </div>

            {/* Quality Seal Icon */}
            <div
              className={`${isMobile ? "w-3 h-3" : "w-4 h-4"} rounded-full border border-[#b89b38] bg-[#fbf5dc] flex items-center justify-center shrink-0`}
              title="Original Quality"
            >
              <span className={`font-pixel ${isMobile ? "text-[3px]" : "text-[4px]"} text-[#8a7224] font-bold`}>
                PRO
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Inscription Arrow */}
      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-center pointer-events-none">
        <span className={`font-pixel ${isMobile ? "text-[4.5px]" : "text-[6px]"} text-[#63615b] tracking-wider opacity-80`}>
          ▼ THIS SIDE IN
        </span>
      </div>
    </div>
  );
}
