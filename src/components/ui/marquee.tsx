"use client";

import { cn } from "@/lib/utils";

export function Marquee({
  children,
  className,
  reverse,
  pauseOnHover = false,
}: {
  children: React.ReactNode;
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
}) {
  return (
    <div
      className={cn(
        "group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem]",
        className
      )}
    >
      <div
        className={cn(
          "flex shrink-0 justify-around gap-[var(--gap)] min-w-full",
          "animate-marquee flex-row",
          pauseOnHover && "group-hover:[animation-play-state:paused]",
          reverse && "direction-reverse"
        )}
        style={{
           animation: "marquee var(--duration) linear infinite",
           animationDirection: reverse ? "reverse" : "normal"
        }}
      >
        {children}
      </div>
      <div
        className={cn(
          "flex shrink-0 justify-around gap-[var(--gap)] min-w-full ml-[var(--gap)]",
          "animate-marquee flex-row",
          pauseOnHover && "group-hover:[animation-play-state:paused]",
          reverse && "direction-reverse"
        )}
        style={{
           animation: "marquee var(--duration) linear infinite",
           animationDirection: reverse ? "reverse" : "normal"
        }}
      >
        {children}
      </div>
      <style jsx global>{`
        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(calc(-100% - var(--gap)));
          }
        }
      `}</style>
    </div>
  );
}
