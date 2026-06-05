# Architectural Decisions

A short record of the key decisions made building AutoVault, and why.

## 1. Vehicle-type registry over hardcoded types

**Decision:** Define each vehicle type (label, spec fields, validation schema) in a single registry file (`lib/vehicle-types.ts`). Every feature reads from it.

**Why:** The brief explicitly called for an architecture that stays flexible as inventory changes over time. Hardcoding `if (type === "car")` branches across the form, filters, and detail page would mean touching many files to add a type. With the registry, adding a vehicle type is a one-file change — the form, its validation, the filters, and the spec display all adapt automatically.

**Trade-off:** A registry adds a small layer of indirection up front, but it pays off the moment a second (or third) type exists — which is the whole point of the assignment.

## 2. PostgreSQL over MongoDB

**Decision:** Use relational Postgres (via Neon), not a document database.

**Why:** A dealership domain is fundamentally relational — vehicles relate to locations, salespeople, and deals. Modelling those relationships is natural in SQL and awkward in a document store (where you either duplicate data or simulate joins). Postgres gives referential integrity now and room to grow without a rewrite.

**Why it doesn't sacrifice flexibility:** Type-specific specs are stored in a single `JSONB` column, so the "shape changes over time" requirement is met without giving up the relational core. Relational core, flexible edge.

## 3. Relational core + JSONB specs

**Decision:** Shared fields (make, model, year, price, status) are typed columns; type-specific specs live in one `JSONB` column.

**Why:** Shared fields benefit from typing, indexing, and sorting. Type-specific fields vary per type and shouldn't force schema migrations every time a type is added. Splitting them gives the best of both: integrity where it matters, flexibility where it's needed.

## 4. Money stored as integer cents

**Decision:** Prices are stored as integer cents (`priceCents`), formatted to euros only at display time.

**Why:** Floating-point decimals cause rounding errors with currency. Integer cents avoids this entirely; the German-locale formatting (`1.234 €`) happens in the view layer.

## 5. No authentication (scoped out)

**Decision:** The `/admin` area is intentionally unguarded.

**Why:** This is a two-day prototype, and the brief prioritises structural quality over feature count. Auth is well-understood and would consume time better spent on the core architecture. In production, `/admin` would sit behind authentication and role-based access. This is a deliberate scope decision, not an oversight.

## 6. Server Actions over a REST API

**Decision:** Handle create/update/delete with Next.js Server Actions rather than building API routes.

**Why:** Server Actions let the forms call server-side logic directly, with validation and database writes in one place, and no client/server API contract to maintain. For an app of this size it removes a whole layer of boilerplate.

## 7. Deployment: Prisma engine on serverless

**Decision:** Generate the Prisma client to the standard `node_modules/@prisma/client` location and target the Linux runtime (`rhel-openssl-3.0.x`).

**Why:** The initial setup generated the client into the `app/` directory, which caused Vercel's serverless bundler to omit the Linux query-engine binary at runtime (the deployed site threw `PrismaClientInitializationError`). Diagnosing this from the Vercel function logs and moving to the conventional client location — plus adding the Linux `binaryTargets` — resolved it. A real example of a "works locally, fails on serverless" issue and its fix.
