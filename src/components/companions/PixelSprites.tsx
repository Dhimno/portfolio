"use client";

import React from "react";
import { AnimationState, CharacterId } from "./types";

interface SpriteProps {
  id: CharacterId;
  state?: AnimationState;
  direction?: 1 | -1;
  frame?: number;
  className?: string;
  isSpecial?: boolean;
}

export function PixelSprite({
  id,
  state = "idle",
  direction = 1,
  frame = 0,
  className = "",
  isSpecial = false,
}: SpriteProps) {
  const isWalking = state === "walk";
  const isSleeping = state === "sleep";
  const stepOffset = isWalking ? (frame % 2 === 0 ? 1 : -1) : 0;
  const bobOffset = isWalking ? (frame % 2 === 0 ? 0 : -1) : state === "idle" ? (frame % 2 === 0 ? 0 : 0.5) : 0;

  return (
    <div
      className={`relative select-none pointer-events-none ${className}`}
      style={{
        transform: `scaleX(${direction}) translateY(${bobOffset}px)`,
        transformOrigin: "bottom center",
        imageRendering: "pixelated",
      }}
    >
      {id === "dhimas" && <DhimasSprite isWalking={isWalking} stepOffset={stepOffset} isSpecial={isSpecial} isSleeping={isSleeping} frame={frame} />}
      {id === "omori" && <OmoriSprite isWalking={isWalking} stepOffset={stepOffset} isSpecial={isSpecial} isSleeping={isSleeping} />}
      {id === "sans" && <SansSprite stepOffset={stepOffset} isSpecial={isSpecial} isSleeping={isSleeping} />}
      {id === "steve" && <SteveSprite state={state} isWalking={isWalking} stepOffset={stepOffset} isSpecial={isSpecial} isSleeping={isSleeping} frame={frame} />}
      {id === "claude" && <ClaudeSprite frame={frame} isSpecial={isSpecial} isSleeping={isSleeping} isPeeking={state === "peek"} />}
      {id === "creeper" && <CreeperSprite frame={frame} isSpecial={isSpecial} isWalking={isWalking} stepOffset={stepOffset} />}
      {id === "dog" && <AnnoyingDogSprite frame={frame} isSleeping={isSleeping} />}
      {id === "enderman" && <EndermanSprite frame={frame} isSpecial={isSpecial} />}
      {id === "ralsei" && <RalseiSprite frame={frame} isSpecial={isSpecial} isWalking={isWalking} stepOffset={stepOffset} />}
      {id === "papyrus" && <PapyrusSprite frame={frame} isSpecial={isSpecial} isWalking={isWalking} stepOffset={stepOffset} />}
      {id === "frisk" && <FriskSprite frame={frame} isSpecial={isSpecial} isWalking={isWalking} stepOffset={stepOffset} />}
      {id === "pig" && <MinecraftPigSprite frame={frame} isWalking={isWalking} stepOffset={stepOffset} />}
    </div>
  );
}

/* ---------------- DHIMAS MINIATURE SPRITE ---------------- */
export function DhimasSprite({
  isWalking = false,
  stepOffset = 0,
  isSpecial = false,
  isSleeping = false,
  frame = 0,
}: {
  isWalking?: boolean;
  stepOffset?: number;
  isSpecial?: boolean;
  isSleeping?: boolean;
  frame?: number;
}) {
  const armOffset = isWalking ? (frame % 2 === 0 ? 0.5 : -0.5) : 0;

  return (
    <svg
      viewBox="0 0 20 28"
      className="w-12 h-16 sm:w-14 sm:h-20 drop-shadow-md"
      shapeRendering="crispEdges"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Hair - Full textured spiky natural black (Zero holes/gaps) */}
      <rect x="6" y="0" width="2" height="1" fill="#1A1817" />
      <rect x="9" y="0" width="3" height="1" fill="#1A1817" />
      <rect x="13" y="0" width="2" height="1" fill="#1A1817" />
      <rect x="5" y="1" width="11" height="2" fill="#1A1817" />
      <rect x="4" y="2" width="13" height="5" fill="#1A1817" />

      {/* Hair texture & depth highlights */}
      <rect x="7" y="1" width="2" height="1" fill="#2E2825" />
      <rect x="11" y="1" width="2" height="1" fill="#2E2825" />
      <rect x="6" y="3" width="3" height="1" fill="#2E2825" />
      <rect x="12" y="3" width="2" height="1" fill="#2E2825" />

      {/* Sideburns & temples */}
      <rect x="3" y="4" width="2" height="4" fill="#1A1817" />
      <rect x="16" y="4" width="2" height="4" fill="#1A1817" />

      {/* Forehead fringe / bangs dips */}
      <rect x="5" y="7" width="2" height="1" fill="#1A1817" />
      <rect x="9" y="7" width="2" height="1" fill="#1A1817" />
      <rect x="14" y="7" width="2" height="1" fill="#1A1817" />

      {/* Face & Ears - Warm fair complexion */}
      <rect x="3" y="8" width="1" height="2" fill="#FCD3B6" />
      <rect x="17" y="8" width="1" height="2" fill="#FCD3B6" />
      <rect x="5" y="7" width="11" height="6" fill="#FCD3B6" />
      <rect x="6" y="13" width="9" height="1" fill="#FCD3B6" />

      {/* Eyebrows */}
      <rect x="6" y="8" width="3" height="1" fill="#26201B" />
      <rect x="12" y="8" width="3" height="1" fill="#26201B" />

      {/* Eyes */}
      {isSleeping ? (
        <>
          <rect x="6" y="10" width="3" height="1" fill="#1A1817" />
          <rect x="12" y="10" width="3" height="1" fill="#1A1817" />
        </>
      ) : (
        <>
          <rect x="6" y="9" width="2" height="2" fill="#241B15" />
          <rect x="13" y="9" width="2" height="2" fill="#241B15" />
          <rect x="6" y="9" width="1" height="1" fill="#FFFFFF" />
          <rect x="13" y="9" width="1" height="1" fill="#FFFFFF" />
        </>
      )}

      {/* Nose */}
      <rect x="10" y="11" width="1" height="1" fill="#EAA988" />

      {/* Lips */}
      <rect x="9" y="12" width="3" height="1" fill="#E08779" />

      {/* Inner Shirt - Sky blue & white stripes */}
      <rect x="9" y="13" width="3" height="2" fill="#EAA988" />
      <rect x="8" y="14" width="5" height="6" fill="#FFFFFF" />
      <rect x="8" y="15" width="5" height="1" fill="#BAE6FD" />
      <rect x="8" y="17" width="5" height="1" fill="#BAE6FD" />
      <rect x="8" y="19" width="5" height="1" fill="#BAE6FD" />
      <rect x="10" y="16" width="1" height="1" fill="#94A3B8" />
      <rect x="10" y="18" width="1" height="1" fill="#94A3B8" />

      {/* Work Jacket - Tan/caramel khaki overshirt */}
      <rect x="4" y="14" width="4" height="6" fill="#C89F6D" />
      <rect x="13" y="14" width="4" height="6" fill="#C89F6D" />
      {/* Folded collar lapels */}
      <rect x="5" y="14" width="3" height="2" fill="#D7B07E" />
      <rect x="13" y="14" width="3" height="2" fill="#D7B07E" />
      {/* Pockets with subtle button details */}
      <rect x="5" y="17" width="2" height="2" fill="#B48A57" />
      <rect x="14" y="17" width="2" height="2" fill="#B48A57" />
      <rect x="6" y="17" width="1" height="1" fill="#8C673D" />
      <rect x="14" y="17" width="1" height="1" fill="#8C673D" />

      {/* Sleeves & Hands */}
      <g transform={`translate(0, ${armOffset})`}>
        <rect x="2" y="14" width="2" height="5" fill="#C89F6D" />
        <rect x="2" y="19" width="2" height="1" fill="#FCD3B6" />
      </g>
      <g transform={`translate(0, ${-armOffset})`}>
        <rect x="17" y="14" width="2" height="5" fill="#C89F6D" />
        <rect x="17" y="19" width="2" height="1" fill="#FCD3B6" />
      </g>

      {/* Pants - Dark charcoal/navy trousers */}
      <rect x="5" y="20" width="11" height="4" fill="#242933" />
      <rect x="10" y="22" width="1" height="2" fill="#1A1E26" />

      {/* Shoes / Sneakers - Clean white soles & dark uppers */}
      <rect x={5 + stepOffset} y="24" width="4" height="2" fill="#334155" />
      <rect x={5 + stepOffset} y="26" width="4" height="1" fill="#F8FAFC" />
      <rect x={12 - stepOffset} y="24" width="4" height="2" fill="#334155" />
      <rect x={12 - stepOffset} y="26" width="4" height="1" fill="#F8FAFC" />

      {/* Special Interaction - Orange spark / prompt emote */}
      {isSpecial && (
        <g>
          <rect x="8" y="-4" width="1" height="2" fill="#EA580C" />
          <rect x="9" y="-3" width="1" height="1" fill="#EA580C" />
          <rect x="11" y="-2" width="3" height="1" fill="#EA580C" />
        </g>
      )}
    </svg>
  );
}

/* ---------------- OMORI SPRITE ---------------- */
export function OmoriSprite({
  isWalking = false,
  stepOffset = 0,
  isSpecial = false,
  isSleeping = false,
}: {
  isWalking?: boolean;
  stepOffset?: number;
  isSpecial?: boolean;
  isSleeping?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 20 28"
      className="w-12 h-16 sm:w-14 sm:h-20 drop-shadow-md"
      shapeRendering="crispEdges"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="5" y="3" width="10" height="2" fill="#111111" />
      <rect x="4" y="5" width="12" height="4" fill="#111111" />
      <rect x="4" y="9" width="3" height="4" fill="#111111" />
      <rect x="13" y="9" width="3" height="4" fill="#111111" />
      <rect x="8" y="7" width="1" height="3" fill="#111111" />
      <rect x="11" y="8" width="1" height="2" fill="#111111" />

      <rect x="6" y="7" width="8" height="6" fill="#F6ECE7" />
      <rect x="7" y="13" width="6" height="1" fill="#F6ECE7" />

      {isSleeping ? (
        <>
          <rect x="7" y="10" width="2" height="1" fill="#111111" />
          <rect x="11" y="10" width="2" height="1" fill="#111111" />
        </>
      ) : (
        <>
          <rect x="7" y="9" width="2" height="2" fill="#111111" />
          <rect x="11" y="9" width="2" height="2" fill="#111111" />
          <rect x="7" y="9" width="1" height="1" fill="#FFFFFF" />
          <rect x="11" y="9" width="1" height="1" fill="#FFFFFF" />
        </>
      )}

      <rect x="6" y="14" width="8" height="6" fill="#1A1A1A" />
      <rect x="8" y="14" width="4" height="1" fill="#FFFFFF" />
      <rect x="4" y="14" width="2" height="5" fill="#F6ECE7" />
      <rect x="14" y="14" width="2" height="5" fill="#F6ECE7" />

      <rect x="6" y="20" width="8" height="3" fill="#111111" />

      <rect x="6" y="23" width="3" height="2" fill="#F6ECE7" />
      <rect x="6" y="25" width="3" height="1" fill="#FFFFFF" />
      <rect x="6" y="26" width="3" height="1" fill="#111111" />
      <rect x={6 + (isWalking ? stepOffset : 0)} y="27" width="3" height="1" fill="#111111" />

      <rect x="11" y="23" width="3" height="2" fill="#F6ECE7" />
      <rect x="11" y="25" width="3" height="1" fill="#FFFFFF" />
      <rect x="11" y="26" width="3" height="1" fill="#111111" />
      <rect x={11 - (isWalking ? stepOffset : 0)} y="27" width="3" height="1" fill="#111111" />

      {isSpecial && <circle cx="10" cy="1" r="2.5" fill="#EF4444" />}
    </svg>
  );
}

/* ---------------- SANS SPRITE ---------------- */
export function SansSprite({
  stepOffset = 0,
  isSpecial = false,
  isSleeping = false,
}: {
  stepOffset?: number;
  isSpecial?: boolean;
  isSleeping?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 24 28"
      className="w-13 h-16 sm:w-16 sm:h-20 drop-shadow-md"
      shapeRendering="crispEdges"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="7" y="3" width="10" height="2" fill="#FFFFFF" />
      <rect x="6" y="5" width="12" height="6" fill="#FFFFFF" />
      <rect x="8" y="11" width="8" height="2" fill="#FFFFFF" />

      <rect x="8" y="6" width="2" height="3" fill="#000000" />
      <rect x="14" y="6" width="2" height="3" fill="#000000" />

      {isSleeping ? (
        <>
          <rect x="8" y="8" width="2" height="1" fill="#FFFFFF" />
          <rect x="14" y="8" width="2" height="1" fill="#FFFFFF" />
        </>
      ) : isSpecial ? (
        <>
          <rect x="8" y="7" width="2" height="2" fill="#06B6D4" />
          <rect x="8" y="6" width="1" height="1" fill="#FACC15" />
          <rect x="14" y="7" width="1" height="1" fill="#FFFFFF" />
        </>
      ) : (
        <>
          <rect x="9" y="7" width="1" height="1" fill="#FFFFFF" />
          <rect x="14" y="7" width="1" height="1" fill="#FFFFFF" />
        </>
      )}

      <rect x="11" y="9" width="2" height="1" fill="#000000" />

      <rect x="8" y="11" width="8" height="1" fill="#000000" />
      <rect x="9" y="10" width="1" height="2" fill="#000000" />
      <rect x="11" y="10" width="1" height="2" fill="#000000" />
      <rect x="13" y="10" width="1" height="2" fill="#000000" />

      <rect x="5" y="13" width="14" height="7" fill="#2563EB" />
      <rect x="10" y="13" width="4" height="6" fill="#F1F5F9" />
      <rect x="7" y="13" width="2" height="2" fill="#93C5FD" />
      <rect x="15" y="13" width="2" height="2" fill="#93C5FD" />

      <rect x="7" y="20" width="10" height="4" fill="#111111" />
      <rect x="7" y="20" width="1" height="4" fill="#FFFFFF" />
      <rect x="16" y="20" width="1" height="4" fill="#FFFFFF" />

      <rect x="8" y="24" width="2" height="1" fill="#FFFFFF" />
      <rect x="14" y="24" width="2" height="1" fill="#FFFFFF" />

      <rect x={7 + stepOffset} y="25" width="4" height="2" fill="#F472B6" />
      <rect x={13 - stepOffset} y="25" width="4" height="2" fill="#F472B6" />

      {isSpecial && (
        <path
          d="M 12 0 L 14 2 L 14 4 L 12 6 L 10 4 L 10 2 Z"
          fill="#EF4444"
          transform="scale(0.8) translate(3, -4)"
        />
      )}
    </svg>
  );
}

/* ---------------- STEVE SPRITE ---------------- */
export function SteveSprite({
  state = "idle",
  stepOffset = 0,
  isSpecial = false,
  isSleeping = false,
  frame = 0,
}: {
  state?: AnimationState;
  isWalking?: boolean;
  stepOffset?: number;
  isSpecial?: boolean;
  isSleeping?: boolean;
  frame?: number;
}) {
  const isMining = state === "mine" || isSpecial;
  const armSwing = isMining ? (frame % 2 === 0 ? -15 : 20) : 0;

  return (
    <svg
      viewBox="0 0 24 28"
      className="w-13 h-16 sm:w-16 sm:h-20 drop-shadow-md"
      shapeRendering="crispEdges"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="6" y="3" width="10" height="3" fill="#452817" />
      <rect x="5" y="4" width="2" height="5" fill="#452817" />
      <rect x="15" y="4" width="2" height="5" fill="#452817" />

      <rect x="7" y="6" width="8" height="5" fill="#BD8B67" />
      <rect x="8" y="11" width="6" height="1" fill="#BD8B67" />

      {isSleeping ? (
        <>
          <rect x="7" y="8" width="2" height="1" fill="#452817" />
          <rect x="13" y="8" width="2" height="1" fill="#452817" />
        </>
      ) : (
        <>
          <rect x="7" y="8" width="1" height="1" fill="#FFFFFF" />
          <rect x="8" y="8" width="1" height="1" fill="#3B489A" />
          <rect x="13" y="8" width="1" height="1" fill="#3B489A" />
          <rect x="14" y="8" width="1" height="1" fill="#FFFFFF" />
        </>
      )}

      <rect x="10" y="9" width="2" height="1" fill="#A06E4B" />
      <rect x="9" y="10" width="4" height="1" fill="#503522" />

      <rect x="6" y="12" width="10" height="7" fill="#00A8A8" />
      <rect x="9" y="12" width="4" height="2" fill="#BD8B67" />

      <rect x="4" y="12" width="2" height="2" fill="#00A8A8" />
      <rect x="4" y="14" width="2" height="5" fill="#BD8B67" />

      <g transform={`rotate(${armSwing} 17 13)`}>
        <rect x="16" y="12" width="2" height="2" fill="#00A8A8" />
        <rect x="16" y="14" width="2" height="5" fill="#BD8B67" />
        <g transform="translate(18, 14)">
          <rect x="0" y="2" width="1" height="6" fill="#855226" />
          <rect x="-2" y="1" width="5" height="1" fill="#06B6D4" />
          <rect x="-1" y="0" width="3" height="1" fill="#06B6D4" />
          <rect x="-3" y="2" width="1" height="2" fill="#06B6D4" />
          <rect x="3" y="2" width="1" height="2" fill="#06B6D4" />
        </g>
      </g>

      <rect x="6" y="19" width="10" height="5" fill="#2E3A8C" />

      <rect x={6 + stepOffset} y="24" width="4" height="3" fill="#4B4B4B" />
      <rect x={12 - stepOffset} y="24" width="4" height="3" fill="#4B4B4B" />

      {isSpecial && (
        <g transform="translate(8, -4)">
          <rect x="0" y="0" width="6" height="2" fill="#22C55E" />
          <rect x="0" y="2" width="6" height="4" fill="#78350F" />
        </g>
      )}
    </svg>
  );
}

/* ---------------- MINI CLAUDE SPRITE ---------------- */
export function ClaudeSprite({
  frame = 0,
  isSpecial = false,
  isSleeping = false,
  isPeeking = false,
}: {
  frame?: number;
  isSpecial?: boolean;
  isSleeping?: boolean;
  isPeeking?: boolean;
}) {
  const eyeBlink = frame % 6 === 0;

  return (
    <svg
      viewBox={isPeeking ? "0 0 24 18" : "0 0 24 28"}
      className={isPeeking ? "w-13 h-10 sm:w-16 sm:h-12 drop-shadow-md" : "w-13 h-16 sm:w-16 sm:h-20 drop-shadow-md"}
      shapeRendering="crispEdges"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform="translate(12, 3)">
        <circle cx="0" cy="0" r="2.5" fill="#F59E0B" />
        <line x1="-3" y1="0" x2="3" y2="0" stroke="#F59E0B" strokeWidth="1" />
        <line x1="0" y1="-3" x2="0" y2="3" stroke="#F59E0B" strokeWidth="1" />
        <line x1="-2" y1="-2" x2="2" y2="2" stroke="#F59E0B" strokeWidth="1" />
        <line x1="-2" y1="2" x2="2" y2="-2" stroke="#F59E0B" strokeWidth="1" />
      </g>
      <rect x="11" y="4" width="2" height="2" fill="#CC785C" />

      <rect x="4" y="6" width="16" height="13" rx="2" fill="#D97757" />
      <rect x="5" y="7" width="14" height="11" fill="#C46445" />

      <rect x="6" y="8" width="12" height="9" fill="#FFF7ED" />

      {isSleeping ? (
        <>
          <rect x="8" y="12" width="2" height="1" fill="#3D1D13" />
          <rect x="14" y="12" width="2" height="1" fill="#3D1D13" />
        </>
      ) : eyeBlink ? (
        <>
          <rect x="8" y="12" width="3" height="1" fill="#3D1D13" />
          <rect x="13" y="12" width="3" height="1" fill="#3D1D13" />
        </>
      ) : isSpecial ? (
        <>
          <rect x="8" y="11" width="3" height="3" fill="#EF4444" />
          <rect x="13" y="11" width="3" height="3" fill="#EF4444" />
        </>
      ) : (
        <>
          <rect x="8" y="11" width="2" height="2" fill="#3D1D13" />
          <rect x="14" y="11" width="2" height="2" fill="#3D1D13" />
          <rect x="7" y="14" width="2" height="1" fill="#FCA5A5" />
          <rect x="15" y="14" width="2" height="1" fill="#FCA5A5" />
        </>
      )}

      {!isPeeking && (
        <>
          <rect x="7" y="19" width="10" height="3" fill="#D97757" />
          <rect x="9" y="20" width="6" height="1" fill="#FED7AA" />
          <rect x="7" y="22" width="3" height="3" fill="#A84C32" />
          <rect x="14" y="22" width="3" height="3" fill="#A84C32" />
        </>
      )}
    </svg>
  );
}

/* ---------------- CREEPER SPRITE ---------------- */
export function CreeperSprite({
  stepOffset = 0,
  isSpecial = false,
}: {
  frame?: number;
  isSpecial?: boolean;
  isWalking?: boolean;
  stepOffset?: number;
}) {
  return (
    <svg
      viewBox="0 0 20 28"
      className={`w-12 h-16 sm:w-14 sm:h-20 drop-shadow-md transition-transform ${isSpecial ? "scale-115" : ""}`}
      shapeRendering="crispEdges"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="5" y="3" width="10" height="10" fill="#4CAF50" />
      <rect x="6" y="4" width="2" height="2" fill="#388E3C" />
      <rect x="12" y="4" width="2" height="2" fill="#81C784" />
      <rect x="7" y="10" width="3" height="2" fill="#388E3C" />

      <rect x="6" y="6" width="2" height="2" fill="#000000" />
      <rect x="12" y="6" width="2" height="2" fill="#000000" />
      <rect x="9" y="8" width="2" height="3" fill="#000000" />
      <rect x="8" y="9" width="4" height="2" fill="#000000" />
      <rect x="7" y="11" width="2" height="2" fill="#000000" />
      <rect x="11" y="11" width="2" height="2" fill="#000000" />

      <rect x="7" y="13" width="6" height="8" fill="#43A047" />
      <rect x="8" y="14" width="2" height="3" fill="#2E7D32" />
      <rect x="10" y="17" width="2" height="2" fill="#66BB6A" />

      <rect x={6 + stepOffset} y="21" width="3" height="5" fill="#388E3C" />
      <rect x={11 - stepOffset} y="21" width="3" height="5" fill="#388E3C" />

      <rect x={6 + stepOffset} y="25" width="3" height="2" fill="#1B5E20" />
      <rect x={11 - stepOffset} y="25" width="3" height="2" fill="#1B5E20" />

      {isSpecial && (
        <text x="10" y="2" textAnchor="middle" fill="#EF4444" fontSize="5" fontWeight="bold" fontFamily="monospace">
          ssss...
        </text>
      )}
    </svg>
  );
}

/* ---------------- ANNOYING DOG SPRITE ---------------- */
export function AnnoyingDogSprite({
  frame = 0,
  isSleeping = false,
}: {
  frame?: number;
  isSleeping?: boolean;
}) {
  const tailWag = frame % 2 === 0 ? 0 : -1;

  return (
    <svg
      viewBox="0 0 24 18"
      className="w-14 h-11 sm:w-16 sm:h-12 drop-shadow-md"
      shapeRendering="crispEdges"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="13" y="4" width="7" height="6" fill="#FFFFFF" />
      <rect x="13" y="2" width="2" height="3" fill="#FFFFFF" />
      <rect x="17" y="2" width="2" height="3" fill="#FFFFFF" />
      <rect x="19" y="7" width="2" height="3" fill="#FFFFFF" />
      <rect x="20" y="7" width="1" height="1" fill="#000000" />
      {isSleeping ? (
        <rect x="15" y="6" width="2" height="1" fill="#000000" />
      ) : (
        <rect x="15" y="5" width="1" height="2" fill="#000000" />
      )}

      <rect x="6" y="7" width="9" height="6" fill="#FFFFFF" />

      <rect x="7" y="13" width="2" height="3" fill="#FFFFFF" />
      <rect x="13" y="13" width="2" height="3" fill="#FFFFFF" />

      <rect x="4" y={6 + tailWag} width="2" height="2" fill="#FFFFFF" />
      <rect x="3" y={5 + tailWag} width="2" height="2" fill="#FFFFFF" />
    </svg>
  );
}

/* ---------------- ENDERMAN SPRITE ---------------- */
export function EndermanSprite({
  frame = 0,
  isSpecial = false,
}: {
  frame?: number;
  isSpecial?: boolean;
}) {
  const purplePulse = frame % 2 === 0 ? "#C084FC" : "#E879F9";

  return (
    <svg
      viewBox="0 0 16 32"
      className="w-10 h-20 sm:w-12 sm:h-24 drop-shadow-md"
      shapeRendering="crispEdges"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="4" y="2" width="8" height="6" fill="#18181B" />
      <rect x="4" y="5" width="3" height="1" fill={purplePulse} />
      <rect x="9" y="5" width="3" height="1" fill={purplePulse} />
      <rect x="5" y="5" width="1" height="1" fill="#FFFFFF" />
      <rect x="10" y="5" width="1" height="1" fill="#FFFFFF" />

      <rect x="6" y="8" width="4" height="10" fill="#18181B" />
      <rect x="3" y="8" width="2" height="14" fill="#18181B" />
      <rect x="11" y="8" width="2" height="14" fill="#18181B" />

      <rect x="5" y="18" width="2" height="13" fill="#18181B" />
      <rect x="9" y="18" width="2" height="13" fill="#18181B" />

      {isSpecial && (
        <g>
          <rect x="2" y="1" width="1" height="1" fill="#A855F7" />
          <rect x="13" y="14" width="1" height="1" fill="#A855F7" />
          <rect x="1" y="26" width="1" height="1" fill="#A855F7" />
          <rect x="14" y="28" width="1" height="1" fill="#C084FC" />
        </g>
      )}
    </svg>
  );
}

/* ---------------- RALSEI SPRITE (Deltarune / Undertale) ---------------- */
export function RalseiSprite({
  stepOffset = 0,
  isSpecial = false,
}: {
  frame?: number;
  isSpecial?: boolean;
  isWalking?: boolean;
  stepOffset?: number;
}) {
  return (
    <svg
      viewBox="0 0 22 28"
      className="w-13 h-16 sm:w-15 sm:h-20 drop-shadow-md"
      shapeRendering="crispEdges"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Pink Horns */}
      <rect x="6" y="2" width="2" height="3" fill="#F472B6" />
      <rect x="14" y="2" width="2" height="3" fill="#F472B6" />

      {/* Pointy Green Wizard Hat */}
      <polygon points="11,1 5,7 17,7" fill="#15803D" />
      <rect x="4" y="6" width="14" height="2" fill="#166534" />

      {/* Fluffy Black Face & Ears */}
      <rect x="6" y="8" width="10" height="6" fill="#1C1917" />
      <rect x="4" y="9" width="2" height="4" fill="#1C1917" />
      <rect x="16" y="9" width="2" height="4" fill="#1C1917" />

      {/* Round Green Glasses */}
      <rect x="7" y="10" width="3" height="2" fill="#4ADE80" />
      <rect x="12" y="10" width="3" height="2" fill="#4ADE80" />
      <rect x="10" y="10" width="2" height="1" fill="#4ADE80" />
      <rect x="8" y="10" width="1" height="1" fill="#FFFFFF" />
      <rect x="13" y="10" width="1" height="1" fill="#FFFFFF" />

      {/* Trailing Pink Scarf */}
      <rect x="6" y="14" width="10" height="3" fill="#EC4899" />
      <rect x="4" y="15" width="2" height="5" fill="#DB2777" />

      {/* Green Robe */}
      <rect x="6" y="17" width="10" height="7" fill="#16A34A" />
      {/* Black heart in center of robe */}
      <rect x="10" y="19" width="2" height="2" fill="#14532D" />

      {/* Feet */}
      <rect x={7 + stepOffset} y="24" width="3" height="3" fill="#1C1917" />
      <rect x={12 - stepOffset} y="24" width="3" height="3" fill="#1C1917" />

      {/* Special: Healing sparkle */}
      {isSpecial && (
        <circle cx="11" cy="0" r="2.5" fill="#34D399" />
      )}
    </svg>
  );
}

/* ---------------- PAPYRUS SPRITE (Undertale) ---------------- */
export function PapyrusSprite({
  stepOffset = 0,
  isSpecial = false,
}: {
  frame?: number;
  isSpecial?: boolean;
  isWalking?: boolean;
  stepOffset?: number;
}) {
  return (
    <svg
      viewBox="0 0 24 32"
      className="w-13 h-18 sm:w-16 sm:h-22 drop-shadow-md"
      shapeRendering="crispEdges"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Tall Skull */}
      <rect x="8" y="2" width="8" height="3" fill="#FFFFFF" />
      <rect x="7" y="5" width="10" height="6" fill="#FFFFFF" />
      {/* Eye Sockets */}
      <rect x="9" y="6" width="2" height="3" fill="#000000" />
      <rect x="13" y="6" width="2" height="3" fill="#000000" />
      {/* Toothy Grin */}
      <rect x="8" y="10" width="8" height="1" fill="#000000" />
      <rect x="9" y="9" width="1" height="2" fill="#000000" />
      <rect x="11" y="9" width="1" height="2" fill="#000000" />
      <rect x="13" y="9" width="1" height="2" fill="#000000" />

      {/* Red Scarf (Trailing) */}
      <rect x="6" y="11" width="12" height="3" fill="#EA580C" />
      <rect x="3" y="12" width="3" height="6" fill="#C2410C" />

      {/* Battle Body Chestplate (White & Gold) */}
      <rect x="7" y="14" width="10" height="6" fill="#F8FAFC" />
      <rect x="5" y="14" width="2" height="3" fill="#EAB308" />
      <rect x="17" y="14" width="2" height="3" fill="#EAB308" />

      {/* Blue Briefs / Belt */}
      <rect x="8" y="20" width="8" height="3" fill="#2563EB" />

      {/* Skeletal Legs */}
      <rect x="9" y="23" width="1" height="4" fill="#FFFFFF" />
      <rect x="14" y="23" width="1" height="4" fill="#FFFFFF" />

      {/* Heroic Red Boots */}
      <rect x={7 + stepOffset} y="26" width="4" height="4" fill="#DC2626" />
      <rect x={13 - stepOffset} y="26" width="4" height="4" fill="#DC2626" />

      {/* Special: Spaghetti plate! */}
      {isSpecial && (
        <g transform="translate(16, 10)">
          <rect x="0" y="3" width="6" height="2" fill="#FFFFFF" />
          <rect x="1" y="1" width="4" height="2" fill="#EF4444" />
          <rect x="2" y="0" width="2" height="1" fill="#EAB308" />
        </g>
      )}
    </svg>
  );
}

/* ---------------- FRISK SPRITE (Undertale) ---------------- */
export function FriskSprite({
  stepOffset = 0,
  isSpecial = false,
}: {
  frame?: number;
  isSpecial?: boolean;
  isWalking?: boolean;
  stepOffset?: number;
}) {
  return (
    <svg
      viewBox="0 0 20 28"
      className="w-12 h-16 sm:w-14 sm:h-20 drop-shadow-md"
      shapeRendering="crispEdges"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Brown Hair */}
      <rect x="5" y="3" width="10" height="3" fill="#451A03" />
      <rect x="4" y="5" width="12" height="5" fill="#451A03" />

      {/* Face (Tan/Yellow skin) */}
      <rect x="6" y="8" width="8" height="5" fill="#FDE047" />
      {/* Peaceful straight-line eyes - - */}
      <rect x="7" y="10" width="2" height="1" fill="#713F12" />
      <rect x="11" y="10" width="2" height="1" fill="#713F12" />

      {/* Blue & Magenta Striped Shirt */}
      <rect x="5" y="13" width="10" height="7" fill="#4338CA" />
      <rect x="5" y="15" width="10" height="1" fill="#C026D3" />
      <rect x="5" y="18" width="10" height="1" fill="#C026D3" />

      {/* Blue Shorts */}
      <rect x="6" y="20" width="8" height="3" fill="#1E1B4B" />

      {/* Legs & Shoes */}
      <rect x={6 + stepOffset} y="23" width="3" height="4" fill="#78350F" />
      <rect x={11 - stepOffset} y="23" width="3" height="4" fill="#78350F" />

      {/* Special: Red SOUL heart */}
      {isSpecial && (
        <path
          d="M 10 0 L 12 2 L 12 4 L 10 6 L 8 4 L 8 2 Z"
          fill="#EF4444"
          transform="scale(0.8) translate(2, -4)"
        />
      )}
    </svg>
  );
}

/* ---------------- MINECRAFT PIG SPRITE ---------------- */
export function MinecraftPigSprite({
  stepOffset = 0,
}: {
  frame?: number;
  isWalking?: boolean;
  stepOffset?: number;
}) {
  return (
    <svg
      viewBox="0 0 24 18"
      className="w-14 h-11 sm:w-16 sm:h-12 drop-shadow-md"
      shapeRendering="crispEdges"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Pig Head */}
      <rect x="13" y="3" width="8" height="7" fill="#F472B6" />
      {/* Snout */}
      <rect x="17" y="6" width="5" height="3" fill="#FB7185" />
      <rect x="18" y="7" width="1" height="1" fill="#BE123C" />
      <rect x="20" y="7" width="1" height="1" fill="#BE123C" />
      {/* Eyes */}
      <rect x="15" y="5" width="1" height="1" fill="#000000" />
      <rect x="14" y="5" width="1" height="1" fill="#FFFFFF" />

      {/* Body */}
      <rect x="5" y="5" width="10" height="7" fill="#F472B6" />

      {/* Stubby Legs */}
      <rect x={6 + stepOffset} y="12" width="2" height="4" fill="#FB7185" />
      <rect x={12 - stepOffset} y="12" width="2" height="4" fill="#FB7185" />
    </svg>
  );
}
