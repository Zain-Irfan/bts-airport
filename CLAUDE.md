# Project handoff — MRM Executive Voyage

> Read this first. It captures the operational knowledge that is **not** obvious from the
> code — deployment quirks, gotchas, and current state — so a fresh session can be productive
> immediately. (There is also `apps/web/CLAUDE.md` → `AGENTS.md` with a Next.js warning; read that too.)
>
> 📘 **For anything about hosting/deploying (Cloudways, `.htaccess` proxy, PM2, 503 errors,
> "changes not showing", first-time server setup, troubleshooting), read [`DEPLOYMENT.md`](DEPLOYMENT.md)
> — it is the complete runbook. The summary in section "Deployment" below is just an overview.**

## What this is
A booking website + admin panel for a London airport-taxi / private-transfer company.
Public marketing site, an online booking/quote flow with Stripe payments, and an admin
panel (staff) to manage bookings, drivers, vehicle types, contacts, and site settings.

- **Live domain:** https://londonairporttaxiservices.co.uk
- **Brand name:** "MRM Executive Voyage" (renamed from "London Airport Taxi Services", which itself replaced "BTS"). The domain is still `londonairporttaxiservices.co.uk`.
- **Git remote:** `github.com/Zain-Irfan/bts-airport` (repo still named bts-airport), branch `main`.

## Tech stack
| Thing | Version / detail |
|-------|------------------|
| Framework | **Next.js 16.2.4** (App Router, **Turbopack**) |
| React | 19.2.4 |
| Language | TypeScript |
| Styling | **Tailwind CSS v4** (config-less, tokens in `apps/web/src/app/globals.css`) |
| ORM | **Prisma 7.8** — ⚠️ requires a driver adapter (see below) |
| DB | **MySQL / MariaDB** |
| Email | **Resend** (`apps/web/src/lib/email.ts`, lazy-initialised) |
| Payments | **Stripe** Checkout (`stripe` SDK v23) |
| Node | **20.19.0** (Prisma 7 needs ≥ 20.19) |
| Hosting | **Cloudways** (managed DigitalOcean), Apache "Hybrid" stack + PM2 |

## Repo layout
Monorepo-ish (root name `ukride-clone`, no npm workspaces). The real app is **`apps/web`**.
```
apps/web/
  src/app/            # App Router pages (public + /admin)
  src/components/     # UI; admin/ has the panel, layout/ has header/footer
  src/lib/            # prisma.ts, site-settings.ts, phone.ts, email.ts, auth
  src/app/globals.css # ⭐ the whole design system (CSS variables / tokens)
  prisma/schema.prisma
  public/assets/      # logo.jpeg lives here
  public/.htaccess    # ⭐ git-tracked Apache proxy rule (see Deployment)
  .claude/launch.json # dev server config (npm run dev, port 3000)
```

## Local development
```bash
cd apps/web
npm install
npm run dev        # → http://localhost:3000  (Turbopack)
```
- `.env` / `.env.local` in `apps/web` hold `DATABASE_URL`, `RESEND_API_KEY`,
  `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `NEXT_PUBLIC_*`, etc. **Never commit real secrets.**
- Local DB is MySQL via Laragon (`mysql://root:@localhost:3306/ukride` style).

## Database — Prisma 7 (IMPORTANT)
Prisma 7 **cannot** be constructed with `new PrismaClient()` alone — it needs a **driver adapter**.
See `apps/web/src/lib/prisma.ts`: it parses `DATABASE_URL` and passes
`new PrismaClient({ adapter: new PrismaMariaDb(config) })` using `@prisma/adapter-mariadb`.
- `build` script runs `prisma generate && next build`.
- After schema changes: `npx prisma generate` and `npx prisma db push` (or migrate).
- ⚠️ `@/lib/site-settings.ts` imports Prisma → it is **server-only**. Do NOT import it (or
  `@/lib/prisma`) into a client component — it drags the mariadb driver into the browser
  bundle and fails with `Can't resolve 'fs'`. Client-safe phone helper lives in `@/lib/phone.ts`.

## Deployment — Cloudways (the tricky part)
Cloudways runs an **Apache "Hybrid" stack**. Apache serves port 80 and **proxies to the
Next.js app on port 3000** via a `.htaccess` mod_proxy rule. PM2 keeps Next.js alive.

**Cloudways git deploy only PULLS code — it does NOT build or restart.** You must SSH in and
do it manually every time:
```bash
cd apps/web
rm -rf .next        # avoids Turbopack serving a stale cached build (see gotchas)
npm run build
pm2 restart bts-web            # (or: pm2 start npm --name bts-web -- start && pm2 save)
cp public/.htaccess /home/master/applications/<APP_ID>/public_html/.htaccess
```
- **PM2 process name:** `bts-web`. Serves `npm start` (= `next start`) on port 3000.
- `.htaccess` lives in `apps/web/public/.htaccess` (git-tracked) and must be copied into
  `public_html/` after each deploy because Cloudways overwrites `public_html`.
- The Cloudways **`<APP_ID>` and SSH user change** when the server is restored/rebuilt — do
  not hardcode them; confirm the current path with the Cloudways panel each time.
- Node must be 20.19 via **nvm** (`nvm use 20.19.0`); set `nvm alias default 20.19.0`.

### build vs run (common confusion)
- **`npm run build`** = compile source → `.next/`. Needed **only when code changed**.
- **`pm2 start/restart`** = run/serve the built app. Needed whenever the process is down.
- A reboot that kills PM2 only needs a **restart** (the `.next` build survives). New code needs
  a **build then restart**. Admin-panel setting changes need **neither** (DB-driven, instant).
- Run `pm2 startup` (then the sudo cmd it prints) + `pm2 save` so the app **auto-starts on
  reboot** — otherwise a server reboot leaves nothing on port 3000 and Apache returns **503**.

## Admin panel & site settings
- Admin at `/admin` (login `/admin/login`). Auth via `authStaff()` in `@/lib/auth`.
- **Admin → Settings** edits DB-backed values that update the whole site **instantly, no
  redeploy**: WhatsApp number, **Call/Phone number**, contact email. (Stripe keys are env vars only; Settings shows a masked status.)
  Backed by the `Setting` model; read via `getSiteSettings()` (server) / `useSiteSettings()`
  (client) / `SiteSettingsProvider`.
- All phone/WhatsApp/email displays site-wide are wired to these settings — no hardcoded
  contact info remains in the pages.

## Pricing (server is the source of truth)
- Fare = vehicle rates (DB `VehicleType`: base, per-mile, minimum, promo %) × route miles, plus a
  **£16 Meet & Greet** fee for airport pickups (unless the customer opts out). Maths lives in
  `src/lib/booking-pricing.ts` and is shared by the quotes page, booking summary and payment API.
- Route miles come from the server (`src/lib/route-distance.ts` → Google **Routes API** `computeRoutes`, falling back to the legacy Directions API for old projects; cached),
  exposed at `/api/route-distance`; if Google fails, every side uses the same 28-mile fallback.
- `/api/quote` returns the confirmed price shown on the booking summary, and
  `/api/payments/stripe/checkout` **recalculates it again** (`src/lib/booking-quote.ts`) —
  prices in the URL / request body are never charged.
- Enable **Routes API** + **Maps JavaScript API** (new projects cannot enable the legacy Directions API) and set `GOOGLE_MAPS_SERVER_API_KEY` (unrestricted-by-referrer key) in production so real distances
  are used server-side; a browser key with HTTP-referrer restrictions is rejected by Google.

## Payments (Stripe Checkout)
- Flow: booking summary → `POST /api/payments/stripe/checkout` (server re-prices, creates a
  `PaymentSession`, opens a Stripe Checkout page) → Stripe → `/payment/success/<paymentSessionId>`.
- The booking is created by `fulfilPaymentSession()` once Stripe says the session is **paid** and the
  amount matches — from the webhook (`/api/payments/stripe/webhook`, signature-verified) *or* the
  success page, whichever comes first. A `SELECT … FOR UPDATE` lock stops double bookings.
- Local testing: Stripe test keys + card `4242 4242 4242 4242`; webhooks via `stripe listen`.

## Design system
- Everything is themed through **CSS variables in `apps/web/src/app/globals.css`** (`:root`,
  `.dark`, and the `.admin-dark` / admin `--adm-*` tokens). Change colors there, not per-page.
- Current palette is **navy & gold on ivory**: navy `#0B1F3A` (header, hero, bands, footer
  `#071427`), gold `#F5B21B` (matches the MRM logo) for CTAs/highlights only — `text-gold-ink` is `#8A5D00` on light, `#F9C543` on navy, ivory `#F7F5F0` page bg, white cards.
  Headings use Plus Jakarta Sans (the old Cormorant serif was dropped).
- **Theming model:** `:root` = light content. Add `theme-navy` to a section (the legacy
  `.BTS-luxury-section-*`, `.BTS-glass-nav`, `.BTS-section-onyx` and `.admin-dark` get it
  automatically) to flip tokens to white-on-navy; `theme-light` flips back (e.g. the white
  booking card inside the hero). So use semantic classes — `text-foreground`, `text-body`,
  `text-muted-foreground`, `bg-card`, `bg-surface`, `border-border`, `text-gold-ink` (gold
  text with AA contrast), `bg-gold text-gold-foreground` (CTA) — **never hardcoded hex**.
- `.BTS-*` class names are the (legacy-named) design-system utilities — **keep the prefix**,
  it is just a CSS namespace, not the brand.

## Current state / recently done
- Rebranded BTS → "London Airport Taxi Services" → **"MRM Executive Voyage"** (name, titles, alt text, emails, payment description, logo).
- Full monochrome recolor (removed all purple), then replaced by the navy/gold system.
- Homepage re-laid out: utility bar + header with "Book now", hero with white quote card,
  stats/accreditation strip, how-it-works, airport + fleet grids, two-column FAQ, new footer.
- Logo is `public/assets/logo-mrm.png` (512×512, round, transparent outside the circle) — also `app/icon.png` / `app/apple-icon.png`. Old `logo.jpeg` is unused.
- Admin Create/Edit/Delete bookings (modal + confirm), vehicle-type dropdown.
- Call/Phone number added to Admin Settings and wired site-wide.

## Before go-live — replace placeholders (in Admin → Settings)
- **WhatsApp number** (default `447700140900` — placeholder)
- **Call/Phone number** (default `+44 2080 5090 14` — placeholder)
- **Contact email** (still `support@BTS.uk` — placeholder, old brand)
- **Email sender**: set `EMAIL_FROM` env (fallback is `MRM Executive Voyage <bookings@bts.uk>`, a placeholder address)
- Stripe: set the **live** `STRIPE_SECRET_KEY` and create a webhook endpoint
  `https://<domain>/api/payments/stripe/webhook` → put its signing secret in `STRIPE_WEBHOOK_SECRET`.
- If the logo graphic still reads oddly, supply a cleaner/transparent logo.

## Known open items / watch-list
- Payments switched from Revolut to Stripe. The `payment_sessions.revolutOrderId` column is kept only
  for old records; new payments use `stripeSessionId`.
- Google Maps: billing must be enabled on the Cloud project — until then route maps fail and
  **all prices use the 28-mile fallback**. Route map on the booking-summary page needs a valid
  `NEXT_PUBLIC_*` Maps key (baked at build time — rebuild after changing).
- Import local DB data to live + create the live admin user if not done.
- Social links in the footer are still placeholder URLs.

## Rendering / SEO gotchas
- **Don't add a root `app/loading.tsx`** (or one on indexed public pages). It wraps the page in a
  Suspense boundary, so the server HTML hides the content in a `<div hidden id="S:0">` until JS reveals
  it, and `notFound()` returns HTTP 200 instead of 404. Navigation feedback comes from
  `RouteLoadingBar` (listens for the `ukride-route-start` event). Admin keeps its own loading.tsx.
- Every page sets `export const metadata = { title, description }`; the root layout turns the title
  into "<title> | MRM Executive Voyage". Private/step pages (login, quotes, booking-summary, payment,
  account, admin) are `noindex`. Client pages put metadata in a sibling `layout.tsx` (see drive-with-us).
- React 19.2 reveals streamed boundaries on the next animation frame, so in a **hidden/background
  browser tab** you may see a leftover hidden `S:0` copy — that's a test artefact, not a bug.

## Conventions
- Commit only when asked; branch off `main` if needed. Co-author trailer used on commits.
- After editing previewable code, verify via the dev server before claiming done.
- On Windows/Laragon the shell is Git Bash or PowerShell; deploy shell is Debian bash (SSH).
