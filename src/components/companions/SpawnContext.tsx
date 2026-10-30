"use client";

import React, { createContext, useContext, ReactNode, useSyncExternalStore } from "react";
import { CharacterId, SpawnSlot } from "./types";

interface SpawnContextType {
  assignments: Partial<Record<SpawnSlot, CharacterId>>;
  reroll: () => void;
  isLoaded: boolean;
}

const ALL_CHARACTERS: CharacterId[] = [
  "omori",
  "sans",
  "claude",
  "steve",
  "creeper",
  "dog",
  "enderman",
  "ralsei",
  "papyrus",
  "frisk",
  "pig",
];

function generateRandomAssignments(): Partial<Record<SpawnSlot, CharacterId>> {
  const pool = [...ALL_CHARACTERS].sort(() => Math.random() - 0.5);
  const result: Partial<Record<SpawnSlot, CharacterId>> = {};

  // Dhimas miniature walks along the About section divider
  result["about-divider"] = "dhimas";

  // Guest companion for the divider line below experience
  result["experience-divider"] = pool.pop() || "dog";

  // Guest companion for the footer divider line
  result["footer-divider"] = pool.pop() || "sans";

  // Up to 3 randomized guest characters peeking behind project cards
  result["projects-card-0"] = pool.pop() || "steve";
  result["projects-card-1"] = pool.pop() || "claude";
  result["projects-card-2"] = pool.pop() || "creeper";

  return result;
}

// External store for client hydration without cascading renders
const emptySnapshot: Partial<Record<SpawnSlot, CharacterId>> = {};
let currentAssignments: Partial<Record<SpawnSlot, CharacterId>> | null = null;
const listeners = new Set<() => void>();

function getClientSnapshot(): Partial<Record<SpawnSlot, CharacterId>> {
  if (typeof window === "undefined") return emptySnapshot;
  if (!currentAssignments) {
    currentAssignments = generateRandomAssignments();
  }
  return currentAssignments;
}

function getServerSnapshot(): Partial<Record<SpawnSlot, CharacterId>> {
  return emptySnapshot;
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}

function triggerReroll() {
  currentAssignments = generateRandomAssignments();
  listeners.forEach((listener) => listener());
}

const SpawnContext = createContext<SpawnContextType>({
  assignments: {},
  reroll: () => {},
  isLoaded: false,
});

export function CompanionProvider({ children }: { children: ReactNode }) {
  const assignments = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);
  const isLoaded = typeof window !== "undefined" && Object.keys(assignments).length > 0;

  return (
    <SpawnContext.Provider value={{ assignments, reroll: triggerReroll, isLoaded }}>
      {children}
    </SpawnContext.Provider>
  );
}

export function useCompanionSlot(slot: SpawnSlot): CharacterId | null {
  const { assignments, isLoaded } = useContext(SpawnContext);
  if (!isLoaded) return null;
  return assignments[slot] || null;
}

export function useRerollCompanions() {
  const { reroll } = useContext(SpawnContext);
  return reroll;
}

export function useSpawnContext() {
  return useContext(SpawnContext);
}
