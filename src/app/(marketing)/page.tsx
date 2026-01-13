// src/app/(marketing)/page.tsx
export default function HomePage() {
  return (
    <div className="bg-cream">
      <section className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-12 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:gap-16 lg:px-8 lg:py-20">
        {/* Left: hero copy */}
        <div className="max-w-xl space-y-6">
          <span className="inline-flex items-center rounded-full bg-primary-soft px-3 py-1 text-xs font-medium text-primary">
            Bangalore · HSR · Koramangala
          </span>

          <h1 className="font-display text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            Calm, healthy breakfasts{" "}
            <span className="text-primary">every morning.</span>
          </h1>

          <p className="text-base leading-relaxed text-slate-600 sm:text-lg">
            A subscription-first breakfast service for busy Bangalore
            professionals and families. Fresh fruit bowls, oats, and protein
            add-ons — delivered in a fixed morning window, with complete control
            to pause or skip any day.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href="/plans"
              className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition hover:bg-primary/90"
            >
              View plans & pricing
            </a>
            <a
              href="/how-it-works"
              className="text-sm font-medium text-slate-800 hover:text-primary"
            >
              How it works
            </a>
          </div>

          <div className="mt-4 grid gap-3 text-xs text-slate-500 sm:text-sm">
            <div className="flex items-center gap-2">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
              No coupons. No surge pricing. Just consistent mornings.
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
              Pause or skip any day in seconds — no calls, no chats.
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
              Hyperlocal to select Bangalore neighbourhoods.
            </div>
          </div>
        </div>

        {/* Right: card mock of the app */}
        <div className="flex flex-1 justify-center sm:justify-end">
          <div className="rounded-lg-soft shadow-soft relative w-full max-w-sm bg-white p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-500">
                  Today · 7:00–7:30 AM
                </p>
                <p className="text-sm font-semibold text-slate-900">
                  Your breakfast is scheduled
                </p>
              </div>
              <span className="rounded-full bg-primary-soft px-3 py-1 text-[11px] font-semibold text-primary">
                On time
              </span>
            </div>

            <div className="mb-4 rounded-2xl bg-cream p-4">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
                Today’s bowl
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-900">
                Seasonal fruit bowl + overnight oats
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Fresh-cut fruit, slow-soaked oats, no refined sugar.
              </p>
            </div>

            <div className="grid gap-2 text-xs">
              <button className="w-full rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 transition hover:border-slate-300">
                Pause next 3 days
              </button>
              <button className="w-full rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 transition hover:border-slate-300">
                Skip tomorrow
              </button>
            </div>

            <p className="mt-4 text-[11px] text-slate-400">
              Built for calm, predictable mornings — not impulse ordering.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
