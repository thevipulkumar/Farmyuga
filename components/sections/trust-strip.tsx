import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { StatCounter } from "@/components/shared/stat-counter";
import { trustStats } from "@/lib/content";

export function TrustStrip() {
  return (
    <section aria-label="Farmyuga by the numbers" className="border-y border-border bg-cream">
      <Container>
        <ul className="grid grid-cols-2 gap-x-6 gap-y-10 py-12 md:py-14 lg:grid-cols-4">
          {trustStats.map((stat, index) => (
            <Reveal as="li" key={stat.label} delay={index * 0.08} className="text-center">
              <StatCounter
                value={stat.value}
                suffix={stat.suffix}
                className="block text-forest"
              />
              <p className="mt-2 text-sm font-semibold uppercase tracking-[0.12em] text-charcoal">
                {stat.label}
              </p>
              <p className="mt-1 text-sm text-muted">{stat.detail}</p>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
