"use client";

import React, { useState, useEffect, useRef } from "react";
import { playClickSound } from "../../../../lib/sound";

interface LogEntry {
  id: number;
  time: string;
  msg: string;
}

const INITIAL_LOGS: LogEntry[] = [
  { id: 1, time: "14:22:04", msg: "[kernel] zfs_arc: cache hit ratio 99.1% (size: 14.2G)" },
  { id: 2, time: "14:22:07", msg: "[wireguard] peer wg0-edge handshaked (lat: 0.38ms)" },
  { id: 3, time: "14:22:09", msg: "[rust-daemon] epoll_wait: 1840 ev/s, 0 dropped" },
  { id: 4, time: "14:22:12", msg: "[proxmox-pve] vm 104 (rust-worker) io_poll: 0 errors" },
];

const LOG_POOL = [
  "[kernel] eth0: link up, 10Gbps full duplex, rx: 42.1MB/s",
  "[wireguard] handshake completed with peer [9f2a...8b1c]",
  "[proxmox-pve] vm 104 (rust-worker) io_poll: 0 errors",
  "[rust-daemon] epoll_wait: 1840 ev/s, ring_buffer 2.4% full",
  "[zfs] scrub pool-tank completed, 0 checksum errors",
  "[systemd] started session-c4.scope (slice=system.slice)",
  "[containerd] task c84f running (pid=1924, cgroup=v2)",
  "[iptables] syn-flood guard: drop rule 0 matched (normal)",
  "[telemetry] heartbeat ack from node-03 (rtt: 0.29ms)",
  "[kernel] zfs_arc: cache hit ratio 99.1% (size: 14.2G)",
  "[rust-daemon] tokio runtime: 8 worker threads balanced",
  "[systemd] homelab-agent.service: health check passed",
  "[wireguard] keepalive ping sent to gateway (lat: 0.41ms)",
  "[zfs] snapshot tank/vms/rust-worker@auto created",
];

const SERVICES = [
  { name: "proxmox-pve", status: "ok" },
  { name: "wireguard", status: "online" },
  { name: "rust-daemon", status: "running" },
  { name: "zfs-pool", status: "healthy" },
];

function getAsciiBar(percent: number, totalBlocks = 10): string {
  const clamped = Math.max(0, Math.min(100, percent));
  const filledCount = Math.round((clamped / 100) * totalBlocks);
  const unfilledCount = Math.max(0, totalBlocks - filledCount);
  return `[${"█".repeat(filledCount)}${"░".repeat(unfilledCount)}]`;
}

export function SystemsTelemetrySimulator() {
  const [cores, setCores] = useState<number[]>([42, 68, 24, 55]);
  const [ramGb, setRamGb] = useState<number>(12.4);
  const [logs, setLogs] = useState<LogEntry[]>(INITIAL_LOGS);
  const [isSpiking, setIsSpiking] = useState<boolean>(false);

  const logCounterRef = useRef<number>(5);
  const poolIndexRef = useRef<number>(0);

  useEffect(() => {
    const metricTimer = setInterval(() => {
      setCores((prev) =>
        prev.map((val) => {
          const isSpike = Math.random() < 0.08;
          const delta = isSpike
            ? Math.floor(Math.random() * 25) + 10
            : Math.floor(Math.random() * 15) - 7;
          return Math.max(12, Math.min(94, val + delta));
        })
      );

      setRamGb((prev) => {
        const delta = (Math.random() - 0.48) * 0.3;
        return Math.max(10.2, Math.min(24.8, +(prev + delta).toFixed(1)));
      });
    }, 1500);

    const logTimer = setInterval(() => {
      const now = new Date();
      const pad = (n: number) => n.toString().padStart(2, "0");
      const timeStr = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;

      const nextMsg = LOG_POOL[poolIndexRef.current % LOG_POOL.length];
      poolIndexRef.current += 1;

      setLogs((prev) => [
        ...prev.slice(-3),
        {
          id: logCounterRef.current++,
          time: timeStr,
          msg: nextMsg,
        },
      ]);
    }, 2400);

    return () => {
      clearInterval(metricTimer);
      clearInterval(logTimer);
    };
  }, []);

  const handleTriggerBurst = () => {
    playClickSound();
    setIsSpiking(true);

    setCores([
      Math.floor(Math.random() * 12) + 84,
      Math.floor(Math.random() * 10) + 88,
      Math.floor(Math.random() * 14) + 80,
      Math.floor(Math.random() * 8) + 90,
    ]);

    setRamGb((prev) => Math.min(28.0, +(prev + 2.1).toFixed(1)));

    const now = new Date();
    const pad = (n: number) => n.toString().padStart(2, "0");
    const timeStr = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;

    setLogs((prev) => [
      ...prev.slice(-3),
      {
        id: logCounterRef.current++,
        time: timeStr,
        msg: "[sys_op] manual workload dispatched: +10k tokio tasks",
      },
    ]);

    setTimeout(() => {
      setIsSpiking(false);
    }, 1200);
  };

  const ramPercent = Math.round((ramGb / 32.0) * 100);

  return (
    <div className="flex flex-col justify-between h-full font-mono text-xs select-none space-y-3">
      <div className="flex items-center justify-between border-b border-dashed border-[var(--line)] pb-2 text-[10px]">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[var(--accent)] font-semibold uppercase tracking-wider">
            NODE01 // PVE-CLUSTER
          </span>
        </div>
        <span className="text-[var(--ink-muted)]">UPTIME: 98d 14h</span>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-[10px] text-[var(--ink-muted)]">
          <span className="uppercase tracking-wider">MULTI-CORE LOAD (SMP)</span>
          <span className="text-[var(--accent)] font-pixel text-[9px]">
            {isSpiking ? "STATUS: BURST" : "STATUS: NOMINAL"}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-[10px]">
          {cores.map((load, idx) => (
            <div key={idx} className="flex items-center justify-between gap-1">
              <span className="text-[var(--ink-muted)] w-6 shrink-0">C{idx}</span>
              <span
                className={`tracking-tighter sm:tracking-normal shrink-0 ${
                  load > 80
                    ? "text-[var(--accent)]"
                    : "text-[var(--ink)]"
                }`}
              >
                {getAsciiBar(load, 8)}
              </span>
              <span className="text-[var(--ink-muted)] tabular-nums w-7 text-right shrink-0">
                {load}%
              </span>
            </div>
          ))}
        </div>

        <div className="pt-1 space-y-1 text-[10px]">
          <div className="flex items-center justify-between gap-1">
            <span className="text-[var(--ink-muted)] w-6 shrink-0">RAM</span>
            <span className="text-[var(--ink)] tracking-tighter sm:tracking-normal shrink-0">
              {getAsciiBar(ramPercent, 8)}
            </span>
            <span className="text-[var(--ink-muted)] tabular-nums shrink-0 text-right">
              {ramGb.toFixed(1)}/32G
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-1.5">
        <span className="block text-[9px] uppercase tracking-wider text-[var(--ink-muted)]">
          ACTIVE DAEMONS
        </span>
        <div className="flex flex-wrap gap-1.5 text-[9px]">
          {SERVICES.map((srv) => (
            <div
              key={srv.name}
              className="inline-flex items-center gap-1 px-1.5 py-0.5 border border-[var(--line)] bg-[var(--surface-2)]/60 text-[var(--ink)]"
            >
              <span className="w-1 h-1 rounded-full bg-emerald-500 shrink-0" />
              <span className="text-[var(--ink-muted)]">{srv.name}:</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                {srv.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-1 pt-1 border-t border-dashed border-[var(--line)]">
        <div className="flex items-center justify-between text-[9px] text-[var(--ink-muted)]">
          <span className="uppercase tracking-wider">LOG STREAM // RING_BUF</span>
          <button
            type="button"
            onClick={handleTriggerBurst}
            className="text-[9px] font-mono text-[var(--accent)] hover:underline cursor-pointer focus-visible:outline-1 focus-visible:outline-[var(--accent)]"
          >
            [ INJECT LOAD ]
          </button>
        </div>

        <div className="space-y-0.5 text-[9px] leading-tight overflow-hidden min-h-[4.5rem]">
          {logs.map((log, index) => {
            const isLatest = index === logs.length - 1;
            return (
              <div
                key={log.id}
                className={`truncate ${
                  isLatest
                    ? "text-[var(--ink)] font-medium"
                    : "text-[var(--ink-muted)] opacity-85"
                }`}
              >
                <span className="text-[var(--ink-muted)] mr-1.5">
                  {log.time}
                </span>
                <span>{log.msg}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
