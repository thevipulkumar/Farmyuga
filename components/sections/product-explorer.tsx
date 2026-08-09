"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { Search, SearchX } from "lucide-react";

import { ProductCard } from "@/components/shared/product-card";
import { Reveal } from "@/components/shared/reveal";
import { Container, Section } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { productCategories, products } from "@/lib/products";

/**
 * Reads ?category= on the client. The site is a static export, so there is no
 * server to hand us searchParams — useSearchParams resolves after hydration,
 * which is why the whole thing sits inside a Suspense boundary below.
 */
function ProductExplorerInner() {
  const searchParams = useSearchParams();
  const requested = searchParams.get("category");
  const initialCategory = productCategories.some((c) => c.id === requested)
    ? requested!
    : "all";

  const [category, setCategory] = React.useState(initialCategory);
  const [query, setQuery] = React.useState("");

  const visible = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((product) => {
      const matchesCategory = category === "all" || product.category === category;
      const matchesQuery =
        q.length === 0 ||
        product.name.toLowerCase().includes(q) ||
        product.hindi.includes(query.trim()) ||
        product.blurb.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  const activeBlurb = productCategories.find((c) => c.id === category)?.blurb;

  return (
    <Section tone="white" aria-labelledby="catalogue-heading" id="catalogue">
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <Reveal className="max-w-2xl">
            <span className="type-eyebrow text-brand-green">Full catalogue</span>
            <h2 id="catalogue-heading" className="type-h2 mt-4">
              Everything we crate, in one place
            </h2>
            <p className="mt-4 text-muted">
              Filter by category or search in English or Hindi — try &ldquo;palak&rdquo;,
              &ldquo;पालक&rdquo; or &ldquo;mushroom&rdquo;.
            </p>
          </Reveal>

          <Reveal delay={0.08} className="w-full lg:max-w-sm">
            <label htmlFor="product-search" className="sr-only">
              Search vegetables
            </label>
            <div className="relative">
              <Search
                aria-hidden="true"
                className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-brand-green"
              />
              <Input
                id="product-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search vegetables…"
                className="pl-11"
              />
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="mt-8">
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
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
            <p className="text-sm font-semibold text-charcoal">
              {visible.length} {visible.length === 1 ? "item" : "items"}
            </p>
            {activeBlurb ? (
              <p className="text-sm font-medium text-muted">{activeBlurb}</p>
            ) : null}
          </div>
        </Reveal>

        {visible.length > 0 ? (
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 xl:grid-cols-4">
            {visible.map((product, index) => (
              <Reveal key={product.id} delay={Math.min(index, 7) * 0.05}>
                <ProductCard product={product} eager={index < 4} />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="mt-10 flex flex-col items-center gap-4 rounded-2xl border border-border bg-cream px-6 py-16 text-center">
            <span className="flex size-14 items-center justify-center rounded-2xl bg-white text-brand-green shadow-soft">
              <SearchX className="size-6" />
            </span>
            <h3 className="type-h3">Nothing matches that yet</h3>
            <p className="max-w-md text-muted">
              We stock more than 40 varieties and can indent most things grown in
              Jharkhand. Ask us directly — if it can be sourced, we will quote it.
            </p>
            <Button
              variant="secondary"
              onClick={() => {
                setQuery("");
                setCategory("all");
              }}
            >
              Clear filters
            </Button>
          </div>
        )}
      </Container>
    </Section>
  );
}

/**
 * useSearchParams must be wrapped in Suspense so the rest of the page can be
 * prerendered as static HTML.
 */
export function ProductExplorer() {
  return (
    <React.Suspense fallback={<ProductExplorerFallback />}>
      <ProductExplorerInner />
    </React.Suspense>
  );
}

function ProductExplorerFallback() {
  return (
    <Section tone="white" aria-labelledby="catalogue-heading" id="catalogue">
      <Container>
        <span className="type-eyebrow text-brand-green">Full catalogue</span>
        <h2 id="catalogue-heading" className="type-h2 mt-4">
          Everything we crate, in one place
        </h2>
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="h-72 animate-pulse rounded-2xl border border-border bg-cream"
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
