// src/app/(marketing)/layout.tsx
import type { ReactNode } from "react";
import MarketingHeader from "@/components/marketing/MarketingHeader";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";
import WhatsappFab from "@/components/marketing/WhatsappFab";


export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh">
      <MarketingHeader />
      <main>{children}</main>
      <MarketingFooter />

      <WhatsappFab
        // WhatsApp click-to-chat expects international format digits; you can keep + here,
        // we sanitize it inside the component. [web:146]
        phoneE164="+919113276708"
        defaultText="Hi Morning Nutriz! I’d like to know more about plans and delivery."
      />
    </div>
  );
}
