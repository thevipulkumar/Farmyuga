import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sprout, Truck, Users } from "lucide-react";

import { CtaBand } from "@/components/sections/cta-band";
import { PageHero } from "@/components/sections/page-hero";
import { Container, Section } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { sourcingPoints, timeline, values } from "@/lib/content";
import { blurFor, photos } from "@/lib/images";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About Farmyuga — Farm-Direct Vegetable Supply on Ratu Road, Ranchi",
  description:
    "How Farmyuga grew from one tempo and eleven farming families in Ratu to a 500-buyer vegetable supply network across Ranchi. Our story, values and sourcing model.",
  alternates: { canonical: "/about" },
};

const teamRoles = [
  {
    icon: Sprout,
    title: "Sourcing desk",
    body: "Two field buyers who know every partner farmer by name and settle rates before the harvest is cut.",
  },
  {
    icon: Users,
    title: "Grading yard",
    body: "A six-person sorting team working from 3:30 AM — weighing, grading and crating by item and by client.",
  },
  {
    icon: Truck,
    title: "Dispatch & delivery",
    body: "Three vehicles, four drivers and one route planner who keeps the 5–8 AM bulk window intact, seven days a week.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow={`Since ${siteConfig.founded} · Ratu Road, Ranchi`}
        title="We started with one tempo and eleven farmers."
        description={
          <>
            <p>
              Farmyuga began in 2019 with a simple frustration: the farmer in Ratu was
              selling palak at a rate that made no sense, and the restaurant in Doranda
              was paying a rate that made even less. Between them sat four layers of
              people who had never touched the crate.
            </p>
            <p className="mt-4">
              We built the shortest line we could between the two — buy at the field,
              grade it ourselves, deliver it before the kitchen opens. Six years later
              that line feeds 500+ regular buyers across Ranchi.
            </p>
          </>
        }
        actions={
          <>
            <Button asChild size="lg">
              <Link href="/contact">
                Talk to us
                <ArrowRight />
              </Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href="/for-businesses">Supply plans for businesses</Link>
            </Button>
          </>
        }
        aside={
          <div className="relative">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl shadow-lift">
              <Image
                src={photos.marketSorting.src}
                alt={photos.marketSorting.alt}
                fill
                priority
                sizes="(min-width: 1024px) 44vw, 92vw"
                placeholder="blur"
                blurDataURL={blurFor(photos.marketSorting.tone)}
                className="object-cover"
              />
            </div>
            <div className="glass-card absolute -bottom-5 -left-3 rounded-2xl px-5 py-4 sm:left-6">
              <p className="text-2xl font-extrabold text-forest">5:00 AM</p>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                First van leaves Ratu Road
              </p>
            </div>
          </div>
        }
      />

      {/* Mission */}
      <Section tone="white" aria-labelledby="mission-heading">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
            <Reveal>
              <span className="type-eyebrow text-brand-green">Our mission</span>
              <h2 id="mission-heading" className="type-h2 mt-4">
                Shorten the chain. Keep the rate honest. Show up every morning.
              </h2>
            </Reveal>
            <div className="space-y-5">
              <Reveal delay={0.08}>
                <p className="type-lead text-muted">
                  Jharkhand grows more vegetables than Ranchi eats. Yet a hotel in Lalpur
                  and a family in Kanke often pay two very different prices for the same
                  crate cut on the same morning — because the chain between the field and
                  the plate is long, opaque and built on relationships nobody can see.
                </p>
              </Reveal>
              <Reveal delay={0.14}>
                <p className="text-muted">
                  Farmyuga exists to compress that chain to two steps: the farmer and us.
                  We agree a rate with the grower before the harvest, collect at the
                  field, grade it in our own yard on Ratu Road, and deliver it ourselves. No
                  commission agent, no second mandi, no quiet mark-up depending on who is
                  asking.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="text-muted">
                  It is not a complicated idea. It is just difficult to do at 4 AM, seven
                  days a week, for six years. That difficulty is the entire business.
                </p>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* Values */}
      <Section tone="cream" aria-labelledby="values-heading">
        <Container>
          <SectionHeading
            id="values-heading"
            eyebrow="What we hold to"
            title="Four rules we don't bend"
            description="Written down in 2019, tested every season since."
          />
          <div className="mt-14 grid gap-5 md:grid-cols-2 md:gap-6">
            {values.map((value, index) => (
              <Reveal key={value.title} delay={(index % 2) * 0.08}>
                <article className="group h-full rounded-2xl border border-border bg-white p-7 shadow-soft transition-all duration-300 ease-out hover:-translate-y-1 hover:border-leaf hover:shadow-lift md:p-8">
                  <span className="flex size-13 items-center justify-center rounded-xl bg-mint text-brand-green transition-colors duration-300 group-hover:bg-brand-green group-hover:text-white">
                    <value.icon className="size-6" />
                  </span>
                  <h3 className="type-h3 mt-6">{value.title}</h3>
                  <p className="mt-3 text-muted">{value.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Sourcing network */}
      <Section tone="white" aria-labelledby="network-heading">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <div className="relative aspect-[16/12] w-full overflow-hidden rounded-3xl shadow-lift">
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
            </Reveal>
            <div>
              <Reveal>
                <span className="type-eyebrow text-brand-green">Sourcing network</span>
                <h2 id="network-heading" className="type-h2 mt-4">
                  120+ farming families across three blocks
                </h2>
                <p className="type-lead mt-5 text-muted">
                  Ratu, Kanke and Bero. Most of our growers farm two acres or less, and
                  most of them have been with us for more than three seasons. We plan
                  sowing with them — if four farmers all plant lauki in the same window,
                  the rate collapses and everybody loses.
                </p>
              </Reveal>
              <ul className="mt-8 space-y-5">
                {sourcingPoints.map((point, index) => (
                  <Reveal as="li" key={point.title} delay={0.1 + index * 0.08}>
                    <div className="flex gap-4">
                      <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-mint text-brand-green">
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
            </div>
          </div>
        </Container>
      </Section>

      {/* Timeline */}
      <Section tone="cream" aria-labelledby="timeline-heading">
        <Container>
          <SectionHeading
            id="timeline-heading"
            eyebrow="The road so far"
            title="From 300 kg a day to a city-wide route"
            description="Six years of Ranchi mornings, one step at a time."
          />

          <ol className="mx-auto mt-14 max-w-3xl">
            {timeline.map((entry, index) => (
              <Reveal as="li" key={entry.year} delay={Math.min(index, 5) * 0.06}>
                <div className="relative grid grid-cols-[auto_1fr] gap-5 pb-10 sm:gap-7">
                  <div className="flex flex-col items-center">
                    <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-brand-green text-sm font-bold text-white shadow-soft">
                      {entry.year}
                    </span>
                    {index < timeline.length - 1 ? (
                      <span
                        aria-hidden="true"
                        className="mt-2 w-px flex-1 bg-gradient-to-b from-leaf to-transparent"
                      />
                    ) : null}
                  </div>
                  <div className="pt-2">
                    <h3 className="type-h3">{entry.title}</h3>
                    <p className="mt-2 text-muted">{entry.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      {/* Team */}
      <Section tone="white" aria-labelledby="team-heading">
        <Container>
          <SectionHeading
            id="team-heading"
            eyebrow="The people behind it"
            title="Fourteen people, one shift that starts at 3:30 AM"
            description="Farmyuga is a small, hands-on team. Nobody here has an office job — the person who takes your call has also loaded a crate."
          />
          <div className="mt-14 grid gap-5 md:grid-cols-3 md:gap-6">
            {teamRoles.map((role, index) => (
              <Reveal key={role.title} delay={index * 0.08}>
                <article className="h-full rounded-2xl border border-border bg-white p-7 shadow-soft transition-all duration-300 ease-out hover:-translate-y-1 hover:border-leaf hover:shadow-lift">
                  <span className="flex size-13 items-center justify-center rounded-xl bg-mint text-brand-green">
                    <role.icon className="size-6" />
                  </span>
                  <h3 className="type-h3 mt-6">{role.title}</h3>
                  <p className="mt-3 text-muted">{role.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <CtaBand
        title="Come see the yard at 4 AM. Then decide."
        description="The fastest way to judge a vegetable supplier is to watch them grade. Call ahead and visit us on Ratu Road any morning — or just start with a one-week trial."
      />
    </>
  );
}
