import { getVehicles } from "@/lib/queries";
import { VehicleCard } from "@/components/VehicleCard";
import { InventoryBrowser } from "@/components/InventoryBrowser";
import { Zap, Truck, Car } from "lucide-react";

export const dynamic = "force-dynamic";

// Server component: fetches vehicles directly, no API route needed.
export default async function HomePage() {
  const vehicles = await getVehicles();

  return (
    <main className="min-h-screen bg-neutral-50">
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-linear-to-br from-emerald-950 to-neutral-900 text-white">
        {/* Decorative glow blobs */}
        <div className="pointer-events-none absolute -right-24 -top-32 h-120 w-120 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-1/4 h-72 w-72 rounded-full bg-emerald-700/15 blur-2xl" />

        <div className="relative mx-auto max-w-6xl px-6 py-24">
          {/* Eyebrow badge */}
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-700/60 bg-emerald-900/50 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-emerald-400 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            AutoVault · Germany
          </span>

          <h1 className="mt-5 max-w-2xl text-4xl font-bold leading-tight sm:text-5xl">
            Find Your Next Electric Car or Camper Van
          </h1>
          <p className="mt-4 max-w-xl text-lg text-neutral-300">
            Explore a carefully curated selection of sustainable vehicles and
            adventure-ready camper vans, sourced and inspected across Germany.
          </p>

          {/* Stat chips */}
          <div className="mt-8 flex flex-wrap gap-3 text-sm">
            <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-white/90 backdrop-blur">
              <Zap className="h-4 w-4 text-emerald-400" />
              Electric Cars
            </div>
            <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-white/90 backdrop-blur">
              <Truck className="h-4 w-4 text-emerald-400" />
              Camper Vans
            </div>
            <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-white/90 backdrop-blur">
              <Car className="h-4 w-4 text-emerald-400" />
              <span className="font-bold text-emerald-400">{vehicles.length}</span>
              vehicles listed
            </div>
          </div>
        </div>
      </section>

      {/* ── Inventory ────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-6 flex items-center gap-3">
          <span className="h-5 w-1 rounded-full bg-emerald-600" />
          <h2 className="text-2xl font-semibold text-neutral-900">Inventory</h2>
        </div>
        <InventoryBrowser vehicles={vehicles} />
      </section>

      {/* <section>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {vehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      </section> */}
    </main>
  );
}
