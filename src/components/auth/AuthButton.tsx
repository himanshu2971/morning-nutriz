// src/components/auth/AuthButton.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

type Props = {
  className?: string;
  variant?: "outline" | "dark";
};

export default function AuthButton({ className = "", variant = "outline" }: Props) {
  const pathname = usePathname() || "/";
  const [signedIn, setSignedIn] = useState<boolean>(false);
  const [pending, setPending] = useState(false);

  const supabase = useMemo(
    () =>
      createSupabaseBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      ),
    []
  );

  useEffect(() => {
    let alive = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!alive) return;
      setSignedIn(!!data.session);
    });

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setSignedIn(!!session);
    });

    return () => {
      alive = false;
      data.subscription.unsubscribe();
    };
  }, [supabase]);

  async function onSignOut() {
    setPending(true);
    try {
      const { error } = await supabase.auth.signOut(); // Clears session and triggers SIGNED_OUT. [web:702]
      if (error) throw error;
      window.location.href = "/";
    } catch {
      // fallback to home even if something odd happens
      window.location.href = "/";
    } finally {
      setPending(false);
    }
  }

  const base =
    "inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-black transition disabled:cursor-not-allowed disabled:opacity-60";
  const outline = "border border-black/10 bg-white/70 text-slate-900 backdrop-blur-xl hover:bg-white";
  const dark = "bg-slate-900 text-white hover:brightness-[1.02]";

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
