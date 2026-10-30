# Spec: Retro-Pixel UI Overhaul

Status: completed

## Problem Statement

The portfolio previously suffered from a jarring aesthetic dissonance. While signature components featured authentic 8-bit pixel craftsmanship (such as the Minecraft Redstone switch, pixel campfire, Minecraft/Undertale companions, and Silkscreen typography), other primary interface elements still used modern generic SaaS styling: curved pill tabs (`rounded-2xl`, `rounded-full`), smooth gradients, floating bubbles, and standard web cursors. This inconsistency diluted the engineer's creative technical brand, creating visual ambiguity between an authentic retro-arcade terminal and an off-the-shelf modern website template.

## Solution

Execute a comprehensive **Retro-Pixel UI Overhaul** (`Retro UI`) across every interactive surface of the portfolio. The overhaul eliminates generic rounded corners, standardizes a crisp dual-layer **Retro-HUD Typography** hierarchy, introduces custom **8-Bit Game Cursors**, establishes **Pixel Segmented Chassis** for all tabs and control toggles, applies **Stepped Pixel Card Framing** with solid hard-edged drop shadows, and wires **8-Bit Tactile Micro-Interactions** using Web Audio synthesis that strictly respect global audio preferences.

---

## User Stories

### Brand Identity & Overall Atmosphere
1. As a visitor browsing the portfolio, I want the entire site to project a cohesive 8-bit retro-arcade identity, so that the experience feels deliberate, memorable, and crafted.
2. As a technical recruiter, I want the visual style to balance playful retro gaming with professional readability, so that I can easily digest the engineer's qualifications while appreciating their front-end craft.
3. As a visitor navigating with a mouse, I want to see a custom 8-bit pixel arrow cursor, so that the operating system cursor does not break the retro immersion.
4. As a visitor hovering over buttons, links, and tabs, I want the cursor to change to an 8-bit pixel pointer hand with an orange accent, so that interactive elements provide immediate visual feedback.
5. As a visitor who prefers high text readability, I want all body copy and technical logs to use a sharp monospace font (`JetBrains Mono`), so that dense technical explanations remain effortless to read.
6. As a visitor reading headings, badges, and buttons, I want them rendered in an authentic pixel typeface (`Silkscreen`), so that structural markers feel like classic console HUD typography.

### Navigation & Header Controls
7. As a visitor viewing the top navigation bar, I want all menu links to display in uppercase pixel font with underline active indicators, so that I always know my current section.
8. As a mobile visitor opening the hamburger menu, I want the drawer links to feature sharp pixel box framing and active state badges, so that the mobile experience matches the desktop fidelity.
9. As a visitor switching languages between Indonesian and English, I want the language toggle to be framed in a stepped pixel chassis with bracket indicators (`[ID]` / `[EN]`), so that the active locale is obvious.
10. As a visitor clicking the language toggle, I want to hear a soft synthesized 8-bit audio blip, so that the interaction feels tactile and responsive.
11. As a visitor toggling between dark and light themes, I want to interact with a Minecraft Redstone Lamp switch housed in a sharp pixel chassis, so that theme switching reinforces the pixel theme.
12. As a visitor toggling themes, I want the internal status indicator lights to render as square pixel LEDs rather than circular dots, so that the internal mechanism honors 8-bit geometry.
13. As a visitor in a supporting browser, I want theme switching to expand outward in a circular view transition, so that mode changes feel seamless and cinematic.

### Engineering Cockpit & Simulators
14. As a visitor inspecting the Core Engineering Pillars, I want each pillar card to be framed in a pixel-cut retro chassis with status indicators (`status: NOMINAL`), so that it resembles a live server console.
15. As a visitor switching between `[ LIVE TELEMETRY ]` and `[ TECH ARSENAL ]`, I want the tab buttons to have crisp borders, active state fills, and instant responsiveness without layout jitter.
16. As a visitor observing the Security Operations radar, I want the radar sweep and anomaly lock-on sequence to run smoothly without causing canvas expansion bugs or browser slowdown.
17. As a visitor observing the AI Synapse simulator, I want the branching node tree to pulse organically within a bounded, responsive container.
18. As a visitor viewing the Systems Infrastructure telemetry, I want live fluctuating ASCII CPU meters and server status chips with square status lights.

### Projects & Industrial Casework
19. As a visitor filtering projects by category, I want category chips arranged in a pixel-segmented chassis with active arrow markers (`▶ [Kategori]`), so that filter selection is clear.
20. As a visitor clicking a category chip, I want to hear a gentle 8-bit audio blip, so that filtering feels like operating an arcade selection menu.
21. As a visitor viewing project cards, I want each card to feature sharp borders and solid offset drop shadows (`shadow-[4px_4px_0px_var(--line)]`), so that cards have tactile physical depth.
22. As a visitor hovering over a project card, I want the drop shadow to shift to the accent color, so that the card feels interactive and energized.
23. As a visitor clicking a project card to view details, I want the modal dialog to appear as a retro arcade dialogue box with sharp corners and solid shadows.
24. As a visitor reading the project modal, I want cover graphics and tech tags to have sharp pixel borders rather than modern curved radiuses.
25. As a visitor viewing the Bank Mega SOC industrial casework, I want the verified protocol checklist to render with sharp box containers and solid drop shadows.

### Career Experience & Timeline
26. As a visitor filtering career experience between all, work, and education, I want the tab switch to match the pixel-segmented chassis design.
27. As a visitor reading the timeline, I want timeline milestone nodes to be sharp pixel squares with solid accent shadows, so that the timeline structure matches the rest of the site.
28. As a visitor reading experience highlights, I want bullet points to be sharp pixel squares (`rounded-none`), so that circular bullets do not disrupt the pixel aesthetic.

### Contact Dispatcher & Footer Controls
29. As a visitor filling out the contact form, I want input fields and the message area to have sharp borders and solid offset shadows, so that form controls feel integrated into the retro UI.
30. As a visitor submitting a message, I want the submit button to feature pixel typography with active press offsets (`active:translate-x-[2px] active:translate-y-[2px]`), so that the button feels mechanically clickable.
31. As a visitor copying the email address, I want the copy button to provide clear visual feedback with sharp pixel borders.
32. As a visitor in the footer, I want social media links and action buttons to be styled as retro pixel square buttons.
33. As a visitor exploring the footer, I want to be able to re-roll pixel buddy positions and toggle global audio with dedicated pixel buttons.
34. As a visitor who prefers silence, I want all sound effects to strictly respect the global mute setting across all sessions and page navigations.

### Accessibility, Performance & Responsiveness
35. As a visitor navigating with a keyboard, I want high-contrast focus outlines on all pixel buttons and interactive elements, so that accessibility is never compromised.
36. As a mobile visitor on a small smartphone, I want all buttons, tabs, and interactive chips to maintain minimum 44px touch targets despite their sharp pixel corners.
37. As a visitor on a low-powered device, I want all animations and canvas loops to maintain 60fps without triggering layout thrashing or memory leaks.

---

## Implementation Decisions

### 1. Unified Retro-HUD Typographic Hierarchy
- **Display Layer (`--font-display` / `--font-pixel`)**: Standardized across all headers (`h1`, `h2`, `h3`), navigation links, filter labels, tab buttons, badges, and CTA buttons using `Silkscreen`.
- **Body & Data Layer (`--font-body` / `--font-mono`)**: Standardized across all narrative paragraphs, form inputs, metric values, and telemetry logs using `JetBrains Mono`.
- Eliminates standard sans-serif fallbacks from primary UI components to ensure an authentic retro computer feel.

### 2. Elimination of Curved Radiuses & Standardized Drop Shadow Physics
- Systematically replace all curved border-radius classes (`rounded-lg`, `rounded-xl`, `rounded-2xl`, `rounded-full`) across cards, badges, chips, modals, buttons, and status dots with `rounded-none`.
- Exceptions strictly limited to naturally circular physical objects: the radar PPI scope canvas and radial blurred glow backdrops (`Orb`).
- Introduce solid, hard-edged drop shadows (`shadow-[2px_2px_0px_var(--line)]`, `shadow-[4px_4px_0px_var(--line)]`, `shadow-[5px_5px_0px_var(--line)]`) to provide physical 8-bit depth without diffuse blur.
- Interactive press feedback standardizes on mechanical pixel depression (`active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_var(--ink)]`).

### 3. Custom 8-Bit Game Cursors
- Embed custom SVG pixel artwork via data URI directly in global CSS rules:
  - Default cursor: Sharp 8-bit black-and-white arrow.
  - Interactive cursor: 8-bit pointer hand with orange accent outline, applied to `button`, `a`, `[role="button"]`, `[role="tab"]`, `input`, `select`, `textarea`.

### 4. Pixel Segmented Chassis Component System
- Used for: Language Toggle (`LangToggle`), Project Filters (`Projects`), Experience Filters (`Experience`), and Chassis Mode Switcher (`RetroChassis`).
- Features stepped pixel borders, high-contrast active background fills, monospace bracketed text indicators (`[ID]`, `[EN]`), and active arrow indicators (`▶`).

### 5. Web Audio Tactile Micro-Interactions
- Integrated into all selection and toggle events (`playPokeSound`, `playClickSound`, `playSpeechBlip`).
- Strictly respects the global sound mute state stored in local storage and synced via external store subscription.

### 6. Component Surfaces Overhauled
- **Navbar & Navigation Drawer**: Sharp brand logo, uppercase pixel links, pixel-framed mobile drawer items.
- **Theme & Lang Toggles**: Redstone Lamp chassis with square pixel LEDs and pixel-segmented language selector.
- **Projects & Modal Dialog**: Pixel cards with hard drop shadows, sharp cover frames, arcade modal box.
- **Experience Timeline**: Square timeline nodes, square highlight bullet markers, pixel filter bar.
- **Contacts**: Sharp inputs, mechanical pixel submit button with active depression.
- **Footer**: Square pixel social icons, dice shuffle button, audio toggle.
- **Companions HUD Overlay**: Floating bottom-right HUD with sharp pixel border and buttons.

---

## Testing Decisions

### Test Seam
The primary test seam is the component integration and build pipeline boundary:
- Next.js static production build compilation (`next build`).
- ESLint strict rule compliance (`npm run lint`).
- Visual and interaction verification across modern desktop and mobile viewports.

### Good Test Criteria
- Validates that zero layout shifts (CLS) occur during tab switching or modal opening.
- Verifies that all buttons, inputs, and tabs meet WCAG minimum touch target sizes (44x44px) and keyboard navigation standards.
- Verifies that audio functions never throw errors when sound is muted or blocked by browser autoplay policies.
- Confirms that canvas simulators (Radar, AI Synapse, Telemetry) maintain bounded dimensions without triggering canvas resize loops.
- Confirms full bilingual locale rendering (ID / EN) across all overhauled components.

### Prior Art
- Existing automated checks: Next.js Turbopack build engine and ESLint configuration.
- Handoff verification: Real browser verification via `agent-browser` and git safety revert anchors.

---

## Out of Scope

- Converting raster photography (portrait and project screenshots) into downsampled 8-bit pixel art bitmaps (original photographic fidelity is preserved).
- Building custom 3D WebGL pixel shaders for background canvas rendering.
- Modifying backend contact form dispatch handlers or project data structures.

---

## Further Notes

- Safety revert anchors are maintained on git branches `backup/before-retro-pixel-overhaul` and tag `v1.0-pre-retro-overhaul`.
- All design conventions align with the terms defined in `GLOSSARY.md`.
