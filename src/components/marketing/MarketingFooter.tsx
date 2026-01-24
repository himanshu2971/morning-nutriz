// src/components/marketing/MarketingFooter.tsx
import Link from "next/link";
import { Container } from "@/components/ui/Container";

export function MarketingFooter() {
  return (
    <footer className="mt-16 border-t border-white/40 bg-white/50 backdrop-blur-xl">
      <Container>
        <div className="grid gap-8 py-10 md:grid-cols-3">
          <div>
            <div className="text-sm font-black text-slate-900">Morning Nutriz</div>
            <p className="mt-2 text-sm text-slate-600">
              Fresh breakfast subscription with rotating fruit + veg + protein base.
            </p>
          </div>

          <div className="text-sm">
            <div className="font-black text-slate-900">Pages</div>
            <div className="mt-3 grid gap-2 text-slate-600">
              <Link href="/plans" className="hover:text-slate-900">
                Plans
              </Link>
              <Link href="/menu" className="hover:text-slate-900">
                Menu
              </Link>
              <Link href="/areas" className="hover:text-slate-900">
                Delivery areas
              </Link>
              <Link href="/faq" className="hover:text-slate-900">
                FAQ
              </Link>
            </div>
          </div>

          <div className="text-sm">
            <div className="font-black text-slate-900">Contact</div>
            <div className="mt-3 grid gap-2 text-slate-600">
              <div>Bengaluru, India</div>
              <div>Support: support@morningnutriz.com</div>
              <div>WhatsApp: +91-9113276708</div>
            </div>
          </div>
        </div>

        {/* Bottom row: Left | Center | Right */}
        <div className="flex flex-col gap-3 border-t border-white/40 py-6 text-xs text-slate-500 sm:flex-row sm:items-center">
          {/* Left */}
          <div className="sm:w-auto">© {new Date().getFullYear()} Morning Nutriz</div>

          {/* Center */}
          <div className="flex sm:flex-1 sm:justify-center">
            <div className="text-center">
              Managed by{" "}
              <a
                href="https://sejalengitech.in"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-slate-700 underline decoration-slate-300 underline-offset-4 hover:text-slate-900"
              >
                Sejal Engitech Pvt Ltd
              </a>
            </div>
          </div>

          {/* Right */}
          <div className="flex gap-3 sm:justify-end">
            <Link href="/privacy" className="hover:text-slate-900">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-slate-900">
              Terms
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
