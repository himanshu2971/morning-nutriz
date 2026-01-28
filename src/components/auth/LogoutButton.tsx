"use client";

import { useMemo, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

type Props = {
  supabaseUrl: string;
  supabaseAnonKey: string;
};

export default function LogoutButton({ supabaseUrl, supabaseAnonKey }: Props) {
  const supabase = useMemo(
    () => createSupabaseBrowserClient(supabaseUrl, supabaseAnonKey),
    [supabaseUrl, supabaseAnonKey]
  );

  const [pending, setPending] = useState(false);

  async function logout() {
    setPending(true);
    await supabase.auth.signOut();
    window.location.href = "/login";
  }

  return (
    <button
      type="button"
      onClick={logout}
      disabled={pending}
      className="inline-flex h-11 items-center justify-center rounded-xl bg-slate-900 px-5 text-sm font-black text-white transition hover:bg-slate-800 disabled:opacity-60"
    >
      {pending ? "Signing out…" : "Logout"}
    </button>
  );
}
