// src/app/(marketing)/menu/page.tsx
import Image from "next/image";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createServerClient, type CookieOptions } from "@supabase/ssr";

import { Container } from "@/components/ui/Container";
import { GlassCard } from "@/components/ui/GlassCard";
import { ButtonLink } from "@/components/ui/Button";
import { getCatalog } from "@/lib/catalog";

function weekOfFeb(date: string) {
  const n = Number(date.replace("Feb-", ""));
  return Math.floor((n - 1) / 7) + 1;
}

function heroForMenu() {
  return "/images/hero/morning-nutriz-hero.jpg";
}

function safeNext(input: string | null | undefined, fallback = "/account") {
  if (!input) return fallback;
  // Allow only internal relative paths, block "//" and "http(s)://"
  if (!input.startsWith("/")) return fallback;
  if (input.startsWith("//")) return fallback;
  return input;
}

async function createSupabaseServerClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options as CookieOptions);
            });
          } catch {
            // ignore
          }
        },
      },
    }
  );
}

export default async function MenuPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/login?next=${encodeURIComponent("/menu")}`);
  }

  const { plans, febMenu } = getCatalog();

  const weeks = [1, 2, 3, 4].map((w) => ({
    week: w,
    items: febMenu.filter((x) => weekOfFeb(x.date) === w),
  }));

  return (
    <div className="bg-premium">
      <Container>
        {/* HERO */}
        <div className="pt-10 sm:pt-14">
          <GlassCard className="relative overflow-hidden">
            {/* Mobile bg hero */}
            <div className="absolute inset-0 lg:hidden">
              <Image
                src={heroForMenu()}
                alt=""
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-white/85 via-white/70 to-white/85" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(16,185,129,0.18),transparent_55%)]" />
            </div>

            <div className="grid items-stretch lg:grid-cols-2">
              <div className="relative z-10 p-8 sm:p-10">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-xs font-black text-slate-900 ring-1 ring-slate-900/10">
                  February rotation • Fruits + Veg + Protein base
                </div>

                <h1 className="mt-6 font-display text-4xl font-black leading-tight text-slate-900 sm:text-5xl">
                  Menu that keeps
                  <span className="text-primary"> mornings interesting</span>.
                </h1>

                <p className="mt-4 max-w-xl text-lg leading-relaxed text-slate-600">
                  The menu rotates daily so you get variety without thinking.
                  Choose a plan, and the contents follow the rotation.
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

                <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                  <ButtonLink
                    href="/plans"
                    variant="primary"
                    className="w-full sm:w-auto"
                  >
                    View plans
                  </ButtonLink>
                  <ButtonLink
                    href="/login"
                    variant="outline"
                    className="w-full sm:w-auto"
                  >
                    Start
                  </ButtonLink>
                </div>
              </div>

              {/* Desktop hero image */}
              <div className="relative hidden min-h-[320px] bg-gradient-to-br from-emerald-50 to-orange-50 lg:block lg:min-h-[520px]">
                <Image
                  src={heroForMenu()}
                  alt="Menu hero"
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

        {/* WHAT YOU GET */}
        <div className="mt-14 text-center">
          <h2 className="font-display text-3xl font-black text-slate-900 sm:text-4xl">
            What you get (every day)
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600">
            Plan composition and protein/day are shown from your catalog.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((p) => (
            <div
              key={p.id}
              className="rounded-[28px] bg-white/70 p-7 ring-1 ring-slate-900/10 backdrop-blur-xl"
            >
              <div className="text-xs font-bold uppercase tracking-widest text-slate-500">
                {p.category}
              </div>
              <div className="mt-2 font-display text-xl font-extrabold text-slate-900">
                {p.planName}
              </div>
              <div className="mt-3 text-sm text-slate-600">{p.dailyMenu}</div>
              <div className="mt-3 text-sm">
                <span className="font-semibold text-slate-900">Protein/day:</span>{" "}
                <span className="text-slate-600">{p.proteinPerDay}</span>
              </div>
            </div>
          ))}
        </div>

        {/* ROTATION */}
        <div className="mt-16 text-center">
          <h2 className="font-display text-3xl font-black text-slate-900 sm:text-4xl">
            February rotation
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600">
            Weekly view of the month — shop-like cards, easy to scan.
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
                  {items.length
                    ? `${items[0].date} → ${items[items.length - 1].date}`
                    : "—"}
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {items.map((d) => (
                  <div
                    key={d.date}
                    className="flex h-full flex-col rounded-[28px] bg-white/70 p-6 ring-1 ring-slate-900/10 backdrop-blur-xl"
                  >
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
                        <div className="mt-1 text-slate-900">
                          {d.vegetables100g}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs font-bold uppercase tracking-widest text-slate-500">
                          Protein base (140g)
                        </div>
                        <div className="mt-1 text-slate-900">
                          {d.proteinBase140g}
                        </div>
                      </div>
                    </div>

                    <div className="mt-auto pt-6">
                      <ButtonLink href="/plans" variant="dark" className="w-full">
                        Choose a plan
                      </ButtonLink>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="h-16" />
      </Container>
    </div>
  );
}
