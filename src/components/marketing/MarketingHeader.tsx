// src/components/marketing/MarketingHeader.tsx
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";

const nav = [
  { href: "/plans", label: "Plans" },
  { href: "/menu", label: "Menu" },
  { href: "/how-it-works", label: "How it works" },
  // { href: "/areas", label: "Areas" },
];

export function MarketingHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/40 bg-white/60 backdrop-blur-xl">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            {/* Logo mark */}
            <div className="relative h-10 w-18">
              <Image
                src="/images/brand/logo.png"
                alt="Morning Nutriz"
                fill
                sizes="40x"
                className="object-contain p-1"
                priority
              />
            </div>

            <div className="leading-tight">
              <div className="text-xl font-extrabold tracking-tight text-emerald-950">
                Morning Nutriz
              </div>

              {/* <div className="text-[11px] font-bold text-slate-500">
                Bengaluru · Healthy mornings
              </div> */}
            </div>
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            {nav.map((x) => (
              <Link
                key={x.href}
                href={x.href}
                className="text-sm font-bold text-slate-700 hover:text-slate-900"
              >
                {x.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ButtonLink
              href="/login"
              variant="outline"
              className="hidden sm:inline-flex"
            >
              Login
            </ButtonLink>
            {/* <ButtonLink href="/plans" variant="primary">
              Start
            </ButtonLink> */}
          </div>
        </div>
      </Container>
    </header>
  );
}
