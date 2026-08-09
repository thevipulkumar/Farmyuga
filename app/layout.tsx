import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { FloatingWhatsApp } from "@/components/shared/floating-whatsapp";
import { deliveryAreas } from "@/lib/areas";
import { siteConfig } from "@/lib/site-config";

import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Fresh Vegetable Supplier in Ranchi | Ratu Road, Jharkhand`,
    template: `%s | ${siteConfig.name} — Vegetable Supplier, Ranchi`,
  },
  description:
    "Farmyuga is a farm-direct vegetable supplier on Ratu Road, Ranchi. Daily bulk supply for hotels, restaurants and canteens, plus fresh doorstep vegetable delivery for homes across Ranchi.",
  keywords: [
    "vegetable supplier Ranchi",
    "sabzi supplier Ratu Road Ranchi",
    "bulk vegetable vendor Ranchi",
    "fresh vegetable delivery Ranchi",
    "hotel vegetable supply Jharkhand",
    "vegetable wholesaler Ranchi",
    "restaurant vegetable supplier Ranchi",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.legalName,
  applicationName: siteConfig.name,
  alternates: { canonical: "/" },
  category: "Food & Grocery Supply",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — Fresh Vegetable Supplier in Ranchi`,
    description:
      "Farm-direct vegetables delivered every morning across Ranchi. Bulk supply for hotels, restaurants and canteens; doorstep baskets for homes.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — fresh vegetable supplier on Ratu Road, Ranchi`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — Fresh Vegetable Supplier in Ranchi`,
    description:
      "Daily bulk vegetable supply and home delivery across Ranchi, from Ratu Road. Quote-based rates, GST invoicing, 5 AM dispatch.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  formatDetection: { telephone: true, address: true },
};

export const viewport: Viewport = {
  themeColor: "#16A34A",
  width: "device-width",
  initialScale: 1,
};

/** LocalBusiness structured data for Google's local pack. */
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${siteConfig.url}/#localbusiness`,
  name: siteConfig.name,
  legalName: siteConfig.legalName,
  description: siteConfig.shortDescription,
  url: siteConfig.url,
  telephone: siteConfig.phoneRaw,
  email: siteConfig.email,
  priceRange: "₹₹",
  currenciesAccepted: "INR",
  paymentAccepted: "Cash, UPI, Bank Transfer, Credit (verified businesses)",
  foundingDate: String(siteConfig.founded),
  image: `${siteConfig.url}/og-image.png`,
  address: {
    "@type": "PostalAddress",
    streetAddress: siteConfig.address.street,
    addressLocality: siteConfig.address.city,
    addressRegion: siteConfig.address.state,
    postalCode: siteConfig.address.postalCode,
    addressCountry: siteConfig.address.country,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: siteConfig.geo.lat,
    longitude: siteConfig.geo.lng,
  },
  areaServed: deliveryAreas.map((area) => ({
    "@type": "Place",
    name: `${area.name}, Ranchi, Jharkhand`,
  })),
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: siteConfig.hours.opens,
      closes: siteConfig.hours.closes,
    },
  ],
  sameAs: Object.values(siteConfig.social),
  knowsAbout: [
    "Bulk vegetable supply",
    "Hotel and restaurant vegetable supply",
    "Fresh vegetable home delivery",
    "Farm-direct sourcing",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className={poppins.variable}>
      <head>
        {/* Entrance animations start at opacity 0. Without JS they'd never
            run, so force everything visible for no-script visitors. */}
        <noscript>
          <style>{`[style*="opacity:0"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-brand-green focus:px-5 focus:py-3 focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>

        <Header />
        <main id="main">{children}</main>
        <Footer />
        <FloatingWhatsApp />

        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </body>
    </html>
  );
}
