# Bhaktanjaneya Sweets — Storefront

Frontend for **Bhaktanjaneya Sweets**, an Indian sweets & namkeen shop. Built with
Next.js (App Router) + Tailwind CSS. It ships as a fully working demo using bundled
mock data, with a clean, documented seam so the backend (REST API + Razorpay) can be
wired in later without touching UI code.

- **Storefront**: home, shop, category collections, product detail, cart, customer
  account, plus about / contact / bulk-orders / blog / FAQ / policy pages.
- **Ordering**: WhatsApp checkout today (a pre-filled order message); online card/UPI
  payment via Razorpay is stubbed for phase 2.
- **Auth**: phone + OTP login for customers.
- **Admin panel** at `/admin`: dashboard, products, categories, offers, orders, and
  customers — all editable in the demo via `localStorage`.

## Getting started

```bash
npm install
cp .env.example .env.local   # already present for local dev
npm run dev                  # http://localhost:3000
```

Scripts:

| Command         | What it does                              |
| --------------- | ----------------------------------------- |
| `npm run dev`   | Start the dev server (Turbopack)          |
| `npm run build` | Production build + type check             |
| `npm run start` | Serve the production build                |
| `npm run lint`  | Run ESLint                                |

## Demo logins

While `NEXT_PUBLIC_USE_MOCK=true` (the default):

- **Customer OTP**: enter any 10-digit phone, then use code **`123456`**.
- **Admin** (`/admin`): `admin@bhaktanjaneyasweets.com` / `admin123`.

> In demo mode, admin edits and placed orders are saved to your browser's
> `localStorage`. Use **Reset data** in the admin top bar to restore the seed
> catalog. Because the storefront is server-rendered from the seed JSON, demo
> admin edits won't change the public pages until the real API is connected.

## Environment variables

All client-visible config is `NEXT_PUBLIC_*` (see `.env.example`). **No secrets**
belong here — Razorpay `key_secret`, OTP provider keys, and DB URLs live only on
the backend.

| Variable                      | Purpose                                                  |
| ----------------------------- | -------------------------------------------------------- |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Business WhatsApp number (digits only) for order links   |
| `NEXT_PUBLIC_SITE_URL`        | Public URL for SEO / sitemap / Open Graph                |
| `NEXT_PUBLIC_USE_MOCK`        | `true` = bundled mock JSON; `false` = call the real API  |
| `NEXT_PUBLIC_API_BASE_URL`    | Backend base URL (used when mock is off)                 |
| `NEXT_PUBLIC_RAZORPAY_KEY_ID` | Razorpay publishable key id (phase 2)                    |

## Connecting the backend

Flip `NEXT_PUBLIC_USE_MOCK=false` and set `NEXT_PUBLIC_API_BASE_URL`. Every data
function in `src/lib/api/*` already has a real-`fetch` branch behind that toggle, so
no component changes are needed. The endpoints, request/response shapes, and the
Razorpay flow the backend must implement are documented in
**[`API_CONTRACT.md`](./API_CONTRACT.md)**. The shared domain types in
`src/lib/types.ts` are the source of truth for those shapes.

## Project structure

```
src/
  app/                 Routes (App Router)
    admin/             Admin panel (client-gated, full-screen shell)
    product/[slug]/    Product detail (SSG)
    collections/[slug] Category pages (SSG)
    blog/ policies/    Content pages
    sitemap.ts robots.ts
  components/          UI, product, home, cart, layout, admin components
  context/             AuthContext, CartContext, AdminContext (React providers)
  lib/
    api/               Data layer — mock + real fetch behind config.useMock
    admin/store.ts     localStorage-backed store for the demo admin
    mock/              Seed JSON (products, categories, offers) + blog data
    types.ts           Shared domain types = the API contract
    config.ts          Runtime config from env
```

## Tech

Next.js 16 · React 19 · Tailwind CSS v4 · TypeScript (strict) ·
embla-carousel · lucide-react.
