# AutoVault

A schema-driven vehicle inventory platform for a German dealership. Browse, filter, and manage electric cars and camper vans through a **type-extensible architecture** — adding a new vehicle type is a one-file change.

**Live demo:** https://auto-vault-eight.vercel.app
**Author:** Sandumi Sathdahara Godage

---

## Screenshots

**Storefront**
![Storefront](docs/storefront.png)

**Vehicle detail**
![Detail](docs/detail.png)

**Admin — manage inventory**
![Admin](docs/admin.png)

**Admin — dynamic add/edit form**
![Form](docs/form.png)

---

## The core idea

The brief asked for an architecture that stays flexible as the inventory "changes or expands over time." AutoVault is built around a single **vehicle-type registry** (`lib/vehicle-types.ts`). Each vehicle type declares its label, its spec fields, and a Zod validation schema in one place. Every part of the app — the storefront filters, the detail page's spec display, and the admin form (including validation) — reads from this registry instead of hardcoding vehicle types.

**The result:** adding a new vehicle type (e.g. a motorbike or boat) means adding one entry to the registry. The form, validation, filters, and display all adapt automatically — no schema migration, no new components.

This is paired with a **relational core + flexible edge** data model: shared fields (make, model, price, status) are strongly-typed Postgres columns, while type-specific specs live in a single `JSONB` column. This keeps referential integrity for the relational parts of the domain while allowing per-type flexibility where it's actually needed.

---

## Tech stack

| Tool                        | Role                 | Why                                                                                                                                                    |
| --------------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Next.js 16** (App Router) | Full-stack framework | Server Components + Server Actions give full CRUD without a separate API layer — the fastest path to a working full-stack app.                         |
| **TypeScript**              | Language             | Type safety across the registry keeps the flexible-schema design robust rather than loose.                                                             |
| **Neon Postgres**           | Database             | The dealership domain (locations, sales, deals) is fundamentally relational; Postgres gives integrity now and room to grow. Serverless and persistent. |
| **Prisma**                  | ORM                  | Typed queries and migrations; pairs naturally with TypeScript.                                                                                         |
| **Zod**                     | Validation           | One schema per vehicle type — the single source of truth for both form validation and the registry.                                                    |
| **Tailwind CSS**            | Styling              | Rapid, consistent UI.                                                                                                                                  |
| **react-hook-form**         | Forms                | Manages the dynamic admin form.                                                                                                                        |
| **Vercel**                  | Hosting              | Zero-config Next.js deployment with a live URL.                                                                                                        |

---

## Getting started

### Prerequisites

- Node.js 20+
- A PostgreSQL database (this project uses [Neon](https://neon.tech))

### Setup

```bash
# 1. Install dependencies
npm install

# 2. Set your database connection string
#    Create a .env file in the project root:
echo 'DATABASE_URL="postgresql://user:password@host/dbname?sslmode=require"' > .env

# 3. Apply the database schema
npx prisma migrate dev

# 4. Seed sample vehicles (12 across both types)
npm run seed

# 5. Run the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the storefront, and [http://localhost:3000/admin](http://localhost:3000/admin) to manage inventory.

---

## Project structure

```
app/
  page.tsx                # Storefront (hero + inventory)
  vehicles/[id]/          # Vehicle detail page
  admin/                  # Admin: list, new, edit, server actions
components/               # Reusable UI (cards, form, nav, footer)
lib/
  vehicle-types.ts        # ⭐ The vehicle-type registry — the heart of the app
  queries.ts              # Database read helpers
  db.ts                   # Shared Prisma client
  format.ts               # German locale formatting
prisma/
  schema.prisma           # Vehicle model + Status enum
  seed.ts                 # Sample data
```

---

## Scope & decisions

This is a **prototype**, scoped deliberately:

- **No authentication** — the `/admin` route is intentionally unguarded for the prototype. In production it would sit behind auth.
- **Seeded image URLs** rather than file uploads.
- **Client-side filtering** — fine for this dataset; at scale, filters would move into the database query via URL params.

See [`DECISIONS.md`](DECISIONS.md) for the key architectural decisions and their rationale.

---

## What I'd build next

- Authentication and role-based access for the admin area.
- Real image uploads (e.g. Vercel Blob / S3).
- Server-side filtering and pagination for large inventories.
- Multi-language support (German/English) for the German market.
- A third vehicle type, to demonstrate the registry's extensibility live.
