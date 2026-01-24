import 'server-only'
import { createClient } from '@supabase/supabase-js'

function mustGetEnv(name: string): string {
  const v = process.env[name]
  if (!v) throw new Error(`Missing required env var: ${name}`)
  return v
}

export function createSupabaseServerClient() {
  const url = mustGetEnv('NEXT_PUBLIC_SUPABASE_URL')
  const anonKey = mustGetEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY')

  return createClient(url, anonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  })
}
