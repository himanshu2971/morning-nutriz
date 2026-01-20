// src/app/(marketing)/plans/page.tsx
import Image from "next/image";
import { getCatalog, type PlanDurationKey } from "@/lib/catalog";

const ORDER: PlanDurationKey[] = [
  "1_day",
  "2_days",
  "3_days",
  "1_week",
  "2_weeks",
  "monthly",
];

const LABELS: Record<PlanDurationKey, string> = {
  "1_day": "1 Day",
  "2_days": "2 Days",
  "3_days": "3 Days",
  "1_week": "1 Week",
  "2_weeks": "2 Weeks",
  monthly: "Monthly",
};

function inr(n: number) {
  return `₹${n}`;
}

function planImageSrc(planId: string) {
  // Put images here (public/...)
  // Example file: public/images/plans/veg-normal.jpg -> /images/plans/veg-normal.jpg
  return `/images/plans/${planId}.jpg`;
}

function planTone(planId: string) {
  if (planId === "veg-premium" || planId === "nonveg-premium") return "premium";
  if (planId === "veg-normal" || planId === "nonveg-normal") return "core";
  return "neutral";
}

function planBadgeText(planId: string) {
  if (planId === "veg-premium") return "Most Popular";
  if (planId === "nonveg-premium") return "High Protein";
  if (planId === "children") return "Kids Friendly";
  return "Daily Essential";
}

export default function PlansPage() {
  const { plans, addons } = getCatalog();

  return (
    <div className="relative overflow-hidden">
      {/* Premium background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-emerald-200/30 blur-3xl" />
        <div className="absolute -top-24 -left-24 h-[420px] w-[420px] rounded-full bg-orange-200/35 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-[560px] w-[560px] rounded-full bg-sky-200/30 blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-slate-50" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(15,23,42,0.06)_1px,transparent_0)] [background-size:22px_22px] opacity-50" />
      </div>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        {/* HERO */}
        <div className="overflow-hidden rounded-[28px] border border-white/60 bg-white/70 shadow-[0_20px_60px_rgba(2,6,23,0.12)] backdrop-blur-xl">
          <div className="grid items-stretch gap-0 lg:grid-cols-2">
            <div className="p-8 sm:p-10">
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-xs font-black uppercase tracking-widest text-white">
                Morning delivery • Bengaluru
              </div>

              <h1 className="mt-5 font-display text-4xl font-black leading-tight text-slate-900 sm:text-5xl">
                Plans designed for consistency, not crash dieting.
              </h1>

              <p className="mt-4 max-w-xl text-lg leading-relaxed text-slate-600">
                Pick your plan. The menu rotates daily (fruits + vegetables +
                protein base), and you can upgrade anytime with add-ons.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <span className="rounded-full bg-primary/10 px-4 py-2 text-sm font-black text-primary">
                  Fresh prep
                </span>
                <span className="rounded-full bg-primary/10 px-4 py-2 text-sm font-black text-primary">
                  Balanced macros
                </span>
                <span className="rounded-full bg-primary/10 px-4 py-2 text-sm font-black text-primary">
                  Subscription pricing
                </span>
              </div>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <a
                  href="/menu"
                  className="inline-flex justify-center rounded-2xl bg-slate-900 px-7 py-4 text-sm font-black text-white transition hover:bg-slate-800"
                >
                  See February rotation
                </a>
                <a
                  href="/login"
                  className="inline-flex justify-center rounded-2xl bg-primary px-7 py-4 text-sm font-black text-white transition hover:bg-primary-dark"
                >
                  Start subscription
                </a>
              </div>
            </div>

            <div className="relative min-h-[260px] bg-gradient-to-br from-emerald-50 to-orange-50 lg:min-h-[440px]">
              <Image
                src="/images/hero/morning-nutriz-hero.jpg"
                alt="Morning Nutriz hero breakfast bowl"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-black/25 via-black/0 to-black/0" />
            </div>
          </div>
        </div>

        {/* PLANS */}
        <div className="mt-14 text-center">
          <h2 className="font-display text-3xl font-black text-slate-900 sm:text-4xl">
            Choose your plan
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600">
            Cards stay perfectly aligned even when content differs.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((p) => {
            const tone = planTone(p.id);

            const ring =
              tone === "premium"
                ? "ring-2 ring-accent/50"
                : tone === "core"
                  ? "ring-1 ring-primary/30"
                  : "ring-1 ring-slate-200/70";

            const badge =
              tone === "premium"
                ? "bg-accent text-white"
                : tone === "core"
                  ? "bg-primary text-white"
                  : "bg-slate-900 text-white";

            const cta =
              tone === "premium"
                ? "bg-accent hover:bg-accent-dark"
                : tone === "core"
                  ? "bg-primary hover:bg-primary-dark"
                  : "bg-slate-900 hover:bg-slate-800";

            const featuredPrice = p.pricesInr.monthly ?? p.pricesInr["1_week"];

            return (
              <div
                key={p.id}
                className={`group flex h-full flex-col overflow-hidden rounded-[28px] border border-white/60 bg-white/80 shadow-[0_18px_50px_rgba(2,6,23,0.10)] backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-[0_26px_70px_rgba(2,6,23,0.14)] ${ring}`}
              >
                {/* Image */}
                <div className="relative h-44 w-full bg-gradient-to-br from-emerald-50 to-orange-50">
                  <Image
                    src={planImageSrc(p.id)}
                    alt={`${p.planName} bowl`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover transition duration-300 group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/0 to-black/0" />
                  <div className="absolute left-4 top-4">
                    <div
                      className={`rounded-full px-3 py-1 text-xs font-black ${badge}`}
                    >
                      {planBadgeText(p.id)}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-7">
                  <div className="text-xs font-bold uppercase tracking-widest text-slate-500">
                    {p.category}
                  </div>

                  <div className="mt-2 font-display text-2xl font-extrabold text-slate-900">
                    {p.planName}
                  </div>

                  <div className="mt-3 text-sm leading-relaxed text-slate-600">
                    {p.dailyMenu}
                  </div>

                  <div className="mt-3 text-sm">
                    <span className="font-semibold text-slate-900">
                      Protein/day:
                    </span>{" "}
                    <span className="text-slate-600">{p.proteinPerDay}</span>
                  </div>

                  {/* Featured price */}
                  <div className="mt-6 rounded-2xl border border-slate-200/70 bg-white/60 px-5 py-4">
                    <div className="text-xs font-bold uppercase tracking-widest text-slate-500">
                      Best pick
                    </div>
                    <div className="mt-2 flex items-baseline justify-between">
                      <div className="text-sm font-bold text-slate-700">
                        Monthly / Weekly
                      </div>
                      <div className="text-3xl font-black text-slate-900">
                        {featuredPrice ? inr(featuredPrice) : "—"}
                      </div>
                    </div>
                  </div>

                  {/* Pricing list */}
                  <div className="mt-6 rounded-2xl border border-slate-200/70 bg-white/60">
                    <div className="border-b border-slate-200/70 px-5 py-3 text-sm font-black text-slate-900">
                      Full pricing
                    </div>

                    <div className="divide-y divide-slate-200/60">
                      {ORDER.map((k) => {
                        const price = p.pricesInr[k];
                        return (
                          <div
                            key={k}
                            className="flex items-center justify-between px-5 py-3 text-sm"
                          >
                            <span className="text-slate-600">{LABELS[k]}</span>
                            <span className="font-black text-slate-900">
                              {price ? inr(price) : "—"}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* CTA pinned */}
                  <div className="mt-auto pt-6">
                    <a
                      href="/login"
                      className={`block w-full rounded-2xl px-6 py-4 text-center text-sm font-black text-white transition ${cta}`}
                    >
                      Start this plan
                    </a>
                    <div className="mt-3 text-center text-xs text-slate-500">
                      Cancel anytime • Upgrade with add-ons
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ADD-ONS */}
        <div className="mt-16 overflow-hidden rounded-[28px] border border-white/60 bg-white/70 shadow-[0_18px_50px_rgba(2,6,23,0.10)] backdrop-blur-xl">
          <div className="p-8 sm:p-10">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="font-display text-3xl font-black text-slate-900">
                  Add-ons
                </h2>
                <p className="mt-2 max-w-2xl text-sm text-slate-600">
                  Increase protein or volume without changing your base plan.
                </p>
              </div>
              <a
                href="/login"
                className="inline-flex justify-center rounded-2xl bg-slate-900 px-6 py-3 text-xs font-black text-white transition hover:bg-slate-800"
              >
                Add to order →
              </a>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {addons.map((a) => (
                <div
                  key={a.id}
                  className="flex h-full flex-col rounded-3xl border border-slate-200/70 bg-white/60 p-6"
                >
                  <div className="inline-flex w-fit rounded-full bg-slate-900 px-3 py-1 text-xs font-black text-white">
                    {a.portion}
                  </div>
                  <div className="mt-3 text-lg font-black text-slate-900">
                    {a.name}
                  </div>
                  <div className="mt-4 text-3xl font-black text-slate-900">
                    {inr(a.priceInr)}
                  </div>

                  <div className="mt-auto pt-6">
                    <a
                      href="/login"
                      className="block w-full rounded-2xl bg-primary px-6 py-3 text-center text-xs font-black text-white transition hover:bg-primary-dark"
                    >
                      Add-on
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center text-xs text-slate-500">
              You can add “Juices (coming soon)” later as a new add-on category.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
