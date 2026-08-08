import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container, Section } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { Button } from "@/components/ui/button";
import { sourcingPoints } from "@/lib/content";
import { blurFor, photos } from "@/lib/images";

export function FarmerStory() {
  return (
    <Section tone="cream" aria-labelledby="farmers-heading" id="farmers">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal className="relative">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl shadow-lift sm:aspect-[16/12] lg:aspect-[4/5]">
              <Image
                src={photos.farmers.src}
                alt={photos.farmers.alt}
                fill
                sizes="(min-width: 1024px) 46vw, 92vw"
                placeholder="blur"
                blurDataURL={blurFor(photos.farmers.tone)}
                className="object-cover"
              />
            </div>
            <div className="glass-card absolute -bottom-6 left-6 rounded-2xl px-5 py-4 sm:left-8">
              <p className="text-2xl font-extrabold text-forest">120+</p>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                Partner farming families
              </p>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <span className="type-eyebrow text-brand-green">Our sourcing</span>
              <h2 id="farmers-heading" className="type-h2 mt-4">
                The farmer gets paid first. Everything else follows.
              </h2>
            </Reveal>

            <Reveal delay={0.08}>
              <p className="type-lead mt-6 text-muted">
                Farmyuga buys from more than 120 smallholder farming families across the
                Ratu, Kanke and Bero blocks of Ranchi district — most of them working two
                acres or less. We agree the rate before the harvest, collect at the field
                between 3 and 4:30 AM, and settle in full within 48 hours.
              </p>
            </Reveal>

            <Reveal delay={0.14}>
              <p className="mt-4 text-muted">
                Cutting out the commission agent and the second mandi hop takes two
                layers of margin out of the chain. Part of that goes back to the grower,
                the rest shows up as the rate on your morning card. That is the whole
                model — there is no clever trick underneath it.
              </p>
            </Reveal>

            <ul className="mt-9 space-y-5">
              {sourcingPoints.map((point, index) => (
                <Reveal as="li" key={point.title} delay={0.18 + index * 0.08}>
                  <div className="flex gap-4">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white text-brand-green shadow-soft">
                      <point.icon className="size-5" />
                    </span>
                    <div>
                      <h3 className="font-semibold text-charcoal">{point.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted">
                        {point.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={0.4}>
              <Button asChild variant="secondary" size="lg" className="mt-9">
                <Link href="/about">
                  Read the Farmyuga story
                  <ArrowRight />
                </Link>
              </Button>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
