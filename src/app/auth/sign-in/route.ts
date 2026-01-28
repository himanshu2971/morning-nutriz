import { NextResponse } from "next/server";
import { createSupabaseRouteClient } from "@/lib/supabase/server-route";

export async function POST(request: Request) {
  const formData = await request.formData();
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");

  const supabase = createSupabaseRouteClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return NextResponse.redirect(new URL("/login?mode=signup&msg=invalid", request.url), {
      status: 303,
    });
  }

  const next = new URL(request.url).searchParams.get("next") || "/account";
  return NextResponse.redirect(new URL(next, request.url), { status: 303 });
}
