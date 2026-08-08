import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

import { Container } from "@/components/shared/container";
import { LeafMark } from "@/components/shared/brand";
import {
  FacebookIcon,
  InstagramIcon,
  YoutubeIcon,
} from "@/components/shared/social-icons";
import { WhatsAppIcon } from "@/components/shared/whatsapp-button";
import { productCategories } from "@/lib/products";
import { mailtoLink, siteConfig, telLink, whatsappLink } from "@/lib/site-config";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Farmyuga", href: "/about" },
  { label: "Product Catalogue", href: "/products" },
  { label: "For Businesses", href: "/for-businesses" },
  { label: "Delivery Areas", href: "/#delivery-areas" },
  { label: "Contact & Quote", href: "/contact" },
];

const socials = [
  { label: "Facebook", href: siteConfig.social.facebook, Icon: FacebookIcon },
  { label: "Instagram", href: siteConfig.social.instagram, Icon: InstagramIcon },
  { label: "YouTube", href: siteConfig.social.youtube, Icon: YoutubeIcon },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-forest text-mint">
      <div
        aria-hidden="true"
        className="leaf-pattern pointer-events-none absolute inset-0 opacity-[0.04]"
      />
      <Container className="relative">
        <div className="grid gap-12 py-16 md:grid-cols-2 md:py-20 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5">
              <LeafMark className="text-leaf" />
              <span className="text-xl font-extrabold tracking-tight text-white">
                {siteConfig.name}
              </span>
            </div>
            <p className="mt-5 text-mint/80">
              Ranchi&apos;s farm-direct vegetable supplier. We buy at the field in Ratu,
              Kanke and Bero, grade every lot by hand before sunrise, and deliver to
              commercial kitchens and family kitchens across the city by morning.
            </p>
            <p className="mt-4 text-sm font-semibold text-leaf">
              Taaza sabzi, roz subah.
            </p>
            <ul className="mt-6 flex items-center gap-3">
              {socials.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${siteConfig.name} on ${label}`}
                    className="flex size-10 items-center justify-center rounded-lg bg-white/10 text-mint transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-leaf hover:text-forest"
                  >
                    <Icon />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links */}
          <nav aria-labelledby="footer-links">
            <h2 id="footer-links" className="text-base font-bold text-white">
              Quick links
            </h2>
            <ul className="mt-5 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-mint/80 transition-colors duration-200 hover:text-leaf"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Categories */}
          <nav aria-labelledby="footer-categories">
            <h2 id="footer-categories" className="text-base font-bold text-white">
              What we supply
            </h2>
            <ul className="mt-5 space-y-3">
              {productCategories.map((category) => (
                <li key={category.id}>
                  <Link
                    href={`/products?category=${category.id}`}
                    className="text-mint/80 transition-colors duration-200 hover:text-leaf"
                  >
                    {category.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h2 className="text-base font-bold text-white">Reach us</h2>
            <ul className="mt-5 space-y-4 text-mint/80">
              <li className="flex gap-3">
                <MapPin className="mt-1 size-5 shrink-0 text-leaf" />
                <address className="not-italic">
                  {siteConfig.address.street}
                  <br />
                  {siteConfig.address.city}, {siteConfig.address.state}{" "}
                  {siteConfig.address.postalCode}
                  <br />
                  {siteConfig.address.countryName}
                </address>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-1 size-5 shrink-0 text-leaf" />
                <a
                  href={telLink}
                  className="font-semibold text-white transition-colors duration-200 hover:text-leaf"
                >
                  {siteConfig.phoneDisplay}
                </a>
              </li>
              <li className="flex gap-3">
                <WhatsAppIcon className="mt-1 size-5 shrink-0 text-leaf" />
                <a
                  href={whatsappLink("general")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-200 hover:text-leaf"
                >
                  WhatsApp us
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-1 size-5 shrink-0 text-leaf" />
                <a
                  href={mailtoLink}
                  className="transition-colors duration-200 hover:text-leaf"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex gap-3">
                <Clock className="mt-1 size-5 shrink-0 text-leaf" />
                <span>{siteConfig.hours.label}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pb-28 pt-7 text-sm text-mint/70 md:flex-row md:pb-24">
          <p>
            © {year} {siteConfig.legalName}. All rights reserved.
          </p>
          <ul className="flex items-center gap-6">
            <li>
              <Link
                href="/privacy"
                className="transition-colors duration-200 hover:text-leaf"
              >
                Privacy
              </Link>
            </li>
            <li>
              <Link
                href="/terms"
                className="transition-colors duration-200 hover:text-leaf"
              >
                Terms
              </Link>
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  );
}
