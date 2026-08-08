import { Quote, Star } from "lucide-react";

import { Container, Section } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { Badge } from "@/components/ui/badge";
import { testimonials } from "@/lib/testimonials";
import { initials } from "@/lib/utils";

export function Testimonials() {
  return (
    <Section tone="white" aria-labelledby="testimonials-heading" id="testimonials">
      <Container>
        <SectionHeading
          id="testimonials-heading"
          eyebrow="What buyers say"
          title="Six years, 500+ buyers, one standard"
          description="Real accounts from the kitchens and homes we deliver to every morning."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Reveal key={testimonial.name} delay={index * 0.1}>
              <figure className="flex h-full flex-col rounded-2xl border border-border bg-white p-7 shadow-soft transition-all duration-300 ease-out hover:-translate-y-1 hover:border-leaf hover:shadow-lift">
                <Quote className="size-8 text-leaf" aria-hidden="true" />

                <div
                  className="mt-5 flex items-center gap-1"
                  aria-label={`Rated ${testimonial.rating} out of 5`}
                >
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      aria-hidden="true"
                      className="size-4 fill-amber text-amber"
                    />
                  ))}
                </div>

                <blockquote className="mt-4 flex-1 text-charcoal">
                  <p className="leading-relaxed">{testimonial.quote}</p>
                </blockquote>

                <figcaption className="mt-7 flex items-center gap-4 border-t border-border pt-6">
                  <span
                    aria-hidden="true"
                    className="flex size-12 shrink-0 items-center justify-center rounded-full bg-brand-green text-base font-bold text-white"
                  >
                    {initials(testimonial.name)}
                  </span>
                  <span className="min-w-0">
                    <span className="block font-semibold text-charcoal">
                      {testimonial.name}
                    </span>
                    <span className="block text-sm text-muted">{testimonial.role}</span>
                    <Badge
                      variant={testimonial.segment === "bulk" ? "amber" : "mint"}
                      className="mt-2"
                    >
                      {testimonial.locality}, Ranchi
                    </Badge>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
