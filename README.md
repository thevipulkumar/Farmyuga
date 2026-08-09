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
| Images           | `next/image` (unoptimized — static export), Unsplash CDN   |
| Output           | **Static export** to `out/` + one PHP endpoint for the form |

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

`npm run build` produces a complete static site in **`out/`** — that folder is
what gets uploaded. `npm start` serves `out/` locally so you can check the built
site before uploading.

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

**Note:** `LEAD_TO_EMAIL` is no longer set here — on shared hosting it lives at the
top of [`public/api/inquiry.php`](public/api/inquiry.php).

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
| `lib/inquiry-schema.ts` | The zod schema the form validates against in the browser |

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

The forms POST to [`public/api/inquiry.php`](public/api/inquiry.php) (copied to
`out/api/inquiry.php` at build time), which re-validates every field server-side,
drops honeypot submissions, writes the lead to a log file above the web root,
then delivers on two channels:

1. **Email** via PHP `mail()` — a formatted lead card sent to `$LEAD_TO_EMAIL`,
   with `Reply-To` set to the enquirer so you can answer straight from your inbox.
2. **WhatsApp alert** via the Meta Cloud API — a short summary to your dispatch
   number so a 5 AM bulk enquiry is not missed.

Both are **best effort**. If mail fails or WhatsApp is unconfigured, the visitor
still sees the success panel — the lead is written to `farmyuga-inquiries.log`
(one level above `public_html`) *before* delivery is attempted, so nothing is
lost even if both channels fail.

There is no database. Configuration lives in the block at the top of
`inquiry.php` — there are no environment variables on shared hosting.

### The WhatsApp constraint, in short

Meta only allows free-form WhatsApp text inside a 24-hour reply window. A
business-initiated alert therefore needs an **approved message template** with one
body variable. Until you create one and set `WHATSAPP_TEMPLATE_NAME`, the code
falls back to a plain text message, which only arrives if your alert number has
messaged the business number in the last 24 hours. Email works immediately with no
such restriction.

---

## Deploying to Hostinger (shared hosting)

Hostinger's shared plans run Apache/LiteSpeed with PHP — no persistent Node
process. So the site is built into static HTML here, and only the finished
`out/` folder is uploaded. The inquiry form posts to a small PHP script rather
than a Node route.

### Two branches

| Branch | Contains | Purpose |
| --- | --- | --- |
| `main` | Source code | What you edit. Never deployed directly |
| `deploy` | The built site at its root | What Hostinger pulls into `public_html` |

Hostinger's Git integration copies a branch into `public_html` **without running
a build** — it has no Node. So `deploy` holds the finished HTML, and one command
regenerates it:

```bash
npm run deploy
```

That builds, verifies `index.html`, `.htaccess` and `api/inquiry.php` are all
present, and force-pushes `out/` to the `deploy` branch as a single fresh commit.
Then trigger the pull in hPanel (or let auto-deployment do it).

### One-time: connect Hostinger to GitHub

1. **hPanel → Websites → Manage → Advanced → GIT**
2. **Repository:** `git@github.com:thevipulkumar/Farmyuga.git`
   **Branch:** `deploy`
   **Directory:** leave blank (deploys into `public_html`)
3. Private repo, so Hostinger shows you an **SSH public key** — copy it and add
   it at **GitHub → repo → Settings → Deploy keys → Add deploy key**, read-only.
4. `public_html` must be **empty** before the first clone. Delete Hostinger's
   default `index.html` / `default.php` placeholder first.
5. Optional: copy the **auto-deployment webhook URL** from the same page into
   **GitHub → Settings → Webhooks**. Then `npm run deploy` alone publishes the
   site, with nothing to click.

### Settings that must survive a deploy

Every deploy overwrites `public_html`, so **never** edit `api/inquiry.php` on the
server — your changes would be wiped, and a WhatsApp token put in the repo would
be committed history.

Instead create one file **above** the web root, at `/home/<user>/farmyuga-config.php`:

```php
<?php
$LEAD_TO_EMAIL   = 'hello@yourdomain.com';
$LEAD_FROM_EMAIL = 'no-reply@yourdomain.com';
// optional WhatsApp alerts
$WHATSAPP_TOKEN           = '';
$WHATSAPP_PHONE_NUMBER_ID = '';
$WHATSAPP_ALERT_TO        = '917209909097';
$WHATSAPP_TEMPLATE_NAME   = '';
```

`inquiry.php` loads it automatically if present and anything it defines wins.
It is outside the web root, so it is neither web-readable nor touched by deploys.

### Manual upload (if you skip the Git integration)

1. **Build locally**

   ```bash
   npm run build
   ```

2. **Upload the contents of `out/`** into `public_html` on the server —
   hPanel → **File Manager**, or any FTP client. Upload the *contents*, not the
   folder itself: `index.html` must sit directly in `public_html`.

   Fastest route: zip the folder, upload one file, extract it in File Manager.

   ```bash
   cd out && zip -r ../farmyuga-site.zip . && cd ..
   ```

3. **Check `.htaccess` came across.** It is a hidden file — turn on *Show hidden
   files* in File Manager. Without it, the 404 page and caching rules are lost.

### One-time setup

1. **Create the mailbox** — hPanel → **Emails → Create email account**, e.g.
   `hello@yourdomain.com`. Also create `no-reply@yourdomain.com`, or reuse the
   same address for both.

2. **Create `/home/<user>/farmyuga-config.php`** with your addresses (see
   "Settings that must survive a deploy" above).

   `$LEAD_FROM_EMAIL` **must** be a real mailbox on your own domain. A From
   address on someone else's domain gets treated as spoofed and lands in spam.

3. **SSL** — hPanel → **Security → SSL** → install the free certificate, then
   turn on **Force HTTPS**.

4. **Set `url` in `lib/site-config.ts`** to your live domain, rebuild, re-upload.
   The sitemap, canonical tags, OpenGraph URLs and JSON-LD all derive from it.

### Testing the form after upload

Submit a real inquiry through `/contact/`. You should get the email within a
minute. If nothing arrives:

- Every lead is also appended to `farmyuga-inquiries.log`, **one level above
  `public_html`** — so nothing is ever lost even when mail fails. Check there
  first; if the line exists, the capture worked and only delivery failed.
- Check spam, then confirm `$LEAD_FROM_EMAIL` is a mailbox that actually exists.
- hPanel → **Advanced → PHP Info** to confirm `mail()` is enabled.

The log file sits outside the web root deliberately — it contains customer names
and phone numbers. Never move it into `public_html`.

### WhatsApp alerts (optional)

Put the `$WHATSAPP_*` values in `/home/<user>/farmyuga-config.php`, never in the
repository. You need a Meta
WhatsApp Cloud API app, a permanent access token and your phone number ID.

Note the constraint: Meta only allows free-form WhatsApp text inside a 24-hour
reply window, so a business-initiated alert needs an **approved message template**
with a single body variable. Until you create one and set
`$WHATSAPP_TEMPLATE_NAME`, the fallback plain-text message only arrives if your
alert number has messaged the business number within the last 24 hours. Email
works immediately with none of this.

### What static hosting costs you

| | Effect |
| --- | --- |
| Image optimization | Off. Little practical loss — every photo already requests an exact size from the Unsplash CDN |
| Deploys | `npm run deploy` then a pull in hPanel, rather than a single `git push` |
| Server rendering | None. `?category=` and `?item=` are read client-side instead |

If you later move to a Hostinger **VPS** or any Node host, remove `output: "export"`
from `next.config.ts`, restore an API route in place of the PHP script, and it
becomes a normal server-rendered Next.js app again.

---

## Deploying to Vercel (alternative)

Push to GitHub, import the repo at [vercel.com/new](https://vercel.com/new), and
deploy. Vercel detects Next.js automatically. You would want to remove
`output: "export"` first to get image optimization and a real API route back.

---

## SEO built in

- Per-page `metadata` exports with locally targeted titles and descriptions
- `LocalBusiness` JSON-LD in the root layout (address, geo, `areaServed`, opening
  hours, telephone, `priceRange: "₹₹"`) and `FAQPage` JSON-LD on the home page
- OpenGraph and Twitter card metadata pointing at [`public/og-image.png`](public/og-image.png)
  (1200×630 — replace it with a real photograph whenever you have one)
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
