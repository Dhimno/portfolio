# Dhimno Portfolio

> Interactive, retro-pixel engineering portfolio for **Dhimas Reza Nafi Wahyudi** (Informatics student at Universitas Diponegoro). Built with Next.js 16, React 19, Tailwind CSS v4, Matter.js 2D physics, and Framer Motion.

---

## Overview

A high-performance personal portfolio showcasing technical focus areas across **Security Operations (SecOps)**, **Applied Artificial Intelligence**, and **Systems & Infrastructure**. Rather than standard static cards or carousel templates, the portfolio features tactile retro-hardware interactions, a 2D rigid-body cartridge sandbox, walking companion NPCs, and responsive pixel-art UI components.

> [!NOTE]
> All sound effects (cartridge latches, 8-bit speech blips, button clicks) are synthesized dynamically via the native Web Audio API using square and noise oscillators, requiring zero external audio assets.

---

## Key Features

- **GameBoy DMG Classic Console & Cartridge Arena**:
  - Interactive 2D rigid-body physics playfield powered by `Matter.js`.
  - Six draggable and flingable project ROM cartridges with natural inertia, restitution, and collision bounds.
  - Magnetic snap bay that docks cartridges into the GameBoy top slot with mechanical latch audio.
  - Responsive 3×2 stationary cartridge rack on mobile viewports (< 768px) with tap-to-slot interaction.
  - Proportional geometry scaling driven strictly by CSS Container Queries (`cqw`) preserving authentic 1989 DMG dimensions across all screen sizes.
  - Procedural CRT LCD screen simulation with horizontal scanlines, phosphor glow, and randomized scramble glitch typography.
- **Core Engineering Pillars**:
  - Minimalist unboxed showcase presenting SecOps, Applied AI, and Systems disciplines.
  - Interactive telemetry and radar simulation overlays built with React Three Fiber and Canvas APIs.
- **Dynamic Walking Companions**:
  - Autonomous 8-bit pixel companion characters that pace across section divider lines.
  - Speech bubble dialog box styled after Undertale and Omori, featuring slice-counter typewriter typography and 8-bit speech blips.
  - Viewport boundary detection with automatic horizontal clamping and dynamic pointer realignment to prevent mobile screen clipping.
- **Retro-Pixel UI System**:
  - Stepped pixel borders and high-contrast segmented switch tabs.
  - Mobile experience accordion using Framer Motion layout transitions for clean vertical disclosures.
  - Drawer-encapsulated language switcher supporting Indonesian (`id`) and English (`en`) localization with persistent `localStorage` synchronization.

---

## Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Framework** | [Next.js](https://nextjs.org/) 16.4.3 (App Router, Turbopack) |
| **Library** | [React](https://react.dev/) 19.3.0 |
| **Language** | [TypeScript](https://www.typescriptlang.org/) 5 |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) v4 |
| **Physics** | [Matter.js](https://brm.io/matter-js/) 0.20.0 (2D rigid-body physics simulation) |
| **3D & Canvas** | [Three.js](https://threejs.org/) 0.186, [@react-three/fiber](https://r3f.docs.pmnd.rs/) 9.8, [@react-three/drei](https://github.com/pmndrs/drei) 10.7 |
| **Animation** | [Framer Motion](https://www.framer.com/motion/) 14.7, [GSAP](https://greensock.com/gsap/) 3.15, [Lenis](https://lenis.darkroom.engineering/) 1.3 |
| **Icons & Audio** | [Lucide React](https://lucide.dev/), Native Web Audio API |

---

## Project Structure

```text
portofolio/
├── public/                  # Static assets, project ROM thumbnails (WebP 3:2), SVGs
├── src/
│   ├── app/                 # Next.js App Router (layout, page, globals.css)
│   ├── components/
│   │   ├── companions/      # Walking NPCs, DialogueBox with viewport clamping, sprite renderers
│   │   ├── layout/          # Navbar, mobile hamburger drawer, ThemeToggle, LangToggle
│   │   ├── loader/          # Initial boot sequence loader
│   │   ├── sections/        # Hero, About, Pillars, Projects (GameBoy arena), Experience, Contacts
│   │   └── ui/              # Reusable retro buttons, GlitchTitle, ProjectCartridge, ConsolePeeker
│   ├── data/                # Structured projects, experience, and companion dialogues
│   ├── i18n/                # Localization dictionaries (id.json, en.json)
│   └── lib/                 # Web Audio synthesizer, i18n context, helper utilities
├── GLOSSARY.md              # Canonical domain model and architectural terminology
└── next.config.ts           # Next.js compiler configuration
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) version 20.0.0 or later
- Package manager: `npm` (v10+), `pnpm`, or `bun`

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Dhimno/portfolio.git
   cd portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. Build for production:
   ```bash
   npm run build
   npm run start
   ```

---

## Verification & Code Quality

Run static typing verification and linting:

```bash
# Verify TypeScript types
npx tsc --noEmit

# Run ESLint rules
npm run lint
```

---

## Development Principles & Standards

- **Anti-Slop Code Hygiene**: Zero redundant comments, zero boilerplate explanations, and no arbitrary visual fluff.
- **Native Platform First**: Web Audio API oscillator synthesis over bulky audio MP3 downloads; CSS container queries (`cqw`) over brittle JavaScript resize listeners.
- **Design Restraint**: High-contrast typography, strict retro palette constraints (Warm Gray, Pea Green, Slate, Deep Ink), and authentic 8-bit gaming ergonomics.
- **Defensive Mobile Layout**: Dynamic viewport edge guards on floating bubbles, touch-friendly tap targets (minimum 40px), and scroll non-hijacking in physics arenas.
