import * as React from "react";

import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  eyebrow: string;
  title: React.ReactNode;
  description: React.ReactNode;
  /** Buttons / chips rendered under the copy. */
  actions?: React.ReactNode;
  /** Optional right-hand column (image, form, stat card). */
  aside?: React.ReactNode;
  className?: string;
};

/** Compact top-of-page band used on every route except the home page. */
export function PageHero({
  eyebrow,
  title,
  description,
  actions,
  aside,
  className,
}: PageHeroProps) {
  return (
    <section
      aria-labelledby="page-heading"
      className={cn(
        "relative overflow-hidden bg-cream pb-16 pt-28 md:pb-20 md:pt-36",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="glow-green pointer-events-none absolute -left-32 -top-40 size-[34rem] rounded-full blur-2xl"
      />
      <div
        aria-hidden="true"
        className="glow-amber pointer-events-none absolute -right-24 -top-24 size-[22rem] rounded-full blur-2xl"
      />

      <Container className="relative">
        <div
          className={cn(
            "grid gap-12",
            aside ? "lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16" : "max-w-3xl",
          )}
        >
          <div>
            <Reveal>
              <span className="type-eyebrow text-brand-green">{eyebrow}</span>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 id="page-heading" className="type-h1 mt-5 text-charcoal">
                {title}
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <div className="type-lead mt-6 max-w-2xl text-muted">{description}</div>
            </Reveal>
            {actions ? (
              <Reveal delay={0.24}>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                  {actions}
                </div>
              </Reveal>
            ) : null}
          </div>

          {aside ? <Reveal delay={0.2}>{aside}</Reveal> : null}
        </div>
      </Container>
    </section>
  );
}
