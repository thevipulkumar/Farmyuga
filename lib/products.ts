import { productPhotos, type ProductPhotoKey, type SitePhoto } from "@/lib/images";

export type ProductCategoryId =
  | "leafy"
  | "root"
  | "gourds"
  | "staples"
  | "exotic"
  | "herbs";

export type ProductCategory = {
  id: ProductCategoryId;
  label: string;
  /** Compact label for the chip on a product card. */
  shortLabel: string;
  /** Short line shown under the filter when the category is active. */
  blurb: string;
};

export const productCategories: ProductCategory[] = [
  {
    id: "leafy",
    label: "Leafy Greens",
    shortLabel: "Leafy Greens",
    blurb: "Cut before sunrise, packed in ventilated crates so nothing wilts on the way.",
  },
  {
    id: "root",
    label: "Root Vegetables",
    shortLabel: "Root Vegetables",
    blurb: "Cleaned, size-graded and sold by weight — no soil padding in the sack.",
  },
  {
    id: "gourds",
    label: "Gourds & Beans",
    shortLabel: "Gourds & Beans",
    blurb: "The everyday sabzi line. Tender picks only, sorted by length and firmness.",
  },
  {
    id: "staples",
    label: "Onion, Potato & Tomato",
    shortLabel: "Staples",
    blurb: "Our highest-volume line. Daily rates move with Pandra mandi — we quote every morning.",
  },
  {
    id: "exotic",
    label: "Exotic & Seasonal",
    shortLabel: "Exotic",
    blurb: "For cafés, cloud kitchens and continental menus. Indent a day ahead.",
  },
  {
    id: "herbs",
    label: "Herbs",
    shortLabel: "Herbs",
    blurb: "Aromatics and garnish. Sold in bunches for homes, in kilos for kitchens.",
  },
];

export type Product = {
  id: ProductPhotoKey;
  name: string;
  /** Devanagari name — what a Ranchi buyer actually asks for. */
  hindi: string;
  category: ProductCategoryId;
  availability: "daily" | "seasonal";
  /** One practical line: grading, pack size or who buys it. */
  blurb: string;
};

export const products: Product[] = [
  // ---- Leafy greens -------------------------------------------------
  {
    id: "palak",
    name: "Spinach",
    hindi: "पालक",
    category: "leafy",
    availability: "daily",
    blurb: "Tied bunches, roots trimmed. Bulk in 10 kg crates.",
  },
  {
    id: "methi",
    name: "Fenugreek Leaves",
    hindi: "मेथी",
    category: "leafy",
    availability: "seasonal",
    blurb: "Peak October to February. Tender leaf, low stem.",
  },
  {
    id: "pattagobhi",
    name: "Cabbage",
    hindi: "पत्ता गोभी",
    category: "leafy",
    availability: "daily",
    blurb: "Tight heads, 1–2 kg each. Outer leaves left on for transit.",
  },
  {
    id: "gobhi",
    name: "Cauliflower",
    hindi: "फूल गोभी",
    category: "leafy",
    availability: "seasonal",
    blurb: "White, compact curds. Best November to March.",
  },

  // ---- Root ---------------------------------------------------------
  {
    id: "gajar",
    name: "Carrot",
    hindi: "गाजर",
    category: "root",
    availability: "daily",
    blurb: "Red desi and orange hybrid, graded by length.",
  },
  {
    id: "adrak",
    name: "Ginger",
    hindi: "अदरक",
    category: "root",
    availability: "daily",
    blurb: "Firm, low-fibre rhizome. Washed lot on request.",
  },
  {
    id: "lehsun",
    name: "Garlic",
    hindi: "लहसुन",
    category: "root",
    availability: "daily",
    blurb: "Whole bulbs by the kilo. Peeled pack for kitchens.",
  },

  // ---- Gourds & beans ------------------------------------------------
  {
    id: "bhindi",
    name: "Okra",
    hindi: "भिंडी",
    category: "gourds",
    availability: "daily",
    blurb: "Snap-tested for tenderness before it leaves the yard.",
  },
  {
    id: "lauki",
    name: "Bottle Gourd",
    hindi: "लौकी",
    category: "gourds",
    availability: "daily",
    blurb: "Young, light-green pick. 800 g–1.5 kg pieces.",
  },
  {
    id: "karela",
    name: "Bitter Gourd",
    hindi: "करेला",
    category: "gourds",
    availability: "daily",
    blurb: "Small desi karela and long hybrid, both stocked.",
  },
  {
    id: "baingan",
    name: "Brinjal",
    hindi: "बैंगन",
    category: "gourds",
    availability: "daily",
    blurb: "Round bharta and long variety. Glossy skin only.",
  },
  {
    id: "kheera",
    name: "Cucumber",
    hindi: "खीरा",
    category: "gourds",
    availability: "daily",
    blurb: "Salad-grade, straight and seedless-centred.",
  },
  {
    id: "matar",
    name: "Green Peas",
    hindi: "मटर",
    category: "gourds",
    availability: "seasonal",
    blurb: "Winter line. Shelled peas available on indent.",
  },
  {
    id: "beans",
    name: "French Beans",
    hindi: "फ्रेंच बीन्स",
    category: "gourds",
    availability: "daily",
    blurb: "Stringless, snapped-fresh. A café favourite.",
  },
  {
    id: "kaddu",
    name: "Pumpkin",
    hindi: "कद्दू",
    category: "gourds",
    availability: "seasonal",
    blurb: "Whole or cut to weight for canteen kitchens.",
  },

  // ---- Onion, potato & tomato ----------------------------------------
  {
    id: "aloo",
    name: "Potato",
    hindi: "आलू",
    category: "staples",
    availability: "daily",
    blurb: "Jyoti and Chipsona, graded small / medium / large.",
  },
  {
    id: "pyaaz",
    name: "Onion",
    hindi: "प्याज़",
    category: "staples",
    availability: "daily",
    blurb: "Nashik red. 50 kg bags for standing orders.",
  },
  {
    id: "tamatar",
    name: "Tomato",
    hindi: "टमाटर",
    category: "staples",
    availability: "daily",
    blurb: "Hybrid firm for transport, desi for gravy — you pick.",
  },

  // ---- Exotic & seasonal ---------------------------------------------
  {
    id: "broccoli",
    name: "Broccoli",
    hindi: "ब्रोकली",
    category: "exotic",
    availability: "seasonal",
    blurb: "Tight dark-green crowns. Order a day ahead.",
  },
  {
    id: "shimlaMirch",
    name: "Bell Pepper",
    hindi: "शिमला मिर्च",
    category: "exotic",
    availability: "daily",
    blurb: "Green daily; red and yellow on indent.",
  },
  {
    id: "babyCorn",
    name: "Baby Corn",
    hindi: "बेबी कॉर्न",
    category: "exotic",
    availability: "seasonal",
    blurb: "Peeled or in-husk. Popular with cloud kitchens.",
  },
  {
    id: "mushroom",
    name: "Button Mushroom",
    hindi: "मशरूम",
    category: "exotic",
    availability: "daily",
    blurb: "200 g punnets or 2 kg bulk box, cold-handled.",
  },

  // ---- Herbs ----------------------------------------------------------
  {
    id: "dhaniya",
    name: "Coriander",
    hindi: "धनिया",
    category: "herbs",
    availability: "daily",
    blurb: "Bunched with roots on so it holds two days.",
  },
  {
    id: "nimbu",
    name: "Lemon",
    hindi: "नींबू",
    category: "herbs",
    availability: "daily",
    blurb: "Thin-skinned, juice-heavy. Counted or weighed.",
  },
];

/** Photo lookup for a product card. */
export function productPhoto(product: Product): SitePhoto {
  return productPhotos[product.id];
}

export function categoryLabel(id: ProductCategoryId) {
  return productCategories.find((c) => c.id === id)?.label ?? "";
}

/** Compact label used on product cards, where space is tight. */
export function categoryShortLabel(id: ProductCategoryId) {
  return productCategories.find((c) => c.id === id)?.shortLabel ?? "";
}

/** Small curated set used on the home page above the full catalogue link. */
export const homeProductIds: ProductPhotoKey[] = [
  "palak",
  "aloo",
  "pyaaz",
  "tamatar",
  "bhindi",
  "gobhi",
  "gajar",
  "matar",
  "lauki",
  "karela",
  "dhaniya",
  "adrak",
  "broccoli",
  "shimlaMirch",
  "mushroom",
  "pattagobhi",
];

export const homeProducts: Product[] = homeProductIds
  .map((id) => products.find((p) => p.id === id))
  .filter((p): p is Product => Boolean(p));
