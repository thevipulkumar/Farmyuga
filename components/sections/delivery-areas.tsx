import Link from "next/link";
import { MapPin, Navigation } from "lucide-react";

import { Container, Section } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { deliveryAreas } from "@/lib/areas";

export function DeliveryAreas() {
  const hub = deliveryAreas.find((area) => area.hub)!;
  const rest = deliveryAreas.filter((area) => !area.hub);

  return (
    <Section tone="forest" aria-labelledby="areas-heading" id="delivery-areas">
      <div
        aria-hidden="true"
        className="leaf-pattern pointer-events-none absolute inset-0 opacity-[0.05]"
      />
      <div
        aria-hidden="true"
        className="glow-green pointer-events-none absolute -right-24 top-10 size-[30rem] rounded-full blur-2xl opacity-60"
      />

      <Container className="relative">
        <SectionHeading
          id="areas-heading"
          eyebrow="Delivery areas"
          tone="dark"
          title="We deliver across Ranchi — every single day"
          description="Ratu Road is our base, so the first vans leave from here at 5 AM. From there we cover eleven more localities across the city."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-12">
          {/* Hub */}
          <Reveal>
            <div className="relative h-full overflow-hidden rounded-2xl border border-leaf/30 bg-white/10 p-8">
              <span className="flex size-14 items-center justify-center rounded-2xl bg-leaf text-forest">
                <MapPin className="size-7" />
              </span>
              <p className="type-eyebrow mt-6 text-leaf">Our hub</p>
              <h3 className="mt-2 text-3xl font-extrabold tracking-tight text-white">
                {hub.name}, Ranchi
              </h3>
              <p className="mt-3 text-mint/85">{hub.note}. Orders placed by 9 PM go out on the next morning&apos;s first van.</p>
              <p className="mt-6 rounded-lg bg-leaf/15 px-4 py-3 text-sm font-semibold text-leaf">
                Free delivery on every Ratu Road order — no minimum surcharge.
              </p>
            </div>
          </Reveal>

          {/* Other areas */}
          <div>
            <Reveal>
              <p className="text-mint/80">
                Also delivering to these Ranchi localities, seven days a week:
              </p>
            </Reveal>
            <ul className="mt-5 flex flex-wrap gap-2.5">
              {rest.map((area, index) => (
                <Reveal as="li" key={area.name} delay={Math.min(index, 8) * 0.04}>
                  <span
                    title={area.note}
                    className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-4 py-2.5 text-[0.95rem] font-semibold text-white transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-leaf hover:bg-leaf hover:text-forest"
                  >
                    <Navigation className="size-3.5" />
                    {area.name}
                  </span>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={0.2}>
              <div className="mt-10 flex flex-col gap-4 rounded-2xl border border-white/15 bg-forest-deep/60 p-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-mint/90">
                  <strong className="font-bold text-white">
                    Outside this list?
                  </strong>{" "}
                  For bulk orders we build custom routes across greater Ranchi — tell us
                  the location and daily volume and we&apos;ll tell you honestly whether
                  we can hold the morning window.
                </p>
                <Button asChild variant="onDark" size="lg" className="shrink-0">
                  <Link href="/contact">Check my area</Link>
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
