import type { Metadata } from "next";

import { AudienceSplit } from "@/components/sections/audience-split";
import { CtaBand } from "@/components/sections/cta-band";
import { DeliveryAreas } from "@/components/sections/delivery-areas";
import { Faq } from "@/components/sections/faq";
import { FarmerStory } from "@/components/sections/farmer-story";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Products } from "@/components/sections/products";
import { Testimonials } from "@/components/sections/testimonials";
import { TrustStrip } from "@/components/sections/trust-strip";
import { WhyUs } from "@/components/sections/why-us";
import { generalFaqs } from "@/lib/faq";

export const metadata: Metadata = {
  title: "Fresh Vegetable Supplier in Ranchi | Ratu Road, Jharkhand",
  description:
    "Farmyuga supplies farm-fresh vegetables across Ranchi every morning — bulk crates for hotels, restaurants and canteens, and doorstep delivery for homes. Based on Ratu Road, serving 12 localities, 7 days a week.",
  alternates: { canonical: "/" },
};

/** FAQPage schema so the home page FAQ can win rich results. */
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: generalFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <AudienceSplit />
      <Products />
      <WhyUs />
      <HowItWorks />
      <DeliveryAreas />
      <Testimonials />
      <FarmerStory />
      <Faq items={generalFaqs} tone="white" />
      <CtaBand />

      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
