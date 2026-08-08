import Image from "next/image";
import Link from "next/link";
import { MapPin, Star, Sunrise, Sprout, Truck, Users } from "lucide-react";

import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { Button } from "@/components/ui/button";
import { blurFor, photos } from "@/lib/images";
import { siteConfig } from "@/lib/site-config";

const trustChips = [
  { icon: Sunrise, label: "Daily 5 AM dispatch" },
  { icon: Users, label: "500+ regular buyers" },
  { icon: Sprout, label: "Farm-direct sourcing" },
  { icon: Truck, label: "Free delivery on Ratu Road" },
];

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden bg-white pb-16 pt-26 md:pb-24 md:pt-32"
    >
      {/* Soft green glow behind the hero */}
      <div
        aria-hidden="true"
        className="glow-green pointer-events-none absolute -left-40 -top-40 size-[38rem] rounded-full blur-2xl"
      />
      <div
        aria-hidden="true"
        className="glow-amber pointer-events-none absolute -right-32 top-64 size-[26rem] rounded-full blur-2xl"
      />

      <Container className="relative">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          {/* ---- Copy ---- */}
          <div>
            <Reveal>
              <span className="type-eyebrow inline-flex items-center gap-2 rounded-lg bg-mint px-3 py-1.5 text-brand-green">
                <MapPin className="size-3.5" />
                Ratu Road, Ranchi · Since {siteConfig.founded}
              </span>
            </Reveal>

            <Reveal delay={0.08}>
              <h1 id="hero-heading" className="type-h1 mt-6 text-charcoal">
                Ranchi&apos;s trusted vegetable supplier —{" "}
                <span className="text-brand-green">farm-fresh, every morning.</span>
              </h1>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="type-lead mt-6 max-w-xl text-muted">
                We buy straight from 120+ smallholder farmers across the Ratu, Kanke and
                Bero blocks — no middleman, no second mandi hop. Cut before dawn, graded
                by hand, and at your gate before the day starts. Hotels, canteens and
                households, all on the same honest rate.
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild variant="amber" size="lg">
                  <Link href="/for-businesses#bulk-quote">Get Bulk Quote</Link>
                </Button>
                <Button asChild variant="primary" size="lg">
                  <Link href="/contact">Order for Home</Link>
                </Button>
              </div>
            </Reveal>

            <Reveal delay={0.32}>
              <ul className="mt-10 flex flex-wrap gap-2.5">
                {trustChips.map(({ icon: Icon, label }) => (
                  <li
                    key={label}
                    className="inline-flex items-center gap-2 rounded-lg border border-border bg-white px-3 py-2 text-sm font-semibold text-forest shadow-soft transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-leaf"
                  >
                    <Icon className="size-4 text-brand-green" />
                    {label}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* ---- Photograph ---- */}
          <Reveal delay={0.2} className="relative">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl shadow-lift sm:aspect-[5/5] lg:aspect-[4/5]">
              <Image
                src={photos.hero.src}
                alt={photos.hero.alt}
                fill
                priority
                sizes="(min-width: 1024px) 46vw, 92vw"
                placeholder="blur"
                blurDataURL={blurFor(photos.hero.tone)}
                className="object-cover"
              />
            </div>

            {/* Floating glass stats */}
            <div className="glass-card absolute -left-2 top-8 flex items-center gap-3 rounded-2xl px-4 py-3.5 sm:-left-6 md:px-5">
              <span className="flex size-11 items-center justify-center rounded-xl bg-brand-green text-white">
                <Sprout className="size-5" />
              </span>
              <span className="flex flex-col leading-tight">
                <span className="text-xl font-extrabold text-forest">40+</span>
                <span className="text-xs font-semibold text-muted">
                  vegetables daily
                </span>
              </span>
            </div>

            <div className="glass-card absolute -right-2 bottom-8 flex items-center gap-3 rounded-2xl px-4 py-3.5 sm:-right-6 md:px-5">
              <span className="flex size-11 items-center justify-center rounded-xl bg-amber text-charcoal">
                <Star className="size-5 fill-current" />
              </span>
              <span className="flex flex-col leading-tight">
                <span className="text-xl font-extrabold text-forest">4.8★</span>
                <span className="text-xs font-semibold text-muted">buyer rating</span>
              </span>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
