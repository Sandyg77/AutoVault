import { formatPrice, formatNumber } from "@/lib/format";
import { getVehicleType } from "@/lib/vehicle-types";
import { StatusBadge } from "@/components/StatusBadge";
import type { VehicleItem } from "@/lib/queries";

export function VehicleCard({ vehicle }: { vehicle: VehicleItem }) {
  // Look up the human-readable type label from the registry
  // (e.g. "electric-car" -> "Electric Car"). The card never hardcodes types.
  const typeDef = getVehicleType(vehicle.type);

  return (
    <a
      href={`/vehicles/${vehicle.id}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white transition hover:shadow-lg hover:-translate-y-0.5"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
        {/* plain <img> for now; upgrade to next/image later */}
        <img
          src={vehicle.images[0]}
          alt={`${vehicle.make} ${vehicle.model}`}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3">
          <StatusBadge status={vehicle.status} />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-1 p-4">
        <span className="text-xs font-medium uppercase tracking-wide text-emerald-700">
          {typeDef?.label ?? vehicle.type}
        </span>
        <h3 className="text-lg font-semibold text-neutral-900">
          {vehicle.make} {vehicle.model}
        </h3>
        <p className="text-sm text-neutral-500">
          {vehicle.year} · {formatNumber(vehicle.mileageKm)} km
        </p>
        <p className="mt-2 text-xl font-bold text-neutral-900">
          {formatPrice(vehicle.priceCents)}
        </p>
      </div>
    </a>
  );
}
