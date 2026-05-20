"use client";

import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  pulse: number;
  pulseSpeed: number;
}

const NODE_COUNT = 70;
const MAX_DIST = 160;
const MOUSE_RADIUS = 120;
const MOUSE_STRENGTH = 0.4;

export function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const nodes = useRef<Node[]>([]);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Initialise nodes
    nodes.current = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: 1.5 + Math.random() * 2,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: 0.01 + Math.random() * 0.02,
    }));

    const onMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMouseMove);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const ns = nodes.current;

      // Update positions
      for (const n of ns) {
        // Mouse repulsion
        const dx = n.x - mouse.current.x;
        const dy = n.y - mouse.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_RADIUS && dist > 0) {
          const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
          n.vx += (dx / dist) * force * MOUSE_STRENGTH;
          n.vy += (dy / dist) * force * MOUSE_STRENGTH;
        }

        // Damping
        n.vx *= 0.97;
        n.vy *= 0.97;
        n.x += n.vx;
        n.y += n.vy;
        n.pulse += n.pulseSpeed;

        // Wrap edges
        if (n.x < 0) n.x = canvas.width;
        if (n.x > canvas.width) n.x = 0;
        if (n.y < 0) n.y = canvas.height;
        if (n.y > canvas.height) n.y = 0;
      }

      // Draw edges
      for (let i = 0; i < ns.length; i++) {
        for (let j = i + 1; j < ns.length; j++) {
          const dx = ns[i].x - ns[j].x;
          const dy = ns[i].y - ns[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            const alpha = (1 - dist / MAX_DIST) * 0.35;
            // Gradient line: violet → blue
            const grad = ctx.createLinearGradient(ns[i].x, ns[i].y, ns[j].x, ns[j].y);
            grad.addColorStop(0, `rgba(167,139,250,${alpha})`);   // violet-400
            grad.addColorStop(1, `rgba(96,165,250,${alpha})`);    // blue-400
            ctx.beginPath();
            ctx.moveTo(ns[i].x, ns[i].y);
            ctx.lineTo(ns[j].x, ns[j].y);
            ctx.strokeStyle = grad;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      for (const n of ns) {
        const glow = Math.sin(n.pulse) * 0.5 + 0.5; // 0–1
        const r = n.radius + glow * 1.2;

        // Outer glow
        const glowGrad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r * 4);
        glowGrad.addColorStop(0, `rgba(167,139,250,${0.15 * glow})`);
        glowGrad.addColorStop(1, "rgba(167,139,250,0)");
        ctx.beginPath();
        ctx.arc(n.x, n.y, r * 4, 0, Math.PI * 2);
        ctx.fillStyle = glowGrad;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(167,139,250,${0.6 + glow * 0.4})`;
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden
    />
  );
}
