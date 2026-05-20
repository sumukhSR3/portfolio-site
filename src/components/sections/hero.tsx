"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Cpu, Network, Zap } from "lucide-react";
import { LinkedinIcon } from "@/components/ui/icons";
import { buttonVariants } from "@/components/ui/button";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { ScrambleText } from "@/components/ui/scramble-text";
import { GlassPanel } from "@/components/ui/glass-panel";
import { cn } from "@/lib/utils";

// Typewriter that cycles through roles
const ROLES = [
  "Machine Learning Engineer",
  "LLM Inference Optimizer",
  "RAG Pipeline Architect",
  "Generative AI Systems Builder",
];

function TypewriterRole() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const target = ROLES[roleIdx];
    if (!deleting && displayed.length < target.length) {
      const t = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 55);
      return () => clearTimeout(t);
    }
    if (!deleting && displayed.length === target.length) {
      const t = setTimeout(() => setDeleting(true), 2000);
      return () => clearTimeout(t);
    }
    if (deleting && displayed.length > 0) {
      const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 30);
      return () => clearTimeout(t);
    }
    if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIdx((i) => (i + 1) % ROLES.length);
    }
  }, [displayed, deleting, roleIdx]);

  return (
    <span className="font-mono text-base sm:text-lg text-emerald-400">
      {displayed}
      <span className="animate-pulse">|</span>
    </span>
  );
}

// Floating stat chip
function StatChip({
  icon: Icon,
  label,
  value,
  delay,
  className,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  delay: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay, type: "spring", stiffness: 120 }}
      className={cn(
        "absolute flex items-center gap-3 rounded-2xl border border-white/10 bg-card/60 backdrop-blur-xl px-4 py-3 shadow-xl",
        className
      )}
    >
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400">
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">{label}</p>
        <p className="font-bold text-sm tabular-nums">{value}</p>
      </div>
    </motion.div>
  );
}

// Animated gradient ring
function GradientRing({ size, delay, className }: { size: number; delay: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: [0, 0.15, 0] , scale: [0.5, 1.5, 2] }}
      transition={{ duration: 4, delay, repeat: Infinity, ease: "easeOut" }}
      style={{ width: size, height: size }}
      className={cn("absolute rounded-full border border-emerald-500/30", className)}
    />
  );
}

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden px-6 pt-24 pb-12">
      {/* Ambient glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-emerald-500/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-blue-600/8 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl grid lg:grid-cols-2 gap-16 items-center">
        {/* ── LEFT ── */}
        <div className="space-y-8">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-mono text-emerald-400"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Open to work · San Francisco, CA
          </motion.div>

          {/* Name */}
          <div className="space-y-2">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, type: "spring", stiffness: 80 }}
            >
              <h1 className="text-6xl font-extrabold tracking-tight sm:text-7xl lg:text-8xl leading-none">
                <span className="block text-foreground/60 text-2xl font-mono font-normal mb-2 tracking-widest uppercase">
                  <ScrambleText text="> init.engineer" duration={1800} />
                </span>
                Sumukh
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-blue-400">
                  Ramagiri
                </span>
              </h1>
            </motion.div>

            {/* Typewriter role */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="h-7"
            >
              <TypewriterRole />
            </motion.div>
          </div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-muted-foreground max-w-lg leading-relaxed text-base"
          >
            5+ years building <strong className="text-foreground">production-grade AI systems</strong> — 
            from vLLM inference serving 3k+ users to RAG pipelines improving accuracy by 32%. 
            I turn research into infrastructure that scales.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="flex flex-wrap items-center gap-4"
          >
            <MagneticButton>
              <a
                href="#projects"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_0_30px_rgba(16,185,129,0.35)] hover:shadow-[0_0_40px_rgba(16,185,129,0.5)] transition-all duration-300"
                )}
              >
                View Work <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </MagneticButton>
            <MagneticButton intensity={0.3}>
              <a
                href="https://linkedin.com/in/sumukh-ramagiri-1a70363b3/"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants({ variant: "outline", size: "lg" }), "border-white/20 hover:border-emerald-500/50")}
              >
                <LinkedinIcon className="mr-2 h-4 w-4" /> Connect
              </a>
            </MagneticButton>
            <a
              href="mailto:ramagirisumukh3@gmail.com"
              className={cn(buttonVariants({ variant: "ghost", size: "lg" }), "text-muted-foreground hover:text-foreground")}
            >
              ramagirisumukh3@gmail.com
            </a>
          </motion.div>
        </div>

        {/* ── RIGHT ── floating UI panel */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative hidden lg:flex h-[620px] w-full items-center justify-center"
        >
          {/* Pulsing rings */}
          <GradientRing size={200} delay={0}   className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          <GradientRing size={200} delay={1.5} className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          <GradientRing size={200} delay={3}   className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

          {/* Central glass card */}
          <motion.div
            animate={{ y: [-8, 8, -8] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="w-80"
          >
            <GlassPanel className="p-6">
            {/* Mac dots */}
            <div className="flex items-center gap-2 mb-5">
              <div className="h-3 w-3 rounded-full bg-red-500/70" />
              <div className="h-3 w-3 rounded-full bg-yellow-500/70" />
              <div className="h-3 w-3 rounded-full bg-green-500/70" />
              <span className="ml-2 font-mono text-xs text-muted-foreground">inference_server.py</span>
            </div>

            {/* Code lines */}
            <div className="space-y-1 font-mono text-sm">
              {[
                { txt: "from vllm import LLM, SamplingParams", color: "text-emerald-400" },
                { txt: "", color: "" },
                { txt: "llm = LLM(", color: "text-foreground" },
                { txt: '  model="meta-llama/Llama-3-8b",', color: "text-yellow-300" },
                { txt: "  tensor_parallel_size=4,", color: "text-yellow-300" },
                { txt: "  gpu_memory_utilization=0.92,", color: "text-yellow-300" },
                { txt: ")", color: "text-foreground" },
                { txt: "", color: "" },
                { txt: "# TTFT: 12ms  ↓36% latency", color: "text-muted-foreground" },
              ].map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + i * 0.1, duration: 0.3 }}
                  className={cn("leading-relaxed", line.color || "text-foreground")}
                >
                  {line.txt || "\u00a0"}
                </motion.div>
              ))}

              {/* Blinking cursor at the bottom */}
              <motion.div
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-emerald-400"
              >
                ▋
              </motion.div>
            </div>
            </GlassPanel>
          </motion.div>

          {/* Floating stat chips */}
          <StatChip
            icon={Network}
            label="Inference Latency"
            value="12ms TTFT"
            delay={1.0}
            className="top-16 right-0"
          />
          <StatChip
            icon={Cpu}
            label="Throughput"
            value="4.2k tok/s"
            delay={1.2}
            className="bottom-24 left-0"
          />
          <StatChip
            icon={Zap}
            label="Cost Reduction"
            value="−29%"
            delay={1.4}
            className="top-1/2 -right-4"
          />
        </motion.div>
      </div>
    </section>
  );
}
