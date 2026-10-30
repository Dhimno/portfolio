"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { playPokeSound } from "../../../../lib/sound";

interface Node {
  id: string;
  x: number; // 0..1
  y: number; // 0..1
  currentX: number;
  currentY: number;
  targetX: number;
  targetY: number;
  radius: number;
  baseRadius: number;
  layer: number;
  label: string;
  activation: number; // 0..1
  pulseRing: number; // 0..1
  pulseAlpha: number; // 1..0
  parentId?: string;
  children: string[];
}

interface Edge {
  id: string;
  source: string;
  target: string;
  weight: number;
  activation: number; // 0..1
}

interface SignalPulse {
  id: string;
  edgeId: string;
  sourceId: string;
  targetId: string;
  progress: number; // 0..1
  speed: number;
}

const AI_TOKEN_POOL = [
  "attention",
  "sparse_kv",
  "transformer",
  "reasoning",
  "vector_embed",
  "latent_space",
  "softmax",
  "context_win",
  "beam_search",
  "lora_adapt",
  "flash_attn",
  "tensor_op",
  "token_sample",
  "temperature",
  "top_p_eval",
  "residual_norm",
  "gradient",
  "cross_attn",
  "agent_step",
  "distill",
  "speculative",
  "kv_cache",
];

const INITIAL_NODES: Omit<Node, "currentX" | "currentY" | "targetX" | "targetY" | "pulseRing" | "pulseAlpha">[] = [
  // Layer 0: Root Input
  {
    id: "root",
    x: 0.1,
    y: 0.5,
    radius: 7,
    baseRadius: 7,
    layer: 0,
    label: "ROOT",
    activation: 0,
    children: ["h0", "h1", "h2"],
  },
  // Layer 1: Attention Heads
  {
    id: "h0",
    x: 0.35,
    y: 0.22,
    radius: 5.5,
    baseRadius: 5.5,
    layer: 1,
    label: "HEAD_0",
    activation: 0,
    parentId: "root",
    children: ["kv0", "ffn0"],
  },
  {
    id: "h1",
    x: 0.35,
    y: 0.5,
    radius: 5.5,
    baseRadius: 5.5,
    layer: 1,
    label: "HEAD_1",
    activation: 0,
    parentId: "root",
    children: ["ffn0", "ffn1"],
  },
  {
    id: "h2",
    x: 0.35,
    y: 0.78,
    radius: 5.5,
    baseRadius: 5.5,
    layer: 1,
    label: "HEAD_2",
    activation: 0,
    parentId: "root",
    children: ["ffn1", "lat0"],
  },
  // Layer 2: Latent / FFN
  {
    id: "kv0",
    x: 0.62,
    y: 0.16,
    radius: 5,
    baseRadius: 5,
    layer: 2,
    label: "KV_CACHE",
    activation: 0,
    parentId: "h0",
    children: ["tok0"],
  },
  {
    id: "ffn0",
    x: 0.62,
    y: 0.38,
    radius: 5,
    baseRadius: 5,
    layer: 2,
    label: "FFN_0",
    activation: 0,
    parentId: "h1",
    children: ["tok1", "tok2"],
  },
  {
    id: "ffn1",
    x: 0.62,
    y: 0.62,
    radius: 5,
    baseRadius: 5,
    layer: 2,
    label: "FFN_1",
    activation: 0,
    parentId: "h1",
    children: ["tok2", "tok3"],
  },
  {
    id: "lat0",
    x: 0.62,
    y: 0.84,
    radius: 5,
    baseRadius: 5,
    layer: 2,
    label: "LATENT",
    activation: 0,
    parentId: "h2",
    children: ["tok3"],
  },
  // Layer 3: Leaf Token Candidates
  {
    id: "tok0",
    x: 0.88,
    y: 0.16,
    radius: 4.5,
    baseRadius: 4.5,
    layer: 3,
    label: "tok_0",
    activation: 0,
    parentId: "kv0",
    children: [],
  },
  {
    id: "tok1",
    x: 0.88,
    y: 0.38,
    radius: 4.5,
    baseRadius: 4.5,
    layer: 3,
    label: "tok_1",
    activation: 0,
    parentId: "ffn0",
    children: [],
  },
  {
    id: "tok2",
    x: 0.88,
    y: 0.62,
    radius: 4.5,
    baseRadius: 4.5,
    layer: 3,
    label: "tok_2",
    activation: 0,
    parentId: "ffn1",
    children: [],
  },
  {
    id: "tok3",
    x: 0.88,
    y: 0.84,
    radius: 4.5,
    baseRadius: 4.5,
    layer: 3,
    label: "tok_3",
    activation: 0,
    parentId: "lat0",
    children: [],
  },
];

const INITIAL_EDGES: Edge[] = [
  { id: "e-root-h0", source: "root", target: "h0", weight: 0.82, activation: 0 },
  { id: "e-root-h1", source: "root", target: "h1", weight: 0.95, activation: 0 },
  { id: "e-root-h2", source: "root", target: "h2", weight: 0.76, activation: 0 },
  { id: "e-h0-kv0", source: "h0", target: "kv0", weight: 0.88, activation: 0 },
  { id: "e-h0-ffn0", source: "h0", target: "ffn0", weight: 0.65, activation: 0 },
  { id: "e-h1-ffn0", source: "h1", target: "ffn0", weight: 0.91, activation: 0 },
  { id: "e-h1-ffn1", source: "h1", target: "ffn1", weight: 0.74, activation: 0 },
  { id: "e-h2-ffn1", source: "h2", target: "ffn1", weight: 0.68, activation: 0 },
  { id: "e-h2-lat0", source: "h2", target: "lat0", weight: 0.85, activation: 0 },
  { id: "e-kv0-tok0", source: "kv0", target: "tok0", weight: 0.94, activation: 0 },
  { id: "e-ffn0-tok1", source: "ffn0", target: "tok1", weight: 0.89, activation: 0 },
  { id: "e-ffn0-tok2", source: "ffn0", target: "tok2", weight: 0.72, activation: 0 },
  { id: "e-ffn1-tok2", source: "ffn1", target: "tok2", weight: 0.67, activation: 0 },
  { id: "e-ffn1-tok3", source: "ffn1", target: "tok3", weight: 0.84, activation: 0 },
  { id: "e-lat0-tok3", source: "lat0", target: "tok3", weight: 0.79, activation: 0 },
];

export function AiSynapseSimulator() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Monospace streaming ticker states
  const [tokensPerSec, setTokensPerSec] = useState<number>(124);
  const [latencyMs, setLatencyMs] = useState<number>(12);
  const [activeHead, setActiveHead] = useState<string>("attn_04");
  const [activeWeight, setActiveWeight] = useState<string>("0.942");
  const [contextUsed, setContextUsed] = useState<number>(4096);
  const [tokenStream, setTokenStream] = useState<string[]>([
    "sparse_kv",
    "attention",
    "transformer",
    "reasoning",
  ]);

  // Mutable animation state references to avoid recreation in requestAnimationFrame
  const nodesRef = useRef<Node[]>([]);
  const edgesRef = useRef<Edge[]>([]);
  const pulsesRef = useRef<SignalPulse[]>([]);
  const nextPulseIdRef = useRef<number>(1);
  const nextSpawnTimeRef = useRef<number>(0);

  // Initialize graph nodes and edges
  const initGraph = useCallback(() => {
    nodesRef.current = INITIAL_NODES.map((n) => ({
      ...n,
      currentX: n.x * 300,
      currentY: n.y * 200,
      targetX: n.x * 300,
      targetY: n.y * 200,
      pulseRing: 0,
      pulseAlpha: 0,
    }));
    edgesRef.current = INITIAL_EDGES.map((e) => ({ ...e }));
    pulsesRef.current = [];
  }, []);

  // Spawn an activation pulse originating from a node along one of its outgoing edges
  const triggerPulseFromNode = useCallback((nodeId: string, speedMultiplier = 1.0) => {
    const outgoingEdges = edgesRef.current.filter((e) => e.source === nodeId);
    if (outgoingEdges.length === 0) return;

    // Pick 1 or 2 outgoing edges
    const selectedEdges =
      outgoingEdges.length > 1 && Math.random() > 0.4
        ? outgoingEdges.sort(() => 0.5 - Math.random()).slice(0, 2)
        : [outgoingEdges[Math.floor(Math.random() * outgoingEdges.length)]];

    selectedEdges.forEach((edge) => {
      pulsesRef.current.push({
        id: `p-${nextPulseIdRef.current++}`,
        edgeId: edge.id,
        sourceId: edge.source,
        targetId: edge.target,
        progress: 0,
        speed: (0.016 + Math.random() * 0.012) * speedMultiplier,
      });
      edge.activation = 1.0;
    });
  }, []);

  // User click on canvas triggers manual pulse burst
  const handleCanvasClick = () => {
    playPokeSound();
    triggerPulseFromNode("root", 1.4);
    // Also trigger from a random head
    const heads = ["h0", "h1", "h2"];
    triggerPulseFromNode(heads[Math.floor(Math.random() * heads.length)], 1.3);
  };

  useEffect(() => {
    initGraph();
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let isMounted = true;
    let lastTime = performance.now();

    const container = containerRef.current;
    if (!container) return;

    // Resize handler to maintain sharp HiDPI rendering without infinite loop feedback
    const handleResize = () => {
      if (!canvas || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const displayWidth = Math.max(Math.floor(rect.width), 160);
      const displayHeight = Math.max(Math.floor(rect.height), 120);

      if (canvas.width !== displayWidth * dpr || canvas.height !== displayHeight * dpr) {
        canvas.width = displayWidth * dpr;
        canvas.height = displayHeight * dpr;
      }

      // Recalculate node pixel positions based on canvas aspect
      nodesRef.current.forEach((node) => {
        node.targetX = node.x * displayWidth;
        node.targetY = node.y * displayHeight;
        if (!node.currentX || !node.currentY) {
          node.currentX = node.targetX;
          node.currentY = node.targetY;
        }
      });
    };

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(container);
    handleResize();

    // Trigger initial root pulse
    triggerPulseFromNode("root");

    // Animation Loop
    const render = (time: number) => {
      if (!isMounted) return;

      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      // Resolve cyber phosphor theme colors from document or computed style
      const isDark = document.documentElement.classList.contains("dark");
      const accentColor = isDark ? "#ff6f26" : "#d94600";
      const accentHighlight = isDark ? "#ffb076" : "#ff8647";
      const synapseDimColor = isDark ? "rgba(255, 255, 255, 0.10)" : "rgba(0, 0, 0, 0.12)";
      const inkMuted = isDark ? "#9ba3af" : "#525866";
      const surfaceNodeFill = isDark ? "#1c2128" : "#f4f4f7";

      // Periodic automatic token generation trigger
      if (time > nextSpawnTimeRef.current) {
        triggerPulseFromNode("root");
        nextSpawnTimeRef.current = time + 700 + Math.random() * 800;
      }

      // 1. Update and render Edges (Synapse lines)
      const nodesMap = new Map<string, Node>();
      nodesRef.current.forEach((n) => nodesMap.set(n.id, n));

      edgesRef.current.forEach((edge) => {
        const sourceNode = nodesMap.get(edge.source);
        const targetNode = nodesMap.get(edge.target);
        if (!sourceNode || !targetNode) return;

        // Smoothly decay edge activation
        edge.activation = Math.max(0, edge.activation - dt * 1.8);

        const x1 = sourceNode.currentX;
        const y1 = sourceNode.currentY;
        const x2 = targetNode.currentX;
        const y2 = targetNode.currentY;

        // Smooth cubic bezier curve for neural synapse
        const cpX1 = x1 + (x2 - x1) * 0.45;
        const cpY1 = y1;
        const cpX2 = x1 + (x2 - x1) * 0.55;
        const cpY2 = y2;

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.bezierCurveTo(cpX1, cpY1, cpX2, cpY2, x2, y2);

        if (edge.activation > 0.05) {
          ctx.strokeStyle = accentColor;
          ctx.globalAlpha = 0.2 + edge.activation * 0.75;
          ctx.lineWidth = 1 + edge.activation * 1.5;
        } else {
          ctx.strokeStyle = synapseDimColor;
          ctx.globalAlpha = 0.6;
          ctx.lineWidth = 1;
        }
        ctx.stroke();
        ctx.globalAlpha = 1.0;
      });

      // 2. Update and render Signal Pulses traveling along synapses
      for (let i = pulsesRef.current.length - 1; i >= 0; i--) {
        const pulse = pulsesRef.current[i];
        pulse.progress += pulse.speed;

        const sourceNode = nodesMap.get(pulse.sourceId);
        const targetNode = nodesMap.get(pulse.targetId);

        if (!sourceNode || !targetNode || pulse.progress >= 1) {
          // Pulse arrived at target node! Activate target node
          if (targetNode) {
            targetNode.activation = 1.0;
            targetNode.pulseRing = 0;
            targetNode.pulseAlpha = 1.0;

            // If intermediate node, propagate pulses to next layer
            if (targetNode.children && targetNode.children.length > 0) {
              triggerPulseFromNode(targetNode.id);
            } else {
              // Reached leaf node (token generation!)
              const newToken = AI_TOKEN_POOL[Math.floor(Math.random() * AI_TOKEN_POOL.length)];
              setTokenStream((prev) => [...prev.slice(-4), newToken]);
              setTokensPerSec(120 + Math.floor(Math.random() * 16));
              setLatencyMs(10 + Math.floor(Math.random() * 6));
              setActiveHead(`attn_${Math.floor(Math.random() * 12) + 1}`);
              setActiveWeight((0.85 + Math.random() * 0.14).toFixed(3));
              setContextUsed((prev) => (prev >= 8192 ? 4096 : prev + 16));
            }
          }
          pulsesRef.current.splice(i, 1);
          continue;
        }

        // Calculate current position on cubic bezier curve:
        const t = pulse.progress;
        const mt = 1 - t;
        const x1 = sourceNode.currentX;
        const y1 = sourceNode.currentY;
        const x2 = targetNode.currentX;
        const y2 = targetNode.currentY;
        const cpX1 = x1 + (x2 - x1) * 0.45;
        const cpY1 = y1;
        const cpX2 = x1 + (x2 - x1) * 0.55;
        const cpY2 = y2;

        const px =
          mt * mt * mt * x1 +
          3 * mt * mt * t * cpX1 +
          3 * mt * t * t * cpX2 +
          t * t * t * x2;
        const py =
          mt * mt * mt * y1 +
          3 * mt * mt * t * cpY1 +
          3 * mt * t * t * cpY2 +
          t * t * t * y2;

        // Draw bright glowing packet
        ctx.save();
        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = accentHighlight;
        ctx.shadowColor = accentColor;
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.restore();
      }

      // 3. Update and render Nodes
      nodesRef.current.forEach((node) => {
        // Smooth position easing toward target
        node.currentX += (node.targetX - node.currentX) * 0.12;
        node.currentY += (node.targetY - node.currentY) * 0.12;

        // Decay activation
        node.activation = Math.max(0, node.activation - dt * 2.2);

        // Expand pulse ring
        if (node.pulseAlpha > 0) {
          node.pulseRing += dt * 2.5;
          node.pulseAlpha = Math.max(0, node.pulseAlpha - dt * 2.5);
        }

        const currentRadius = node.baseRadius + node.activation * 3.0;

        // Render expanding shockwave ring
        if (node.pulseAlpha > 0.02) {
          ctx.beginPath();
          const ringRadius = node.baseRadius + node.pulseRing * 14;
          ctx.arc(node.currentX, node.currentY, ringRadius, 0, Math.PI * 2);
          ctx.strokeStyle = accentColor;
          ctx.globalAlpha = node.pulseAlpha * 0.65;
          ctx.lineWidth = 1;
          ctx.stroke();
          ctx.globalAlpha = 1.0;
        }

        // Node circle background and border
        ctx.beginPath();
        ctx.arc(node.currentX, node.currentY, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = node.activation > 0.2 ? accentColor : surfaceNodeFill;
        ctx.fill();

        ctx.strokeStyle = node.activation > 0.1 ? accentHighlight : synapseDimColor;
        ctx.lineWidth = node.activation > 0.2 ? 1.5 : 1;
        ctx.stroke();

        // Node center core dot
        ctx.beginPath();
        ctx.arc(node.currentX, node.currentY, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = node.activation > 0.2 ? "#ffffff" : inkMuted;
        ctx.fill();

        // Monospace node label
        ctx.font = "8px var(--font-pixel), monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = node.activation > 0.3 ? accentColor : inkMuted;
        ctx.fillText(node.label, node.currentX, node.currentY - currentRadius - 5);
      });

      ctx.restore();
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    // Pause when document is hidden to conserve CPU
    const handleVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationFrameId);
      } else {
        lastTime = performance.now();
        animationFrameId = requestAnimationFrame(render);
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      isMounted = false;
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [initGraph, triggerPulseFromNode]);

  return (
    <div className="w-full h-full flex flex-col justify-between flex-1 select-none">
      {/* HUD Meta Header */}
      <div className="flex items-center justify-between border-b border-dashed border-[var(--line)] pb-1.5 text-[10px] font-mono text-[var(--ink-muted)]">
        <span className="flex items-center gap-1.5 text-[var(--accent)] font-semibold tracking-wider">
          <span className="w-1.5 h-1.5 rounded-none bg-[var(--accent)] animate-pulse" />
          SYNAPSE // GRAPH_V2
        </span>
        <span className="text-[9px] text-[var(--ink-muted)]">BEAM: 4 // L3 EXPANSION</span>
      </div>

      {/* Interactive Neural Canvas */}
      <div
        ref={containerRef}
        className="relative w-full flex-1 min-h-[140px] max-h-[190px] my-1 cursor-crosshair overflow-hidden"
        onClick={handleCanvasClick}
        title="Click to pulse neural synapse tree"
      >
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
      </div>

      {/* Monospace Streaming Token Ticker */}
      <div className="flex flex-col border-t border-dashed border-[var(--line)] pt-2 text-[10px] font-mono text-[var(--ink-muted)] gap-1.5">
        {/* Real-time telemetry metrics */}
        <div className="flex items-center justify-between text-[9px] sm:text-[10px]">
          <div className="flex items-center gap-2">
            <span>
              TOKENS/S: <strong className="text-[var(--ink)] font-bold">{tokensPerSec}</strong>
            </span>
            <span>
              LATENCY: <strong className="text-[var(--ink)] font-bold">{latencyMs}ms</strong>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span>
              HEAD: <span className="text-[var(--accent)] font-semibold">{activeHead}</span>
            </span>
            <span>
              W: <strong className="text-[var(--ink)]">{activeWeight}</strong>
            </span>
            <span className="hidden sm:inline">
              CTX: <strong className="text-[var(--ink)]">{contextUsed}</strong>
            </span>
          </div>
        </div>

        {/* Streaming Token Ribbon */}
        <div className="flex items-center gap-1 bg-[var(--surface-2)] px-2 py-1 border border-[var(--line)]/60 text-[9px] sm:text-[10px] overflow-hidden">
          <span className="text-[var(--accent)] font-bold shrink-0">&gt;</span>
          <div className="flex items-center gap-1 overflow-hidden whitespace-nowrap text-[var(--ink)]">
            {tokenStream.map((tok, idx) => (
              <span
                key={idx}
                className={
                  idx === tokenStream.length - 1
                    ? "text-[var(--accent)] font-bold"
                    : "text-[var(--ink-muted)]"
                }
              >
                [{tok}]
              </span>
            ))}
            <span className="inline-block w-1.5 h-3 bg-[var(--accent)] animate-pulse ml-0.5" />
          </div>
        </div>
      </div>
    </div>
  );
}
