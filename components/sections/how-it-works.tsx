import { Building2, Home } from "lucide-react";

import { Container, Section } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { howItWorks } from "@/lib/content";

export function HowItWorks() {
  return (
    <Section tone="cream" aria-labelledby="how-heading" id="how-it-works">
      <Container>
        <SectionHeading
          id="how-heading"
          eyebrow="How it works"
          title="From your list to your gate in four steps"
          description="Same process for a 200-cover hotel and a family of four — only the volumes and the paperwork change."
        />

        <div className="relative mt-16">
          {/* Connecting line on large screens */}
          <div
            aria-hidden="true"
            className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-leaf to-transparent lg:block"
          />

          <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {howItWorks.map((step, index) => (
              <Reveal as="li" key={step.number} delay={index * 0.1} className="relative">
                <div className="flex items-center gap-4 lg:flex-col lg:items-start">
                  <span className="relative z-10 flex size-14 shrink-0 items-center justify-center rounded-2xl bg-brand-green text-white shadow-soft">
                    <step.icon className="size-6" />
                  </span>
                  <span className="type-eyebrow text-brand-green lg:mt-5">
                    Step {step.number}
                  </span>
                </div>

                <h3 className="type-h3 mt-4">{step.title}</h3>

                <div className="mt-4 space-y-3">
                  <p className="flex items-start gap-2.5 text-sm leading-relaxed text-muted">
                    <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-md bg-amber-tint text-amber-deep">
                      <Building2 className="size-3.5" />
                    </span>
                    <span>
                      <strong className="font-semibold text-charcoal">Bulk: </strong>
                      {step.bulk}
                    </span>
                  </p>
                  <p className="flex items-start gap-2.5 text-sm leading-relaxed text-muted">
                    <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-md bg-mint text-brand-green">
                      <Home className="size-3.5" />
                    </span>
                    <span>
                      <strong className="font-semibold text-charcoal">Home: </strong>
                      {step.home}
                    </span>
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
