// src/app/auth/sign-out/route.ts
import { NextResponse } from "next/server";
import { createSupabaseRouteClient } from "@/lib/supabase/server-route";

function safeNext(input: string | null, fallback: string) {
  if (!input) return fallback;
  if (!input.startsWith("/")) return fallback;
  if (input.startsWith("//")) return fallback;
  return input;
}

export async function POST(request: Request) {
  const supabase = createSupabaseRouteClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    await supabase.auth.signOut(); // Sign out server-side. [web:702]
  }

  const url = new URL(request.url);
  const next = safeNext(url.searchParams.get("next"), "/login?msg=signed_out");

  return NextResponse.redirect(new URL(next, request.url), { status: 303 });
}
