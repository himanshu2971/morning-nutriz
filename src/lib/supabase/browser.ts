"use client";

import { createClient } from "@supabase/supabase-js";

export function createSupabaseBrowserClient(url: string, anonKey: string) {
  if (!url) throw new Error("Missing Supabase URL (prop).");
  if (!anonKey) throw new Error("Missing Supabase anon key (prop).");

  return createClient(url, anonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });
}
