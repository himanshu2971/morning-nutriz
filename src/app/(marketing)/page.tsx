// src/app/(marketing)/page.tsx
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { GlassCard } from "@/components/ui/GlassCard";
import { ButtonLink } from "@/components/ui/Button";
import { getCatalog } from "@/lib/catalog";
import LeadEnquiryForm from "@/components/home/LeadEnquiryForm";

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
  return (
    plan.pricesInr.monthly ??
    plan.pricesInr["2_weeks"] ??
    plan.pricesInr["1_week"] ??
    plan.pricesInr["1_day"]
  );
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

  bullets.push(plan.dailyMenu ? `Daily bowl: ${plan.dailyMenu}` : "Daily bowl: fruits + vegetables + protein base");

  if (s.includes("dry fruits") || s.includes("seeds")) bullets.push("Dry fruits + seeds for better satiety");
  if (s.includes("egg")) bullets.push("Protein boost with eggs");
  if (s.includes("chicken")) bullets.push("Protein boost with chicken (cooked)");

  bullets.push(`Protein/day: ${plan.proteinPerDay}`);
  bullets.push("Menu rotates daily (no decision fatigue)");
  bullets.push("Pause/cancel anytime");

  return bullets.slice(0, 5);
}

function maxProtein(plans: Plan[]) {
  let best = { value: 0, label: "" };
  for (const p of plans) {
    const nums = (p.proteinPerDay.match(/\d+/g) || [])
      .map((x) => Number(x))
      .filter((n) => !Number.isNaN(n));
    const max = nums.length ? Math.max(...nums) : 0;
    if (max > best.value) best = { value: max, label: p.planName };
  }
  return best;
}

function minMonthly(plans: Plan[]) {
  let best: { value: number; label: string } | null = null;
  for (const p of plans) {
    const m = p.pricesInr.monthly;
    if (!m) continue;
    if (!best || m < best.value) best = { value: m, label: p.planName };
  }
  return best;
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
    plans.some((p) => p.id === "veg-premium")
      ? "veg-premium"
      : plans.some((p) => p.id === "nonveg-premium")
        ? "nonveg-premium"
        : plans[0]?.id;

  const featured = plans.find((p) => p.id === featuredId) ?? plans[0];
  const others = plans.filter((p) => p.id !== featured?.id);

  const maxP = maxProtein(plans);
  const minM = minMonthly(plans);

  return (
    <div className="bg-premium">
      {/* FULL-BLEED HERO (no GlassCard box) */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/hero/morning-nutriz-hero.jpg"
            alt="Morning Nutriz hero breakfast bowl"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-black/10" />
          <div className="absolute inset-0 bg-[radial-gradient(900px_600px_at_20%_20%,rgba(16,185,129,0.25),transparent_60%)]" />
        </div>

        {/* Keep content centered with wide max width */}
        <Container fluid className="relative">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 py-16 sm:py-20 lg:py-24">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-black text-white ring-1 ring-white/15 backdrop-blur-xl">
                  Bengaluru • Morning delivery • Subscription-first
                </div>

                <h1 className="mt-6 font-display text-4xl font-black leading-tight text-white sm:text-5xl">
                  The breakfast routine that
                  <span className="text-emerald-300"> stays consistent</span>.
                </h1>

                <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/75">
                  Fresh bowl. Rotating menu. Protein that scales from kids to high-performance.
                  Pick once and forget the daily decision.
                </p>

                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <ButtonLink href="/plans" variant="primary" className="w-full sm:w-auto">
                    Choose a plan
                  </ButtonLink>
                  <ButtonLink href="/menu" variant="outline" className="w-full sm:w-auto">
                    See February rotation
                  </ButtonLink>
                </div>

                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl bg-white/10 p-4 ring-1 ring-white/10 backdrop-blur-xl">
                    <div className="text-xs font-bold uppercase tracking-widest text-white/60">Rotation</div>
                    <div className="mt-1 text-sm font-black text-white">Daily variety</div>
                  </div>
                  <div className="rounded-2xl bg-white/10 p-4 ring-1 ring-white/10 backdrop-blur-xl">
                    <div className="text-xs font-bold uppercase tracking-widest text-white/60">Protein</div>
                    <div className="mt-1 text-sm font-black text-white">Veg → Chicken</div>
                  </div>
                  <div className="rounded-2xl bg-white/10 p-4 ring-1 ring-white/10 backdrop-blur-xl">
                    <div className="text-xs font-bold uppercase tracking-widest text-white/60">Control</div>
                    <div className="mt-1 text-sm font-black text-white">Pause anytime</div>
                  </div>
                </div>
              </div>

              {/* Floating CTA card */}
              <div className="lg:col-span-5">
                <div className="rounded-[32px] bg-white/10 p-7 ring-1 ring-white/15 backdrop-blur-xl shadow-[0_28px_90px_rgba(0,0,0,0.35)]">
                  <div className="text-xs font-bold uppercase tracking-widest text-white/60">Quick start</div>
                  <div className="mt-2 text-2xl font-black text-white">Pick a plan in seconds</div>

                  <div className="mt-6 grid gap-4">
                    <div className="rounded-2xl bg-white/8 p-5 ring-1 ring-white/10">
                      <div className="text-sm font-black text-white">Up to {maxP.value}g protein/day</div>
                      <div className="mt-1 text-sm text-white/70">Best for: {maxP.label || "—"}</div>
                    </div>
                    <div className="rounded-2xl bg-white/8 p-5 ring-1 ring-white/10">
                      <div className="text-sm font-black text-white">
                        Starts at {minM ? inr(minM.value) : "—"} /month
                      </div>
                      <div className="mt-1 text-sm text-white/70">Best entry: {minM?.label || "—"}</div>
                    </div>
                  </div>

                  <div className="mt-7">
                    <a
                      href="/plans"
                      className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400 px-6 py-3 text-sm font-black text-[#06140e] shadow-[0_22px_60px_rgba(16,185,129,0.28)] transition hover:brightness-[1.02]"
                    >
                      Explore plans
                    </a>
                  </div>

                  <div className="mt-4 text-center text-xs text-white/55">
                    Detailed durations and full breakdown on Plans page.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* TRUST STRIP (still light section for contrast) */}
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

      
      {/* FULL-BLEED PLAN PICKER (your unique section stays) */}
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

                    <div className="mt-7 text-xs text-white/55">Tip: Start here, switch later anytime.</div>
                  </div>
                </div>
              </div>
            )}

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
                        <div className={`rounded-full px-3 py-1 text-xs font-black ${badge.cls}`}>{badge.text}</div>
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

      {/* FAQ (unique trust builder) */}
      <Container>
        <div className="mt-16 text-center">
          <h2 className="font-display text-3xl font-black text-slate-900">Questions, answered</h2>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {[
            { q: "Do plans change daily?", a: "Yes—your bowl follows the February rotation menu so you get variety automatically." },
            { q: "Can I switch plans later?", a: "Yes. Start with Veg Premium (recommended) and switch to eggs/chicken later anytime." },
            { q: "Can I add extra protein?", a: "Yes—add-ons like extra eggs, chicken, and protein salad can be added as needed." },
            { q: "Is this subscription flexible?", a: "Yes—pause or cancel anytime, and restart when your routine needs it." },
          ].map((x) => (
            <div key={x.q} className="rounded-3xl bg-white/70 p-7 ring-1 ring-slate-900/10 backdrop-blur-xl">
              <div className="text-base font-black text-slate-900">{x.q}</div>
              <p className="mt-2 text-sm text-slate-600">{x.a}</p>
            </div>
          ))}
        </div>
        
      </Container>
{/* NEW: LEAD / ENQUIRY FORM — PREMIUM BACKGROUND */}
      <section className="relative mt-16 overflow-hidden">
        {/* Base premium gradient */}
        <div
          className={[
            "absolute inset-0",
            "bg-[radial-gradient(1200px_600px_at_15%_10%,rgba(16,185,129,0.20),transparent_60%)]",
            "bg-[radial-gradient(900px_500px_at_90%_20%,rgba(249,115,22,0.16),transparent_60%)]",
            "bg-[radial-gradient(1000px_700px_at_50%_115%,rgba(56,189,248,0.10),transparent_55%)]",
            "bg-[linear-gradient(180deg,#040a07_0%,#06140e_55%,#040a07_100%)]",
          ].join(" ")}
        />

        {/* Subtle grid overlay (premium tech feel) */}
        <div
          className={[
            "absolute inset-0 opacity-[0.10]",
            "[background-image:linear-gradient(to_right,rgba(255,255,255,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.10)_1px,transparent_1px)]",
            "[background-size:64px_64px]",
            "[mask-image:radial-gradient(ellipse_75%_60%_at_50%_35%,#000_55%,transparent_100%)]",
          ].join(" ")}
        />

        {/* Soft top vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/25" />

        <Container className="relative py-16">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-black text-black ring-1 ring-white/10 backdrop-blur">
                Enquiry • Quick callback
              </div>
              <h2 className="mt-6 font-display text-3xl font-black text-black sm:text-4xl">
                Want help choosing?
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-black/70">
                Tell us your area and the plan you want. We’ll call to confirm delivery feasibility and
                suggest the best option.
              </p>

              <div className="mt-8 overflow-hidden rounded-[28px] bg-white/5 ring-1 ring-white/10">
                <Image
                  src="/images/sections/enquiry-card.jpg"
                  alt="Enquiry illustration"
                  width={1200}
                  height={900}
                  className="h-auto w-full object-cover"
                />
              </div>

            </div>

            <div className="lg:col-span-7">
              <LeadEnquiryForm />
            </div>
          </div>
        </Container>
      </section>

      <div className="h-16" />
    </div>
  );
}
