# OLADECK Global Services

Premium Next.js 15 platform for OLADECK Global Services — a Nigerian imported-vehicle clearing and forwarding company.

## Stack

- Next.js 15 App Router, React 19, TypeScript
- Tailwind CSS, shadcn-style UI primitives, Lucide Icons, Framer Motion
- React Hook Form and Zod validation
- Supabase Auth, PostgreSQL, Storage-ready schema, Server Actions
- SEO metadata, sitemap, robots, Open Graph, JSON-LD

## Features

- Agency-style homepage with hero, trusted-by logos, animated counters, services, process timeline, benefits, FAQ, testimonials, filtered gallery, resources, and port updates
- Multi-step quote form with draft save/resume, file upload field, server-side validation, tracking number generation, and Supabase insert path
- Customer portal tracking view with statuses, progress bar, timeline, documents, invoices, notifications, and support entry
- Admin dashboard UI for metrics, quotes, status assignment, search, analytics, CMS, blog, gallery, media, and roles
- Duty/import cost estimator, document checklist generator, floating assistant, callback request page
- Dark mode, responsive layout, keyboard-friendly controls, loading and error boundaries

## Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Environment

Copy `.env.example` to `.env.local` and set:

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_WHATSAPP_NUMBER=2348172973820
QUOTE_NOTIFICATION_EMAIL=biona4real@gmail.com
```

The quote form still returns a tracking number without Supabase credentials, but database persistence requires the Supabase values.

## Database

Run `supabase/schema.sql` in your Supabase SQL editor. It creates:

- Profiles and role system: admin, manager, staff, customer
- Quotes, documents, tracking events, invoices, customers
- Gallery, blog, CMS content, port updates, audit logs
- RLS policies and useful indexes
- Realistic demo records

Create a private Supabase Storage bucket for quote documents and a public bucket or signed URL workflow for gallery/media assets.

## Production Notes

- Connect email notifications with Resend, Postmark, or SendGrid inside `app/quote/actions.ts`
- Connect WhatsApp notifications through Meta WhatsApp Cloud API or an approved provider
- Add Supabase Auth middleware before protecting `/admin`
- Replace placeholder map/resources with verified Google Maps embed and real downloadable files
- Use Vercel environment variables and deploy normally with `npm run build`
