// src/components/ui/Button.tsx
import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "dark" | "outline";

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
}) {
  const base =
    "inline-flex items-center justify-center rounded-2xl px-6 py-3 text-sm font-black transition focus:outline-none focus:ring-2 focus:ring-slate-900/20";
  const styles =
    variant === "primary"
      ? "bg-primary text-white hover:bg-primary-dark"
      : variant === "dark"
      ? "bg-slate-900 text-white hover:bg-slate-800"
      : "border border-slate-900/15 bg-white/60 text-slate-900 hover:bg-white";

  return (
    <Link href={href} className={`${base} ${styles} ${className}`}>
      {children}
    </Link>
  );
}
