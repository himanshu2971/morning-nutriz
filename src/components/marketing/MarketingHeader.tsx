// src/components/marketing/MarketingHeader.tsx
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { MarketingHeaderClient } from "./MarketingHeaderClient";

export default async function MarketingHeader() {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.auth.getUser();

  return <MarketingHeaderClient signedIn={!!data.user} />;
}
