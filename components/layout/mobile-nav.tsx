"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, MapPin, Phone } from "lucide-react";

import { Wordmark } from "@/components/shared/brand";
import { WhatsAppIcon } from "@/components/shared/whatsapp-button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navItems, siteConfig, telLink, whatsappLink } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function MobileNav() {
  // Every link inside the drawer is wrapped in SheetClose, so navigation
  // closes it; Radix handles Escape, focus trapping and scroll lock.
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        aria-label="Open menu"
        className="flex size-11 items-center justify-center rounded-full border border-border bg-white text-forest transition-colors duration-200 hover:bg-mint lg:hidden"
      >
        <Menu className="size-5" />
      </SheetTrigger>

      <SheetContent side="right" className="p-0">
        <div className="flex items-center border-b border-border px-5 py-5">
          <SheetTitle asChild>
            <span>
              <Wordmark asLink={false} />
            </span>
          </SheetTitle>
        </div>
        <SheetDescription className="sr-only">
          Site navigation and contact options for {siteConfig.name}
        </SheetDescription>

        <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-5 py-6">
          <ul className="flex flex-col gap-1">
            {navItems.map((item) => {
              const active =
                item.href === pathname ||
                (item.href !== "/" && pathname.startsWith(item.href.split("#")[0]!) &&
                  item.href.split("#")[0] !== "/");
              return (
                <li key={item.href}>
                  <SheetClose asChild>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center justify-between rounded-lg px-4 py-3.5 text-lg font-semibold transition-colors duration-200",
                        active
                          ? "bg-mint text-forest"
                          : "text-charcoal hover:bg-cream hover:text-brand-green",
                      )}
                    >
                      {item.label}
                    </Link>
                  </SheetClose>
                </li>
              );
            })}
          </ul>

          <div className="mt-8 space-y-3 rounded-2xl bg-cream p-5">
            <a
              href={telLink}
              className="flex items-center gap-3 font-semibold text-forest"
            >
              <span className="flex size-9 items-center justify-center rounded-lg bg-white text-brand-green">
                <Phone className="size-4" />
              </span>
              {siteConfig.phoneDisplay}
            </a>
            <p className="flex items-start gap-3 text-sm text-muted">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white text-brand-green">
                <MapPin className="size-4" />
              </span>
              <span>{siteConfig.address.full}</span>
            </p>
            <p className="pl-12 text-sm text-muted">{siteConfig.hours.label}</p>
          </div>
        </nav>

        <div className="border-t border-border p-5">
          <a
            href={whatsappLink("general")}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-13 w-full items-center justify-center gap-2.5 rounded-full bg-brand-green px-6 text-base font-semibold text-white shadow-soft transition-colors duration-200 hover:bg-forest"
          >
            <WhatsAppIcon className="size-5" />
            Order on WhatsApp
          </a>
        </div>
      </SheetContent>
    </Sheet>
  );
}
