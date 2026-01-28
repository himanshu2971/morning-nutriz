import { NextResponse } from "next/server";
import { createSupabaseRouteClient } from "@/lib/supabase/server-route";

export async function POST(request: Request) {
  const supabase = createSupabaseRouteClient();

  // Optional but safe
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    await supabase.auth.signOut();
  }

  return NextResponse.redirect(new URL("/login?msg=signed_out", request.url), {
    status: 303,
  });
}
