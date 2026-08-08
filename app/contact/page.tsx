import type { Metadata } from "next";
import { Clock, Mail, MapPin, Navigation, Phone } from "lucide-react";

import { PageHero } from "@/components/sections/page-hero";
import { Container, Section } from "@/components/shared/container";
import { QuoteForm } from "@/components/shared/quote-form";
import { Reveal } from "@/components/shared/reveal";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";
import { Button } from "@/components/ui/button";
import { deliveryAreas } from "@/lib/areas";
import { mailtoLink, siteConfig, telLink } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact Farmyuga — Vegetable Supplier on Ratu Road, Ranchi",
  description:
    "Call, WhatsApp or send an inquiry to Farmyuga, a fresh vegetable supplier on Ratu Road, Ranchi. Open Mon–Sun, 5:00 AM – 8:00 PM. Bulk quotes and home delivery across Ranchi.",
  alternates: { canonical: "/contact" },
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ item?: string }>;
}) {
  const { item } = await searchParams;
  const defaultRequirement = item
    ? `I'd like today's rate for ${item}. Quantity needed: `
    : "";

  return (
    <>
      <PageHero
        eyebrow="Contact & quotes"
        title="Send us your list. We'll send today's rate."
        description={
          <>
            <p>
              Whether it&apos;s 40 kg of aloo for a restaurant or a weekly basket for the
              family, the fastest route is a message. We answer every inquiry the same
              day — usually within two hours during business hours.
            </p>
            <p className="mt-4 font-semibold text-forest">
              Taaza sabzi, roz subah — {siteConfig.hours.label}.
            </p>
          </>
        }
        actions={
          <>
            <Button asChild size="lg">
              <a href={telLink}>
                <Phone />
                {siteConfig.phoneDisplay}
              </a>
            </Button>
            <WhatsAppButton context="general" label="WhatsApp us" size="lg" variant="secondary" />
          </>
        }
      />

      <Section tone="white" aria-labelledby="contact-heading">
        <Container>
          <h2 id="contact-heading" className="sr-only">
            Contact Farmyuga
          </h2>

          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
            {/* Form */}
            <Reveal>
              <div>
                <span className="type-eyebrow text-brand-green">Inquiry form</span>
                <h3 className="type-h2 mt-4">Tell us what you need</h3>
                <p className="mt-4 max-w-xl text-muted">
                  One form for homes and businesses. Pick which you are and the fields
                  adjust. Nothing here is a commitment — it just gets you a real number.
                </p>
                <QuoteForm
                  variant="general"
                  defaultRequirement={defaultRequirement}
                  className="mt-8"
                />
              </div>
            </Reveal>

            {/* Details + map */}
            <div className="space-y-6">
              <Reveal delay={0.08}>
                <div className="rounded-2xl border border-border bg-cream p-7 shadow-soft">
                  <h3 className="type-h3">Reach us directly</h3>
                  <ul className="mt-6 space-y-5">
                    <li className="flex gap-4">
                      <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white text-brand-green shadow-soft">
                        <MapPin className="size-5" />
                      </span>
                      <div>
                        <p className="font-semibold text-charcoal">Our yard</p>
                        <address className="mt-1 not-italic text-muted">
                          {siteConfig.address.street}
                          <br />
                          {siteConfig.address.city}, {siteConfig.address.state}{" "}
                          {siteConfig.address.postalCode}
                        </address>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white text-brand-green shadow-soft">
                        <Phone className="size-5" />
                      </span>
                      <div>
                        <p className="font-semibold text-charcoal">Phone</p>
                        <a
                          href={telLink}
                          className="mt-1 block font-medium text-brand-green transition-colors duration-200 hover:text-forest"
                        >
                          {siteConfig.phoneDisplay}
                        </a>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white text-brand-green shadow-soft">
                        <Mail className="size-5" />
                      </span>
                      <div>
                        <p className="font-semibold text-charcoal">Email</p>
                        <a
                          href={mailtoLink}
                          className="mt-1 block font-medium text-brand-green transition-colors duration-200 hover:text-forest"
                        >
                          {siteConfig.email}
                        </a>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white text-brand-green shadow-soft">
                        <Clock className="size-5" />
                      </span>
                      <div>
                        <p className="font-semibold text-charcoal">Business hours</p>
                        <p className="mt-1 text-muted">{siteConfig.hours.label}</p>
                        <p className="mt-1 text-sm text-muted">
                          Bulk dispatch 5:00–8:00 AM · Home slots{" "}
                          {siteConfig.terms.homeSlots}
                        </p>
                      </div>
                    </li>
                  </ul>

                  <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                    <WhatsAppButton context="general" label="Chat on WhatsApp" size="lg" />
                    <Button asChild variant="secondary" size="lg">
                      <a
                        href={siteConfig.mapDirectionsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Navigation />
                        Directions
                      </a>
                    </Button>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.14}>
                <div className="overflow-hidden rounded-2xl border border-border shadow-soft">
                  <iframe
                    src={siteConfig.mapEmbedSrc}
                    title={`Map showing ${siteConfig.name} in ${siteConfig.address.locality}, ${siteConfig.address.city}`}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="h-80 w-full border-0"
                  />
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="rounded-2xl border border-border bg-white p-7 shadow-soft">
                  <h3 className="text-lg font-semibold text-charcoal">
                    Areas we deliver to
                  </h3>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {deliveryAreas.map((area) => (
                      <li
                        key={area.name}
                        className="rounded-lg bg-mint px-3 py-1.5 text-sm font-semibold text-forest"
                      >
                        {area.name}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-sm text-muted">
                    Outside this list? For bulk orders we build custom routes across
                    greater Ranchi — ask us.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
