"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Container, Section } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import type { FaqItem } from "@/lib/faq";

type FaqProps = {
  items: FaqItem[];
  eyebrow?: string;
  title?: string;
  description?: string;
  tone?: "white" | "cream";
  id?: string;
};

export function Faq({
  items,
  eyebrow = "Questions, answered",
  title = "Everything buyers ask before their first order",
  description = "Minimums, timings, invoicing and what happens when a crate isn't up to standard.",
  tone = "white",
  id = "faq",
}: FaqProps) {
  return (
    <Section tone={tone} aria-labelledby={`${id}-heading`} id={id}>
      <Container>
        <SectionHeading
          id={`${id}-heading`}
          eyebrow={eyebrow}
          title={title}
          description={description}
        />

        <Reveal delay={0.08} className="mx-auto mt-12 max-w-3xl">
          <Accordion type="single" collapsible className="flex flex-col gap-3">
            {items.map((item, index) => (
              <AccordionItem key={item.question} value={`item-${index}`}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </Container>
    </Section>
  );
}
