// src/components/auth/SignOutButton.tsx
"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  signedIn: boolean;
  className?: string;
  variant?: "outline" | "dark";
};

export default function SignOutButton({
  signedIn,
  className = "",
  variant = "outline",
}: Props) {
  const pathname = usePathname() || "/";
  const router = useRouter();
  const [pending, setPending] = useState(false);

  const base =
    "inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-black transition disabled:cursor-not-allowed disabled:opacity-60";
  const outline =
    "border border-black/10 bg-white/70 text-slate-900 backdrop-blur-xl hover:bg-white";
  const dark = "bg-slate-900 text-white hover:brightness-[1.02]";

  async function onSignOut() {
    setPending(true);
    try {
      // Must hit a Route Handler so SSR cookies are cleared. [web:702]
      await fetch("/auth/sign-out", { method: "POST" });

      // Force a new server request so header/menu re-render with signed-out cookies. [web:758]
      router.replace("/login?msg=signed_out");
      router.refresh(); // Refresh current route data from the server. [web:758]
    } catch {
      window.location.href = "/login?msg=signed_out";
    } finally {
      setPending(false);
    }
  }

  if (!signedIn) {
    return (
      <a
        href={`/login?next=${encodeURIComponent(pathname)}`}
        className={[base, variant === "dark" ? dark : outline, className].join(" ")}
      >
        Login
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onSignOut}
      disabled={pending}
      className={[base, dark, className].join(" ")}
    >
      {pending ? "Signing out…" : "Sign out"}
    </button>
  );
}
