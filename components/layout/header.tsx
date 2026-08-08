"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone } from "lucide-react";

import { Container } from "@/components/shared/container";
import { Wordmark } from "@/components/shared/brand";
import { MobileNav } from "@/components/layout/mobile-nav";
import { Button } from "@/components/ui/button";
import { navItems, siteConfig, telLink } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-out",
        scrolled
          ? "border-b border-border bg-white/85 shadow-soft backdrop-blur-lg"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <Container>
        <div
          className={cn(
            "flex items-center justify-between gap-4 transition-all duration-300 ease-out",
            scrolled ? "h-18" : "h-20 md:h-24",
          )}
        >
          <Wordmark />

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {navItems.map((item) => {
                const base = item.href.split("#")[0] || "/";
                const active =
                  base === "/" ? pathname === "/" && !item.href.includes("#") : pathname === base;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "rounded-full px-3.5 py-2 text-[0.95rem] font-semibold transition-colors duration-200",
                        active
                          ? "text-brand-green"
                          : "text-charcoal hover:bg-mint hover:text-brand-green",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2 md:gap-3">
            <a
              href={telLink}
              className="hidden items-center gap-2 rounded-full px-3 py-2 text-[0.95rem] font-semibold text-forest transition-colors duration-200 hover:text-brand-green md:flex"
            >
              <span className="flex size-8 items-center justify-center rounded-full bg-mint text-brand-green">
                <Phone className="size-4" />
              </span>
              <span className="hidden xl:inline">{siteConfig.phoneDisplay}</span>
              <span className="xl:hidden">Call</span>
            </a>

            <Button asChild size="sm" className="hidden sm:inline-flex">
              <Link href="/contact">Get a Quote</Link>
            </Button>

            <MobileNav />
          </div>
        </div>
      </Container>
    </header>
  );
}
