# Ojay Motors Platform

Phase 1 of the marketplace rebuild migrates the project from a Vite brochure-style app into a Next.js App Router foundation with Prisma, auth scaffolding, typed domain services, and a production-grade homepage.

## Stack

- Next.js 14 App Router
- TypeScript
- Tailwind CSS
- Prisma ORM with PostgreSQL
- NextAuth credentials-based auth foundation
- Zod + React Hook Form

## Phase 1 included

- New `app/` architecture and shared shell
- Prisma schema for users, dealers, listings, images, inquiries, favorites, reviews, settings, and auth models
- Prisma seed script with realistic users, dealer profile, and sample listings
- NextAuth credentials flow foundation
- Registration route handler
- Listings API route
- Contact API route
- Inquiry API route
- Contact/inquiry persistence and notification service layer
- Basic honeypot and rate limiting for lead capture
- Server-side listing service layer with database-aware fallback behavior
- New production homepage, login/register, inventory index, listing detail, sell, about, contact, terms, and dashboard foundation
- Robots and sitemap routes

## Environment variables

Copy `.env.example` to `.env.local` and fill in real values:

```bash
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/ojay_motors"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="replace-with-a-long-random-secret"

CLOUDINARY_CLOUD_NAME=""
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""
LEAD_WEBHOOK_URL=""

ADMIN_EMAIL="admin@ojaymotors.ng"
ADMIN_PASSWORD="ChangeMe123!"
```

## Local setup

```bash
npm install
npm run db:generate
npm run db:push
npm run db:seed
npm run dev
```

Open `http://localhost:3000`.

## Seeded accounts

- Admin: `admin@ojaymotors.ng` / `ChangeMe123!`
- Dealer: `dealer@ojaymotors.ng` / `ChangeMe123!`
- Buyer: `buyer@ojaymotors.ng` / `ChangeMe123!`

## Notes

- If `DATABASE_URL` is not configured, the homepage and inventory use typed seeded fallback content so the app still builds and previews cleanly.
- The old Vite implementation still exists in `src/` for reference, but the active platform now runs from `app/`.
- If you are editing the homepage, use `app/page.tsx` and `components/home/*`. Changes in `src/pages/Home.jsx` will not affect the live Next.js app.
- Next phases should expand listing CRUD, media upload workflows, richer dealer/admin tools, favorites, saved searches, and role-based mutations.
