# 05: Tech Arsenal Matrix View, Mobile Polish & Verification

**What to build:**
The Tech Arsenal view and full responsive polish for the Core Pillars section. When users toggle to `[ TECH ARSENAL ]`, each card reveals a dense, beautifully formatted matrix of categorized tooling and frameworks (e.g., EDR, Wazuh, Suricata, PyTorch, LangChain, Rust, Tauri, Proxmox, Docker) with subtle interactive hover states. Ensures identical card height across modes, complete bilingual translation (ID/EN) for all labels, seamless mobile scaling, and passes all TypeScript and production build validations (`next build`).

**Blocked by:** 02 (SecOps Radar Sweep & Anomaly Takedown Simulator), 03 (Applied AI Expanding Synapse & Token Stream Simulator), 04 (Systems & Infrastructure Live Telemetry Simulator)

**Status:** ready-for-agent

- [ ] Tech Arsenal view displays categorized tool chips matching the exact expertise described in the spec.
- [ ] Card height remains fixed and balanced between Telemetry and Arsenal views across desktop and mobile.
- [ ] Full bilingual support: all headers, mode labels, tool descriptions, and status tickers adapt seamlessly between Indonesian and English.
- [ ] Mobile responsive layout stacks smoothly on smartphone screens without horizontal scroll or broken scanlines.
- [ ] Lint and build checks (`npm run lint` and `npm run build`) pass cleanly with zero errors or warnings.
