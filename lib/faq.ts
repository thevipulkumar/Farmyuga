import { siteConfig } from "@/lib/site-config";

export type FaqItem = {
  question: string;
  answer: string;
};

/** Home page FAQ — mixed audience. */
export const generalFaqs: FaqItem[] = [
  {
    question: "What is the minimum order?",
    answer: `For homes, ${siteConfig.terms.homeMinOrder} per delivery — roughly a week of vegetables for a family of four. For businesses, ${siteConfig.terms.bulkMinOrder} per drop, and most of our restaurant and canteen clients order far more than that daily. Below the minimum we can still supply, but delivery is charged at ₹40 on Ratu Road and ₹80 elsewhere in Ranchi.`,
  },
  {
    question: "When do you deliver?",
    answer: `Bulk crates go out between ${siteConfig.terms.bulkSlot}, because kitchens need stock before prep begins. Home deliveries run ${siteConfig.terms.homeSlots}. We load straight after the 4:30 AM sorting, so what reaches you was graded that morning — not the previous evening.`,
  },
  {
    question: "How do bulk rate contracts work?",
    answer:
      "You share a monthly indent, we lock a rate band for the items you use most. Inside that band the price does not move for the agreed period even when the mandi swings. Items outside the contract are billed at the daily rate card we send on WhatsApp every morning by 6 AM. Contracts run monthly or quarterly, and either side can revise at renewal.",
  },
  {
    question: "Do you provide a GST invoice?",
    answer:
      "Yes. Every business account gets a GST invoice against your GSTIN — per delivery or consolidated fortnightly, whichever suits your accounts team. Delivery challans are signed at the gate and shared as a PDF the same day. Households get a simple itemised bill on WhatsApp.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "Cash, UPI (GPay / PhonePe / Paytm), and direct bank transfer. Verified business accounts get 15-day or 30-day credit terms after three months of clean supply history — we ask for your GSTIN, a shop or trade licence, and one reference to set that up. There is no online payment on this website.",
  },
  {
    question: "What if the quality is not right?",
    answer:
      "Tell us on the same day and we replace it, free, on the next delivery — or credit it against your next bill. Everything is hand-graded twice, once at sorting and once at loading, but produce is a living thing and a bad crate does slip through. We would rather replace it than argue about it.",
  },
  {
    question: "How does the weekly basket subscription work?",
    answer:
      "Pick a fixed weekday and a basket size — small (about 5 kg), family (about 9 kg) or large (about 14 kg). We build it from whatever is at its seasonal best that week and send the list for approval the night before, so you can swap out anything your family does not eat. Pause or cancel any week on WhatsApp, no lock-in.",
  },
  {
    question: "Which areas of Ranchi do you serve?",
    answer:
      "Ratu Road is our base and gets free delivery. We also cover Kanke, Pandra, Hatia, Doranda, Harmu, Lalpur, Bariatu, Kokar, Argora, Booty More and Namkum. Outside this list we still supply bulk orders — send us the location and volume and we will tell you honestly whether we can hold the morning window.",
  },
];

/** Extra questions shown only on the /for-businesses page. */
export const businessFaqs: FaqItem[] = [
  {
    question: "Can you handle a sudden spike — a banquet or a 400-plate event?",
    answer:
      "Yes, with 48 hours' notice for large volumes and 24 hours for anything under 300 kg. Give us the menu-level quantities rather than a lump-sum figure and we will indent it with our farmer group directly, which usually lands a better rate than a last-minute mandi buy.",
  },
  {
    question: "Do you grade and pre-cut for kitchens?",
    answer:
      "We grade everything by size and firmness as standard. Peeled garlic, shelled peas, cut pumpkin and washed leafy greens are available as add-ons at a per-kilo handling charge, delivered in food-grade crates. Pre-cut items are made to order the same morning and are not stocked.",
  },
  {
    question: "What happens if the mandi rate spikes overnight?",
    answer:
      "Contract items stay inside the agreed band — that is the point of the contract. For non-contract items we send the revised rate before dispatch, and if the jump is steep you can cut the quantity or drop the item for the day. We do not deliver first and surprise you on the invoice.",
  },
  {
    question: "Who is my point of contact?",
    answer:
      "Every business account gets one named account manager with a direct mobile number, plus a shared WhatsApp group with our dispatch desk. Standing-order clients get a 4:45 AM confirmation message listing exactly what has been loaded for them.",
  },
  {
    question: "Can we run a trial before committing?",
    answer:
      "That is what we prefer. Take a one-week trial at daily rates with no contract. Compare our grading and wastage against your current supplier, then decide. Most of our standing orders started as a trial week.",
  },
];
