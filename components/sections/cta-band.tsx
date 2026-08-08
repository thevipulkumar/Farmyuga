import Link from "next/link";
import { Phone } from "lucide-react";

import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";
import { Button } from "@/components/ui/button";
import { siteConfig, telLink } from "@/lib/site-config";

type CtaBandProps = {
  title?: string;
  description?: string;
  quoteLabel?: string;
  quoteHref?: string;
};

export function CtaBand({
  title = "Tell us what your kitchen needs tomorrow morning.",
  description = "Send your list on WhatsApp, call us, or fill the quote form. You'll have a rate the same day — and if we can't supply something honestly, we'll say so.",
  quoteLabel = "Get a Quote",
  quoteHref = "/contact",
}: CtaBandProps) {
  return (
    <section aria-labelledby="cta-heading" className="bg-white py-16 md:py-20">
      <Container>
        <Reveal>
          <div className="gradient-brand relative overflow-hidden rounded-3xl px-7 py-14 text-center md:px-16 md:py-20">
            <div
              aria-hidden="true"
              className="leaf-pattern pointer-events-none absolute inset-0 opacity-[0.07]"
            />
            <div
              aria-hidden="true"
              className="glow-green pointer-events-none absolute -left-20 -top-24 size-[28rem] rounded-full blur-2xl"
            />

            <div className="relative mx-auto max-w-3xl">
              <span className="type-eyebrow text-leaf">Taaza sabzi, roz subah</span>
              <h2 id="cta-heading" className="type-h2 mt-4 text-white">
                {title}
              </h2>
              <p className="type-lead mx-auto mt-5 max-w-2xl text-mint/90">
                {description}
              </p>

              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button asChild variant="onDark" size="lg">
                  <a href={telLink}>
                    <Phone />
                    {siteConfig.phoneDisplay}
                  </a>
                </Button>
                <WhatsAppButton
                  context="quote"
                  label="WhatsApp us"
                  size="lg"
                  variant="outlineOnDark"
                />
                <Button asChild variant="outlineOnDark" size="lg">
                  <Link href={quoteHref}>{quoteLabel}</Link>
                </Button>
              </div>

              <p className="mt-7 text-sm text-mint/75">
                Open {siteConfig.hours.label} · {siteConfig.address.full}
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
