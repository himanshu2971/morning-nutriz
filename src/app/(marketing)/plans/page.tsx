// src/app/(marketing)/plans/page.tsx
export default function PlansPage() {
  return (
    <div className="bg-cream">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="font-display text-4xl font-black text-slate-900 sm:text-5xl">
            OUR PLANS
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Choose your perfect breakfast subscription
          </p>
        </div>

        <div className="mt-16 space-y-8">
          {/* VEG PLAN */}
          <div>
            <h2 className="mb-8 text-center text-3xl font-black text-slate-900">
              VEG PLAN
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="group rounded-3xl bg-white p-8 shadow-soft hover:shadow-xl">
                <div className="mb-6 flex items-center justify-center">
                  <div className="flex h-28 w-28 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-100 to-green-100 p-6">
                    <span className="text-3xl font-black text-primary">🍎</span>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <h3 className="text-xl font-black text-slate-900">VEG</h3>
                  <div className="mt-4 text-3xl font-black text-primary">₹499</div>
                  <div className="text-xs text-slate-500 uppercase tracking-widest">
                    Week
                  </div>
                  <div className="text-2xl font-bold text-slate-900">₹1999</div>
                  <div className="text-xs text-slate-500 uppercase tracking-widest">
                    Month
                  </div>
                </div>
                <a
                  href="/login"
                  className="mt-8 block w-full rounded-2xl bg-primary px-6 py-3 text-center font-bold text-white transition hover:bg-primary-dark"
                >
                  ADD TO CART
                </a>
              </div>

              <div className="group rounded-3xl bg-white p-8 shadow-soft hover:shadow-xl lg:col-span-2">
                <div className="flex flex-col items-center">
                  <h3 className="text-xl font-black text-slate-900">VEG PREMIUM</h3>
                  <div className="mt-4 grid grid-cols-2 gap-4 text-center text-sm text-slate-600">
                    <div>• VEG + SPROUTS (18-20G)</div>
                    <div>• MIXED DRY FRUITS</div>
                    <div>• EXTRA CHIA SEEDS (15G)</div>
                  </div>
                  <div className="mt-6">
                    <div className="text-3xl font-black text-accent">₹699</div>
                    <div className="text-xs text-slate-500 uppercase tracking-widest">
                      Week
                    </div>
                    <div className="text-2xl font-bold text-slate-900">₹2699</div>
                    <div className="text-xs text-slate-500 uppercase tracking-widest">
                      Month
                    </div>
                  </div>
                </div>
                <a
                  href="/login"
                  className="mt-8 block w-full rounded-2xl bg-accent px-6 py-3 text-center font-bold text-white transition hover:bg-accent-dark"
                >
                  ADD TO CART
                </a>
              </div>
            </div>
          </div>

          {/* NON-VEG PLAN */}
          <div>
            <h2 className="mb-8 text-center text-3xl font-black text-slate-900">
              NON-VEG PLAN
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="group rounded-3xl bg-white p-8 shadow-soft hover:shadow-xl">
                <div className="mb-6 flex items-center justify-center">
                  <div className="flex h-28 w-28 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-100 to-green-100 p-6">
                    <span className="text-3xl font-black text-primary">🥚</span>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <h3 className="text-xl font-black text-slate-900">NON-VEG</h3>
                  <div className="mt-4 text-3xl font-black text-primary">₹599</div>
                  <div className="text-xs text-slate-500 uppercase tracking-widest">
                    Week
                  </div>
                  <div className="text-2xl font-bold text-slate-900">₹2399</div>
                  <div className="text-xs text-slate-500 uppercase tracking-widest">
                    Month
                  </div>
                </div>
                <a
                  href="/login"
                  className="mt-8 block w-full rounded-2xl bg-primary px-6 py-3 text-center font-bold text-white transition hover:bg-primary-dark"
                >
                  ADD TO CART
                </a>
              </div>

              <div className="group rounded-3xl bg-white p-8 shadow-soft hover:shadow-xl lg:col-span-2">
                <div className="flex flex-col items-center">
                  <h3 className="text-xl font-black text-slate-900">NON-VEG PREMIUM</h3>
                  <div className="mt-4 grid grid-cols-2 gap-4 text-center text-sm text-slate-600">
                    <div>• VEG + EGG WHITES (30-35G)</div>
                    <div>• CHICKEN 35-40G</div>
                  </div>
                  <div className="mt-6">
                    <div className="text-3xl font-black text-accent">₹799</div>
                    <div className="text-xs text-slate-500 uppercase tracking-widest">
                      Week
                    </div>
                    <div className="text-2xl font-bold text-slate-900">₹3199</div>
                    <div className="text-xs text-slate-500 uppercase tracking-widest">
                      Month
                    </div>
                  </div>
                </div>
                <a
                  href="/login"
                  className="mt-8 block w-full rounded-2xl bg-accent px-6 py-3 text-center font-bold text-white transition hover:bg-accent-dark"
                >
                  ADD TO CART
                </a>
              </div>
            </div>
          </div>

          {/* ADD-ONS */}
          <div>
            <h2 className="mb-8 text-center text-3xl font-black text-slate-900">
              ADD-ONS
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="group rounded-3xl bg-white p-8 shadow-soft hover:shadow-xl">
                <div className="mb-6 flex items-center justify-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-100 to-amber-100 p-5">
                    <span className="text-2xl font-black text-accent">+15g</span>
                  </div>
                </div>
                <h3 className="text-center text-xl font-black text-slate-900">
                  EXTRA CHIA SEEDS
                </h3>
                <div className="mt-4 text-2xl font-black text-accent">₹115</div>
                <a
                  href="/login"
                  className="mt-8 block w-full rounded-2xl bg-accent px-6 py-3 text-center font-bold text-white transition hover:bg-accent-dark"
                >
                  ADD TO CART
                </a>
              </div>

              <div className="group rounded-3xl bg-white p-8 shadow-soft hover:shadow-xl">
                <div className="mb-6 flex items-center justify-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-100 to-green-100 p-5">
                    <span className="text-2xl font-black text-primary">+15g</span>
                  </div>
                </div>
                <h3 className="text-center text-xl font-black text-slate-900">
                  EXTRA SEEDS (20G)
                </h3>
                <div className="mt-4 text-2xl font-black text-primary">₹130</div>
                <a
                  href="/login"
                  className="mt-8 block w-full rounded-2xl bg-primary px-6 py-3 text-center font-bold text-white transition hover:bg-primary-dark"
                >
                  ADD TO CART
                </a>
              </div>

              <div className="group rounded-3xl bg-white p-8 shadow-soft hover:shadow-xl">
                <div className="mb-6 flex items-center justify-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-100 to-amber-100 p-5">
                    <span className="text-2xl font-black text-accent">+15g</span>
                  </div>
                </div>
                <h3 className="text-center text-xl font-black text-slate-900">
                  EXTRA FRUITS
                </h3>
                <div className="mt-4 text-2xl font-black text-accent">₹120</div>
                <a
                  href="/login"
                  className="mt-8 block w-full rounded-2xl bg-accent px-6 py-3 text-center font-bold text-white transition hover:bg-accent-dark"
                >
                  ADD TO CART
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
