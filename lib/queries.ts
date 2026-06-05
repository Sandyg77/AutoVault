import { prisma } from "@/lib/db";

// Fetch all vehicles, newest first from DB
export async function getVehicles() {
  return prisma.vehicle.findMany({
    orderBy: { createdAt: "desc" },
  });
}

// Fetch a single vehicle by its id. Returns null if not found.
export async function getVehicleById(id: string) {
  return prisma.vehicle.findUnique({ where: { id } });
}

// The type of a single vehicle, INFERRED from the query above.
// Using Awaited<ReturnType<...>> means we never import the generated
// Prisma type directly — the UI stays decoupled from the client path.
export type VehicleItem = Awaited<ReturnType<typeof getVehicles>>[number];
