"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PixelSprite } from "./PixelSprites";
import { DialogueBox } from "./DialogueBox";
import { CharacterId, SpawnSlot } from "./types";
import { useCompanionSlot } from "./SpawnContext";
import { getLocationAwareQuote } from "./dialogues";
import { playPokeSound } from "../../lib/sound";

interface DynamicCompanionProps {
  slot: SpawnSlot;
  className?: string;
  defaultCharacter?: CharacterId;
}

const CHARACTER_NAMES: Record<CharacterId, string> = {
  dhimas: "Dhimas",
  omori: "Omori",
  sans: "Sans",
  claude: "Claude",
  steve: "Steve",
  creeper: "Creeper",
  dog: "Annoying Dog",
  enderman: "Enderman",
  ralsei: "Ralsei",
  papyrus: "The Great Papyrus",
  frisk: "Frisk",
  pig: "Minecraft Pig",
};

export function DynamicCompanion({
  slot,
  className = "",
  defaultCharacter,
}: DynamicCompanionProps) {
  const assignedId = useCompanionSlot(slot) || defaultCharacter || null;
  const [frame, setFrame] = useState(0);
  const [activeQuote, setActiveQuote] = useState<string | null>(null);
  const [isSpecial, setIsSpecial] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Walker specific state (for about-divider, experience-divider, and footer-divider)
  const isWalkerSlot =
    slot === "about-divider" ||
    slot === "experience-divider" ||
    slot === "footer-divider";
  const isPeekerSlot = slot.startsWith("projects-card");

  const [walkX, setWalkX] = useState(15);
  const [walkDir, setWalkDir] = useState<1 | -1>(1);
  const [isWalking, setIsWalking] = useState(true);

  // Animation frame ticker
  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((f) => (f + 1) % 10);
    }, 360);
    return () => clearInterval(interval);
  }, []);

  // Walker motion logic (only active for about-divider slot)
  useEffect(() => {
    if (!isWalkerSlot || !isWalking || activeQuote) return;

    const moveInterval = setInterval(() => {
      setWalkX((prev) => {
        const next = prev + walkDir * 1.2;
        if (next >= 85) {
          setWalkDir(-1);
          setIsWalking(false);
          setTimeout(() => setIsWalking(true), 3000);
          return 85;
        }
        if (next <= 10) {
          setWalkDir(1);
          setIsWalking(false);
          setTimeout(() => setIsWalking(true), 3000);
          return 10;
        }
        return next;
      });
    }, 180);

    return () => clearInterval(moveInterval);
  }, [isWalkerSlot, walkDir, isWalking, activeQuote]);

  if (!assignedId) return null;

  const charName = CHARACTER_NAMES[assignedId] || "Friend";

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSpecial(true);
    playPokeSound();
    setActiveQuote(getLocationAwareQuote(assignedId, slot));
    setTimeout(() => setIsSpecial(false), 3000);
  };

  /* --- 1. WALKER RENDER (Along Divider Line) --- */
  if (isWalkerSlot) {
    return (
      <div className={`relative w-full h-0 z-30 select-none ${className}`}>
        <motion.div
          animate={{ left: `${walkX}%` }}
          transition={{ type: "tween", ease: "linear", duration: 0.18 }}
          className="absolute bottom-0 -translate-x-1/2 cursor-pointer pointer-events-auto group"
          onClick={handleClick}
          style={{ transform: `scaleX(${walkDir})` }}
        >
          {activeQuote && (
            <div style={{ transform: `scaleX(${walkDir})` }}>
              <DialogueBox
                speaker={assignedId}
                speakerName={charName}
                text={activeQuote}
                onDismiss={() => setActiveQuote(null)}
              />
            </div>
          )}

          <div className="relative -mb-1 transform transition-transform group-hover:scale-115">
            <PixelSprite
              id={assignedId}
              state={isWalking ? "walk" : "idle"}
              direction={1}
              frame={frame}
              isSpecial={isSpecial}
            />
          </div>
        </motion.div>
      </div>
    );
  }

  /* --- 2. PEEKER RENDER (Peeking behind Project Cards) --- */
  if (isPeekerSlot) {
    return (
      <div
        className={`absolute -top-9 right-8 z-0 pointer-events-auto cursor-pointer select-none group ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
        title={charName}
      >
        {activeQuote && (
          <DialogueBox
            speaker={assignedId}
            speakerName={charName}
            text={activeQuote}
            onDismiss={() => setActiveQuote(null)}
          />
        )}

        <motion.div
          animate={{
            y: isHovered || activeQuote ? -12 : [0, 4, 0],
          }}
          transition={{
            y: { duration: 0.25, ease: "easeOut" },
            repeat: isHovered || activeQuote ? 0 : Infinity,
            repeatDelay: 3,
          }}
          className="relative"
        >
          <PixelSprite
            id={assignedId}
            state={assignedId === "claude" ? "peek" : "idle"}
            frame={frame}
            isSpecial={isSpecial || isHovered}
          />
        </motion.div>
      </div>
    );
  }

  /* --- 3. MINER / STATIONARY RENDER --- */
  return (
    <div className={`relative inline-block select-none z-20 ${className}`}>
      <div
        className="relative cursor-pointer pointer-events-auto group"
        onClick={handleClick}
        title={charName}
      >
        {activeQuote && (
          <DialogueBox
            speaker={assignedId}
            speakerName={charName}
            text={activeQuote}
            onDismiss={() => setActiveQuote(null)}
          />
        )}

        <div className="transform transition-transform group-hover:scale-115">
          <PixelSprite
            id={assignedId}
            state="idle"
            frame={frame}
            isSpecial={isSpecial}
          />
        </div>
      </div>
    </div>
  );
}
