import { createSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Account | Morning Nutriz",
};

export default async function AccountPage() {
  const supabase = createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login?next=/account");

  return (
    <div className="mx-auto max-w-2xl px-4 py-14">
      <div className="rounded-3xl border border-slate-900/10 bg-white p-7">
        <div className="text-xs font-bold uppercase tracking-widest text-slate-500">Account</div>
        <div className="mt-2 text-2xl font-black text-slate-900">Welcome</div>

        <div className="mt-4 space-y-2 text-sm text-slate-700">
          <div>
            <span className="font-semibold">Email:</span> {user.email ?? "—"}
          </div>
          <div>
            <span className="font-semibold">User ID:</span> {user.id}
          </div>
        </div>

        <form action="/auth/sign-out" method="post" className="mt-6">
          <button
            type="submit"
            className="inline-flex h-11 items-center justify-center rounded-xl bg-slate-900 px-5 text-sm font-black text-white transition hover:bg-slate-800"
          >
            Sign out
          </button>
        </form>
      </div>
    </div>
  );
}
