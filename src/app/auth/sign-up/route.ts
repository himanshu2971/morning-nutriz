import { NextResponse } from "next/server";
import { createSupabaseRouteClient } from "@/lib/supabase/server-route";

export async function POST(request: Request) {
  const formData = await request.formData();
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");

  const supabase = createSupabaseRouteClient();
  const { error } = await supabase.auth.signUp({ email, password });

  if (error) {
    return NextResponse.redirect(new URL("/login?mode=signup&msg=signup_failed", request.url), {
      status: 303,
    });
  }

  return NextResponse.redirect(new URL("/login?msg=created", request.url), { status: 303 });
}
