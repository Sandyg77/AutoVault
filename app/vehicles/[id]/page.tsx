import { notFound } from "next/navigation";
import { getVehicleById } from "@/lib/queries";
import { getVehicleType } from "@/lib/vehicle-types";
import { formatPrice, formatNumber } from "@/lib/format";
import { StatusBadge } from "@/components/StatusBadge";
import { ArrowLeft, Calendar, Gauge, Mail, Share2 } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function VehicleDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const vehicle = await getVehicleById(id);
  if (!vehicle) notFound();

  const typeDef = getVehicleType(vehicle.type);
  const specs = vehicle.specs as Record<string, string | number>;

  return (
    <main className="min-h-screen bg-neutral-50">
      {/* Consistent emerald accent bar */}
      <div className="h-1 bg-linear-to-r from-emerald-800 via-emerald-600 to-emerald-700" />

      <div className="mx-auto max-w-5xl px-6 py-10">
        {/* Back link */}
        <a
          href="/"
          className="mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-emerald-700 transition-colors hover:text-emerald-900"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to inventory
        </a>

        {/* Hero grid */}
        <div className="animate-enter grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Image card — zoom on hover, gradient overlay */}
          <div className="group relative overflow-hidden rounded-2xl border border-neutral-200 shadow-md">
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-28 bg-linear-to-t from-black/50 to-transparent" />
            <img
              src={vehicle.images[0]}
              alt={`${vehicle.make} ${vehicle.model}`}
              className="h-96 w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>

          {/* Info panel */}
          <div className="animate-enter-delay flex flex-col">
            {/* Type + status */}
            <div className="flex items-center gap-2.5">
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-800">
                {typeDef?.label ?? vehicle.type}
              </span>
              <StatusBadge status={vehicle.status} />
            </div>

            <h1 className="mt-3 text-4xl font-bold leading-tight text-neutral-900">
              {vehicle.make} {vehicle.model}
            </h1>

            {/* Year + mileage chips */}
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-neutral-100 px-3 py-1.5 text-xs font-medium text-neutral-600">
                <Calendar className="h-3.5 w-3.5" />
                {vehicle.year}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-neutral-100 px-3 py-1.5 text-xs font-medium text-neutral-600">
                <Gauge className="h-3.5 w-3.5" />
                {formatNumber(vehicle.mileageKm)} km
              </span>
            </div>

            {/* Price */}
            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-neutral-400">
                Asking price
              </p>
              <p className="mt-1 text-4xl font-bold text-emerald-700">
                {formatPrice(vehicle.priceCents)}
              </p>
            </div>

            <div className="my-6 h-px bg-neutral-200" />

            <p className="leading-relaxed text-neutral-600">{vehicle.description}</p>

            {/* CTAs */}
            <div className="mt-auto flex items-center gap-3 pt-8">
              <button
                type="button"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-700 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800 hover:shadow-md"
              >
                <Mail className="h-4 w-4" />
                Inquire about this vehicle
              </button>
              <button
                type="button"
                aria-label="Share"
                className="inline-flex items-center justify-center rounded-xl border border-neutral-200 bg-white px-3 py-3 text-neutral-600 transition hover:border-neutral-300 hover:bg-neutral-50"
              >
                <Share2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Specifications */}
        <section className="animate-enter-delay-2 mt-12">
          <div className="mb-6 flex items-center gap-2">
            <span className="h-4 w-0.5 rounded-full bg-emerald-500" />
            <h2 className="text-xl font-semibold text-neutral-900">
              Specifications
            </h2>
          </div>
          <dl className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {typeDef?.fields.map((field) => (
              <div
                key={field.key}
                className="group rounded-xl border border-neutral-200 bg-white p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-md"
              >
                <dt className="text-xs uppercase tracking-wide text-neutral-500">
                  {field.label}
                </dt>
                <dd className="mt-2 text-lg font-bold capitalize text-neutral-900 transition-colors group-hover:text-emerald-700">
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
