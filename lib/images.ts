/**
 * Photography used across the site.
 *
 * Every photo is a real Unsplash asset served from images.unsplash.com
 * (whitelisted in next.config.ts). `tone` is the photo's dominant colour,
 * turned into a 1×1 SVG blur placeholder so nothing pops in on load.
 */

export type SitePhoto = {
  /** Absolute Unsplash CDN URL, already sized and format-optimised. */
  src: string;
  /** Descriptive alt text — never decorative filler. */
  alt: string;
  /** Dominant colour, used to build the blur placeholder. */
  tone: string;
  width: number;
  height: number;
};

const CDN = "https://images.unsplash.com";

function photo(
  id: string,
  alt: string,
  tone: string,
  { w = 1200, h = 900 }: { w?: number; h?: number } = {},
): SitePhoto {
  return {
    src: `${CDN}/${id}?auto=format&fit=crop&w=${w}&h=${h}&q=72`,
    alt,
    tone,
    width: w,
    height: h,
  };
}

/** Tiny inline SVG placeholder in the photo's dominant colour. */
export function blurFor(tone: string) {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='8' height='8'><rect width='8' height='8' fill='${tone}'/></svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

export const photos = {
  hero: photo(
    "photo-1632776350300-11016768b521",
    "Crates of freshly harvested vegetables laid out at a morning wholesale market",
    "#d9d9d9",
    { w: 1100, h: 1300 },
  ),
  marketSpread: photo(
    "photo-1557844352-761f2565b576",
    "An overhead spread of fresh green vegetables and produce on a dark surface",
    "#0c2626",
    { w: 1200, h: 800 },
  ),
  basket: photo(
    "photo-1690934164598-99267828e900",
    "A woven basket packed with mixed seasonal vegetables ready for home delivery",
    "#26260c",
    { w: 1000, h: 1000 },
  ),
  delivery: photo(
    "photo-1761574319274-8a3a9cd80a6e",
    "A delivery worker unloading stacked vegetable crates from a van on a city street",
    "#8c8c73",
    { w: 1200, h: 900 },
  ),
  marketSorting: photo(
    "photo-1769598248757-44727aa4b96d",
    "A vendor hand-sorting fresh leafy greens at a produce market",
    "#0c2626",
    { w: 1100, h: 1300 },
  ),
  farmers: photo(
    "photo-1766409162993-6f054b7fe9c1",
    "A farmer carrying two baskets of just-harvested vegetables across a hillside field",
    "#d9d9d9",
    { w: 1100, h: 1200 },
  ),
} satisfies Record<string, SitePhoto>;

/** Product photography, keyed by product id (see lib/products.ts). */
export const productPhotos = {
  palak: photo("photo-1683536905403-ea18a3176d29", "Fresh spinach leaves stacked in bunches", "#0c260c", { w: 700, h: 560 }),
  methi: photo("photo-1535189487909-a262ad10c165", "Bunches of tender fenugreek greens", "#f3f3d9", { w: 700, h: 560 }),
  dhaniya: photo("photo-1776089770931-e422e57f760c", "Fresh coriander leaves with a soft green background", "#c0d9a6", { w: 700, h: 560 }),
  aloo: photo("photo-1518977676601-b53f82aba655", "A large lot of freshly dug brown potatoes", "#260c0c", { w: 700, h: 560 }),
  pyaaz: photo("photo-1605197378298-02bf0af1c896", "Red onions resting in a wooden crate", "#734040", { w: 700, h: 560 }),
  tamatar: photo("photo-1518977822534-7049a61ee0c2", "Ripe red tomatoes photographed from above", "#c0260c", { w: 700, h: 560 }),
  bhindi: photo("photo-1425543103986-22abb7d7e8d2", "Whole green okra pods in a white bowl", "#26260c", { w: 700, h: 560 }),
  lauki: photo("photo-1762176189281-05ac6090efdd", "A pale green bottle gourd hanging from its vine", "#26260c", { w: 700, h: 560 }),
  karela: photo("photo-1508747934946-4707f5f8839a", "A heap of ridged green bitter gourds", "#264026", { w: 700, h: 560 }),
  gobhi: photo("photo-1692956706779-576c151ec712", "Tight white cauliflower heads on display for sale", "#a6a68c", { w: 700, h: 560 }),
  pattagobhi: photo("photo-1652860213441-6622f9fec77f", "A basket of firm green cabbages at a market stall", "#8c8c40", { w: 700, h: 560 }),
  gajar: photo("photo-1633380110125-f6e685676160", "A pile of orange carrots with their green tops still on", "#26400c", { w: 700, h: 560 }),
  matar: photo("photo-1632640110804-58827a6b37fd", "Close-up of fresh green peas in their pods", "#0c400c", { w: 700, h: 560 }),
  adrak: photo("photo-1635843104103-ddd88e1c5141", "Knobbly fresh ginger roots", "#594026", { w: 700, h: 560 }),
  lehsun: photo("photo-1685130064064-b77382b0dbe2", "A basket filled with whole garlic bulbs", "#260c0c", { w: 700, h: 560 }),
  broccoli: photo("photo-1614336215203-05a588f74627", "A head of green broccoli on a white plate", "#f3f3f3", { w: 700, h: 560 }),
  shimlaMirch: photo("photo-1621953723422-6023013f659d", "Red and yellow bell peppers in a woven basket", "#f3f3f3", { w: 700, h: 560 }),
  babyCorn: photo("photo-1720240463918-faa48f080c7b", "A pile of tender corn cobs on a table", "#735959", { w: 700, h: 560 }),
  beans: photo("photo-1574963835594-61eede2070dc", "Slim green French beans gathered together", "#26400c", { w: 700, h: 560 }),
  kaddu: photo("photo-1459260216545-994dda21d51a", "A cluster of ripe orange pumpkins", "#d9590c", { w: 700, h: 560 }),
  baingan: photo("photo-1683543122945-513029986574", "Glossy purple brinjals with green stems", "#262626", { w: 700, h: 560 }),
  kheera: photo("photo-1568584711271-6c929fb49b60", "A lot of long green cucumbers", "#405926", { w: 700, h: 560 }),
  mushroom: photo("photo-1552825898-07e419204683", "A bunch of white button mushrooms", "#c0c0a6", { w: 700, h: 560 }),
  nimbu: photo("photo-1588514206468-9657a68c7b95", "Bright yellow lemons, one sliced open", "#f3f3f3", { w: 700, h: 560 }),
} satisfies Record<string, SitePhoto>;

export type ProductPhotoKey = keyof typeof productPhotos;
