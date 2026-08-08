export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  locality: string;
  rating: 5;
  /** Which audience the reviewer belongs to — tints the card accent. */
  segment: "bulk" | "home";
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "We take 180–200 kg a day across three outlets. In two years Farmyuga has missed exactly one morning, and they called me at 4:40 AM to say so before I found out myself. The rate sheet lands on WhatsApp by 6, and the monthly GST invoice is always clean.",
    name: "Rajeev Prasad",
    role: "Purchase Manager, banquet hotel",
    locality: "Doranda",
    rating: 5,
    segment: "bulk",
  },
  {
    quote:
      "Cloud kitchen means my prep starts at 8 and I cannot wait for the mandi. Their crates are at my gate by 6:15 with the bell peppers and baby corn already sorted. Wastage dropped from around 9% to under 3% after we switched.",
    name: "Sneha Toppo",
    role: "Owner, cloud kitchen",
    locality: "Lalpur",
    rating: 5,
    segment: "bulk",
  },
  {
    quote:
      "Main WhatsApp pe list bhej deti hoon raat ko, subah 8 baje sabzi darwaze par. Palak aur dhaniya itna taaza hota hai ki do din chal jaata hai. Rate mandi se zyada nahi lagta — aur bhaav pehle hi bata dete hain.",
    name: "Anita Devi",
    role: "Homemaker, weekly basket subscriber",
    locality: "Kanke",
    rating: 5,
    segment: "home",
  },
];
