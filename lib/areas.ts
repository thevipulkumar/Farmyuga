export type DeliveryArea = {
  name: string;
  /** The hub gets visual prominence and free delivery. */
  hub?: boolean;
  note: string;
};

export const deliveryAreas: DeliveryArea[] = [
  { name: "Ratu Road", hub: true, note: "Our base — free delivery, two slots daily" },
  { name: "Kanke", note: "Morning bulk slot + home delivery" },
  { name: "Pandra", note: "Mandi-side pickup or doorstep drop" },
  { name: "Hatia", note: "Bulk crates by 7:30 AM" },
  { name: "Doranda", note: "Hotels & canteens, daily standing orders" },
  { name: "Harmu", note: "Home baskets, 7–11 AM" },
  { name: "Lalpur", note: "Cloud kitchens & cafés, 6 AM drop" },
  { name: "Bariatu", note: "Hostels, PGs and hospital canteens" },
  { name: "Kokar", note: "Retail kirana restocking" },
  { name: "Argora", note: "Home baskets + restaurant supply" },
  { name: "Booty More", note: "Evening slot available" },
  { name: "Namkum", note: "Bulk orders on scheduled days" },
];

/** Options for the "Locality in Ranchi" select on every form. */
export const localityOptions: string[] = [
  ...deliveryAreas.map((a) => a.name),
  "Other (outside this list)",
];
