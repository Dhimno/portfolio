"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PixelSprite } from "./PixelSprites";
import { DialogueBox } from "./DialogueBox";
import { CharacterId, CompanionCharacter } from "./types";
import { SOLO_QUOTES, CROSS_DIALOGUES } from "./dialogues";
import { MessageSquare, EyeOff, Eye, RefreshCw } from "lucide-react";

interface ActiveDialogue {
  speaker: CharacterId;
  speakerName: string;
  text: string;
}

const INITIAL_CHARACTERS: CompanionCharacter[] = [
  {
    id: "omori",
    name: "Omori",
    game: "OMORI",
    accentColor: "#E4E4E7",
    x: 18,
    y: 0,
    direction: 1,
    state: "idle",
  },
  {
    id: "sans",
    name: "Sans",
    game: "UNDERTALE",
    accentColor: "#38BDF8",
    x: 40,
    y: 0,
    direction: -1,
    state: "idle",
  },
  {
    id: "steve",
    name: "Steve",
    game: "MINECRAFT",
    accentColor: "#34D399",
    x: 62,
    y: 0,
    direction: 1,
    state: "idle",
  },
  {
    id: "claude",
    name: "Claude",
    game: "ANTHROPIC",
    accentColor: "#FB923C",
    x: 82,
    y: 0,
    direction: -1,
    state: "idle",
  },
];

function getRandomSoloQuote(id: CharacterId): string {
  const quotes = SOLO_QUOTES[id];
  const idx = Math.floor(Math.random() * quotes.length);
  return quotes[idx];
}

function getRandomCrossDialogue() {
  const idx = Math.floor(Math.random() * CROSS_DIALOGUES.length);
  return CROSS_DIALOGUES[idx];
}

export function CompanionsOverlay() {
  const [isVisible, setIsVisible] = useState(true);
  const [characters, setCharacters] = useState<CompanionCharacter[]>(INITIAL_CHARACTERS);
  const [frame, setFrame] = useState(0);
  const [activeDialogue, setActiveDialogue] = useState<ActiveDialogue | null>(null);
  const [specialCharacter, setSpecialCharacter] = useState<CharacterId | null>(null);
  const [isIdleUser, setIsIdleUser] = useState(false);
  const [wakeEmote, setWakeEmote] = useState<CharacterId | null>(null);

  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const dialogueTimerRef = useRef<NodeJS.Timeout | null>(null);
  const conversationQueueRef = useRef<{ speaker: CharacterId; text: string } | null>(null);

  // Trigger random solo or cross dialogue
  const triggerRandomDialogue = useCallback(() => {
    const isCross = Math.random() > 0.45;

    if (isCross && CROSS_DIALOGUES.length > 0) {
      const convo = getRandomCrossDialogue();
      const speakerChar = characters.find((c) => c.id === convo.speaker);
      if (!speakerChar) return;

      setActiveDialogue({
        speaker: convo.speaker,
        speakerName: speakerChar.name,
        text: convo.text,
      });

      if (convo.response) {
        conversationQueueRef.current = convo.response;
        setTimeout(() => {
          if (conversationQueueRef.current) {
            const responder = characters.find((c) => c.id === conversationQueueRef.current?.speaker);
            if (responder) {
              setActiveDialogue({
                speaker: responder.id,
                speakerName: responder.name,
                text: conversationQueueRef.current.text,
              });
              setWakeEmote(responder.id);
              setTimeout(() => setWakeEmote(null), 1600);
            }
            conversationQueueRef.current = null;
          }
        }, 4500);
      }
    } else {
      const keys: CharacterId[] = ["omori", "sans", "steve", "claude"];
      const randomKey = keys[Math.floor(Math.random() * keys.length)];
      const quote = getRandomSoloQuote(randomKey);
      const char = characters.find((c) => c.id === randomKey);
      if (char) {
        setActiveDialogue({
          speaker: randomKey,
          speakerName: char.name,
          text: quote,
        });
      }
    }
  }, [characters]);

  // Frame ticker for pixel idle / walk oscillations (every 400ms)
  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((prev) => (prev + 1) % 12);
    }, 380);
    return () => clearInterval(interval);
  }, []);

  // Track user idle behavior (if inactive for 18 seconds, characters sleep/sit)
  useEffect(() => {
    const handleActivity = () => {
      setIsIdleUser((wasIdle) => {
        if (wasIdle) {
          setCharacters((prev) =>
            prev.map((c) => ({
              ...c,
              state: "idle",
            }))
          );
        }
        return false;
      });

      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      idleTimerRef.current = setTimeout(() => {
        setIsIdleUser(true);
        setCharacters((prev) =>
          prev.map((c) => ({
            ...c,
            state: c.id === "sans" || c.id === "omori" ? "sleep" : "sit",
          }))
        );
      }, 18000);
    };

    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("scroll", handleActivity);
    window.addEventListener("keydown", handleActivity);
    handleActivity();

    return () => {
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("scroll", handleActivity);
      window.removeEventListener("keydown", handleActivity);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, []);

  // Wandering autonomous behavior: every 4 to 8 seconds, a random character walks
  useEffect(() => {
    if (!isVisible || isIdleUser) return;

    const wanderInterval = setInterval(() => {
      setCharacters((prev) => {
        const targetIdx = Math.floor(Math.random() * prev.length);
        const target = prev[targetIdx];

        const delta = (Math.random() - 0.5) * 14;
        const newX = Math.max(6, Math.min(92, target.x + delta));
        const newDirection = delta >= 0 ? 1 : -1;

        return prev.map((c, i) => {
          if (i === targetIdx) {
            return {
              ...c,
              state: "walk",
              direction: newDirection,
              x: newX,
            };
          }
          return c;
        });
      });

      setTimeout(() => {
        setCharacters((prev) =>
          prev.map((c) => (c.state === "walk" ? { ...c, state: "idle" } : c))
        );
      }, 1800);
    }, 4500);

    return () => clearInterval(wanderInterval);
  }, [isVisible, isIdleUser]);

  // Periodic random dialogues / cross-dialogues
  useEffect(() => {
    if (!isVisible) return;

    const scheduleNextDialogue = () => {
      const delay = Math.random() * 12000 + 16000;
      dialogueTimerRef.current = setTimeout(() => {
        triggerRandomDialogue();
        scheduleNextDialogue();
      }, delay);
    };

    scheduleNextDialogue();

    return () => {
      if (dialogueTimerRef.current) clearTimeout(dialogueTimerRef.current);
    };
  }, [isVisible, triggerRandomDialogue]);

  // Click on a character: trigger dialogue or special animation!
  const handleCharacterClick = (id: CharacterId) => {
    setIsIdleUser(false);
    setCharacters((prev) =>
      prev.map((c) => (c.id === id ? { ...c, state: "idle" } : c))
    );

    setSpecialCharacter(id);
    setWakeEmote(id);
    setTimeout(() => {
      setSpecialCharacter(null);
      setWakeEmote(null);
    }, 2400);

    const quote = getRandomSoloQuote(id);
    const char = characters.find((c) => c.id === id);

    setActiveDialogue({
      speaker: id,
      speakerName: char?.name || "Buddy",
      text: quote,
    });
  };

  const handleResetPositions = () => {
    setCharacters(INITIAL_CHARACTERS);
    setActiveDialogue(null);
  };

  return (
    <>
      {/* Fixed bottom interactive runway container */}
      <div className="fixed bottom-0 left-0 right-0 z-40 pointer-events-none select-none h-32 overflow-visible">
        <AnimatePresence>
          {isVisible && (
            <div className="relative w-full h-full max-w-7xl mx-auto px-4">
              {characters.map((char) => {
                const isSpeaking = activeDialogue?.speaker === char.id;
                const isSpecial = specialCharacter === char.id;
                const hasWakeEmote = wakeEmote === char.id;

                return (
                  <motion.div
                    key={char.id}
                    drag="x"
                    dragConstraints={{ left: -120, right: 120 }}
                    dragElastic={0.2}
                    dragMomentum={false}
                    animate={{
                      left: `${char.x}%`,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 70,
                      damping: 18,
                    }}
                    className="absolute bottom-3 -translate-x-1/2 pointer-events-auto cursor-grab active:cursor-grabbing touch-none flex flex-col items-center group"
                    onClick={() => handleCharacterClick(char.id)}
                  >
                    {/* Retro Dialogue Box (Centered above character) */}
                    {isSpeaking && activeDialogue && (
                      <DialogueBox
                        speaker={activeDialogue.speaker}
                        speakerName={activeDialogue.speakerName}
                        text={activeDialogue.text}
                        onDismiss={() => setActiveDialogue(null)}
                      />
                    )}

                    {/* Emote Bubble (! or Zzz or Heart) */}
                    {hasWakeEmote && !isSpeaking && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.5, y: 0 }}
                        animate={{ opacity: 1, scale: 1.1, y: -6 }}
                        exit={{ opacity: 0 }}
                        className="absolute -top-7 px-1.5 py-0.5 rounded-none bg-black text-amber-300 font-pixel text-[10px] border border-white shadow-md select-none pointer-events-none"
                      >
                        !
                      </motion.div>
                    )}

                    {char.state === "sleep" && !isSpeaking && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, y: [0, -4, 0] }}
                        transition={{ repeat: Infinity, duration: 1.8 }}
                        className="absolute -top-6 text-sky-300 font-pixel text-[10px] tracking-widest pointer-events-none"
                      >
                        Zzz...
                      </motion.div>
                    )}

                    {/* Character Sprite */}
                    <div className="relative transform transition-transform group-hover:scale-110">
                      <PixelSprite
                        id={char.id}
                        state={char.state}
                        direction={char.direction}
                        frame={frame}
                        isSpecial={isSpecial}
                      />
                    </div>

                    {/* Subtle retro name tag on hover */}
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity font-pixel text-[9px] text-[var(--ink)] bg-[var(--surface)] px-1.5 py-0.5 border border-[var(--line)] shadow-sm mt-0.5 pointer-events-none whitespace-nowrap">
                      {char.name}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Retro Mini Floating Toggle Control (Bottom right) */}
      <div className="fixed bottom-4 right-4 z-50 flex items-center gap-1.5 p-1 rounded-none bg-[var(--surface)] border-2 border-[var(--line)] shadow-[3px_3px_0px_var(--line)] select-none">
        <button
          type="button"
          onClick={() => setIsVisible(!isVisible)}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-none text-xs font-pixel transition-colors cursor-pointer border ${
            isVisible
              ? "text-[var(--accent)] font-bold bg-[var(--surface-2)] border-[var(--line)] shadow-[1px_1px_0px_var(--accent)]"
              : "text-[var(--ink-muted)] hover:text-[var(--ink)] border-transparent"
          }`}
          title={isVisible ? "Sembunyikan Pixel Buddies" : "Tampilkan Pixel Buddies"}
          aria-label="Toggle Pixel Companions"
        >
          {isVisible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
          <span className="hidden sm:inline">Pixel Buddies</span>
        </button>

        {isVisible && (
          <>
            <button
              type="button"
              onClick={triggerRandomDialogue}
              className="p-1.5 rounded-none text-[var(--ink-muted)] hover:text-[var(--accent)] hover:bg-[var(--surface-2)] border border-transparent hover:border-[var(--line)] transition-colors cursor-pointer"
              title="Ajak Bicara"
              aria-label="Ajak Bicara"
            >
              <MessageSquare className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={handleResetPositions}
              className="p-1.5 rounded-none text-[var(--ink-muted)] hover:text-[var(--accent)] hover:bg-[var(--surface-2)] border border-transparent hover:border-[var(--line)] transition-colors cursor-pointer"
              title="Reset Posisi Karakter"
              aria-label="Reset Posisi Karakter"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </>
        )}
      </div>
    </>
  );
}
