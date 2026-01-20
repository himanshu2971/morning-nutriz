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
              <Link href="/plans" className="hover:text-slate-900">Plans</Link>
              <Link href="/menu" className="hover:text-slate-900">Menu</Link>
              <Link href="/areas" className="hover:text-slate-900">Delivery areas</Link>
              <Link href="/faq" className="hover:text-slate-900">FAQ</Link>
            </div>
          </div>

          <div className="text-sm">
            <div className="font-black text-slate-900">Contact</div>
            <div className="mt-3 grid gap-2 text-slate-600">
              <div>Bengaluru, India</div>
              <div>Support: support@morningnutriz.com</div>
              <div>WhatsApp: +91-XXXXXXXXXX</div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-white/40 py-6 text-xs text-slate-500">
          <div>© {new Date().getFullYear()} Morning Nutriz</div>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-slate-900">Privacy</Link>
            <Link href="/terms" className="hover:text-slate-900">Terms</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
