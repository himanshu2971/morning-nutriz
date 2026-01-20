// src/components/ui/GlassCard.tsx
import type { ReactNode } from "react";

export function GlassCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  // Glassmorphism uses backdrop blur + translucent bg. [web:284]
  return (
    <div
      className={[
        "rounded-[28px] border border-white/60 bg-white/70 shadow-[0_18px_60px_rgba(2,6,23,0.10)] backdrop-blur-xl",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}
