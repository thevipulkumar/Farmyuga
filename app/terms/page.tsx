import type { Metadata } from "next";

import { PageHero } from "@/components/sections/page-hero";
import { Container, Section } from "@/components/shared/container";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Terms of Supply",
  description:
    "Farmyuga's supply terms: ordering, delivery windows, rate quoting, replacements, payment and cancellation for bulk and household customers in Ranchi.",
  alternates: { canonical: "/terms" },
  robots: { index: false, follow: true },
};

const sections = [
  {
    heading: "Ordering",
    body: `Orders are placed by phone, WhatsApp or through the inquiry forms on this website. No order is confirmed until we send you a written confirmation with the day's rate. This website has no cart, no checkout and no payment gateway — nothing you do here charges you anything.`,
  },
  {
    heading: "Rates",
    body: "Vegetable rates move daily with mandi arrivals and weather. Unless you hold a written contract with a locked rate band, the applicable rate is the one confirmed on the morning of delivery. Contract rates stay inside the agreed band for the contract period.",
  },
  {
    heading: "Minimums and delivery",
    body: `Household orders start at ${siteConfig.terms.homeMinOrder} and are delivered ${siteConfig.terms.homeSlots}. Bulk orders start at ${siteConfig.terms.bulkMinOrder} per drop and are delivered in the ${siteConfig.terms.bulkSlot} window. Delivery on ${siteConfig.terms.freeDeliveryArea} is free; other localities may carry a delivery charge below the minimum order value.`,
  },
  {
    heading: "Quality and replacement",
    body: "Every lot is hand-graded before loading. If an item is not up to standard, tell us the same day — we replace it free on the next delivery or credit it against your next bill. Claims raised after the day of delivery cannot be verified and are handled case by case.",
  },
  {
    heading: "Payment",
    body: "We accept cash, UPI and bank transfer. Verified business accounts may be offered 15 or 30-day credit terms after three months of clean supply history, subject to GSTIN and trade licence verification. Overdue balances may pause supply until settled.",
  },
  {
    heading: "Cancellation",
    body: "Household orders can be cancelled or paused any time before 9 PM the previous night at no charge. Bulk standing orders need 24 hours' notice for a skipped day, and 7 days' notice to end a contract, so we can adjust our farm indent fairly.",
  },
  {
    heading: "Things outside our control",
    body: "Crop failure, extreme weather, transport strikes and mandi shutdowns can affect availability. We will always tell you before dispatch rather than substitute an item without asking.",
  },
];

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms of supply"
        description="The commercial ground rules we work by, written the way we would explain them to you on the phone."
      />

      <Section tone="white" aria-labelledby="terms-heading">
        <Container>
          <h2 id="terms-heading" className="sr-only">
            Terms of supply details
          </h2>
          <div className="mx-auto max-w-3xl space-y-10">
            {sections.map((section) => (
              <div key={section.heading}>
                <h3 className="type-h3">{section.heading}</h3>
                <p className="mt-3 text-muted">{section.body}</p>
              </div>
            ))}

            <div className="rounded-2xl border border-border bg-cream p-7">
              <p className="text-muted">
                {siteConfig.legalName} · {siteConfig.address.full} ·{" "}
                {siteConfig.phoneDisplay}
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
