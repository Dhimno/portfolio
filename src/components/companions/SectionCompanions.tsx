"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  OmoriSprite,
  SansSprite,
  ClaudeSprite,
  SteveSprite,
  CreeperSprite,
  AnnoyingDogSprite,
  EndermanSprite,
} from "./PixelSprites";
import { DialogueBox } from "./DialogueBox";
import { SOLO_QUOTES } from "./dialogues";
import { CharacterId } from "./types";

function getRandomQuote(id: CharacterId): string {
  const quotes = SOLO_QUOTES[id] || [];
  if (quotes.length === 0) return "* ...";
  return quotes[Math.floor(Math.random() * quotes.length)];
}

/* =========================================================================
   1. OMORI WALKER — Walks back and forth along the divider line in About
   ========================================================================= */
export function OmoriWalker() {
  const [posX, setPosX] = useState(15); // percentage 10% - 85%
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isWalking, setIsWalking] = useState(true);
  const [frame, setFrame] = useState(0);
  const [activeQuote, setActiveQuote] = useState<string | null>(null);
  const [isSpecial, setIsSpecial] = useState(false);

  // Animation frame tick
  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((f) => (f + 1) % 8);
    }, 320);
    return () => clearInterval(interval);
  }, []);

  // Pacing behavior along the line
  useEffect(() => {
    if (!isWalking || activeQuote) return;

    const moveInterval = setInterval(() => {
      setPosX((prev) => {
        const next = prev + direction * 1.2;
        if (next >= 85) {
          setDirection(-1);
          setIsWalking(false);
          setTimeout(() => setIsWalking(true), 3200); // pause at the end
          return 85;
        }
        if (next <= 10) {
          setDirection(1);
          setIsWalking(false);
          setTimeout(() => setIsWalking(true), 3200); // pause at the start
          return 10;
        }
        return next;
      });
    }, 180);

    return () => clearInterval(moveInterval);
  }, [direction, isWalking, activeQuote]);

  const handleClick = () => {
    setIsWalking(false);
    setIsSpecial(true);
    setActiveQuote(getRandomQuote("omori"));
    setTimeout(() => {
      setIsSpecial(false);
      setTimeout(() => setIsWalking(true), 2500);
    }, 4500);
  };

  return (
    <div className="relative w-full h-0 z-30 select-none">
      <motion.div
        animate={{ left: `${posX}%` }}
        transition={{ type: "tween", ease: "linear", duration: 0.18 }}
        className="absolute bottom-0 -translate-x-1/2 cursor-pointer pointer-events-auto group"
        onClick={handleClick}
        style={{ transform: `scaleX(${direction})` }}
      >
        {activeQuote && (
          <div style={{ transform: `scaleX(${direction})` }}>
            <DialogueBox
              speaker="omori"
              speakerName="Omori"
              text={activeQuote}
              onDismiss={() => setActiveQuote(null)}
            />
          </div>
        )}

        <div className="relative -mb-1 transform transition-transform group-hover:scale-115">
          <OmoriSprite
            isWalking={isWalking}
            stepOffset={frame % 2 === 0 ? 1 : -1}
            isSpecial={isSpecial}
          />
        </div>
      </motion.div>
    </div>
  );
}

/* =========================================================================
   2. SANS LOUNGER — Lounges on the Pillars / Foundations section
   ========================================================================= */
export function SansLounger() {
  const [frame, setFrame] = useState(0);
  const [activeQuote, setActiveQuote] = useState<string | null>(null);
  const [isSpecial, setIsSpecial] = useState(false);
  const [isSleeping, setIsSleeping] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((f) => (f + 1) % 10);
    }, 450);
    return () => clearInterval(interval);
  }, []);

  // Occasionally takes a nap
  useEffect(() => {
    const sleepInterval = setInterval(() => {
      setIsSleeping((s) => !s);
    }, 12000);
    return () => clearInterval(sleepInterval);
  }, []);

  const handleClick = () => {
    setIsSleeping(false);
    setIsSpecial(true);
    setActiveQuote(getRandomQuote("sans"));
    setTimeout(() => setIsSpecial(false), 3000);
  };

  return (
    <div className="relative inline-block select-none z-20">
      <div
        className="relative cursor-pointer pointer-events-auto group"
        onClick={handleClick}
        title="Sans the Skeleton"
      >
        {activeQuote && (
          <DialogueBox
            speaker="sans"
            speakerName="Sans"
            text={activeQuote}
            onDismiss={() => setActiveQuote(null)}
          />
        )}

        {isSleeping && !activeQuote && (
          <motion.div
            animate={{ y: [0, -3, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute -top-5 left-1/2 -translate-x-1/2 font-pixel text-[10px] text-sky-400 pointer-events-none"
          >
            Zzz...
          </motion.div>
        )}

        <div className="transform transition-transform group-hover:scale-115">
          <SansSprite
            isSpecial={isSpecial}
            isSleeping={isSleeping}
            stepOffset={frame % 4 === 0 ? 0.5 : 0}
          />
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   3. CLAUDE PEEKER — Peeks out from behind Project cards
   ========================================================================= */
export function ClaudePeeker() {
  const [isHovered, setIsHovered] = useState(false);
  const [activeQuote, setActiveQuote] = useState<string | null>(null);
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((f) => (f + 1) % 8);
    }, 380);
    return () => clearInterval(interval);
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveQuote(getRandomQuote("claude"));
  };

  return (
    <div
      className="absolute -top-9 right-8 z-0 pointer-events-auto cursor-pointer select-none group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      title="Mini Claude"
    >
      {activeQuote && (
        <DialogueBox
          speaker="claude"
          speakerName="Claude"
          text={activeQuote}
          onDismiss={() => setActiveQuote(null)}
        />
      )}

      <motion.div
        animate={{
          y: isHovered || activeQuote ? -12 : [0, 4, 0],
        }}
        transition={{
          y: { duration: 0.28, ease: "easeOut" },
          repeat: isHovered || activeQuote ? 0 : Infinity,
          repeatDelay: 3,
        }}
        className="relative"
      >
        <ClaudeSprite
          frame={frame}
          isSpecial={isHovered}
          isPeeking={true}
        />
      </motion.div>
    </div>
  );
}

/* =========================================================================
   4. CREEPER PEEKER — Peeks from behind another Project card
   ========================================================================= */
export function CreeperPeeker() {
  const [isHovered, setIsHovered] = useState(false);
  const [activeQuote, setActiveQuote] = useState<string | null>(null);
  const [isHissing, setIsHissing] = useState(false);
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((f) => (f + 1) % 6);
    }, 400);
    return () => clearInterval(interval);
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsHissing(true);
    setActiveQuote(getRandomQuote("creeper"));
    setTimeout(() => setIsHissing(false), 2400);
  };

  return (
    <div
      className="absolute -top-8 left-8 z-0 pointer-events-auto cursor-pointer select-none group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      title="Creeper"
    >
      {activeQuote && (
        <DialogueBox
          speaker="creeper"
          speakerName="Creeper"
          text={activeQuote}
          onDismiss={() => setActiveQuote(null)}
        />
      )}

      <motion.div
        animate={{
          y: isHovered || activeQuote ? -10 : [0, 5, 0],
          scale: isHissing ? [1, 1.14, 1] : 1,
        }}
        transition={{
          y: { duration: 0.25, ease: "easeOut" },
          scale: { duration: 0.4, repeat: isHissing ? 4 : 0 },
        }}
        className="relative"
      >
        <CreeperSprite
          frame={frame}
          isSpecial={isHissing}
        />
      </motion.div>
    </div>
  );
}

/* =========================================================================
   5. STEVE MINER — Mining the border of the Projects section
   ========================================================================= */
export function SteveMiner() {
  const [frame, setFrame] = useState(0);
  const [activeQuote, setActiveQuote] = useState<string | null>(null);
  const [isMining, setIsMining] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((f) => (f + 1) % 8);
    }, 280);
    return () => clearInterval(interval);
  }, []);

  const handleClick = () => {
    setIsMining(false);
    setActiveQuote(getRandomQuote("steve"));
    setTimeout(() => setIsMining(true), 4000);
  };

  return (
    <div className="relative inline-block select-none z-20">
      <div
        className="relative cursor-pointer pointer-events-auto group"
        onClick={handleClick}
        title="Steve (Minecraft)"
      >
        {activeQuote && (
          <DialogueBox
            speaker="steve"
            speakerName="Steve"
            text={activeQuote}
            onDismiss={() => setActiveQuote(null)}
          />
        )}

        <div className="transform transition-transform group-hover:scale-115">
          <SteveSprite
            state={isMining ? "mine" : "idle"}
            frame={frame}
            isSpecial={isMining}
          />
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   6. ANNOYING DOG — Sleeping atop the Experience timeline node
   ========================================================================= */
export function AnnoyingDogTimeline() {
  const [frame, setFrame] = useState(0);
  const [isSleeping, setIsSleeping] = useState(true);
  const [activeQuote, setActiveQuote] = useState<string | null>(null);
  const [wakeTimeout, setWakeTimeout] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((f) => (f + 1) % 6);
    }, 450);
    return () => clearInterval(interval);
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (wakeTimeout) clearTimeout(wakeTimeout);
    setIsSleeping(false);
    setActiveQuote(getRandomQuote("dog"));

    const to = setTimeout(() => {
      setIsSleeping(true);
    }, 4500);
    setWakeTimeout(to);
  };

  return (
    <div className="relative inline-block select-none z-20">
      <div
        className="relative cursor-pointer pointer-events-auto group"
        onClick={handleClick}
        title="Annoying Dog (Toby Fox)"
      >
        {activeQuote && (
          <DialogueBox
            speaker="dog"
            speakerName="Annoying Dog"
            text={activeQuote}
            onDismiss={() => setActiveQuote(null)}
          />
        )}

        {!activeQuote && (
          <motion.div
            animate={{ y: [0, -2, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute -top-4 right-1 font-pixel text-[9px] text-amber-300 pointer-events-none"
          >
            {isSleeping ? "Zzz" : "Bark!"}
          </motion.div>
        )}

        <div className="transform transition-transform group-hover:scale-115">
          <AnnoyingDogSprite
            frame={frame}
            isSleeping={isSleeping}
          />
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   7. HERO ENDERMAN — Lurking subtly in the Hero section corner
   ========================================================================= */
export function HeroEnderman() {
  const [frame, setFrame] = useState(0);
  const [activeQuote, setActiveQuote] = useState<string | null>(null);
  const [isSpecial, setIsSpecial] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((f) => (f + 1) % 6);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const handleClick = () => {
    setIsSpecial(true);
    setActiveQuote(getRandomQuote("enderman"));
    setTimeout(() => setIsSpecial(false), 3000);
  };

  return (
    <div className="relative inline-block select-none z-20">
      <div
        className="relative cursor-pointer pointer-events-auto group"
        onClick={handleClick}
        title="Enderman"
      >
        {activeQuote && (
          <DialogueBox
            speaker="enderman"
            speakerName="Enderman"
            text={activeQuote}
            onDismiss={() => setActiveQuote(null)}
          />
        )}

        <div className="transform transition-transform group-hover:scale-115">
          <EndermanSprite
            frame={frame}
            isSpecial={isSpecial}
          />
        </div>
      </div>
    </div>
  );
}
