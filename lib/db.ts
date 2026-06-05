// A single, shared Prisma client for the whole app.
// Next.js hot-reloads in dev, which can otherwise create many DB
// connections. Caching the client on `globalThis` prevents that.
//

import { PrismaClient } from "@prisma/client";
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
