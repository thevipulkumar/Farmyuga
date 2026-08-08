/* =====================================================================
   FARMYUGA — SINGLE SOURCE OF TRUTH FOR BUSINESS DETAILS
   ---------------------------------------------------------------------
   OWNER: everything on this page feeds the header, footer, WhatsApp
   buttons, contact page, JSON-LD schema and sitemap. Change a value here
   once and every page updates.

   ALREADY SET TO YOUR REAL DETAILS:
     • phoneDisplay / phoneRaw   +91 72099 09097
     • whatsappNumber            917209909097
     • address                   Ratu Road, Ranchi, Jharkhand 834001

   STILL PLACEHOLDERS — replace before going live:
     • url                       (line ~24)  — your live domain
     • email                     (line ~37)  — your inquiries inbox
     • geo.lat / geo.lng         (line ~55)  — drop an exact pin on Google Maps
     • gstin                     (line ~67)  — your GST number
     • social.*                  (line ~71)  — your real profiles
   ===================================================================== */

export const siteConfig = {
  name: "Farmyuga",
  legalName: "Farmyuga Fresh Vegetable Supply",
  tagline: "Fresh from the farm, every single morning.",
  shortDescription:
    "Farmyuga is a vegetable supplier and vendor based on Ratu Road, Ranchi — supplying hotels, restaurants, canteens and households with farm-fresh vegetables every morning.",

  /** PLACEHOLDER — your live domain, no trailing slash. */
  url: "https://farmyuga.com",

  founded: 2019,

  /** Displayed in the header, footer and contact page. */
  phoneDisplay: "+91 72099 09097",
  /** Used in tel: links. Digits only, with country code. */
  phoneRaw: "+917209909097",

  /** WhatsApp number in wa.me format (country code, no +). */
  whatsappNumber: "917209909097",

  /** PLACEHOLDER — inquiries inbox. */
  email: "hello@farmyuga.com",

  address: {
    /** Add your shop / godown name and landmark here if you have one. */
    street: "Ratu Road",
    locality: "Ratu Road",
    city: "Ranchi",
    state: "Jharkhand",
    postalCode: "834001",
    country: "IN",
    countryName: "India",
    full: "Ratu Road, Ranchi, Jharkhand 834001, India",
    short: "Ratu Road, Ranchi, Jharkhand 834001",
  },

  /** PLACEHOLDER — approximate coordinates for Ratu Road, Ranchi.
   *  Drop an exact pin on Google Maps and paste the real numbers here. */
  geo: {
    lat: 23.3608,
    lng: 85.2837,
  },

  hours: {
    label: "Mon–Sun, 5:00 AM – 8:00 PM",
    schemaDays: "Mo,Tu,We,Th,Fr,Sa,Su",
    opens: "05:00",
    closes: "20:00",
  },

  /** PLACEHOLDER — your GST number, shown on the B2B page. */
  gstin: "20XXXXXXXXXXXZX",

  /** PLACEHOLDER — replace with your real profiles (or remove entries). */
  social: {
    facebook: "https://facebook.com/farmyuga",
    instagram: "https://instagram.com/farmyuga",
    youtube: "https://youtube.com/@farmyuga",
  },

  /** Google Maps embed centred on Ratu Road, Ranchi. Swap the query for your exact address. */
  mapEmbedSrc:
    "https://www.google.com/maps?q=Ratu%20Road%2C%20Ranchi%2C%20Jharkhand%20834001&hl=en&z=14&output=embed",
  mapDirectionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=Ratu+Road%2C+Ranchi%2C+Jharkhand+834001",

  /** Commercial ground rules quoted across the site. */
  terms: {
    homeMinOrder: "₹300",
    bulkMinOrder: "25 kg",
    bulkSlot: "5:00 – 8:00 AM",
    homeSlots: "7:00 – 11:00 AM and 4:00 – 7:00 PM",
    freeDeliveryArea: "Ratu Road",
  },
} as const;

type WhatsAppContext = "general" | "bulk" | "home" | "quote";

const whatsappMessages: Record<WhatsAppContext, string> = {
  general:
    "Hi Farmyuga! I found you online and would like to know more about your vegetable supply.",
  bulk: "Hi Farmyuga! I run a business in Ranchi and need a bulk vegetable supply quote. Please share your daily rate card.",
  home: "Hi Farmyuga! I'd like to order fresh vegetables for my home in Ranchi. Please share today's availability.",
  quote:
    "Hi Farmyuga! Please send me a quote for the vegetables I need this week.",
};

/** Builds a wa.me link with a pre-filled, context-aware message. */
export function whatsappLink(context: WhatsAppContext = "general") {
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
    whatsappMessages[context],
  )}`;
}

/** tel: link for the business phone number. */
export const telLink = `tel:${siteConfig.phoneRaw}`;

/** mailto: link for the business inbox. */
export const mailtoLink = `mailto:${siteConfig.email}`;

export type NavItem = { label: string; href: string };

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "For Businesses", href: "/for-businesses" },
  { label: "Delivery Areas", href: "/#delivery-areas" },
  { label: "Contact", href: "/contact" },
];
