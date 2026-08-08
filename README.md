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
re-validates with the same zod schema, drops honeypot submissions, logs the lead,
then hands it to [`lib/notify.ts`](lib/notify.ts) for delivery on two channels:

1. **Email** over your cPanel mailbox's SMTP (nodemailer) — a formatted lead card
   sent to `LEAD_TO_EMAIL`, with `Reply-To` set to the enquirer so you can answer
   straight from your inbox.
2. **WhatsApp alert** via the Meta Cloud API — a short summary to your dispatch
   number so a 5 AM bulk enquiry is not missed.

Both are **best effort**. If credentials are missing or a provider is down, the
failure is logged and the visitor still sees the success panel — the lead is always
written to the application log first, so nothing is lost even if both channels fail.
Grep the cPanel log for `[farmyuga] new inquiry` to recover one.

There is no database. Configure everything through environment variables — see
[`.env.example`](.env.example), which documents each one.

### The WhatsApp constraint, in short

Meta only allows free-form WhatsApp text inside a 24-hour reply window. A
business-initiated alert therefore needs an **approved message template** with one
body variable. Until you create one and set `WHATSAPP_TEMPLATE_NAME`, the code
falls back to a plain text message, which only arrives if your alert number has
messaged the business number in the last 24 hours. Email works immediately with no
such restriction.

---

## Deploying to cPanel (Node.js app + GitHub)

This site is a Next.js **server** app, not a folder of static HTML. It needs
cPanel's *Setup Node.js App* (Passenger). [`server.js`](server.js) is the Passenger
entry point and [`.cpanel.yml`](.cpanel.yml) drives deployment from GitHub.

### One-time setup

1. **cPanel → Setup Node.js App → Create Application**
   - Node.js version: **20 or newer** (Next.js 16 requires >= 20.9)
   - Application mode: **Production**
   - Application root: `farmyuga`
   - Application URL: your domain
   - Application startup file: `server.js`

   Copy the `source /home/USER/nodevenv/...` command cPanel shows at the top of
   that page — you need it in the next step.

2. **Edit [`.cpanel.yml`](.cpanel.yml)**: replace `CPANELUSER` with your cPanel
   username, and make sure the `NODEENV` path matches the `source` command from
   step 1 (the `22` in the path is the Node version you chose). Commit and push.

3. **Give cPanel access to the private repo**
   - cPanel → **SSH Access → Manage SSH Keys** → generate a key, then **authorise** it
   - Copy the **public** key, and on GitHub go to
     **repo → Settings → Deploy keys → Add deploy key**, paste it, read-only is fine

4. **cPanel → Git Version Control → Create**
   - Clone URL: `git@github.com:thevipulkumar/Farmyuga.git`
   - Repository path: `repositories/farmyuga` (keep this separate from the app root)

5. **Set the environment variables** in Setup Node.js App (SMTP + WhatsApp — see
   [`.env.example`](.env.example)). Never upload a `.env` file to the server.

6. **Deploy**: Git Version Control → **Update from Remote** → **Deploy HEAD Commit**.
   That runs `.cpanel.yml`: rsync into the app root, `npm ci`, `npm run build`, then
   touches `tmp/restart.txt` so Passenger reloads.

### Every deploy after that

```bash
git push
```

Then in cPanel: **Update from Remote** → **Deploy HEAD Commit**. Nothing else.

### If the build runs out of memory

Shared hosting sometimes kills `next build`. Two options: raise the limit by
changing the build task in `.cpanel.yml` to
`NODE_OPTIONS=--max-old-space-size=2048 npm run build`, or build locally with
`npm run build` and upload the generated `.next` folder alongside the code.

### Troubleshooting

| Symptom | Cause |
| ------- | ----- |
| 503 / "Passenger error" | `npm run build` did not run, or `.next` is missing from the app root |
| Site loads but forms fail | Env vars not set, or the app was not restarted after setting them |
| Old content after deploying | Passenger did not reload — touch `tmp/restart.txt`, or hit **Restart** in Setup Node.js App |
| `next: not found` during deploy | The `source $NODEENV` path in `.cpanel.yml` does not match your app |

Application logs live in cPanel → Setup Node.js App → your app, and in
`~/logs/`. That is where `[farmyuga] new inquiry` lines appear.

---

## Deploying to Vercel (alternative)

If you ever move off cPanel: push to GitHub, import the repo at
[vercel.com/new](https://vercel.com/new), add the same environment variables under
**Settings → Environment Variables**, and deploy. Vercel detects Next.js with no
configuration, and `server.js` / `.cpanel.yml` are simply ignored.

**Whichever host you use**, set `url` in `lib/site-config.ts` to your live domain and
redeploy — the sitemap, canonical URLs, OpenGraph tags and JSON-LD all derive from it.

After launch, submit `https://yourdomain.com/sitemap.xml` in Google Search Console and
create a Google Business Profile for the Ratu Road address so the LocalBusiness schema
on this site has something to reinforce.

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
