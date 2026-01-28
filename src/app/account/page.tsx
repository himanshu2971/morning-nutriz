
import { createSupabaseServerClient } from "@/lib/supabase/server";
import LogoutButton from "@/components/auth/LogoutButton";
export const metadata = {
  title: "Account | Morning Nutriz",
};

function mustGetEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing required env var: ${name}`);
  return v;
}

export default async function AccountPage() {
  const supabase = createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-14">
        <div className="rounded-2xl border border-slate-900/10 bg-white p-6">
          <div className="text-lg font-black text-slate-900">Not logged in</div>
          <p className="mt-2 text-sm text-slate-600">Please go to /login.</p>
        </div>
      </div>
    );
  }

  const supabaseUrl = mustGetEnv("NEXT_PUBLIC_SUPABASE_URL");
  const supabaseAnonKey = mustGetEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY");

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

        <div className="mt-6">
          <LogoutButton supabaseUrl={supabaseUrl} supabaseAnonKey={supabaseAnonKey} />
        </div>
      </div>
    </div>
  );
}
