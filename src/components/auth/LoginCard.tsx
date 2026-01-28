"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

type Props = {
  supabaseUrl: string;
  supabaseAnonKey: string;
};

function normalizeEmail(v: string) {
  return v.trim().toLowerCase();
}

export default function LoginCard({ supabaseUrl, supabaseAnonKey }: Props) {
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/account";

  const supabase = useMemo(
    () => createSupabaseBrowserClient(supabaseUrl, supabaseAnonKey),
    [supabaseUrl, supabaseAnonKey]
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [message, setMessage] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const emailNorm = normalizeEmail(email);
  const canSubmit = emailNorm.includes("@") && password.length >= 8;

  async function onSubmit() {
    setMessage(null);
    setPending(true);

    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({ email: emailNorm, password });
        if (error) throw error;

        setMessage("Account created. Please login to continue.");
        setMode("login");
        return;
      }

      const { error } = await supabase.auth.signInWithPassword({ email: emailNorm, password });

      if (error) {
        setMode("signup");
        setMessage("No account found (or wrong password). Create an account to continue.");
        return;
      }

      window.location.href = next;
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Something went wrong. Please try again.";
      setMessage(msg);
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-lg items-center px-4 py-14">
      <div className="w-full rounded-[28px] bg-black/40 p-7 text-white ring-1 ring-white/12 backdrop-blur-xl shadow-[0_28px_90px_rgba(0,0,0,0.35)]">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-black text-white ring-1 ring-white/10">
          Secure login
        </div>

        <h1 className="mt-5 font-display text-3xl font-black tracking-tight">
          {mode === "signup" ? "Create account" : "Login"}
        </h1>

        <p className="mt-2 text-sm text-white/70">
          Email + password only. If you’re new, we’ll switch you to Sign up.
        </p>

        <div className="mt-6 space-y-4">
          <div className="space-y-2">
            <label className="text-sm text-white/80" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11 w-full rounded-xl border border-white/10 bg-black/35 px-4 text-white outline-none placeholder:text-white/35 focus:border-white/20"
              placeholder="name@email.com"
              autoComplete="email"
              disabled={pending}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-white/80" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="h-11 w-full rounded-xl border border-white/10 bg-black/35 px-4 text-white outline-none placeholder:text-white/35 focus:border-white/20"
              placeholder="Minimum 8 characters"
              autoComplete={mode === "signup" ? "new-password" : "current-password"}
              disabled={pending}
              required
            />
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setMode("login")}
              className={[
                "h-10 flex-1 rounded-xl text-sm font-black ring-1 transition",
                mode === "login"
                  ? "bg-white text-black ring-white/20"
                  : "bg-white/10 text-white ring-white/10 hover:bg-white/14",
              ].join(" ")}
              disabled={pending}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => setMode("signup")}
              className={[
                "h-10 flex-1 rounded-xl text-sm font-black ring-1 transition",
                mode === "signup"
                  ? "bg-white text-black ring-white/20"
                  : "bg-white/10 text-white ring-white/10 hover:bg-white/14",
              ].join(" ")}
              disabled={pending}
            >
              Sign up
            </button>
          </div>

          {message ? (
            <div className="rounded-xl border border-white/10 bg-black/35 p-3 text-sm text-white/80">
              {message}
            </div>
          ) : null}

          <button
            type="button"
            onClick={onSubmit}
            disabled={pending || !canSubmit}
            className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-400 px-5 text-sm font-black text-[#06140e] transition hover:brightness-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {pending ? "Please wait…" : mode === "signup" ? "Create account" : "Continue"}
          </button>

          <p className="text-xs text-white/55">
            After login you will be redirected to: <span className="text-white/75">{next}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
