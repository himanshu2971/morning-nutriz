// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable}`}>
      <body className="min-h-dvh bg-premium text-slate-900 antialiased font-sans">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
