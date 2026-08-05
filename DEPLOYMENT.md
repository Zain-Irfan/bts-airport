# Deployment runbook — London Airport Taxi Services (Cloudways)

> Complete, self-contained guide to how this site is hosted and deployed. If you follow this
> you never need to ask how deployment works. Read together with root `CLAUDE.md`.

---

## 1. How the hosting works (architecture)

The app is hosted on **Cloudways** (managed DigitalOcean). Cloudways does **not** natively run
Node apps, so we run Next.js ourselves under **PM2** and put **Apache in front of it as a
reverse proxy**.

Traffic flow:
```
Visitor → https://londonairporttaxiservices.co.uk
        → Cloudways Apache (port 80/443)          ← Apache is the public web server
        → .htaccess mod_proxy rule                ← forwards everything to...
        → Next.js app on 127.0.0.1:3000           ← run by `npm start` (next start)
        → kept alive by PM2 (process name: bts-web)
```

Key consequences of this design:
- **Apache serves the domain**, but it has no content of its own — it just proxies to Node.
- If the **Node app (PM2) is down**, Apache has nothing to proxy to → visitors get
  **503 Service Unavailable**. (This is the #1 cause of outages — see Troubleshooting.)
- Cloudways **git deployment only pulls the code**. It does **not** build or restart the app.
  Every deploy therefore needs a manual SSH build + PM2 restart.

### Why Apache + .htaccess (not Nginx)
Cloudways offers two stacks. We use the **"Hybrid" stack (Apache in front of Nginx)** because
it honours **`.htaccess`**, which lets us add the reverse-proxy rule **without root/sudo**
(we don't have sudo on Cloudways, so we can't edit Nginx vhosts directly). The pure "Nginx
only" / Lightning stack does not read `.htaccess`, so the proxy rule wouldn't work there.

> Requirement: In the Cloudways panel the app must be on the **Apache (Hybrid) stack**, and
> **`mod_proxy` must be enabled** (Application Settings → often a toggle, or it's on by default
> on Apache). Without mod_proxy the `[P]` proxy flag in `.htaccess` does nothing.

---

## 2. The .htaccess proxy file

This single file is what makes the whole thing work. It lives **git-tracked** at
`apps/web/public/.htaccess` and its contents are:

```apache
DirectoryIndex disabled
RewriteEngine On
RewriteBase /
RewriteRule ^(.*)$ http://127.0.0.1:3000/$1 [P,L]
```

What it does: `DirectoryIndex disabled` stops Apache serving a default `index` page; the
`RewriteRule … [P,L]` **proxies every request** to the Next.js app on port 3000.

### ⚠️ Why it must be re-copied on every deploy
Cloudways serves the site from `…/public_html/` and **overwrites `public_html` on git pull**.
So we keep the real copy in git at `apps/web/public/.htaccess` and copy it into `public_html`
after each deploy:
```bash
cp apps/web/public/.htaccess /home/master/applications/<APP_ID>/public_html/.htaccess
```
If the site 503s or shows the Cloudways default page after a deploy, the missing/overwritten
`.htaccess` is a prime suspect — re-copy it.

---

## 3. Access & key facts

| Thing | Value |
|-------|-------|
| Panel | Cloudways (login = client/owner account) |
| SSH | Master credentials from Cloudways → *Servers → Master Credentials* |
| App path | `/home/master/applications/<APP_ID>/public_html` |
| App code | lives under `…/public_html/apps/web` (monorepo; the Next app is `apps/web`) |
| PM2 process | **`bts-web`** (runs `npm start` → next start, port 3000) |
| Node | **20.19.0** via **nvm** (`nvm use 20.19.0`; `nvm alias default 20.19.0`) |
| Domain | londonairporttaxiservices.co.uk |
| Git remote | github.com/Zain-Irfan/bts-airport (branch `main`) |

> ⚠️ **`<APP_ID>` and the SSH username change** whenever the Cloudways server is
> restored/rebuilt/migrated (it has happened several times on this project — you'll see
> different `phpstack-…` / `master_…` identifiers). **Never hardcode them** — always read the
> current path/user from the Cloudways panel. In these commands `<APP_ID>` = the current app
> folder id.

---

## 4. Routine deploy (code already pushed to GitHub)

After pushing new code to `main`, and after Cloudways has pulled it (or you `git pull`):

```bash
# SSH into the server, then:
cd /home/master/applications/<APP_ID>/public_html/apps/web

nvm use 20.19.0                 # ensure correct Node (if a fresh shell)
rm -rf .next                    # ⭐ clear Turbopack cache so new code/CSS actually shows
npm run build                   # compiles → .next  (runs `prisma generate && next build`)
pm2 restart bts-web             # serve the new build
cp public/.htaccess /home/master/applications/<APP_ID>/public_html/.htaccess

curl -I http://127.0.0.1:3000   # expect 200/307/308 = app is up
```
Then hard-refresh the site.

- `rm -rf .next` matters: **Turbopack can serve a stale cached build** and you'll swear your
  changes "aren't showing" even though the source is correct. Wiping `.next` forces a clean
  compile. (We hit this exact trap; it wasted real time.)
- Only **code** changes need `npm run build`. **Admin-panel settings** (phone, WhatsApp, email,
  Revolut key) are DB-driven and update **instantly with no build/deploy**.
- `NEXT_PUBLIC_*` env vars are **baked in at build time** → changing one needs a full rebuild.

---

## 5. First-time / after-server-restore setup

If the server is brand new or was restored (PM2 empty, node_modules gone, etc.), do the full
bring-up:

```bash
cd /home/master/applications/<APP_ID>/public_html/apps/web

# 1. Node
nvm install 20.19.0 && nvm use 20.19.0 && nvm alias default 20.19.0
node -v                          # must be v20.19.0+

# 2. Dependencies (clean if partially installed)
rm -rf node_modules
npm install                      # if it fails on prisma/dotenv: `npm install dotenv` then retry

# 3. Environment file — create apps/web/.env with the live values (NOT in git):
#    DATABASE_URL=mysql://<user>:<pass>@127.0.0.1:3306/<dbname>
#    RESEND_API_KEY=...
#    REVOLUT_MERCHANT_SECRET_KEY=...   (or set via Admin → Settings)
#    NEXT_PUBLIC_*=...                 (e.g. Google Maps key, app URL)

# 4. Prisma (Prisma 7 needs the mariadb adapter — already wired in src/lib/prisma.ts)
npx prisma generate
npx prisma db push               # creates/updates tables on the live DB

# 5. Build
npm run build

# 6. Start under PM2 + persist
pm2 start npm --name bts-web -- start
pm2 save
pm2 startup                      # run the `sudo …` line it prints → auto-start on reboot

# 7. Proxy file into public_html
cp public/.htaccess /home/master/applications/<APP_ID>/public_html/.htaccess

# 8. Verify
curl -I http://127.0.0.1:3000
```
Also confirm in the Cloudways panel: **Apache/Hybrid stack** selected and **mod_proxy enabled**.

---

## 6. PM2 quick reference
```bash
pm2 status                       # list processes (should show `bts-web` online)
pm2 logs bts-web --lines 50      # runtime logs — check here first when something breaks
pm2 restart bts-web              # restart after a new build
pm2 start npm --name bts-web -- start   # (re)create the process if it's gone
pm2 save                         # snapshot process list (needed after start/restart)
pm2 startup                      # print the boot command → makes PM2 auto-start on reboot
```
`pm2 save` + `pm2 startup` (run its sudo output) together are what make the app **survive a
server reboot**. Without them, a reboot kills PM2 and the site 503s until manually restarted.

---

## 7. Build vs Run (so it's never confusing)
- **`npm run build`** = *compile* source → `.next/`. Needed **only when code changed**.
- **`pm2 start/restart`** = *serve* the built app on port 3000. Needed whenever the process is down.
- Reboot that killed PM2, no code change → **just restart** (the built `.next` survives).
- New code pushed → **build, then restart**.
- Admin setting changed → **nothing** (DB-driven, live).

---

## 8. Troubleshooting runbook

**503 Service Unavailable (Apache page)** — the Node app isn't answering on 3000.
1. `pm2 status` — if empty/stopped, the app is down (common after a reboot).
2. `pm2 logs bts-web --lines 50` — see why it died (build error, missing env, DB).
3. `pm2 start npm --name bts-web -- start && pm2 save` (or `pm2 restart bts-web`).
4. `curl -I http://127.0.0.1:3000` should return 200/307/308.
5. If app is up but site still 503s → re-copy `.htaccess` (section 2) and check mod_proxy.

**Changes / new colors "not showing" after deploy** — stale Turbopack cache.
→ `rm -rf .next && npm run build && pm2 restart bts-web`.

**Cloudways default PHP page instead of the site** — `.htaccess` missing/overwritten or wrong
stack. → Re-copy `.htaccess`; confirm Apache/Hybrid stack + mod_proxy on.

**`PrismaClientConstructorValidationError` / adapter errors** — Prisma 7 needs the driver
adapter; it's already set up in `src/lib/prisma.ts` (`@prisma/adapter-mariadb`). Ensure that
package is installed and `npx prisma generate` ran.

**`PrismaClient ... needs Node 20.19+`** — wrong Node. → `nvm use 20.19.0`.

**`Cannot find module 'dotenv/config'` / `c12/...`** — incomplete install.
→ `npm install dotenv`, or `rm -rf node_modules && npm install`.

**`bookings`/table doesn't exist** — schema not pushed. → `npx prisma db push`.

**Build crashes on Resend** — handled: `src/lib/email.ts` lazily initialises Resend so a
missing `RESEND_API_KEY` doesn't crash the build. Set the real key for emails to actually send.

**Revolut "Authentication failed" (502)** — usually a stale build or wrong key. Note a
**DB-stored key overrides the env var** (`getRevolutSecretKeyAsync()` checks DB first), so make
sure only the correct key is set (in Admin → Settings or `.env`). Rebuild after changing.

**Server "expired"/restored → different URL/IP** — do the full section 5 bring-up again; the
`<APP_ID>` and SSH user will have changed.

---

## 9. One-liner cheat sheet (routine deploy)
```bash
cd /home/master/applications/<APP_ID>/public_html/apps/web && nvm use 20.19.0 && rm -rf .next && npm run build && pm2 restart bts-web && cp public/.htaccess /home/master/applications/<APP_ID>/public_html/.htaccess && curl -I http://127.0.0.1:3000
```
