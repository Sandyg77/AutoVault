# AI Usage Log

AI tooling was used throughout this build. This is an honest account of where, how, and what it added.

## Tools used

- **Claude (Anthropic)** — used as a pair-programming partner for planning, scaffolding, code generation, and debugging. Primarily **Claude Opus 4.8** for core tasks (architecture, code generation, debugging), and **Claude Sonnet 4.6** for styling/UI work.
- **Claude Code** — used for in-editor/terminal assistance during development.

## How I worked with it

**I started with a plan, not code.** Before building anything, I had the AI produce a full execution plan: what a vehicle inventory system needs, the architecture, the tech-stack rationale, and a phased breakdown of the work. I then executed those phases one at a time — setup, data layer, storefront, admin CRUD, deployment, polish, and deliverables — verifying each phase worked before moving to the next. This kept the build structured and made debugging far easier, since each step was isolated.

## What I used it for

**Planning & architecture.** I worked through the design with the AI up front: how to keep the system extensible, and the database choice. This produced the central idea — a vehicle-type registry plus a relational-core / JSONB-edge data model.

**Decision support, not decision replacement.** The AI's first instinct for the database was MongoDB (good for flexible schemas). I pushed back, reasoning that a dealership domain is relational (locations, salespeople, deals) and that embedding mutable data is an anti-pattern. We landed on Postgres with a JSONB column for specs — a better fit. This back-and-forth is representative of how I used it: as a sounding board I could challenge, not an oracle.

**Code generation.** The AI generated first drafts of most components — the registry, the dynamic form, server actions, the storefront, and the detail page — which I reviewed, integrated, and adjusted file by file.

**Debugging.** The most valuable use was debugging a production-only failure: after deploying to Vercel, the app threw `PrismaClientInitializationError` because the Prisma query engine wasn't bundled into the serverless function. I pulled the Vercel function logs, and we diagnosed it together — the root cause was generating the Prisma client into a non-standard directory. Moving to the conventional `@prisma/client` location and adding the Linux `binaryTargets` fixed it.

## What I gained

- **Speed.** A full-stack, deployed CRUD app with a non-trivial architecture inside the time box.
- **Structure.** Working from a phased plan meant steady, verifiable progress instead of a tangle of half-finished features.
- **Fewer dead ends.** The AI surfaced gotchas (money-as-cents, serverless DB pooling, the Prisma engine issue) before or as they happened.
- **A clearer architecture.** Talking through the design produced a sharper extensibility story than I'd have reached as quickly alone.

## What I didn't outsource

- The core architectural call (Postgres over Mongo) was mine, made by disagreeing with the AI's first suggestion.
- Every generated file was reviewed and understood before being committed — including asking for explanations of unfamiliar parts (e.g. what `drivetrain` means, how the discriminated-union return type works) rather than pasting blindly.
