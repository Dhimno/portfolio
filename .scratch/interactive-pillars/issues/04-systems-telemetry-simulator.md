# 04: Systems & Infrastructure Live Telemetry Simulator

**What to build:**
A live interactive micro-simulator for the Systems & Infrastructure pillar. It models an active 24/7 Linux homelab and native systems console. It features real-time fluctuating ASCII progress meters for multi-core CPU load (`[██████░░░░]`), RAM allocation, active daemon indicators (`systemd: active (running)`), and a rolling ticker of recent kernel and networking daemon logs.

**Blocked by:** 01 (Retro Chassis Container & Dual Mode Switcher)

**Status:** ready-for-agent

- [ ] Telemetry dashboard renders dynamic ASCII/bar progress meters for CPU utilization and memory.
- [ ] Metric values fluctuate naturally at randomized intervals to simulate genuine real-time server load.
- [ ] Active service badges display status for homelab daemons (e.g. `proxmox-pve: ok`, `wireguard: online`, `rust-daemon: running`).
- [ ] A compact rolling log stream displays simulated low-level system logs in monospace typography.
- [ ] Animation and metric update intervals clean up reliably on component unmount.
