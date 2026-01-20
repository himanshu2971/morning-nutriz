// src/app/(marketing)/menu/page.tsx
import Image from "next/image";
import { getCatalog } from "@/lib/catalog";

function weekOfFeb(date: string) {
  const n = Number(date.replace("Feb-", ""));
  return Math.floor((n - 1) / 7) + 1;
}

export default function MenuPage() {
  const { plans, febMenu } = getCatalog();

  const weeks = [1, 2, 3, 4].map((w) => ({
    week: w,
    items: febMenu.filter((x) => weekOfFeb(x.date) === w),
  }));

  return (
    <div className="bg-cream">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        {/* HERO */}
        <div className="overflow-hidden rounded-3xl bg-white shadow-soft">
          <div className="grid lg:grid-cols-2">
            <div className="p-8 sm:p-10">
              <h1 className="font-display text-4xl font-black text-slate-900 sm:text-5xl">
                FEBRUARY MENU
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-slate-600">
                Rotation menu built for consistent daily nutrition. Every bowl
                contains fruits, vegetables, and a protein base.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <span className="rounded-full bg-primary/10 px-4 py-2 text-sm font-black text-primary">
                  Fruits 180g
                </span>
                <span className="rounded-full bg-primary/10 px-4 py-2 text-sm font-black text-primary">
                  Vegetables 100g
                </span>
                <span className="rounded-full bg-primary/10 px-4 py-2 text-sm font-black text-primary">
                  Protein base 140g
                </span>
              </div>

              <a
                href="/plans"
                className="mt-10 inline-flex items-center rounded-2xl bg-primary px-7 py-4 text-base font-black text-white transition hover:bg-primary-dark"
              >
                View plans & pricing <span className="ml-2">→</span>
              </a>
            </div>

            {/* Hero image from public/ */}
            <div className="relative min-h-[260px] bg-gradient-to-br from-emerald-50 to-orange-50 lg:min-h-[420px]">
              <Image
                src="/images/hero/morning-nutriz-hero.jpg"
                alt="Morning Nutriz breakfast bowl hero"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>

        {/* WHAT YOU GET EVERY DAY */}
        <div className="mt-14">
          <div className="text-center">
            <h2 className="font-display text-3xl font-black text-slate-900">
              WHAT YOU GET (EVERY DAY)
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600">
              Plan composition and protein/day (driven from your catalog).
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {plans.map((p) => (
              <div key={p.id} className="rounded-3xl bg-white p-7 shadow-soft">
                <div className="text-xs font-bold uppercase tracking-widest text-slate-500">
                  {p.category}
                </div>
                <div className="mt-1 font-display text-xl font-extrabold text-slate-900">
                  {p.planName}
                </div>
                <div className="mt-4 text-sm text-slate-600">{p.dailyMenu}</div>
                <div className="mt-3 text-sm">
                  <span className="font-semibold text-slate-900">Protein/day:</span>{" "}
                  <span className="text-slate-600">{p.proteinPerDay}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FEB ROTATION */}
        <div className="mt-16">
          <div className="text-center">
            <h2 className="font-display text-3xl font-black text-slate-900">
              FEBRUARY ROTATION
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600">
              Weekly view of the month.
            </p>
          </div>

          <div className="mt-10 space-y-12">
            {weeks.map(({ week, items }) => (
              <section key={week}>
                <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                  <h3 className="font-display text-2xl font-black text-slate-900">
                    Week {week}
                  </h3>
                  <div className="text-xs font-bold uppercase tracking-widest text-slate-500">
                    {items.length ? `${items[0].date} → ${items[items.length - 1].date}` : "—"}
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {items.map((d) => (
                    <div key={d.date} className="rounded-3xl bg-white p-6 shadow-soft">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="text-xs font-bold uppercase tracking-widest text-slate-500">
                            {d.weekday}
                          </div>
                          <div className="mt-1 text-lg font-black text-slate-900">
                            {d.date}
                          </div>
                        </div>
                        <div className="rounded-full bg-accent/10 px-3 py-1 text-xs font-black text-accent">
                          Rotation
                        </div>
                      </div>

                      <div className="mt-5 space-y-4 text-sm">
                        <div>
                          <div className="text-xs font-bold uppercase tracking-widest text-slate-500">
                            Fruits (180g)
                          </div>
                          <div className="mt-1 text-slate-900">{d.fruits180g}</div>
                        </div>

                        <div>
                          <div className="text-xs font-bold uppercase tracking-widest text-slate-500">
                            Vegetables (100g)
                          </div>
                          <div className="mt-1 text-slate-900">{d.vegetables100g}</div>
                        </div>

                        <div>
                          <div className="text-xs font-bold uppercase tracking-widest text-slate-500">
                            Protein base (140g)
                          </div>
                          <div className="mt-1 text-slate-900">{d.proteinBase140g}</div>
                        </div>
                      </div>

                      <a
                        href="/plans"
                        className="mt-6 block w-full rounded-2xl bg-slate-900 px-6 py-3 text-center text-xs font-black text-white transition hover:bg-slate-800"
                      >
                        Choose a plan
                      </a>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
