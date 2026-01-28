// src/components/marketing/MarketingHeader.tsx
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";

const nav = [
  { href: "/plans", label: "Plans" },
  { href: "/menu", label: "Menu" },
  { href: "/how-it-works", label: "How it works" },
];

export function MarketingHeader() {
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
                  width={48}
                  height={48}
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
                <ButtonLink href="/login" variant="outline" className="hidden sm:inline-flex">
                  Login
                </ButtonLink>

                
              </div>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
}
