import { Container, Section } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { whyFarmyuga } from "@/lib/content";

export function WhyUs() {
  return (
    <Section tone="white" aria-labelledby="why-heading" id="why-farmyuga">
      <div
        aria-hidden="true"
        className="leaf-pattern pointer-events-none absolute inset-0 opacity-[0.04]"
      />
      <Container className="relative">
        <SectionHeading
          id="why-heading"
          eyebrow="Why Farmyuga"
          title="Six reasons kitchens across Ranchi stopped shopping around"
          description="Anyone can sell you vegetables once. Staying a supplier for six years takes grading discipline, an honest rate and a van that leaves on time."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {whyFarmyuga.map((feature, index) => (
            <Reveal key={feature.title} delay={(index % 3) * 0.08}>
              <article className="group h-full rounded-2xl border border-border bg-white p-7 shadow-soft transition-all duration-300 ease-out hover:-translate-y-1 hover:border-leaf hover:shadow-lift">
                <span className="flex size-13 items-center justify-center rounded-xl bg-mint text-brand-green transition-colors duration-300 group-hover:bg-brand-green group-hover:text-white">
                  <feature.icon className="size-6" />
                </span>
                <h3 className="type-h3 mt-6">{feature.title}</h3>
                <p className="mt-3 text-muted">{feature.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
