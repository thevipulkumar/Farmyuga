import type { Metadata } from "next";

import { PageHero } from "@/components/sections/page-hero";
import { Container, Section } from "@/components/shared/container";
import { mailtoLink, siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How Farmyuga collects, uses and protects the information you share through inquiries and orders.`,
  alternates: { canonical: "/privacy" },
  robots: { index: false, follow: true },
};

const sections = [
  {
    heading: "What we collect",
    body: "Only what you type into an inquiry form or send us on WhatsApp: your name, phone number, optional email, locality, business name where relevant, and the requirement you describe. We do not ask for payment details anywhere on this website, and there is no checkout to collect them.",
  },
  {
    heading: "Why we collect it",
    body: "To quote a rate, plan a delivery route and stay in touch about your order. Business inquiries are also used to prepare GST invoices and delivery challans. Nothing more.",
  },
  {
    heading: "Who sees it",
    body: "Our own team on Ratu Road, and the hosting and messaging services we use to run this site (currently our website host and WhatsApp). We do not sell, rent or share your details with advertisers, data brokers or other suppliers.",
  },
  {
    heading: "How long we keep it",
    body: "Inquiry records are kept for as long as you are an active customer, plus the period our accounts require for GST records. Ask us to delete your details and we will, except where tax law requires us to retain an invoice.",
  },
  {
    heading: "Cookies and analytics",
    body: "This site does not set advertising cookies and does not run third-party ad trackers. The embedded Google Map on our contact page is loaded from Google and is subject to Google's own privacy terms.",
  },
  {
    heading: "Your choices",
    body: "You can ask us at any time what we hold about you, correct it, or ask us to stop contacting you. One message is enough — we do not run a marketing list you need to escape from.",
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy policy"
        description="Plain-language version: we collect what you tell us so we can quote and deliver, we keep it to ourselves, and you can ask us to delete it."
      />

      <Section tone="white" aria-labelledby="privacy-heading">
        <Container>
          <h2 id="privacy-heading" className="sr-only">
            Privacy policy details
          </h2>
          <div className="mx-auto max-w-3xl space-y-10">
            {sections.map((section) => (
              <div key={section.heading}>
                <h3 className="type-h3">{section.heading}</h3>
                <p className="mt-3 text-muted">{section.body}</p>
              </div>
            ))}

            <div className="rounded-2xl border border-border bg-cream p-7">
              <h3 className="type-h3">Questions about your data</h3>
              <p className="mt-3 text-muted">
                Write to{" "}
                <a
                  href={mailtoLink}
                  className="font-semibold text-brand-green hover:text-forest"
                >
                  {siteConfig.email}
                </a>{" "}
                or call {siteConfig.phoneDisplay}. Our address is{" "}
                {siteConfig.address.full}.
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
