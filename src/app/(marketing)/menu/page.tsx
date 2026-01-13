// src/app/(marketing)/menu/page.tsx
export default function MenuPage() {
  return (
    <div className="bg-cream">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="font-display text-4xl font-black text-slate-900 sm:text-5xl">
            BREAKFAST MENU
          </h1>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Fresh, simple breakfast bowls for daily routine. Choose from our
            rotating menu.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="group rounded-3xl bg-white p-8 shadow-soft hover:shadow-xl">
            <div className="mb-6 flex items-center justify-center">
              <div className="flex h-32 w-32 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-100 to-green-100 p-8">
                <span className="text-4xl font-black text-primary">🍎</span>
              </div>
            </div>
            <h3 className="text-2xl font-black text-slate-900 text-center">
              Seasonal Fruit Bowl
            </h3>
            <ul className="mt-6 space-y-2 text-sm text-slate-600">
              <li>• Fresh mango, papaya, banana</li>
              <li>• Greek yogurt base</li>
              <li>• Chia seeds + honey drizzle</li>
              <li><strong>~250 cal</strong></li>
            </ul>
          </div>

          <div className="group rounded-3xl bg-white p-8 shadow-soft hover:shadow-xl">
            <div className="mb-6 flex items-center justify-center">
              <div className="flex h-32 w-32 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-100 to-amber-100 p-8">
                <span className="text-4xl font-black text-accent">🥣</span>
              </div>
            </div>
            <h3 className="text-2xl font-black text-slate-900 text-center">
              Overnight Oats
            </h3>
            <ul className="mt-6 space-y-2 text-sm text-slate-600">
              <li>• Slow-soaked rolled oats</li>
              <li>• Almond milk + fresh berries</li>
              <li>• Nuts + no refined sugar</li>
              <li><strong>~320 cal</strong></li>
            </ul>
          </div>

          <div className="group rounded-3xl bg-white p-8 shadow-soft hover:shadow-xl lg:col-span-2">
            <div className="mb-6 flex items-center justify-center">
              <div className="flex h-32 w-32 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-100 to-green-100 p-8">
                <span className="text-4xl font-black text-primary">🥚</span>
              </div>
            </div>
            <h3 className="text-2xl font-black text-slate-900 text-center">
              Protein Power Bowl
            </h3>
            <ul className="mt-6 space-y-2 text-sm text-slate-600">
              <li>• Oats + whey protein isolate Papa</li>
              <li>• Banana + peanut butter</li>
              <li>• Egg whites option (+₹50)</li>
              <li><strong>~420 cal</strong></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
