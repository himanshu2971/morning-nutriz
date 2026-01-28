"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function BodyReset() {
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = "";
    document.body.style.pointerEvents = "";
    document.body.classList.remove("overflow-hidden");
    document.body.classList.remove("pointer-events-none");
  }, [pathname]);

  return null;
}
