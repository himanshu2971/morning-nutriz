import { NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase/server'

function normalizeEmailOrPhone(raw: string) {
  const v = raw.trim()
  const isEmail = v.includes('@')
  const email = isEmail ? v.toLowerCase() : null

  // Minimal phone normalization: digits only.
  // Expect user to type with country code (91xxxxxxxxxx). You can improve later.
  const phoneDigits = isEmail ? null : v.replace(/[^\d]/g, '')

  return { email, phoneDigits }
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null)
  const identifier = String(body?.identifier ?? '').trim()

  if (!identifier) {
    return NextResponse.json({ ok: false, message: 'Missing identifier' }, { status: 400 })
  }

  const { email, phoneDigits } = normalizeEmailOrPhone(identifier)
  if (!email && (!phoneDigits || phoneDigits.length < 8)) {
    return NextResponse.json({ ok: false, message: 'Enter a valid email or phone number' }, { status: 400 })
  }

  // We do NOT query auth.users (not accessible via anon).
  // We query our mapping table but RLS blocks SELECT from anon/authenticated clients.
  // Therefore, this API route runs server-side and can use the anon key *only if* RLS allows it.
  // Since we blocked SELECT via RLS, we must use a secure approach:
  // -> Use an RPC (security definer) or use service role.
  //
  // To keep it secure and simple, we will NOT query the DB from anon here.
  // Instead, we infer existence by attempting a passwordless OTP sign-in request:
  // Supabase will accept request even if user doesn't exist in some configurations.
  //
  // So we use the mapping table approach ONLY after signup to avoid enumeration.
  //
  // For now return "unknown" and let UI present signup option proactively.
  return NextResponse.json({ ok: true, exists: null })
}
