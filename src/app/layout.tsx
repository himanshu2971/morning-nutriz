// src/app/layout.tsx (logo now clickable)
import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Morning Nutriz | Healthy Breakfast Subscriptions in Bangalore",
  description:
    "Premium, subscription-first healthy breakfast delivered fresh every morning in Bangalore. Calm, reliable mornings with complete control over your plan.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-cream text-slate-900 antialiased font-sans">
        <div className="flex min-h-screen flex-col">
          {/* Top navigation */}
          <header className="border-b border-slate-200/60 bg-white/80 backdrop-blur-md">
            <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
              {/* Logo - CLICKABLE to home */}
              <a href="/" className="flex items-center gap-2 hover:opacity-80">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary font-display">
                  MN
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold tracking-tight font-display">
                    Morning Nutriz
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Bangalore · Healthy mornings
                  </span>
                </div>
              </a>

              <div className="hidden items-center gap-6 text-sm font-medium text-slate-700 sm:flex">
                <a href="/menu" className="hover:text-slate-900">
                  Menu
                </a>
                <a href="/plans" className="hover:text-slate-900">
                  Plans
                </a>
                <a href="/how-it-works" className="hover:text-slate-900">
                  How it works
                </a>
                <a href="/areas" className="hover:text-slate-900">
                  Areas we serve
                </a>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href="/login"
                  className="text-xs font-medium text-slate-700 hover:text-slate-900 sm:text-sm"
                >
                  Sign in
                </a>
                <a
                  href="/plans"
                  className="rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-primary/90 sm:px-4 sm:py-2 sm:text-sm"
                >
                  Start subscription
                </a>
              </div>
            </nav>
          </header>

          {/* Page content */}
          <main className="flex-1">
            {children}
          </main>

          {/* Footer */}
          <footer className="border-t border-slate-200/60 bg-white/80">
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
              <span>© {new Date().getFullYear()} Morning Nutriz, Bangalore</span>
              <div className="flex flex-wrap items-center gap-4">
                <span>Healthy · Fresh · Subscription-first</span>
                <span className="hidden h-1 w-1 rounded-full bg-slate-300 sm:inline-block" />
                <a href="/privacy" className="hover:text-slate-700">
                  Privacy
                </a>
                <a href="/terms" className="hover:text-slate-700">
                  Terms
                </a>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
