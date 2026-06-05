import { ArrowRight } from "lucide-react";
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
      className="group flex flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm transition duration-300 hover:border-emerald-200 hover:shadow-xl hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
        <img
          src={vehicle.images[0]}
          alt={`${vehicle.make} ${vehicle.model}`}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        {/* Bottom gradient for depth */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-black/40 to-transparent" />
        <div className="absolute left-3 top-3">
          <StatusBadge status={vehicle.status} />
        </div>
        {/* View listing CTA — slides up on hover */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full transition duration-300 group-hover:translate-y-0">
          <div className="flex items-center justify-center gap-1.5 bg-emerald-700 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white">
            View listing <ArrowRight className="h-3.5 w-3.5" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-1 p-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600">
          {typeDef?.label ?? vehicle.type}
        </span>
        <h3 className="text-lg font-semibold text-neutral-900">
          {vehicle.make} {vehicle.model}
        </h3>
        <p className="text-sm text-neutral-500">
          {vehicle.year} · {formatNumber(vehicle.mileageKm)} km
        </p>
        <p className="mt-auto pt-3 text-xl font-bold text-emerald-700">
          {formatPrice(vehicle.priceCents)}
        </p>
      </div>
    </a>
  );
}
