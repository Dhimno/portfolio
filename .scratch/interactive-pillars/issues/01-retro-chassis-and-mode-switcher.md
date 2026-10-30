# 01: Retro Chassis Container & Dual Mode Switcher

**What to build:**
A reusable retro-styled chassis container for the engineering pillar cards. It features pixel-cut stepped corners, subtle CRT phosphor horizontal scanlines, a monospace status header (`SYS_SEC // 01`, `AI_CORE // 02`, `NATIVE_SYS // 03`), and a clean dual-mode text switcher (`[ LIVE TELEMETRY ]` and `[ TECH ARSENAL ]`). Clicking the mode switcher transitions between views with a crisp CRT glitch/fade effect and plays a synthesized 8-bit soft click audio cue while respecting global mute.

**Blocked by:** None (can start immediately)

**Status:** ready-for-agent

- [ ] Card border renders with stepped pixel-cut corners and subtle retro borders.
- [ ] Phosphor CRT horizontal scanline texture is overlaid across the simulation viewport without interfering with pointer events.
- [ ] Header displays the section designation in pixel/mono typography with a subtle status indicator LED.
- [ ] Dual-mode text buttons `[ LIVE TELEMETRY ]` and `[ TECH ARSENAL ]` are accessible via mouse, touch, and keyboard.
- [ ] Switching modes smoothly toggles the internal card view without jumping or changing the overall card dimensions.
- [ ] Audio click cue plays upon switching modes if audio is unmuted, and remains completely silent when muted.
