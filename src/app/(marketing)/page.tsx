// src/app/(marketing)/page.tsx
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { GlassCard } from "@/components/ui/GlassCard";
import { ButtonLink } from "@/components/ui/Button";
import { getCatalog } from "@/lib/catalog";

function inr(n: number) {
  return `₹${n}`;
}

function bestPrice(plan: { pricesInr: Record<string, number | undefined> }) {
  return plan.pricesInr.monthly ?? plan.pricesInr["1_week"] ?? plan.pricesInr["1_day"];
}

function planBadge(planId: string) {
  if (planId === "veg-premium") return { text: "Most Popular", cls: "bg-accent text-white" };
  if (planId === "nonveg-premium") return { text: "High Protein", cls: "bg-slate-900 text-white" };
  if (planId === "children") return { text: "Kids", cls: "bg-primary text-white" };
  return { text: "Daily", cls: "bg-primary/10 text-primary" };
}

export default function HomePage() {
  const { plans } = getCatalog();

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
                  Pick your plan in 60 seconds.
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
                  Inspired by what works in the category: clear plans, delivery promise, hygiene and trust.
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
          <div className="rounded-3xl bg-white/70 p-6 ring-1 ring-slate-900/10 backdrop-blur-xl">
            <div className="text-xs font-bold uppercase tracking-widest text-slate-500">Delivery</div>
            <div className="mt-1 text-lg font-black text-slate-900">Morning routine-ready</div>
            <p className="mt-2 text-sm text-slate-600">Consistent timing that fits work and school.</p>
          </div>
          <div className="rounded-3xl bg-white/70 p-6 ring-1 ring-slate-900/10 backdrop-blur-xl">
            <div className="text-xs font-bold uppercase tracking-widest text-slate-500">Hygiene</div>
            <div className="mt-1 text-lg font-black text-slate-900">Clean packing</div>
            <p className="mt-2 text-sm text-slate-600">Fresh prep, sealed packaging, and reliable handling.</p>
          </div>
          <div className="rounded-3xl bg-white/70 p-6 ring-1 ring-slate-900/10 backdrop-blur-xl">
            <div className="text-xs font-bold uppercase tracking-widest text-slate-500">Rotation</div>
            <div className="mt-1 text-lg font-black text-slate-900">Menu changes daily</div>
            <p className="mt-2 text-sm text-slate-600">Variety without decision fatigue.</p>
          </div>
        </div>
      </Container>

      {/* CHOOSE YOUR PLAN */}
      <Container>
        <div className="mt-16 text-center">
          <h2 className="font-display text-3xl font-black text-slate-900 sm:text-4xl">
            Choose your plan
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600">
            Product-style cards (shop feel), driven from your catalog (no random hardcoding).
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((p) => {
            const badge = planBadge(p.id);
            const price = bestPrice(p as any);

            return (
              <div
                key={p.id}
                className="group flex h-full flex-col overflow-hidden rounded-[28px] bg-white/70 ring-1 ring-slate-900/10 backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-[0_26px_70px_rgba(2,6,23,0.14)]"
              >
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
                  <div className="text-xs font-bold uppercase tracking-widest text-slate-500">{p.category}</div>
                  <div className="mt-2 font-display text-2xl font-extrabold text-slate-900">{p.planName}</div>
                  <div className="mt-3 text-sm leading-relaxed text-slate-600">{p.dailyMenu}</div>

                  <div className="mt-5 rounded-2xl bg-white/60 p-5 ring-1 ring-slate-900/10">
                    <div className="text-xs font-bold uppercase tracking-widest text-slate-500">Starts at</div>
                    <div className="mt-2 flex items-baseline justify-between">
                      <div className="text-sm font-bold text-slate-700">Weekly/Monthly</div>
                      <div className="text-3xl font-black text-slate-900">{price ? inr(price) : "—"}</div>
                    </div>
                    <div className="mt-2 text-xs text-slate-500">See full pricing on Plans page.</div>
                  </div>

                  <div className="mt-auto pt-6">
                    <ButtonLink href="/plans" variant="primary" className="w-full">
                      Choose plan
                    </ButtonLink>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <ButtonLink href="/plans" variant="dark">
            View full pricing →
          </ButtonLink>
        </div>
      </Container>

      {/* HOW IT WORKS */}
      <Container>
        <div className="mt-18 pt-4">
          <GlassCard className="p-8 sm:p-10">
            <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
              <div>
                <h2 className="font-display text-3xl font-black text-slate-900">How it works</h2>
                <p className="mt-3 text-sm text-slate-600">
                  Simple flow like the best competitors: pick plan → rotate menu → daily delivery.
                </p>

                <div className="mt-8 grid gap-4">
                  {[
                    { t: "Pick a plan", d: "Veg / Non‑veg / Kids—choose what fits your routine." },
                    { t: "Menu rotates", d: "Fruits + vegetables + protein base changes daily." },
                    { t: "Delivered fresh", d: "Packed clean and delivered in the morning." },
                    { t: "Upgrade anytime", d: "Add eggs, chicken, fruits, or seeds when needed." },
                  ].map((x) => (
                    <div key={x.t} className="rounded-2xl bg-white/60 p-5 ring-1 ring-slate-900/10">
                      <div className="text-sm font-black text-slate-900">{x.t}</div>
                      <div className="mt-1 text-sm text-slate-600">{x.d}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex gap-3">
                  <ButtonLink href="/menu" variant="outline">See menu</ButtonLink>
                  <ButtonLink href="/plans" variant="primary">Start</ButtonLink>
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

      {/* TESTIMONIALS (placeholder UI; later we will move these into catalog + Postman) */}
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

      {/* FOOTER SPACER */}
      <div className="h-16" />
    </div>
  );
}
