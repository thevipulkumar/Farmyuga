"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container, Section } from "@/components/shared/container";
import { ProductCard } from "@/components/shared/product-card";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { homeProducts, productCategories } from "@/lib/products";

export function Products() {
  const [category, setCategory] = React.useState<string>("all");

  const visible = React.useMemo(
    () =>
      category === "all"
        ? homeProducts
        : homeProducts.filter((product) => product.category === category),
    [category],
  );

  const activeBlurb = productCategories.find((c) => c.id === category)?.blurb;

  return (
    <Section tone="cream" aria-labelledby="products-heading" id="products">
      <Container>
        <SectionHeading
          id="products-heading"
          eyebrow="What's on the crate today"
          title="40+ vegetables, graded before they're weighed"
          description="Everyday sabzi, winter specials and exotics for continental menus. Rates are quoted daily — tell us what you need and we'll send today's number."
        />

        <Reveal delay={0.08} className="mt-10">
          <Tabs value={category} onValueChange={setCategory}>
            <TabsList aria-label="Filter vegetables by category">
              <TabsTrigger value="all">All</TabsTrigger>
              {productCategories.map((cat) => (
                <TabsTrigger key={cat.id} value={cat.id}>
                  {cat.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          {activeBlurb ? (
            <p className="mt-4 text-sm font-medium text-muted">{activeBlurb}</p>
          ) : null}
        </Reveal>

        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 xl:grid-cols-4">
          {visible.map((product, index) => (
            <Reveal key={product.id} delay={Math.min(index, 7) * 0.05}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="mt-12 flex flex-col items-center gap-4 text-center">
          <p className="font-medium text-muted">
            Looking for something not listed? We stock 40+ varieties and can indent
            almost anything grown in Jharkhand.
          </p>
          <Button asChild variant="secondary" size="lg">
            <Link href="/products">
              See the full catalogue
              <ArrowRight />
            </Link>
          </Button>
        </Reveal>
      </Container>
    </Section>
  );
}
