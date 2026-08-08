"use client";

import * as React from "react";

import { WhatsAppIcon } from "@/components/shared/whatsapp-button";
import { whatsappLink } from "@/lib/site-config";
import { cn } from "@/lib/utils";

/** Appears bottom-right after 300px of scroll, on every page. */
export function FloatingWhatsApp() {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={whatsappLink("general")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Farmyuga on WhatsApp"
      className={cn(
        "fixed bottom-5 right-5 z-40 flex items-center gap-2.5 rounded-full bg-brand-green px-4 py-3.5 text-sm font-semibold text-white shadow-lift transition-all duration-300 ease-out md:bottom-8 md:right-8",
        "hover:bg-forest hover:shadow-lift",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0",
      )}
    >
      <WhatsAppIcon className="size-5" />
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  );
}
