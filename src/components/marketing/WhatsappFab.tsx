'use client'

import Link from 'next/link'

type Props = {
  phoneE164: string
  defaultText?: string
}

function buildWaMeUrl(phoneE164: string, defaultText?: string) {
  // WhatsApp requires international format digits only (no +, no spaces/dashes). [web:146]
  const digitsOnly = phoneE164.replace(/[^\d]/g, '')
  const base = `https://wa.me/919113276708`
  if (!defaultText) return base
  return `${base}?text=${encodeURIComponent(defaultText)}`
}

export default function WhatsappFab({ phoneE164, defaultText }: Props) {
  const href = buildWaMeUrl(phoneE164, defaultText)

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className={[
        'fixed bottom-5 right-5 z-50',
        'inline-flex items-center gap-3 rounded-full',
        'bg-emerald-500 text-black',
        'px-4 py-3 shadow-[0_20px_60px_rgba(16,185,129,0.35)]',
        'ring-1 ring-white/15 backdrop-blur',
        'transition hover:brightness-[1.02] active:brightness-[0.98]',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300',
      ].join(' ')}
    >
      <span
        className="grid h-9 w-9 place-items-center rounded-full bg-black/10 ring-1 ring-black/10"
        aria-hidden="true"
      >
        {/* Lightweight inline SVG icon (no extra deps) */}
        <svg viewBox="0 0 32 32" className="h-5 w-5" fill="currentColor">
          <path d="M19.11 17.57c-.29-.15-1.7-.84-1.96-.94-.26-.1-.45-.15-.64.15-.19.29-.74.94-.91 1.13-.17.19-.34.22-.63.08-.29-.15-1.23-.45-2.34-1.44-.86-.76-1.44-1.7-1.61-1.99-.17-.29-.02-.45.13-.6.13-.13.29-.34.43-.51.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.51-.07-.15-.64-1.54-.88-2.11-.23-.55-.47-.47-.64-.48h-.55c-.19 0-.51.07-.78.36-.26.29-1.02.99-1.02 2.42 0 1.43 1.04 2.81 1.18 3 .15.19 2.05 3.13 4.97 4.38.69.3 1.24.48 1.66.61.7.22 1.34.19 1.84.12.56-.08 1.7-.69 1.94-1.36.24-.67.24-1.24.17-1.36-.07-.12-.26-.19-.55-.34z" />
          <path d="M16.02 3.2c-6.97 0-12.64 5.67-12.64 12.64 0 2.23.59 4.41 1.71 6.33L3.2 28.8l6.82-1.79c1.85 1.01 3.94 1.54 6.08 1.54h.01c6.97 0 12.64-5.67 12.64-12.64S22.99 3.2 16.02 3.2zm0 22.97h-.01c-1.95 0-3.86-.52-5.52-1.51l-.4-.24-4.05 1.06 1.08-3.95-.26-.41a10.57 10.57 0 0 1-1.62-5.62c0-5.83 4.75-10.58 10.59-10.58 5.83 0 10.58 4.75 10.58 10.58 0 5.83-4.75 10.58-10.58 10.58z" />
        </svg>
      </span>

      {/* <span className="text-sm font-black tracking-tight text-[#06140e]">
        WhatsApp
      </span> */}
    </Link>
  )
}
