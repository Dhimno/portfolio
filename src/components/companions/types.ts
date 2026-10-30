export type CharacterId =
  | "dhimas"
  | "omori"
  | "sans"
  | "steve"
  | "claude"
  | "creeper"
  | "dog"
  | "enderman"
  | "ralsei"
  | "papyrus"
  | "frisk"
  | "pig";

export type AnimationState =
  | "idle"
  | "walk"
  | "sit"
  | "react"
  | "sleep"
  | "peek"
  | "mine";

export type SpawnSlot =
  | "about-divider"
  | "experience-divider"
  | "projects-card-0"
  | "projects-card-1"
  | "projects-card-2"
  | "footer-divider";

export interface CompanionCharacter {
  id: CharacterId;
  name: string;
  game: string;
  accentColor: string;
  direction: 1 | -1;
  state: AnimationState;
  x: number;
  y: number;
}

export interface DialogueEvent {
  speaker: CharacterId;
  text: string;
  target?: CharacterId;
  response?: {
    speaker: CharacterId;
    text: string;
  };
}
