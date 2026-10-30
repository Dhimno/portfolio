# 02: SecOps Radar Sweep & Anomaly Takedown Simulator

**What to build:**
A live interactive micro-simulator for the Security Operations pillar. It displays an authentic green phosphor rotating radar PPI sweep with range rings and angle markers. At randomized intervals, security anomalies emerge as blinking target dots. An automatic reticle locks onto the detected anomaly and executes a takedown animation accompanied by a brief status banner (`THREAT NEUTRALIZED`), demonstrating the reactive threat mitigation workflow of an active SOC.

**Blocked by:** 01 (Retro Chassis Container & Dual Mode Switcher)

**Status:** resolved

- [x] Radar PPI displays concentric range rings, crosshairs, and a smooth continuously rotating sweep beam.
- [x] Randomized anomaly targets periodically appear within the radar boundary.
- [x] A targeting reticle identifies and locks onto the detected anomaly blip.
- [x] An active takedown sequence neutralizes the anomaly, showing a transient alert status banner (`THREAT NEUTRALIZED // LOGGED`).
- [x] Animation loop runs via `requestAnimationFrame` with proper unmount cleanup and zero memory leaks.
- [x] Performance remains smooth (60fps) on both desktop and mobile viewports.
