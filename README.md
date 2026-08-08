# Farmyuga — marketing website

Production website for **Farmyuga**, a farm-direct vegetable supplier based on Ratu
Road, Ranchi, Jharkhand. It serves two audiences equally: bulk B2B buyers (hotels,
restaurants, cloud kitchens, caterers, hostels, canteens, retailers) and households
across Ranchi.

The site is **lead generation only** — there is no cart, no checkout and no payment
gateway anywhere. Every conversion path ends in a quote form, a WhatsApp click or a
phone call.

---

## Tech stack

| Piece            | Choice                                                    |
| ---------------- | --------------------------------------------------------- |
| Framework        | Next.js 16 (App Router, `app/` directory), React 19        |
| Language         | TypeScript, strict mode                                    |
| Styling          | Tailwind CSS v4 with a `@theme` design-token layer         |
| UI primitives    | shadcn/ui patterns on Radix (Button, Input, Textarea, Select, Accordion, Card, Sheet, Tabs, Label, Badge) |
| Icons            | lucide-react (brand marks are inline SVG)                  |
| Motion           | framer-motion — entrance fades only, reduced-motion aware  |
| Forms            | react-hook-form + zod (one schema shared by form and API)  |
| Fonts            | `next/font/google` — Poppins 400/500/600/700/800           |
| Images           | `next/image`, remote pattern for `images.unsplash.com`     |

---

## Getting started

```bash
npm install
```

```bash
npm run dev
```

Open <http://localhost:3000>.

Other scripts:

```bash
npm run build
```

```bash
npm run lint
```

Both must pass cleanly before you deploy. There are currently zero TypeScript and
zero ESLint errors.

---

## ⚠️ Placeholders you MUST replace before going live

**Everything below lives in one file: [`lib/site-config.ts`](lib/site-config.ts).**
Change it once and the header, footer, contact page, every WhatsApp button, every
`tel:` link, the sitemap and the JSON-LD schema all update together.

| Field in `lib/site-config.ts` | Current placeholder | What to put there |
| ----------------------------- | ------------------- | ----------------- |
| `url` | `https://farmyuga.com` | Your live domain, no trailing slash |
| `email` | `hello@farmyuga.com` | Your inquiries inbox |
| `geo.lat` / `geo.lng` | `23.3608` / `85.2837` | Approximate Ratu Road point — drop an exact pin on Google Maps → right-click → copy coordinates |
| `gstin` | `20XXXXXXXXXXXZX` | Your GST number (shown on the For Businesses page) |
| `social.facebook / instagram / youtube` | `…/farmyuga` | Your real profiles — or delete the entries you don't have |
| `mapEmbedSrc` | Ratu Road, Ranchi search embed | Google Maps → Share → Embed a map → copy the `src` |
| `terms.*` | ₹300 minimum, 25 kg bulk, 5–8 AM slot | Your actual commercial terms |

**Already set to real values** (no action needed): phone `+91 72099 09097`, the same
number for WhatsApp, and the address `Ratu Road, Ranchi, Jharkhand 834001`.

Two other things worth a look before launch:

- **Testimonials** — [`lib/testimonials.ts`](lib/testimonials.ts) contains three
  written-for-you reviews. Replace them with real quotes from real customers before
  publishing; keep the shape of the objects the same.
- **Timeline & team** — [`lib/content.ts`](lib/content.ts) has the 2019 → today story
  and team blurbs. Adjust the milestones to match your actual history.

---

## Where the content lives

No content is hardcoded in components. Everything is a typed data file under `lib/`:

| File | What it holds |
| ---- | ------------- |
| `lib/site-config.ts` | Business details, nav items, WhatsApp message templates |
| `lib/products.ts` | Vegetable catalogue and categories |
| `lib/images.ts` | Every photo (URL, alt text, dominant colour for the blur placeholder) |
| `lib/areas.ts` | Delivery localities and the locality dropdown options |
| `lib/testimonials.ts` | Customer reviews |
| `lib/faq.ts` | Home-page FAQs and the extra B2B FAQs |
| `lib/content.ts` | Trust stats, audience paths, features, steps, supply plans, values, timeline |
| `lib/inquiry-schema.ts` | The zod schema shared by the form and the API route |

### Adding a product

1. **Add the photo** to `productPhotos` in [`lib/images.ts`](lib/images.ts):

   ```ts
   zucchini: photo("photo-xxxxxxxxxxxxx-xxxxxxxxxxxx", "Fresh green zucchini in a crate", "#26400c", { w: 700, h: 560 }),
   ```

   The first argument is the Unsplash path segment from an
   `https://images.unsplash.com/photo-…` URL. The third is the photo's dominant colour,
   used to generate the blur placeholder. To use your own photography instead, drop the
   file in `public/` and change `photo()` to return that path (and you can then remove
   the Unsplash `remotePatterns` entry from `next.config.ts`).

2. **Add the product** to the `products` array in [`lib/products.ts`](lib/products.ts).
   The `id` must match the key you just added to `productPhotos` — TypeScript enforces this:

   ```ts
   {
     id: "zucchini",
     name: "Zucchini",
     hindi: "ज़ुकिनी",
     category: "exotic",       // leafy | root | gourds | staples | exotic | herbs
     availability: "seasonal", // daily | seasonal
     blurb: "Firm, glossy skin. Order a day ahead.",
   },
   ```

3. Optionally add its `id` to `homeProductIds` to feature it on the home page grid.

Prices are deliberately never displayed — rates are quote-based, so every card links
to the contact form with the item pre-filled.

---

## Lead handling

The forms POST to [`app/api/inquiry/route.ts`](app/api/inquiry/route.ts), which
re-validates with the same zod schema, silently drops honeypot submissions and
**logs the lead to the server console**. There is no database.

To receive leads properly, replace the `console.log` — the file has a clearly marked
`// TODO: wire to email provider / CRM` block with worked examples for Resend, a
generic webhook and a WhatsApp notification. Keep the response shape as
`{ ok: true }` so the form keeps working. Put any keys in `.env.local`.

---

## Deploying to Vercel

1. Push this folder to a Git repository (GitHub, GitLab or Bitbucket).
2. Go to [vercel.com/new](https://vercel.com/new), import the repository. Vercel detects
   Next.js automatically — no build settings to change.
3. Add any environment variables you introduced for the lead handler
   (e.g. `RESEND_API_KEY`) under **Settings → Environment Variables**.
4. Deploy, then add your domain under **Settings → Domains**.
5. **Set `url` in `lib/site-config.ts` to that domain** and redeploy — the sitemap,
   canonical URLs, OpenGraph tags and JSON-LD all derive from it.

After launch, submit `https://yourdomain.com/sitemap.xml` in Google Search Console and
create a Google Business Profile for the Ratu Road address so the LocalBusiness schema on
this site has something to reinforce.

---

## SEO built in

- Per-page `metadata` exports with locally targeted titles and descriptions
- `LocalBusiness` JSON-LD in the root layout (address, geo, `areaServed`, opening
  hours, telephone, `priceRange: "₹₹"`) and `FAQPage` JSON-LD on the home page
- OpenGraph and Twitter card metadata, with a share image generated at build time by
  [`app/opengraph-image.tsx`](app/opengraph-image.tsx)
- `app/sitemap.ts`, `app/robots.ts`, canonical URLs, and a brand favicon at `app/icon.svg`
- One `<h1>` per page, `<section aria-labelledby>` throughout, descriptive `alt` text
  on every image

## Accessibility

Keyboard navigable throughout with a brand-green `:focus-visible` ring, a skip link,
`aria-label` on every icon-only control, a mobile drawer that traps focus and closes on
Escape, and full `prefers-reduced-motion` support — when it's set, no element
transforms and the stat counters show their final figures immediately.

---

© Farmyuga. Built with Next.js.
