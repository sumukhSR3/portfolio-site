import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function GlassPanel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/10 bg-card/40 backdrop-blur-2xl shadow-2xl overflow-hidden",
        className
      )}
    >
      {children}
    </div>
  );
}
