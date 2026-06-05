import { getVehicles } from "@/lib/queries";
import { VehicleCard } from "@/components/VehicleCard";

// Server component: fetches vehicles directly, no API route needed.
export default async function HomePage() {
  const vehicles = await getVehicles();

  return (
    <main className="min-h-screen bg-neutral-50">
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-emerald-950 to-neutral-900 text-white">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-400">
            AutoVault · Germany
          </p>
          <h1 className="mt-4 max-w-2xl text-4xl font-bold leading-tight sm:text-5xl">
            Curated electric cars and camper vans, ready for the road.
          </h1>
          <p className="mt-4 max-w-xl text-lg text-neutral-300">
            A hand-picked inventory of sustainable mobility and adventure
            vehicles, sourced and inspected across Germany.
          </p>
        </div>
      </section>

      {/* ── Inventory grid ───────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-6 flex items-baseline justify-between">
          <h2 className="text-2xl font-semibold text-neutral-900">Inventory</h2>
          <span className="text-sm text-neutral-500">
            {vehicles.length} vehicles available
          </span>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {vehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      </section>
    </main>
  );
}
