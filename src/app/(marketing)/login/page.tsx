// src/app/(marketing)/login/page.tsx
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export const metadata = { title: "Login | Morning Nutriz" };

function safeNext(input: string | undefined, fallback = "/account") {
  if (!input) return fallback;
  if (!input.startsWith("/")) return fallback;
  if (input.startsWith("//")) return fallback;
  return input;
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; mode?: string; msg?: string }>;
}) {
  const sp = await searchParams;
  const next = safeNext(sp.next, "/account");
  const mode = sp.mode === "signup" ? "signup" : "login";
  const msg = sp.msg || "";

  // If already logged in, go where the user originally wanted to go. [web:612]
  const supabase = createSupabaseServerClient();
  const { data } = await supabase.auth.getUser();
  if (data.user) redirect(next); // [web:612]

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[#06140e]" />
      <div className="relative mx-auto flex min-h-[70vh] max-w-lg items-center px-4 py-14">
        <div className="w-full rounded-[28px] bg-black/40 p-7 text-white ring-1 ring-white/12 backdrop-blur-xl">
          <h1 className="text-3xl font-black">
            {mode === "signup" ? "Create account" : "Login"}
          </h1>

          {msg ? (
            <div className="mt-4 rounded-xl border border-white/10 bg-black/35 p-3 text-sm text-white/80">
              {msg === "created"
                ? "Account created. Now login."
                : msg === "invalid"
                ? "No account found (or wrong password). Please sign up."
                : "Something happened. Try again."}
            </div>
          ) : null}

          <div className="mt-6 flex gap-2">
            <a
              className={`flex-1 rounded-xl px-4 py-2 text-center text-sm font-black ring-1 ${
                mode === "login"
                  ? "bg-white text-black ring-white/20"
                  : "bg-white/10 ring-white/10"
              }`}
              href={`/login?mode=login&next=${encodeURIComponent(next)}`}
            >
              Login
            </a>
            <a
              className={`flex-1 rounded-xl px-4 py-2 text-center text-sm font-black ring-1 ${
                mode === "signup"
                  ? "bg-white text-black ring-white/20"
                  : "bg-white/10 ring-white/10"
              }`}
              href={`/login?mode=signup&next=${encodeURIComponent(next)}`}
            >
              Sign up
            </a>
          </div>

          <form
            className="mt-6 space-y-4"
            action={
              mode === "signup"
                ? `/auth/sign-up?next=${encodeURIComponent(next)}`
                : `/auth/sign-in?next=${encodeURIComponent(next)}`
            }
            method="post"
          >
            <div className="space-y-2">
              <label className="text-sm text-white/80" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                name="email"
                className="h-11 w-full rounded-xl border border-white/10 bg-black/35 px-4 text-white outline-none"
                placeholder="name@email.com"
                autoComplete="email"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-white/80" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                className="h-11 w-full rounded-xl border border-white/10 bg-black/35 px-4 text-white outline-none"
                placeholder="Minimum 8 characters"
                autoComplete={mode === "signup" ? "new-password" : "current-password"}
                minLength={8}
                required
              />
            </div>

            <button
              type="submit"
              className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-400 px-5 text-sm font-black text-[#06140e]"
            >
              {mode === "signup" ? "Create account" : "Continue"}
            </button>
          </form>

          <p className="mt-4 text-xs text-white/55">
            After login you will be redirected to:{" "}
            <span className="text-white/75">{next}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
