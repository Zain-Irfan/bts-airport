# UKride Driver API — Postman

Import these files into [Postman](https://www.postman.com/downloads/):

| File | Purpose |
|------|---------|
| `UKride-Driver-Mobile-API.postman_collection.json` | All driver endpoints |
| `UKride-Local.postman_environment.json` | Variables for local dev |

## Setup

1. **Import** → choose both JSON files.
2. Select environment **UKride — Local (ukride.test)**.
3. Ensure `npm run dev` is running in `apps/web`.
4. Edit `testEmail` / `testPassword` if needed (use a unique email per register test).

## Recommended test order

1. **Register driver (with licence photo)** — Body → form-data → pick a file for **licenseImage** (required). Status `PENDING`.
2. **Admin** → open `http://ukride.test:3000/admin/drivers` → **Approve** the driver.
3. **Login** — saves `accessToken` automatically (Tests tab).
4. **Get my profile** / **Update my profile**.
5. **Application status** — use while pending (before step 2).

## Password reset (dev)

Add to `apps/web/.env.local`:

```env
MOBILE_DEV_SHOW_RESET_TOKEN=true
```

Restart dev server, then:

1. **Forgot password** — copies `resetToken` to environment.
2. **Reset password** — uses `{{resetToken}}`.

## Variables

| Variable | Description |
|----------|-------------|
| `baseUrl` | `http://ukride.test:3000` or `http://localhost:3000` |
| `accessToken` | Set automatically after Login |
| `resetToken` | Set automatically after Forgot password (dev) |
| `testEmail` | Driver email for register/login |
| `testPassword` | Driver password |

## Auth header

Protected routes use:

```
Authorization: Bearer {{accessToken}}
```

(Collection auth is pre-configured on **Profile** requests.)

## Endpoints summary

| Method | Path | Auth |
|--------|------|------|
| POST | `/api/mobile/v1/drivers/register` | No (multipart + `licenseImage` file) |
| POST | `/api/mobile/v1/drivers/login` | No |
| POST | `/api/mobile/v1/drivers/application-status` | No |
| GET | `/api/mobile/v1/drivers/me` | Bearer |
| PATCH | `/api/mobile/v1/drivers/me` | Bearer |
| POST | `/api/mobile/v1/drivers/forgot-password` | No |
| POST | `/api/mobile/v1/drivers/reset-password` | No |

## Example responses

**Login success (200)**

```json
{
  "ok": true,
  "accessToken": "eyJhbG...",
  "tokenType": "Bearer",
  "expiresIn": 2592000,
  "driver": { "id": "...", "status": "APPROVED", "licenseNumber": "PCO123456", ... }
}
```

**Login pending (403)**

```json
{
  "error": "Your application is still under review",
  "code": "PENDING",
  "driver": { ... }
}
```

**Register validation (400)**

```json
{
  "error": "Driver licence number is required"
}
```
