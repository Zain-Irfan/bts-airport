# Laragon + Next.js (Revolut return URL)

Revolut redirects to `NEXT_PUBLIC_APP_URL` after payment. That URL must reach the **Next.js** app (`npm run dev` in `apps/web`), not Apache’s empty site root.

## Option 1 — Port 3000 (recommended)

1. In `apps/web/.env.local`:
   ```
   NEXT_PUBLIC_APP_URL=http://ukride.test:3000
   ```
2. From `apps/web`: `npm run dev` (restart after changing `next.config.ts`)
3. Open the site at **http://ukride.test:3000** (not `http://ukride.test` without a port).

`next.config.ts` includes `allowedDevOrigins` for `ukride.test` so client components (phone picker, etc.) work on the vhost, not only on `localhost`.
4. Complete booking and payment from that URL.

After payment, Revolut sends you to `http://ukride.test:3000/payment/success/YOUR_SESSION_ID`.

## Option 2 — Port 80 proxy

1. Laragon → Apache → enable `mod_proxy` and `mod_proxy_http` in `httpd.conf`.
2. Virtual host document root should be the repo root (`ukride`) so the root `.htaccess` proxy applies.
3. Keep `NEXT_PUBLIC_APP_URL=http://ukride.test` and browse **http://ukride.test** while `npm run dev` runs on port 3000.

## Already paid but saw 404?

If payment succeeded on Revolut but the browser hit `http://ukride.test/payment/success?...` (no port), open:

`http://ukride.test:3000/payment/success/YOUR_SESSION_ID`

(or `?sessionId=` / `?session_id=` in the query string).
