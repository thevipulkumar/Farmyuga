import type { Metadata } from "next";
import Link from "next/link";
import { CalendarRange, IndianRupee, Leaf } from "lucide-react";

import { CtaBand } from "@/components/sections/cta-band";
import { PageHero } from "@/components/sections/page-hero";
import { ProductExplorer } from "@/components/sections/product-explorer";
import { Container, Section } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";
import { Button } from "@/components/ui/button";
import { productCategories } from "@/lib/products";

export const metadata: Metadata = {
  title: "Vegetable Catalogue — 40+ Varieties Supplied Daily in Ranchi",
  description:
    "Browse Farmyuga's vegetable catalogue: leafy greens, root vegetables, gourds and beans, onion-potato-tomato, exotics and herbs. Supplied daily across Ranchi from Ratu Road. Rates quoted on request.",
  alternates: { canonical: "/products" },
};

const notes = [
  {
    icon: IndianRupee,
    title: "Rates are quoted daily",
    body: "We publish no fixed price list. Vegetable rates move with Pandra mandi arrivals and the weather, sometimes twice in a week. Ask us and you'll get today's honest number, not last month's.",
  },
  {
    icon: CalendarRange,
    title: "Seasonal items come and go",
    body: "Anything marked Seasonal has a window — matar and methi peak from October to February, kaddu through the monsoon. We'll tell you when something is about to finish for the year.",
  },
  {
    icon: Leaf,
    title: "Can't find it? Ask anyway",
    body: "The catalogue lists what moves most. We regularly indent zucchini, lettuce, celery, red cabbage, sweet corn and more for cafés and cloud kitchens on a day's notice.",
  },
];

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const valid = productCategories.some((c) => c.id === category);

  return (
    <>
      <PageHero
        eyebrow="Product catalogue"
        title="40+ vegetables, crated fresh every morning."
        description={
          <>
            <p>
              Everyday sabzi for households, bulk lines for hotels and canteens, and
              exotics for continental menus — all sourced from the same farm-direct
              network across Ratu, Kanke and Bero.
            </p>
            <p className="mt-4 font-semibold text-forest">
              We display no prices. Rates are quoted daily, because that is how
              vegetables actually work.
            </p>
          </>
        }
        actions={
          <>
            <WhatsAppButton context="quote" label="Ask for today's rates" size="lg" />
            <Button asChild variant="secondary" size="lg">
              <Link href="/contact">Send a requirement list</Link>
            </Button>
          </>
        }
      />

      <ProductExplorer initialCategory={valid ? category : "all"} />

      <Section tone="cream" aria-labelledby="notes-heading">
        <Container>
          <Reveal className="max-w-3xl">
            <span className="type-eyebrow text-brand-green">Before you order</span>
            <h2 id="notes-heading" className="type-h2 mt-4">
              Three things worth knowing
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-5 md:grid-cols-3 md:gap-6">
            {notes.map((note, index) => (
              <Reveal key={note.title} delay={index * 0.08}>
                <article className="h-full rounded-2xl border border-border bg-white p-7 shadow-soft transition-all duration-300 ease-out hover:-translate-y-1 hover:border-leaf hover:shadow-lift">
                  <span className="flex size-13 items-center justify-center rounded-xl bg-mint text-brand-green">
                    <note.icon className="size-6" />
                  </span>
                  <h3 className="type-h3 mt-6">{note.title}</h3>
                  <p className="mt-3 text-muted">{note.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <CtaBand
        title="Send us your list. We'll send today's rate."
        description="WhatsApp a photo of your indent sheet or type it out — whatever is quicker. Most quotes go back within the hour during business hours."
      />
    </>
  );
}
