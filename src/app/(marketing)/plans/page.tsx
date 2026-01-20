// src/app/(marketing)/plans/page.tsx
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { GlassCard } from "@/components/ui/GlassCard";
import { ButtonLink } from "@/components/ui/Button";
import { getCatalog, type PlanDurationKey } from "@/lib/catalog";

const ORDER: PlanDurationKey[] = ["1_day", "2_days", "3_days", "1_week", "2_weeks", "monthly"];

const LABELS: Record<PlanDurationKey, string> = {
  "1_day": "1 Day",
  "2_days": "2 Days",
  "3_days": "3 Days",
  "1_week": "1 Week",
  "2_weeks": "2 Weeks",
  "monthly": "Monthly",
};

function inr(n: number) {
  return `₹${n}`;
}

function planBadge(planId: string) {
  if (planId === "veg-premium") return { text: "Most Popular", cls: "bg-accent text-white" };
  if (planId === "nonveg-premium") return { text: "High Protein", cls: "bg-slate-900 text-white" };
  if (planId === "children") return { text: "Kids", cls: "bg-primary text-white" };
  return { text: "Daily", cls: "bg-primary/10 text-primary" };
}

function heroForPlans() {
  // Optional (create later). If not available, keep the existing hero.
  return "/images/hero/plans-hero.jpg";
}

export default function PlansPage() {
  const { plans, addons } = getCatalog();

  return (
    <div className="bg-premium">
      <Container>
        {/* HERO */}
        <div className="pt-10 sm:pt-14">
          <GlassCard className="overflow-hidden">
            <div className="grid items-stretch lg:grid-cols-2">
              <div className="p-8 sm:p-10">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-xs font-black text-slate-900 ring-1 ring-slate-900/10">
                  Plans • Pricing • Add-ons
                </div>

                <h1 className="mt-6 font-display text-4xl font-black leading-tight text-slate-900 sm:text-5xl">
                  Choose a plan that
                  <span className="text-primary"> fits your routine</span>.
                </h1>

                <p className="mt-4 max-w-xl text-lg leading-relaxed text-slate-600">
                  Pick Veg / Non‑Veg / Kids. Menu rotates daily. Upgrade anytime with add-ons.
                </p>

                <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                  <ButtonLink href="/login" variant="primary" className="w-full sm:w-auto">
                    Start subscription
                  </ButtonLink>
                  <ButtonLink href="/menu" variant="outline" className="w-full sm:w-auto">
                    See February rotation
                  </ButtonLink>
                </div>

                <div className="mt-6 text-xs text-slate-500">
                  All prices and plan compositions are driven from your catalog data.
                </div>
              </div>

              <div className="relative min-h-[300px] bg-gradient-to-br from-emerald-50 to-orange-50 lg:min-h-[460px]">
                <Image
                  src={heroForPlans()}
                  alt="Plans hero"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-black/25 via-black/0 to-black/0" />
              </div>
            </div>
          </GlassCard>
        </div>

        {/* PLAN GRID */}
        <div className="mt-14 text-center">
          <h2 className="font-display text-3xl font-black text-slate-900 sm:text-4xl">
            Plans
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600">
            Shop-grade cards with consistent alignment and clear pricing.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((p) => {
            const badge = planBadge(p.id);
            const featured = p.pricesInr.monthly ?? p.pricesInr["1_week"] ?? p.pricesInr["1_day"];

            return (
              <div
                key={p.id}
                className="group flex h-full flex-col overflow-hidden rounded-[28px] bg-white/70 ring-1 ring-slate-900/10 backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-[0_26px_70px_rgba(2,6,23,0.14)]"
              >
                {/* Image */}
                <div className="relative h-44 bg-gradient-to-br from-emerald-50 to-orange-50">
                  <Image
                    src={`/images/plans/${p.id}.jpg`}
                    alt={`${p.planName} bowl`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover transition duration-300 group-hover:scale-[1.02]"
                  />
                  <div className="absolute left-4 top-4">
                    <div className={`rounded-full px-3 py-1 text-xs font-black ${badge.cls}`}>
                      {badge.text}
                    </div>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-7">
                  <div className="text-xs font-bold uppercase tracking-widest text-slate-500">
                    {p.category}
                  </div>
                  <div className="mt-2 font-display text-2xl font-extrabold text-slate-900">
                    {p.planName}
                  </div>

                  <div className="mt-3 text-sm leading-relaxed text-slate-600">{p.dailyMenu}</div>

                  <div className="mt-4 text-sm">
                    <span className="font-semibold text-slate-900">Protein/day:</span>{" "}
                    <span className="text-slate-600">{p.proteinPerDay}</span>
                  </div>

                  {/* Featured price */}
                  <div className="mt-6 rounded-2xl bg-white/60 p-5 ring-1 ring-slate-900/10">
                    <div className="text-xs font-bold uppercase tracking-widest text-slate-500">
                      Best pick
                    </div>
                    <div className="mt-2 flex items-baseline justify-between">
                      <div className="text-sm font-bold text-slate-700">Monthly / Weekly</div>
                      <div className="text-3xl font-black text-slate-900">
                        {featured ? inr(featured) : "—"}
                      </div>
                    </div>
                    <div className="mt-2 text-xs text-slate-500">
                      Full pricing below.
                    </div>
                  </div>

                  {/* Full pricing */}
                  <div className="mt-6 overflow-hidden rounded-2xl bg-white/60 ring-1 ring-slate-900/10">
                    <div className="border-b border-slate-900/10 px-5 py-3 text-sm font-black text-slate-900">
                      Full pricing
                    </div>
                    <div className="divide-y divide-slate-900/10">
                      {ORDER.map((k) => {
                        const price = p.pricesInr[k];
                        return (
                          <div key={k} className="flex items-center justify-between px-5 py-3 text-sm">
                            <span className="text-slate-600">{LABELS[k]}</span>
                            <span className="font-black text-slate-900">{price ? inr(price) : "—"}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* CTA pinned */}
                  <div className="mt-auto pt-6">
                    <ButtonLink href="/login" variant="primary" className="w-full">
                      Start this plan
                    </ButtonLink>
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
        <div className="mt-16">
          <GlassCard className="p-8 sm:p-10">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="font-display text-3xl font-black text-slate-900">Add-ons</h2>
                <p className="mt-2 max-w-2xl text-sm text-slate-600">
                  Boost protein or volume without changing your base plan.
                </p>
              </div>
              <ButtonLink href="/login" variant="dark">
                Add to order →
              </ButtonLink>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {addons.map((a) => (
                <div
                  key={a.id}
                  className="flex h-full flex-col rounded-3xl bg-white/60 p-6 ring-1 ring-slate-900/10"
                >
                  <div className="inline-flex w-fit rounded-full bg-slate-900 px-3 py-1 text-xs font-black text-white">
                    {a.portion}
                  </div>
                  <div className="mt-3 text-lg font-black text-slate-900">{a.name}</div>
                  <div className="mt-4 text-3xl font-black text-slate-900">{inr(a.priceInr)}</div>

                  <div className="mt-auto pt-6">
                    <ButtonLink href="/login" variant="primary" className="w-full">
                      Add-on
                    </ButtonLink>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        <div className="h-16" />
      </Container>
    </div>
  );
}
