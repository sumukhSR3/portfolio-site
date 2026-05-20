"use client";

import { motion } from "framer-motion";

export function Sparkline({
  data,
  color = "text-emerald-500",
  className = "h-6 w-16",
}: {
  data: number[];
  color?: string;
  className?: string;
}) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  // normalize to 0-100 height, 0-100 width
  const points = data
    .map((val, i) => {
      const x = (i / (data.length - 1)) * 100;
      const y = 100 - ((val - min) / range) * 100;
      return `${x},${y}`;
    })
    .join(" L ");

  const path = `M ${points}`;

  return (
    <svg className={className} viewBox="0 -10 100 120" preserveAspectRatio="none">
      <motion.path
        d={path}
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className={color}
      />
    </svg>
  );
}
