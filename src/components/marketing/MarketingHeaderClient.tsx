// src/components/marketing/MarketingHeaderClient.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";
import SignOutButton from "@/components/auth/SignOutButton";

const nav = [
  { href: "/plans", label: "Plans" },
  { href: "/menu", label: "Menu" },
  { href: "/how-it-works", label: "How it works" },
];

export function MarketingHeaderClient({ signedIn }: { signedIn: boolean }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40">
      <Container>
        <div className="pt-4">
          <div className="rounded-[28px] border border-black/10 bg-white/85 px-4 backdrop-blur-xl shadow-[0_18px_60px_rgba(0,0,0,0.10)]">
            <div className="flex h-16 items-center justify-between">
              <Link href="/" className="flex items-center gap-3">
                <Image
                  src="/images/brand/Logo.jpg"
                  alt="Morning Nutriz"
                  width={40}
                  height={40}
                  className="rounded-xl ring-1 ring-black/10 object-cover"
                  priority
                />
                <div className="text-lg font-extrabold tracking-tight text-slate-900 sm:text-xl">
                  Morning Nutriz
                </div>
              </Link>

              <nav className="hidden items-center gap-8 md:flex">
                {nav.map((x) => (
                  <Link
                    key={x.href}
                    href={x.href}
                    className="text-sm font-bold text-slate-700 hover:text-slate-900 transition"
                  >
                    {x.label}
                  </Link>
                ))}
              </nav>

              <div className="flex items-center gap-2">
                <SignOutButton signedIn={signedIn} className="hidden sm:inline-flex" variant="outline" />

                <button
                  type="button"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl ring-1 ring-black/10 bg-white/70 text-slate-900 md:hidden"
                  aria-label="Open menu"
                  aria-expanded={open}
                  onClick={() => setOpen((v) => !v)}
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                    {open ? (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    )}
                  </svg>
                </button>
              </div>
            </div>

            {open ? (
              <div className="md:hidden pb-4">
                <div className="mt-2 rounded-2xl border border-black/10 bg-white/80 p-3">
                  <div className="flex flex-col">
                    {nav.map((x) => (
                      <Link
                        key={x.href}
                        href={x.href}
                        className="rounded-xl px-3 py-2 text-sm font-bold text-slate-800 hover:bg-black/5"
                        onClick={() => setOpen(false)}
                      >
                        {x.label}
                      </Link>
                    ))}

                    <div className="mt-3">
                      <SignOutButton signedIn={signedIn} className="w-full" variant="dark" />
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </Container>
    </header>
  );
}
