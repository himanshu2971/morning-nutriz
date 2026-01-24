'use server'

import { headers } from 'next/headers'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { normalizeLeadInput, validateLeadInput } from '@/lib/validation/leads'

export type LeadActionState =
  | { ok: true; message: string }
  | { ok: false; message: string; fieldErrors?: string[] }

export async function submitLeadAction(
  _prev: LeadActionState | null,
  formData: FormData
): Promise<LeadActionState> {
  const input = normalizeLeadInput(formData)
  const fieldErrors = validateLeadInput(input)
  if (fieldErrors.length) {
    return { ok: false, message: 'Please fix the errors and try again.', fieldErrors }
  }

  const h = await headers()
  const userAgent = h.get('user-agent') ?? undefined
  const pageUrl = h.get('referer') ?? undefined

  const supabase = createSupabaseServerClient()

  const { error } = await supabase.from('leads').insert({
    name: input.name,
    phone: input.phone,
    email: input.email,
    area_pincode: input.areaPincode,
    plan_interested: input.planInterested,
    user_agent: userAgent,
    page_url: pageUrl,
  })

  if (error) {
    return { ok: false, message: 'Submission failed. Please try again in a moment.' }
  }

  return { ok: true, message: 'Thanks! We received your enquiry and will contact you soon.' }
}
