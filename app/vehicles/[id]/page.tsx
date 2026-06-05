import { notFound } from "next/navigation";
import { getVehicleById } from "@/lib/queries";
import { getVehicleType } from "@/lib/vehicle-types";
import { formatPrice, formatNumber } from "@/lib/format";
import { StatusBadge } from "@/components/StatusBadge";

// In Next.js App Router, `params` is a Promise that we await.
export default async function VehicleDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const vehicle = await getVehicleById(id);

  // If no vehicle matches this id, show the 404 page.
  if (!vehicle) notFound();

  // Look up this vehicle's type definition from the registry.
  const typeDef = getVehicleType(vehicle.type);

  // `specs` is stored as JSON; cast it so we can read fields by key.
  const specs = vehicle.specs as Record<string, string | number>;

  return (
    <main className="min-h-screen bg-neutral-50">
      <div className="mx-auto max-w-5xl px-6 py-10">
        {/* Back link */}
        <a
          href="/"
          className="mb-6 inline-flex items-center text-sm font-medium text-emerald-700 hover:text-emerald-900"
        >
          ← Back to inventory
        </a>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Image */}
          <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
            <img
              src={vehicle.images[0]}
              alt={`${vehicle.make} ${vehicle.model}`}
              className="h-80 w-full object-cover"
            />
          </div>

          {/* Summary */}
          <div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-medium uppercase tracking-wide text-emerald-700">
                {typeDef?.label ?? vehicle.type}
              </span>
              <StatusBadge status={vehicle.status} />
            </div>

            <h1 className="mt-2 text-3xl font-bold text-neutral-900">
              {vehicle.make} {vehicle.model}
            </h1>

            <p className="mt-1 text-neutral-500">
              {vehicle.year} · {formatNumber(vehicle.mileageKm)} km
            </p>

            <p className="mt-4 text-3xl font-bold text-neutral-900">
              {formatPrice(vehicle.priceCents)}
            </p>

            <p className="mt-6 text-neutral-900">{vehicle.description}</p>
          </div>
        </div>

        {/* ── Specifications ──────────────────────────────────────
            REGISTRY-DRIVEN: we loop over the fields defined for this
            vehicle's type and render each spec. No hardcoded "if electric
            car...". Add a new type to the registry and its specs show up
            here automatically. */}
        <section className="mt-10">
          <h2 className="mb-4 text-xl font-semibold text-neutral-900">
            Specifications
          </h2>
          <dl className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {typeDef?.fields.map((field) => (
              <div
                key={field.key}
                className="rounded-lg border border-neutral-200 bg-white p-4"
              >
                <dt className="text-xs uppercase tracking-wide text-neutral-500">
                  {field.label}
                </dt>
                <dd className="mt-1 text-lg font-semibold capitalize text-neutral-900">
                  {specs[field.key]}
                  {field.unit ? ` ${field.unit}` : ""}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      </div>
    </main>
  );
}
