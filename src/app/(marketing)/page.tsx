// src/app/(marketing)/page.tsx
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { GlassCard } from "@/components/ui/GlassCard";
import { ButtonLink } from "@/components/ui/Button";
import { getCatalog } from "@/lib/catalog";

type Plan = {
  id: string;
  category: string;
  planName: string;
  dailyMenu: string;
  proteinPerDay: string;
  pricesInr: Record<string, number | undefined>;
};

function inr(n: number) {
  return `₹${n}`;
}

function bestPrice(plan: Plan) {
  return plan.pricesInr.monthly ?? plan.pricesInr["2_weeks"] ?? plan.pricesInr["1_week"] ?? plan.pricesInr["1_day"];
}

function priceSuffix(plan: Plan) {
  if (plan.pricesInr.monthly) return "/month";
  if (plan.pricesInr["2_weeks"]) return "/2 weeks";
  if (plan.pricesInr["1_week"]) return "/week";
  if (plan.pricesInr["1_day"]) return "/day";
  return "";
}

function planBadge(planId: string) {
  if (planId === "veg-premium") return { text: "Most Popular", cls: "bg-accent text-white" };
  if (planId === "nonveg-premium") return { text: "Highest Protein", cls: "bg-slate-900 text-white" };
  if (planId === "children") return { text: "Kids", cls: "bg-primary text-white" };
  return { text: "Daily", cls: "bg-primary/10 text-primary" };
}

function parseDailyMenuBullets(plan: Plan) {
  const s = (plan.dailyMenu || "").toLowerCase();

  const bullets: string[] = [];

  // Base bowl (your standard structure)
  if (s.includes("fruits") || s.includes("veg") || s.includes("protein")) {
    // try to extract grams in a readable way if present
    const grams = plan.dailyMenu.match(/(\d+\s?g)/gi);
    if (grams && grams.length >= 2) {
      bullets.push(`Balanced bowl: ${plan.dailyMenu}`);
    } else {
      bullets.push("Balanced bowl: fruits + vegetables + protein base");
    }
  } else {
    bullets.push("Balanced bowl built for a consistent morning routine");
  }

  // Differentiators
  if (s.includes("dry fruits") || s.includes("seeds")) bullets.push("Dry fruits + seeds for better satiety");
  if (s.includes("egg")) bullets.push("Protein boost with eggs");
  if (s.includes("chicken")) bullets.push("Protein boost with chicken (cooked)");

  // Always show protein/day from your catalog
  bullets.push(`Protein/day: ${plan.proteinPerDay}`);

  // Routine promises (home page, not full plan detail)
  bullets.push("Menu rotates daily (no decision fatigue)");
  bullets.push("Pause/cancel anytime");

  // Keep it tight on Home
  return bullets.slice(0, 5);
}

function CheckIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M16.25 5.5l-7.125 9L3.75 10.25"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function HomePage() {
  const { plans } = getCatalog() as { plans: Plan[] };

  const featuredId =
    plans.some((p) => p.id === "veg-premium") ? "veg-premium" :
    plans.some((p) => p.id === "nonveg-premium") ? "nonveg-premium" :
    plans[0]?.id;

  const featured = plans.find((p) => p.id === featuredId) ?? plans[0];
  const others = plans.filter((p) => p.id !== featured?.id);

  return (
    <div className="bg-premium">
      {/* HERO */}
      <Container>
        <div className="pt-10 sm:pt-14">
          <GlassCard className="overflow-hidden">
            <div className="grid items-stretch lg:grid-cols-2">
              <div className="p-8 sm:p-10">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-xs font-black text-slate-900 ring-1 ring-slate-900/10">
                  Bengaluru • Morning delivery • Subscription-first
                </div>

                <h1 className="mt-6 font-display text-4xl font-black leading-tight text-slate-900 sm:text-5xl">
                  Healthy breakfast,
                  <span className="text-primary"> done daily</span>.
                </h1>

                <p className="mt-4 max-w-xl text-lg leading-relaxed text-slate-600">
                  Rotating fruits + vegetables + protein base, packed fresh and delivered on schedule.
                  Pick a plan once, wake up to a routine.
                </p>

                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl bg-white/60 p-4 ring-1 ring-slate-900/10">
                    <div className="text-xs font-bold uppercase tracking-widest text-slate-500">Fresh prep</div>
                    <div className="mt-1 text-sm font-black text-slate-900">Daily rotation</div>
                  </div>
                  <div className="rounded-2xl bg-white/60 p-4 ring-1 ring-slate-900/10">
                    <div className="text-xs font-bold uppercase tracking-widest text-slate-500">Consistent</div>
                    <div className="mt-1 text-sm font-black text-slate-900">Routine-friendly</div>
                  </div>
                  <div className="rounded-2xl bg-white/60 p-4 ring-1 ring-slate-900/10">
                    <div className="text-xs font-bold uppercase tracking-widest text-slate-500">Upgrade</div>
                    <div className="mt-1 text-sm font-black text-slate-900">Add-ons anytime</div>
                  </div>
                </div>

                <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                  <ButtonLink href="/plans" variant="primary" className="w-full sm:w-auto">
                    View plans
                  </ButtonLink>
                  <ButtonLink href="/menu" variant="outline" className="w-full sm:w-auto">
                    See February menu
                  </ButtonLink>
                </div>

                <div className="mt-6 text-xs text-slate-500">
                  Home is for plan selection; details and full durations stay on Plans.
                </div>
              </div>

              <div className="relative min-h-[320px] bg-gradient-to-br from-emerald-50 to-orange-50 lg:min-h-[520px]">
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
          </GlassCard>
        </div>
      </Container>

      {/* TRUST STRIP */}
      <Container>
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {[
            { k: "Delivery", t: "Morning routine-ready", d: "Consistent timing that fits work and school." },
            { k: "Hygiene", t: "Clean packing", d: "Fresh prep, sealed packaging, reliable handling." },
            { k: "Rotation", t: "Menu changes daily", d: "Variety without decision fatigue." },
          ].map((x) => (
            <div key={x.k} className="rounded-3xl bg-white/70 p-6 ring-1 ring-slate-900/10 backdrop-blur-xl">
              <div className="text-xs font-bold uppercase tracking-widest text-slate-500">{x.k}</div>
              <div className="mt-1 text-lg font-black text-slate-900">{x.t}</div>
              <p className="mt-2 text-sm text-slate-600">{x.d}</p>
            </div>
          ))}
        </div>
      </Container>

      {/* UNIQUE FULL-BLEED PLAN PICKER */}
      <section className="relative mt-16 overflow-hidden">
        <div className="absolute inset-0 bg-[#06140e]" />
        <div className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-emerald-500/20 blur-[90px]" />
        <div className="absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-orange-500/18 blur-[90px]" />
        <div className="absolute -bottom-56 left-1/2 h-[680px] w-[680px] -translate-x-1/2 rounded-full bg-sky-400/12 blur-[110px]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_600px_at_50%_0%,rgba(255,255,255,0.08),transparent_60%)]" />
        <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:60px_60px]" />

        <Container className="relative py-16">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-black text-white ring-1 ring-white/10">
              Plan picker • Fast to decide
            </div>

            <h2 className="mt-6 font-display text-3xl font-black text-white sm:text-4xl">
              Pick your routine
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-white/70">
              Choose a plan in seconds. Compare durations and full breakdown on Plans.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-12">
            {/* Featured */}
            {featured && (
              <div className="lg:col-span-5">
                <div className="relative h-full overflow-hidden rounded-[32px] bg-gradient-to-b from-emerald-500/22 to-white/6 p-[1px]">
                  <div className="relative h-full rounded-[31px] bg-white/6 p-7 ring-1 ring-white/10 backdrop-blur-xl">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-xs font-bold uppercase tracking-widest text-white/60">
                          {featured.category}
                        </div>
                        <div className="mt-2 font-display text-2xl font-extrabold text-white">
                          {featured.planName}
                        </div>
                        <div className="mt-2 text-sm text-white/70">
                          Best starting point for most people: balanced + more satiety.
                        </div>
                      </div>

                      <div className="shrink-0 rounded-full bg-emerald-400/20 px-3 py-1 text-xs font-black text-emerald-200 ring-1 ring-emerald-300/20">
                        Recommended
                      </div>
                    </div>

                    <div className="mt-7 flex items-end justify-between gap-4">
                      <div>
                        <div className="text-xs font-bold uppercase tracking-widest text-white/60">From</div>
                        <div className="mt-2 flex items-end gap-2">
                          <div className="text-4xl font-black text-white">
                            {bestPrice(featured) ? inr(bestPrice(featured)!) : "—"}
                          </div>
                          <div className="pb-1 text-sm font-bold text-white/60">{priceSuffix(featured)}</div>
                        </div>
                      </div>

                      <a
                        href="/plans"
                        className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400 px-6 py-3 text-sm font-black text-[#06140e] shadow-[0_22px_60px_rgba(16,185,129,0.28)] transition hover:brightness-[1.02]"
                      >
                        Get started
                      </a>
                    </div>

                    <div className="mt-7 space-y-3">
                      {parseDailyMenuBullets(featured).map((h) => (
                        <div key={h} className="flex items-start gap-3 text-sm text-white/80">
                          <span className="mt-[2px] text-emerald-300">
                            <CheckIcon />
                          </span>
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-7 text-xs text-white/55">
                      Tip: Start here, switch later anytime.
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Others */}
            <div className="lg:col-span-7">
              <div className="grid gap-6 sm:grid-cols-2">
                {others.map((p) => {
                  const badge = planBadge(p.id);
                  const price = bestPrice(p);

                  return (
                    <div
                      key={p.id}
                      className="group h-full overflow-hidden rounded-[28px] bg-white/6 p-7 ring-1 ring-white/10 backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white/8"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="text-xs font-bold uppercase tracking-widest text-white/60">{p.category}</div>
                          <div className="mt-2 font-display text-xl font-extrabold text-white">{p.planName}</div>
                        </div>
                        <div className={`rounded-full px-3 py-1 text-xs font-black ${badge.cls}`}>
                          {badge.text}
                        </div>
                      </div>

                      <div className="mt-6 flex items-end justify-between gap-4">
                        <div>
                          <div className="text-xs font-bold uppercase tracking-widest text-white/60">From</div>
                          <div className="mt-2 flex items-end gap-2">
                            <div className="text-3xl font-black text-white">{price ? inr(price) : "—"}</div>
                            <div className="pb-1 text-xs font-bold text-white/55">{priceSuffix(p)}</div>
                          </div>
                        </div>

                        <a
                          href="/plans"
                          className="inline-flex items-center justify-center rounded-full bg-white/10 px-5 py-2.5 text-xs font-black text-white ring-1 ring-white/10 transition hover:bg-white/14"
                        >
                          Choose
                        </a>
                      </div>

                      <div className="mt-6 space-y-3">
                        {parseDailyMenuBullets(p).slice(0, 3).map((h) => (
                          <div key={h} className="flex items-start gap-3 text-sm text-white/75">
                            <span className="mt-[2px] text-emerald-300">
                              <CheckIcon className="h-5 w-5" />
                            </span>
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-xs text-white/55">See durations + full breakdown on Plans.</div>

                <div className="flex gap-3">
                  <a
                    href="/plans"
                    className="inline-flex items-center justify-center rounded-full bg-white/10 px-5 py-2.5 text-xs font-black text-white ring-1 ring-white/10 transition hover:bg-white/14"
                  >
                    Compare all plans →
                  </a>
                  <a
                    href="/login"
                    className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2.5 text-xs font-black text-[#06140e] transition hover:brightness-[0.98]"
                  >
                    Start subscription
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* HOW IT WORKS */}
      <Container>
        <div className="pt-16">
          <GlassCard className="p-8 sm:p-10">
            <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
              <div>
                <h2 className="font-display text-3xl font-black text-slate-900">How it works</h2>
                <p className="mt-3 text-sm text-slate-600">
                  Simple flow: pick plan → menu rotates → delivered fresh → upgrade with add-ons.
                </p>

                <div className="mt-8 grid gap-4">
                  {[
                    { t: "Pick a plan", d: "Choose Veg, Non‑veg, or Kids." },
                    { t: "Menu rotates", d: "Daily rotation of fruits + veg + protein base." },
                    { t: "Delivered fresh", d: "Packed clean and delivered in the morning." },
                    { t: "Upgrade anytime", d: "Add eggs, chicken, fruits, vegetables, or dry fruits." },
                  ].map((x) => (
                    <div key={x.t} className="rounded-2xl bg-white/60 p-5 ring-1 ring-slate-900/10">
                      <div className="text-sm font-black text-slate-900">{x.t}</div>
                      <div className="mt-1 text-sm text-slate-600">{x.d}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex gap-3">
                  <ButtonLink href="/menu" variant="outline">
                    See menu
                  </ButtonLink>
                  <ButtonLink href="/plans" variant="primary">
                    Start
                  </ButtonLink>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-emerald-50 to-orange-50 ring-1 ring-slate-900/10">
                <Image
                  src="/images/sections/how-it-works.jpg"
                  alt="Packaging and delivery"
                  width={1200}
                  height={900}
                  className="h-auto w-full object-cover"
                />
              </div>
            </div>
          </GlassCard>
        </div>
      </Container>

      {/* TESTIMONIALS */}
      <Container>
        <div className="mt-16 text-center">
          <h2 className="font-display text-3xl font-black text-slate-900">People love the routine</h2>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            { name: "Regular customer", text: "Fresh, clean and consistent. Finally a breakfast routine I stick to." },
            { name: "Working professional", text: "Saves time every morning and still feels premium." },
            { name: "Fitness focused", text: "Non‑veg premium is a game changer for protein." },
          ].map((t) => (
            <div key={t.name} className="rounded-3xl bg-white/70 p-7 ring-1 ring-slate-900/10 backdrop-blur-xl">
              <div className="text-sm font-black text-slate-900">{t.name}</div>
              <p className="mt-3 text-sm text-slate-600">“{t.text}”</p>
            </div>
          ))}
        </div>
      </Container>

      <div className="h-16" />
    </div>
  );
}
