import Link from "next/link";
import { ArrowRight, Building2, Home } from "lucide-react";

import { Container, Section } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";
import { Button } from "@/components/ui/button";
import { audiencePaths } from "@/lib/content";
import { cn } from "@/lib/utils";

export function AudienceSplit() {
  return (
    <Section tone="white" aria-labelledby="audience-heading" id="audience">
      <Container>
        <SectionHeading
          id="audience-heading"
          eyebrow="Two ways to buy"
          title="Whether you cook for two hundred or for four"
          description="Farmyuga runs one supply chain and two delivery rhythms. Pick the path that matches your kitchen — the produce is identical, the paperwork is not."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-2 lg:gap-8">
          {audiencePaths.map((path, index) => {
            const isBulk = path.id === "bulk";
            const Icon = isBulk ? Building2 : Home;

            return (
              <Reveal key={path.id} delay={index * 0.1}>
                <article
                  className={cn(
                    "group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-white p-7 shadow-soft transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lift md:p-9",
                    isBulk ? "border-amber/35 hover:border-amber" : "border-leaf/40 hover:border-brand-green",
                  )}
                >
                  {/* Accent wash */}
                  <div
                    aria-hidden="true"
                    className={cn(
                      "pointer-events-none absolute -right-16 -top-16 size-56 rounded-full blur-2xl",
                      isBulk ? "glow-amber" : "glow-green",
                    )}
                  />

                  <div className="relative flex items-center gap-3">
                    <span
                      className={cn(
                        "flex size-12 items-center justify-center rounded-xl",
                        isBulk ? "bg-amber text-charcoal" : "bg-brand-green text-white",
                      )}
                    >
                      <Icon className="size-6" />
                    </span>
                    <span
                      className={cn(
                        "type-eyebrow",
                        isBulk ? "text-amber-deep" : "text-brand-green",
                      )}
                    >
                      {path.eyebrow}
                    </span>
                  </div>

                  <h3 className="relative mt-6 text-2xl font-bold leading-tight tracking-tight text-charcoal md:text-[1.75rem]">
                    {path.title}
                  </h3>
                  <p className="relative mt-4 text-muted">{path.description}</p>

                  <ul className="relative mt-7 grid gap-3.5">
                    {path.points.map((point) => (
                      <li key={point.text} className="flex items-start gap-3">
                        <span
                          className={cn(
                            "mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg",
                            isBulk ? "bg-amber-tint text-amber-deep" : "bg-mint text-brand-green",
                          )}
                        >
                          <point.icon className="size-4" />
                        </span>
                        <span className="font-medium text-charcoal">{point.text}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="relative mt-8 flex flex-col gap-3 pt-2 sm:flex-row sm:items-center">
                    {isBulk ? (
                      <Button asChild variant="amber" size="lg">
                        <Link href={path.ctaHref}>
                          {path.ctaLabel}
                          <ArrowRight />
                        </Link>
                      </Button>
                    ) : (
                      <WhatsAppButton
                        context="home"
                        label={path.ctaLabel}
                        size="lg"
                        variant="primary"
                      />
                    )}
                    <Link
                      href={path.secondaryHref}
                      className={cn(
                        "inline-flex items-center gap-1.5 px-2 text-[0.95rem] font-semibold transition-colors duration-200",
                        isBulk
                          ? "text-amber-deep hover:text-charcoal"
                          : "text-brand-green hover:text-forest",
                      )}
                    >
                      {path.secondaryLabel}
                      <ArrowRight className="size-4" />
                    </Link>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
