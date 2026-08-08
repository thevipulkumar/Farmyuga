import type { Metadata } from "next";
import Image from "next/image";
import { Check, FileText, Phone, ShieldCheck, Truck } from "lucide-react";

import { CtaBand } from "@/components/sections/cta-band";
import { Faq } from "@/components/sections/faq";
import { PageHero } from "@/components/sections/page-hero";
import { Container, Section } from "@/components/shared/container";
import { QuoteForm } from "@/components/shared/quote-form";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { clientTypes, supplyPlans } from "@/lib/content";
import { businessFaqs } from "@/lib/faq";
import { blurFor, photos } from "@/lib/images";
import { siteConfig, telLink } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Bulk Vegetable Supplier for Hotels & Restaurants in Ranchi",
  description:
    "Farmyuga supplies bulk vegetables to hotels, restaurants, cloud kitchens, caterers, hostels and canteens across Ranchi. Daily standing orders, locked rate bands, GST invoicing and 5–8 AM delivery.",
  alternates: { canonical: "/for-businesses" },
};

const planRows: { label: string; key: keyof (typeof supplyPlans)[number] }[] = [
  { label: "Best for", key: "bestFor" },
  { label: "Minimum", key: "minimum" },
  { label: "Rate structure", key: "rate" },
  { label: "Billing", key: "billing" },
  { label: "Delivery window", key: "delivery" },
  { label: "Support", key: "support" },
];

const assurances = [
  { icon: Truck, label: "5–8 AM delivery slot", detail: "Loaded by 4:45 AM, signed challan at your gate" },
  { icon: FileText, label: "GST invoicing", detail: `Billed against your GSTIN — ours is ${siteConfig.gstin}` },
  { icon: ShieldCheck, label: "Replacement guarantee", detail: "Report same-day, replaced free on the next drop" },
];

export default function ForBusinessesPage() {
  return (
    <>
      <PageHero
        eyebrow="For businesses · B2B supply"
        title="Bulk vegetable supply your kitchen can set a clock by."
        description={
          <>
            <p>
              Farmyuga supplies hotels, restaurants, cafés, cloud kitchens, caterers,
              hostels, PGs, hospital canteens, corporate cafeterias and kirana retailers
              across Ranchi. One indent, one invoice, one morning window.
            </p>
            <p className="mt-4">
              Locked rate bands so you can budget a month ahead. GST invoicing that
              survives an audit. And a named account manager who answers at 5 AM.
            </p>
          </>
        }
        actions={
          <>
            <Button asChild variant="amber" size="lg">
              <a href="#bulk-quote">Request Bulk Pricing</a>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <a href={telLink}>
                <Phone />
                {siteConfig.phoneDisplay}
              </a>
            </Button>
          </>
        }
        aside={
          <div className="relative">
            <div className="relative aspect-[16/12] w-full overflow-hidden rounded-3xl shadow-lift">
              <Image
                src={photos.delivery.src}
                alt={photos.delivery.alt}
                fill
                priority
                sizes="(min-width: 1024px) 44vw, 92vw"
                placeholder="blur"
                blurDataURL={blurFor(photos.delivery.tone)}
                className="object-cover"
              />
            </div>
            <div className="glass-card absolute -bottom-6 left-5 rounded-2xl px-5 py-4">
              <p className="text-2xl font-extrabold text-forest">4:45 AM</p>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                Load confirmation on WhatsApp
              </p>
            </div>
          </div>
        }
      />

      {/* Assurances */}
      <section aria-label="Business supply assurances" className="border-b border-border bg-white">
        <Container>
          <ul className="grid gap-6 py-10 md:grid-cols-3">
            {assurances.map((item, index) => (
              <Reveal as="li" key={item.label} delay={index * 0.08}>
                <div className="flex items-start gap-4">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-amber-tint text-amber-deep">
                    <item.icon className="size-5" />
                  </span>
                  <div>
                    <p className="font-semibold text-charcoal">{item.label}</p>
                    <p className="mt-1 text-sm text-muted">{item.detail}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/* Who we supply */}
      <Section tone="cream" aria-labelledby="clients-heading">
        <Container>
          <SectionHeading
            id="clients-heading"
            eyebrow="Who we supply"
            title="Eight kinds of kitchen, one dispatch yard"
            description="From a 12-seat café in Lalpur to a 400-cover banquet in Doranda — the grading standard does not change with the order size."
          />

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {clientTypes.map((client, index) => (
              <Reveal key={client.label} delay={Math.min(index, 4) * 0.07}>
                <article className="h-full rounded-2xl border border-border bg-white p-6 shadow-soft transition-all duration-300 ease-out hover:-translate-y-1 hover:border-amber hover:shadow-lift">
                  <span className="flex size-12 items-center justify-center rounded-xl bg-amber-tint text-amber-deep">
                    <client.icon className="size-5" />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold text-charcoal">
                    {client.label}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {client.detail}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Supply plans */}
      <Section tone="white" aria-labelledby="plans-heading">
        <Container>
          <SectionHeading
            id="plans-heading"
            eyebrow="Supply plans"
            title="Three ways to buy in bulk"
            description="Start on-demand, move to a contract when the volumes settle. Switching costs nothing and there is no lock-in period."
          />

          {/* Cards on mobile */}
          <div className="mt-14 grid gap-5 lg:hidden">
            {supplyPlans.map((plan, index) => (
              <Reveal key={plan.id} delay={index * 0.08}>
                <article
                  className={cn(
                    "rounded-2xl border bg-white p-7 shadow-soft",
                    plan.featured ? "border-amber" : "border-border",
                  )}
                >
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="type-h3">{plan.name}</h3>
                    {plan.featured ? <Badge variant="amber">Most popular</Badge> : null}
                  </div>
                  <p className="mt-2 text-muted">{plan.tagline}</p>
                  <dl className="mt-6 space-y-4">
                    {planRows.map((row) => (
                      <div key={row.key}>
                        <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-green">
                          {row.label}
                        </dt>
                        <dd className="mt-1 font-medium text-charcoal">
                          {plan[row.key]}
                        </dd>
                      </div>
                    ))}
                  </dl>
                  <Button asChild variant="amber" className="mt-7 w-full">
                    <a href="#bulk-quote">Request pricing</a>
                  </Button>
                </article>
              </Reveal>
            ))}
          </div>

          {/* Comparison table on desktop */}
          <Reveal delay={0.08} className="mt-14 hidden lg:block">
            <div className="overflow-x-auto rounded-2xl border border-border shadow-soft">
              <table className="w-full min-w-[52rem] border-collapse bg-white text-left">
                <caption className="sr-only">
                  Comparison of Farmyuga bulk vegetable supply plans
                </caption>
                <thead>
                  <tr>
                    <th scope="col" className="w-48 border-b border-border p-6" />
                    {supplyPlans.map((plan) => (
                      <th
                        key={plan.id}
                        scope="col"
                        className={cn(
                          "border-b border-l border-border p-6 align-top",
                          plan.featured && "bg-amber-tint",
                        )}
                      >
                        <span className="flex flex-col gap-2">
                          {plan.featured ? (
                            <Badge variant="amber" className="w-fit bg-white">
                              Most popular
                            </Badge>
                          ) : null}
                          <span className="text-lg font-bold text-charcoal">
                            {plan.name}
                          </span>
                          <span className="text-sm font-normal text-muted">
                            {plan.tagline}
                          </span>
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {planRows.map((row) => (
                    <tr key={row.key} className="align-top">
                      <th
                        scope="row"
                        className="border-b border-border bg-cream p-6 text-sm font-semibold uppercase tracking-[0.1em] text-forest"
                      >
                        {row.label}
                      </th>
                      {supplyPlans.map((plan) => (
                        <td
                          key={plan.id}
                          className={cn(
                            "border-b border-l border-border p-6 font-medium text-charcoal",
                            plan.featured && "bg-amber-tint/40",
                          )}
                        >
                          <span className="flex gap-2">
                            <Check className="mt-1 size-4 shrink-0 text-brand-green" />
                            {plan[row.key]}
                          </span>
                        </td>
                      ))}
                    </tr>
                  ))}
                  <tr>
                    <td className="p-6" />
                    {supplyPlans.map((plan) => (
                      <td
                        key={plan.id}
                        className={cn(
                          "border-l border-border p-6",
                          plan.featured && "bg-amber-tint/40",
                        )}
                      >
                        <Button
                          asChild
                          variant={plan.featured ? "amber" : "secondary"}
                          className="w-full"
                        >
                          <a href="#bulk-quote">Request pricing</a>
                        </Button>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Bulk quote form */}
      <Section tone="cream" aria-labelledby="bulk-quote-heading" id="bulk-quote">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div>
              <Reveal>
                <span className="type-eyebrow text-amber-deep">Bulk quote request</span>
                <h2 id="bulk-quote-heading" className="type-h2 mt-4">
                  Tell us what your kitchen goes through in a month.
                </h2>
                <p className="type-lead mt-5 text-muted">
                  Share your item list and rough volumes. We come back the same day with
                  a written rate card, a suggested plan and the delivery slot we can
                  commit to. No obligation, and no sales follow-up if the numbers
                  don&apos;t work for you.
                </p>
              </Reveal>

              <Reveal delay={0.1}>
                <ul className="mt-8 space-y-3">
                  {[
                    "Written rate card within the day",
                    "One-week trial available before any contract",
                    "GST invoice and signed delivery challans",
                    "Credit terms after three months of clean supply",
                  ].map((point) => (
                    <li key={point} className="flex items-start gap-3">
                      <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-md bg-brand-green text-white">
                        <Check className="size-3.5" />
                      </span>
                      <span className="font-medium text-charcoal">{point}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={0.16}>
                <div className="mt-9 rounded-2xl border border-border bg-white p-6 shadow-soft">
                  <p className="font-semibold text-charcoal">
                    Prefer to talk it through?
                  </p>
                  <p className="mt-1 text-sm text-muted">
                    Our account desk is on the phone from 5 AM.
                  </p>
                  <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                    <Button asChild size="sm">
                      <a href={telLink}>
                        <Phone />
                        {siteConfig.phoneDisplay}
                      </a>
                    </Button>
                    <WhatsAppButton context="bulk" label="WhatsApp" size="sm" variant="secondary" />
                  </div>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.12}>
              <QuoteForm variant="bulk" />
            </Reveal>
          </div>
        </Container>
      </Section>

      <Faq
        items={businessFaqs}
        id="b2b-faq"
        tone="white"
        eyebrow="B2B questions"
        title="What purchase managers ask us first"
        description="Volume spikes, grading, rate movement and who picks up the phone at 5 AM."
      />

      <CtaBand
        title="Start with one week. Judge us on the wastage."
        description="Take a trial week at daily rates with no contract, compare our grading against your current supplier, and decide from there. Most of our standing orders began exactly this way."
        quoteLabel="Request Bulk Pricing"
        quoteHref="/for-businesses#bulk-quote"
      />
    </>
  );
}
