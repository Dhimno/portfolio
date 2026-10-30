"use client";

import { CharacterId } from "../components/companions/types";

let audioCtx: AudioContext | null = null;
let isAudioMuted = false;

// Initialize mute state from localStorage if client-side
if (typeof window !== "undefined") {
  try {
    const saved = localStorage.getItem("dhimno_sfx_muted");
    if (saved !== null) {
      isAudioMuted = saved === "true";
    }
  } catch {
    // Ignore storage errors
  }
}

const listeners = new Set<(muted: boolean) => void>();

export function isMuted(): boolean {
  return isAudioMuted;
}

export function toggleMute(): boolean {
  isAudioMuted = !isAudioMuted;
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem("dhimno_sfx_muted", String(isAudioMuted));
    } catch {
      // Ignore
    }
  }
  listeners.forEach((fn) => fn(isAudioMuted));
  return isAudioMuted;
}

export function subscribeMute(callback: (muted: boolean) => void): () => void {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * 8-bit Typewriter Speech Blip (Undertale / Omori / Earthbound style)
 */
export function playSpeechBlip(speaker?: CharacterId) {
  if (isAudioMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  let freq = 400;
  let type: OscillatorType = "triangle";

  switch (speaker) {
    case "sans":
      freq = 130;
      type = "square";
      break;
    case "papyrus":
      freq = 270;
      type = "square";
      break;
    case "omori":
      freq = 360;
      type = "triangle";
      break;
    case "dhimas":
      freq = 440;
      type = "triangle";
      break;
    case "steve":
      freq = 220;
      type = "triangle";
      break;
    case "claude":
      freq = 540;
      type = "sine";
      break;
    case "dog":
      freq = 620;
      type = "sine";
      break;
    case "ralsei":
      freq = 490;
      type = "sine";
      break;
    case "frisk":
      freq = 320;
      type = "square";
      break;
    case "pig":
      freq = 170;
      type = "sawtooth";
      break;
    default:
      freq = 400;
      type = "triangle";
  }

  // Slight frequency jitter per letter for organic retro feel
  const jitter = (Math.random() - 0.5) * 30;
  osc.type = type;
  osc.frequency.setValueAtTime(freq + jitter, now);

  // Micro envelope: 28ms duration
  gain.gain.setValueAtTime(0.08, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.035);
}

/**
 * Poke / Click Chime on Sprite
 */
export function playPokeSound() {
  if (isAudioMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "sine";
  osc.frequency.setValueAtTime(520, now);
  osc.frequency.exponentialRampToValueAtTime(740, now + 0.08);

  gain.gain.setValueAtTime(0.12, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.1);
}

/**
 * Rapid 8-bit Arpeggio on Dice Reroll
 */
export function playDiceShuffle() {
  if (isAudioMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6

  notes.forEach((freq, idx) => {
    const noteTime = now + idx * 0.045;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "square";
    osc.frequency.setValueAtTime(freq, noteTime);

    gain.gain.setValueAtTime(0.07, noteTime);
    gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.07);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(noteTime);
    osc.stop(noteTime + 0.07);
  });
}

/**
 * Clean 8-bit Click for UI Controls
 */
export function playClickSound() {
  if (isAudioMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "triangle";
  osc.frequency.setValueAtTime(880, now);
  osc.frequency.exponentialRampToValueAtTime(440, now + 0.025);

  gain.gain.setValueAtTime(0.08, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.025);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.025);
}

/**
 * 8-bit Campfire Crackle & Ember Pop
 */
export function playCampfireCrack() {
  if (isAudioMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  [0, 0.035, 0.075].forEach((offset) => {
    const t = now + offset;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "square";
    const startFreq = 220 + Math.random() * 280;
    osc.frequency.setValueAtTime(startFreq, t);
    osc.frequency.exponentialRampToValueAtTime(90, t + 0.03);

    gain.gain.setValueAtTime(0.05, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.03);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(t);
    osc.stop(t + 0.03);
  });
}

