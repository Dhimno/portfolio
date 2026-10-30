# Spec: Interactive Engineering Cockpit for Core Pillars

Status: ready-for-agent

## Problem Statement

The current Core Engineering Pillars section on the portfolio is rendered as three static, generic card boxes containing paragraphs of descriptive text. From a recruiter or engineering manager's perspective, this presentation feels conventional, passive, and brochure-like. It does not actively convey the technical rigor, depth, or excitement of the engineer's daily craft across Security Operations, Applied Artificial Intelligence, and Systems Infrastructure. Furthermore, it lacks tactile responsiveness and fails to express the retro-pixel identity present elsewhere across the portfolio (such as the Redstone switch, pixel campfire, and Silkscreen typography).

## Solution

Transform the three pillar cards into an **Interactive Engineering Cockpit** featuring retro CRT-inspired micro-simulators and an interactive mode switcher. Each card receives a dedicated live simulation:
1. **Security Operations**: An authentic rotating radar PPI sweep with randomized anomaly blips, automatic reticle lock-on, and simulated threat neutralization/takedown sequence.
2. **Applied Artificial Intelligence**: An expanding synapse graph node visualizer demonstrating dynamic LLM token generation, branching nodes, and neural activation paths.
3. **Systems & Infrastructure**: A live homelab telemetry dashboard with fluctuating CPU core load bars, active daemons, memory metrics, and live log stream.

Each card features a pixel-cut retro chassis, subtle CRT phosphor scanlines, a clean text-based view switcher (`[ LIVE TELEMETRY ]` vs `[ TECH ARSENAL ]`), and soft synthesized Web Audio feedback.

---

## User Stories

1. As a visitor browsing the portfolio, I want to see three distinct, specialized engineering pillars, so that I immediately grasp the engineer's core areas of competence.
2. As a technical recruiter, I want each pillar to visually demonstrate its domain (radar, neural graph, terminal), so that I am instantly engaged and can differentiate this portfolio from standard templates.
3. As a visitor viewing the Security Operations pillar, I want to see a continuous rotating radar sweep with green phosphor aesthetics, so that it resembles a real SOC monitoring station.
4. As a visitor viewing the Security Operations pillar, I want occasional randomized security anomalies to appear on the radar screen, so that the simulation feels dynamic and unscripted.
5. As a visitor observing an anomaly detection, I want a target reticle to lock onto the anomaly and display a takedown confirmation message (`THREAT NEUTRALIZED`), so that the defensive security workflow is demonstrated.
6. As a visitor viewing the Applied Artificial Intelligence pillar, I want to see an expanding neural graph node tree, so that I can visualize how modern generative AI workflows and token predictions branch out.
7. As a visitor viewing the Applied Artificial Intelligence pillar, I want nodes to pulse and emit connecting branches organically, so that the AI core feels alive and processing.
8. As a visitor viewing the Systems & Infrastructure pillar, I want to observe live fluctuating CPU load bars, so that I get a sense of real 24/7 server activity.
9. As a visitor viewing the Systems & Infrastructure pillar, I want to see status logs updating with server daemon statuses (e.g., Linux homelab, Rust daemon, WireGuard), so that the engineer's actual tech stack is showcased.
10. As a visitor, I want subtle CRT horizontal scanline textures over the micro-simulators, so that the display carries an authentic retro terminal feel without straining my eyes.
11. As a visitor, I want clean pixel-cut corners on the card borders, so that the chassis aligns with the pixelated craftsmanship found across the site.
12. As a visitor, I want each card to have a mode switcher with text buttons (`[ LIVE TELEMETRY ]` and `[ TECH ARSENAL ]`), so that I can switch between watching the live simulation and reading the detailed list of tools and technologies.
13. As a visitor switching to `[ TECH ARSENAL ]`, I want the card height to remain stable, so that the layout does not jump or cause layout shifts while I am reading.
14. As a visitor reading the Tech Arsenal, I want to see categorized badges (e.g., EDR, Wazuh, Suricata, PyTorch, LangChain, Rust, Tauri, Proxmox), so that I can evaluate the exact tooling proficiency.
15. As a visitor clicking the mode switcher, I want a quick, clean CRT glitch/fade transition, so that the change feels responsive and thematic.
16. As a visitor hovering or tapping on cards, I want to hear gentle synthesized 8-bit sound blips, so that the interface feels tactile and responsive.
17. As a visitor who prefers silence or has muted the site audio, I want all sound effects to strictly respect the global mute setting, so that my preference is never violated.
18. As a mobile user on a smartphone, I want the simulators and cards to scale down gracefully and maintain 60fps performance without draining CPU or memory.
19. As a user navigating with keyboard or screen reader, I want semantic HTML structure and accessible button controls, so that all information remains fully accessible.
20. As an international visitor switching between Indonesian and English, I want all descriptive labels, headers, and logs to reflect my selected locale seamlessly.

---

## Implementation Decisions

### 1. Architecture and Component Decomposition
- **Chassis Component**: A reusable retro-styled container providing the pixel-cut border accents, status header bar (`SYS_SEC // 01`, `AI_CORE // 02`, `NATIVE_SYS // 03`), and mode switcher tabs.
- **Micro-Simulator Modules**:
  - `SecOpsRadar`: Canvas or lightweight SVG-based radial radar with sweep line, random anomaly target generator, lock-on crosshair, and takedown alert banner.
  - `AiSynapseGraph`: Lightweight SVG/canvas expanding graph node visualizer generating branching tokens and neural pulses.
  - `SystemsTelemetry`: Real-time text-mode terminal widget with ASCII load progress meters (`[████░░░░]`), dynamic metrics, and rotating daemon log ticker.
- **Tech Arsenal Matrix Panel**: An internal view displaying categorized chip tags with subtle hover states for each pillar's tooling.

### 2. Styling and Aesthetic Constraints
- Uses `font-pixel` (Silkscreen) for badges and status indicators, `font-mono` (JetBrains Mono) for metrics/logs, and `font-display` (Bricolage Grotesque) for primary headings.
- Scanlines implemented using a repeating CSS gradient overlay (`repeating-linear-gradient`) with `pointer-events-none` to guarantee zero layout or touch interference.
- Avoid all extraneous emoji symbols (`◈`, `⚙`); use clean ASCII and monospace typographic markers (`[ LIVE TELEMETRY ]`, `[ TECH ARSENAL ]`, `//`, `::`).

### 3. Audio Integration
- Connects directly to the existing Web Audio API framework in the codebase (`playPokeSound` / soft synthesized clicks from the audio utility).
- All sound emissions gated behind `isMuted()` check.

### 4. Performance & Lifecycle
- Simulator animation frames managed via `requestAnimationFrame` with proper cleanup in `useEffect` to prevent memory leaks when navigating away or switching tabs.
- No heavy re-renders: telemetry and radar state updates localized entirely inside their respective micro-components.

---

## Testing Decisions

- **Test Seam**: The highest and primary seam is at the component boundary (`PillarsSection` and its interactive cards).
- **Good Test Criteria**:
  - Validates that all three engineering pillars render their titles, tags, and dual-view switcher controls.
  - Confirms clicking the switcher transitions the card view between `TELEMETRY` and `TECH_ARSENAL`.
  - Confirms radar, AI graph, and systems telemetry mount and run their animation frame loops cleanly without throwing unhandled exceptions.
  - Verifies audio trigger functions respect the mute state.
  - Confirms full TypeScript compliance and Next.js static production build generation (`next build`).
- **Prior Art**: Next.js 16.4.3 Turbopack build pipeline and ESLint runner.

---

## Out of Scope

- Back-end websocket connections to real homelab servers or live external SIEM APIs (the telemetry is a deterministic client-side micro-simulator).
- Draggable or resizable floating modal windows.
- Any heavy WebGL / 3D canvas libraries that would inflate bundle size beyond current assets.

---

## Further Notes

- The design maintains strict adherence to the project domain model documented in `GLOSSARY.md`.
- Mobile layout stacks the three cards vertically with touch-friendly tap targets (minimum 44px).
