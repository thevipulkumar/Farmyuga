import {
  Award,
  BadgeCheck,
  Boxes,
  Building2,
  CalendarCheck,
  ClipboardList,
  Clock,
  Coffee,
  FileText,
  HandCoins,
  Handshake,
  HeartHandshake,
  Home,
  Hotel,
  IndianRupee,
  Leaf,
  MessageCircle,
  Package,
  Route,
  Scale,
  School,
  ShieldCheck,
  ShoppingBasket,
  Sprout,
  Store,
  Sunrise,
  ThermometerSnowflake,
  Timer,
  Tractor,
  Truck,
  UtensilsCrossed,
  Users,
  Warehouse,
  type LucideIcon,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Trust strip                                                         */
/* ------------------------------------------------------------------ */

export type TrustStat = {
  value: number;
  suffix: string;
  label: string;
  detail: string;
};

export const trustStats: TrustStat[] = [
  { value: 500, suffix: "+", label: "Regular customers", detail: "Homes, hotels and canteens across Ranchi" },
  { value: 40, suffix: "+", label: "Vegetable varieties", detail: "Everyday sabzi plus exotic on indent" },
  { value: 120, suffix: "+", label: "Partner farmers", detail: "Ratu, Kanke and Bero blocks" },
  { value: 7, suffix: " days", label: "A week, delivered", detail: "No Sunday gap, no festival gap" },
];

/* ------------------------------------------------------------------ */
/* Two-path selector                                                   */
/* ------------------------------------------------------------------ */

export type AudiencePath = {
  id: "bulk" | "home";
  eyebrow: string;
  title: string;
  description: string;
  points: { icon: LucideIcon; text: string }[];
  ctaLabel: string;
  ctaHref: string;
  secondaryLabel: string;
  secondaryHref: string;
};

export const audiencePaths: AudiencePath[] = [
  {
    id: "bulk",
    eyebrow: "For Businesses",
    title: "Bulk supply your kitchen can set a clock by",
    description:
      "Hotels, restaurants, cafés, cloud kitchens, caterers, hostels, PGs, hospital canteens, corporate cafeterias and kirana retailers. One indent, one invoice, one morning window.",
    points: [
      { icon: Boxes, text: "Bulk crates, graded and weighed before loading" },
      { icon: Scale, text: "Fixed daily rates — locked rate bands on contract" },
      { icon: FileText, text: "GST invoicing against your GSTIN" },
      { icon: HandCoins, text: "15 or 30-day credit terms for verified accounts" },
      { icon: Users, text: "A named account manager, not a call centre" },
      { icon: Clock, text: "Delivered in the 5–8 AM slot, seven days a week" },
    ],
    ctaLabel: "Request Bulk Pricing",
    ctaHref: "/for-businesses#bulk-quote",
    secondaryLabel: "See supply plans",
    secondaryHref: "/for-businesses",
  },
  {
    id: "home",
    eyebrow: "For Homes",
    title: "Taaza sabzi at your door, roz subah",
    description:
      "Families across Ranchi who want mandi-fresh vegetables without the 6 AM trip to Pandra. Order the way you already message — on WhatsApp.",
    points: [
      { icon: Home, text: "Doorstep delivery across 12 Ranchi localities" },
      { icon: ShoppingBasket, text: "Weekly basket subscription, built around the season" },
      { icon: MessageCircle, text: "Order on WhatsApp — send a list, we confirm the rate" },
      { icon: IndianRupee, text: "Minimum order ₹300, free delivery on Ratu Road" },
      { icon: Timer, text: "Same-day delivery on orders placed before 9 AM" },
      { icon: BadgeCheck, text: "Not fresh? We replace it on the next delivery" },
    ],
    ctaLabel: "Order on WhatsApp",
    ctaHref: "#whatsapp-home",
    secondaryLabel: "Browse the catalogue",
    secondaryHref: "/products",
  },
];

/* ------------------------------------------------------------------ */
/* Why Farmyuga                                                        */
/* ------------------------------------------------------------------ */

export type Feature = { icon: LucideIcon; title: string; body: string };

export const whyFarmyuga: Feature[] = [
  {
    icon: Tractor,
    title: "Direct farm sourcing",
    body: "We buy at the field from 120+ smallholder farmers in Ratu, Kanke and Bero. No commission agent, no second mandi hop — which is exactly why our rate holds.",
  },
  {
    icon: Sunrise,
    title: "Same-day harvest to delivery",
    body: "Cut before dawn, sorted by 4:30 AM, on your counter by 8. Nothing sits in a godown overnight waiting for a buyer.",
  },
  {
    icon: ShieldCheck,
    title: "Hand-graded quality check",
    body: "Every lot is graded twice — once at sorting, once at loading. Soft, split or over-mature pieces are pulled out before they are ever weighed for you.",
  },
  {
    icon: Scale,
    title: "Transparent daily rate card",
    body: "One WhatsApp message by 6 AM with the day's rate for every item. Same rate for the hotel and the household — no quiet mark-up because you did not ask.",
  },
  {
    icon: ThermometerSnowflake,
    title: "Cold-chain safe handling",
    body: "Leafy greens travel in ventilated crates with ice packs; mushrooms and exotics move in insulated boxes. Shade-loaded, never left standing in the sun.",
  },
  {
    icon: CalendarCheck,
    title: "Reliable 7-day supply",
    body: "Sunday, Holi, Diwali — the vans still run. In six years we have missed three mornings, and we called every client before they noticed.",
  },
];

/* ------------------------------------------------------------------ */
/* How it works                                                        */
/* ------------------------------------------------------------------ */

export type Step = {
  number: string;
  icon: LucideIcon;
  title: string;
  bulk: string;
  home: string;
};

export const howItWorks: Step[] = [
  {
    number: "01",
    icon: ClipboardList,
    title: "Share your requirement",
    bulk: "Send your item list with monthly volumes and your delivery window.",
    home: "WhatsApp a list — or just say 'weekly basket for four'.",
  },
  {
    number: "02",
    icon: IndianRupee,
    title: "Get a same-day quote",
    bulk: "A written rate card, contract band and credit terms within the day.",
    home: "We confirm today's rate and the total before we pack anything.",
  },
  {
    number: "03",
    icon: Sprout,
    title: "We harvest & grade",
    bulk: "Indented with our farmer group, cut to order, graded and crated.",
    home: "Picked from the same morning lot the restaurants buy from.",
  },
  {
    number: "04",
    icon: Truck,
    title: "Morning doorstep delivery",
    bulk: "At your gate in the 5–8 AM slot with a signed challan.",
    home: "Between 7 and 11 AM, or the evening slot if you prefer.",
  },
];

/* ------------------------------------------------------------------ */
/* B2B page                                                            */
/* ------------------------------------------------------------------ */

export type ClientType = { icon: LucideIcon; label: string; detail: string };

export const clientTypes: ClientType[] = [
  { icon: Hotel, label: "Hotels & banquets", detail: "Standing orders, event spikes, GST billing" },
  { icon: UtensilsCrossed, label: "Restaurants & cafés", detail: "Daily crates before prep starts" },
  { icon: Coffee, label: "Cloud kitchens", detail: "Pre-graded exotics, 6 AM drop" },
  { icon: Package, label: "Caterers", detail: "Event-based indent with 48-hour notice" },
  { icon: School, label: "Hostels & PGs", detail: "Fixed weekly menu volumes" },
  { icon: Building2, label: "Hospital & corporate canteens", detail: "Audit-ready invoices, consistent grading" },
  { icon: Store, label: "Kirana retailers", detail: "Restocking rates with return-on-spoilage" },
  { icon: Warehouse, label: "Mandi resellers", detail: "Farm-lot volumes, negotiated per season" },
];

export type SupplyPlan = {
  id: string;
  name: string;
  tagline: string;
  bestFor: string;
  minimum: string;
  rate: string;
  billing: string;
  delivery: string;
  support: string;
  featured?: boolean;
};

export const supplyPlans: SupplyPlan[] = [
  {
    id: "daily",
    name: "Daily Standing Order",
    tagline: "Same list, same time, every morning.",
    bestFor: "Hotels, canteens, hostels, banquet kitchens",
    minimum: "40 kg per day",
    rate: "Locked rate band, revised monthly",
    billing: "GST invoice, fortnightly consolidated",
    delivery: "Daily, 5:00–8:00 AM",
    support: "Named account manager + 4:45 AM load confirmation",
    featured: true,
  },
  {
    id: "weekly",
    name: "Weekly Contract",
    tagline: "A fixed indent, delivered on your chosen days.",
    bestFor: "Restaurants, cafés, cloud kitchens, PGs",
    minimum: "25 kg per drop",
    rate: "Contract rate for core items, daily rate for the rest",
    billing: "GST invoice, weekly",
    delivery: "Chosen days, 5:00–8:00 AM",
    support: "Shared WhatsApp group with the dispatch desk",
  },
  {
    id: "ondemand",
    name: "On-Demand Bulk",
    tagline: "Order when you need it, no commitment.",
    bestFor: "Caterers, event kitchens, retailers, resellers",
    minimum: "25 kg per order",
    rate: "Daily rate card, quoted on request",
    billing: "GST invoice per delivery",
    delivery: "Next morning, 24–48 hour notice",
    support: "Direct line to the dispatch desk",
  },
];

/* ------------------------------------------------------------------ */
/* About page                                                          */
/* ------------------------------------------------------------------ */

export const values: Feature[] = [
  {
    icon: Handshake,
    title: "Fair to the farmer",
    body: "We pay our growers within 48 hours of collection, in full, at a rate agreed before the harvest. A supply chain that squeezes the farm eventually fails the kitchen.",
  },
  {
    icon: Leaf,
    title: "Freshness over volume",
    body: "We would rather tell you an item is finished for the day than send yesterday's crate. Turning down an order costs less than losing a buyer's trust.",
  },
  {
    icon: IndianRupee,
    title: "One rate for everyone",
    body: "The hotel and the household see the same number on the same morning. Our margin sits in the volume we move, not in who is watching the scale.",
  },
  {
    icon: HeartHandshake,
    title: "Show up, every day",
    body: "Rain, strike, festival — the vans run. Reliability is the only thing a supplier really sells.",
  },
];

export type TimelineEntry = { year: string; title: string; body: string };

export const timeline: TimelineEntry[] = [
  {
    year: "2019",
    title: "A single tempo and eleven farmers",
    body: "Farmyuga started on Ratu Road with one hired tempo, eleven farming families and four restaurant clients in Doranda. The first month moved under 300 kg a day.",
  },
  {
    year: "2020",
    title: "Lockdown put us on the doorstep",
    body: "When Ranchi's markets shut, families started calling. We built the home delivery side almost overnight and served 200+ households through the lockdown months.",
  },
  {
    year: "2022",
    title: "Grading yard and cold handling",
    body: "We took a covered yard off Ratu Road, added sorting tables, weighing scales and ice-pack handling for leafy greens and mushrooms.",
  },
  {
    year: "2023",
    title: "Rate cards and contracts",
    body: "The 6 AM WhatsApp rate card went out for the first time. Locked rate bands followed, so kitchens could budget a month ahead instead of guessing.",
  },
  {
    year: "2024",
    title: "Twelve localities, seven days",
    body: "Two more vehicles took us across Ranchi — Kanke to Namkum — with a genuine seven-day schedule and a 5 AM bulk dispatch.",
  },
  {
    year: "Today",
    title: "500+ buyers, 120+ farmers",
    body: "Over 500 regular customers, 40+ varieties and a farmer network across the Ratu, Kanke and Bero blocks. Still dispatching at 5 AM.",
  },
];

export const sourcingPoints: Feature[] = [
  {
    icon: Route,
    title: "Collected at the field",
    body: "Our collection vehicle reaches the growers between 3 and 4:30 AM, so produce moves straight from field to grading yard.",
  },
  {
    icon: HandCoins,
    title: "Paid in 48 hours",
    body: "No season-end settlement, no deductions. Farmers know the rate before they cut and the money before the week ends.",
  },
  {
    icon: Award,
    title: "Graded, not gambled",
    body: "Every lot is inspected at the yard. We tell the farmer what got rejected and why — grading improves, wastage falls for everyone.",
  },
];
