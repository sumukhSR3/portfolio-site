"use client";

import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { GlassPanel } from "@/components/ui/glass-panel";
import { Sparkline } from "@/components/ui/sparkline";
import { Activity } from "lucide-react";

const metrics = [
  { label: "Throughput", unit: "tok/s", target: 4200, color: "bg-emerald-500" },
  { label: "GPU Utilization", unit: "%", target: 94, color: "bg-blue-500" },
  { label: "KV Cache Hit", unit: "%", target: 87, color: "bg-violet-500" },
  { label: "Batch Efficiency", unit: "%", target: 91, color: "bg-amber-500" },
];

function MetricBar({ label, unit, target, color, delay }: {
  label: string; unit: string; target: number; color: string; delay: number;
}) {
  const [value, setValue] = useState(0);
  const maxVal = unit === "tok/s" ? 5000 : 100;
  const pct = (value / maxVal) * 100;

  useEffect(() => {
    const timeout = setTimeout(() => {
      // Animate up to target with small jitter
      let current = 0;
      const step = target / 40;
      const interval = setInterval(() => {
        current = Math.min(current + step, target);
        // Add ±2% live jitter once settled
        const jitter = current >= target ? (Math.random() - 0.5) * (target * 0.04) : 0;
        setValue(Math.round(current + jitter));
        if (current >= target) clearInterval(interval);
      }, 30);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [target, delay]);

  // Continuous jitter after settle
  useEffect(() => {
    const settled = setTimeout(() => {
      const jitter = setInterval(() => {
        setValue(Math.round(target + (Math.random() - 0.5) * (target * 0.04)));
      }, 1800);
      return () => clearInterval(jitter);
    }, delay + 1400);
    return () => clearTimeout(settled);
  }, [target, delay]);

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-xs">
        <span className="font-mono text-muted-foreground">{label}</span>
        <motion.span
          className="font-mono font-semibold tabular-nums"
          key={value}
        >
          {unit === "tok/s" ? value.toLocaleString() : value}
          <span className="ml-0.5 text-muted-foreground">{unit}</span>
        </motion.span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-border/50 overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${color}`}
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(pct, 100)}%` }}
          transition={{ duration: 0.15, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

export function InferenceDashboard() {
  const [tick, setTick] = useState(0);
  const [latency, setLatency] = useState(12);

  useEffect(() => {
    const id = setInterval(() => {
      setTick((t) => t + 1);
      setLatency(Math.round(10 + Math.random() * 6));
    }, 2000);
    return () => clearInterval(id);
  }, []);

  return (
    <GlassPanel>
      <div className="p-4 space-y-4">
        {/* Header row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-emerald-400" />
            <span className="font-mono text-xs font-semibold text-foreground tracking-wide">
              llm_inference_monitor
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="font-mono text-[10px] text-emerald-400">LIVE</span>
          </div>
        </div>

        {/* Model badge */}
        <div className="flex items-center gap-2 rounded-lg border border-border/60 bg-background/40 px-3 py-2">
          <div className="h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
          <span className="font-mono text-[11px] text-muted-foreground">model:</span>
          <span className="font-mono text-[11px] font-semibold text-blue-400">llama-3-8b-instruct</span>
          <span className="ml-auto font-mono text-[10px] text-muted-foreground border border-border/50 rounded px-1.5 py-0.5">vLLM</span>
        </div>

        {/* TTFT pill */}
        <div className="flex items-center gap-3 rounded-lg bg-emerald-500/5 border border-emerald-500/20 px-3 py-2">
          <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">TTFT</span>
          <motion.span
            key={latency}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-mono text-xl font-extrabold text-emerald-400 tabular-nums"
          >
            {latency}ms
          </motion.span>
          <Sparkline data={[12, 14, 11, 15, 12, 16, 13, 11, 12, latency]} color="text-emerald-500/50" className="h-6 w-16 ml-2" />
          <span className="ml-auto font-mono text-[10px] text-emerald-500/70">↓ p95</span>
        </div>

        {/* Metric bars */}
        <div className="space-y-3">
          {metrics.map((m, i) => (
            <MetricBar key={m.label} {...m} delay={i * 200} />
          ))}
        </div>

        {/* Footer */}
        <div className="border-t border-border/40 pt-2 flex items-center justify-between">
          <span className="font-mono text-[10px] text-muted-foreground">
            requests: <span className="text-foreground">3,241 active</span>
          </span>
          <motion.span
            key={tick}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-mono text-[10px] text-muted-foreground"
          >
            tick #{tick.toString().padStart(4, "0")}
          </motion.span>
        </div>
      </div>
    </GlassPanel>
  );
}
