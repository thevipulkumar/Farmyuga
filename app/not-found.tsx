import Link from "next/link";
import { ArrowRight, Home } from "lucide-react";

import { Container } from "@/components/shared/container";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-cream py-28 md:py-36">
      <div
        aria-hidden="true"
        className="glow-green pointer-events-none absolute -left-32 -top-32 size-[32rem] rounded-full blur-2xl"
      />
      <Container className="relative">
        <div className="mx-auto max-w-2xl text-center">
          <span className="type-eyebrow text-brand-green">404 — page not found</span>
          <h1 className="type-h1 mt-5">This crate came up empty.</h1>
          <p className="type-lead mx-auto mt-6 max-w-xl text-muted">
            The page you were after has moved or never existed. The vegetables, however,
            are exactly where they should be.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/">
                <Home />
                Back to home
              </Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href="/products">
                Browse the catalogue
                <ArrowRight />
              </Link>
            </Button>
            <WhatsAppButton context="general" label="Ask us" size="lg" variant="secondary" />
          </div>
        </div>
      </Container>
    </section>
  );
}
