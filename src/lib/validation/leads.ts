export const PLAN_OPTIONS = [
  'veg-normal',
  'veg-premium',
  'nonveg-normal',
  'nonveg-premium',
  'children',
] as const

export type PlanInterested = (typeof PLAN_OPTIONS)[number]

export type LeadInput = {
  name: string
  phone: string
  email: string
  areaPincode: string
  planInterested: PlanInterested
}

export function normalizeLeadInput(raw: FormData): LeadInput {
  const name = String(raw.get('name') ?? '').trim()
  const phone = String(raw.get('phone') ?? '').trim()
  const email = String(raw.get('email') ?? '').trim().toLowerCase()
  const areaPincode = String(raw.get('areaPincode') ?? '').trim()
  const planInterested = String(raw.get('planInterested') ?? '').trim() as PlanInterested

  return { name, phone, email, areaPincode, planInterested }
}

export function validateLeadInput(input: LeadInput): string[] {
  const errors: string[] = []

  if (input.name.length < 2 || input.name.length > 120) errors.push('Name must be 2–120 characters.')
  if (input.phone.length < 8 || input.phone.length > 20) errors.push('Phone must be 8–20 characters.')
  if (!input.email.includes('@') || input.email.length > 254) errors.push('Email must be valid.')
  if (input.areaPincode.length < 2 || input.areaPincode.length > 30) errors.push('Area/Pincode must be 2–30 characters.')
  if (!PLAN_OPTIONS.includes(input.planInterested)) errors.push('Plan selection is invalid.')

  return errors
}
