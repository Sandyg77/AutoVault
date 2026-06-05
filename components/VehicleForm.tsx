"use client";

import { useState } from "react";
import { vehicleTypeKeys, getVehicleType } from "@/lib/vehicle-types";
import type { VehicleItem } from "@/lib/queries";

// The form works in two modes:
//  - create: no `vehicle` prop, onSubmit = createVehicle
//  - edit:   `vehicle` provided, fields pre-filled, onSubmit = updateVehicle
export function VehicleForm({
  vehicle,
  action,
}: {
  vehicle?: VehicleItem;
  action: (formData: FormData) => Promise<{ error: string } | void>;
}) {
  // Track the selected type so the spec fields can react to it.
  const [type, setType] = useState<string>(vehicle?.type ?? vehicleTypeKeys[0]);
  const [error, setError] = useState<string | null>(null);

  // The spec fields to render come straight from the registry.
  const typeDef = getVehicleType(type);

  // Existing specs (edit mode) so we can pre-fill the spec inputs.
  const existingSpecs = (vehicle?.specs ?? {}) as Record<
    string,
    string | number
  >;

  async function handleSubmit(formData: FormData) {
    setError(null);
    const result = await action(formData);
    // Server action returns { error } only on validation failure;
    // on success it redirects, so we won't reach here.
    if (result && "error" in result) setError(result.error);
  }

  const input =
    "mt-1 w-full rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-1 focus:ring-emerald-500";
  const label = "text-xs font-semibold uppercase tracking-wide text-neutral-500";
  const section = "rounded-xl border border-neutral-200 bg-white p-5 space-y-4";
  const sectionHeading = "flex items-center gap-2 text-sm font-semibold text-neutral-900 mb-4";

  return (
    <form action={handleSubmit} className="space-y-5">
      {error && (
        <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 ring-1 ring-red-200">
          {error}
        </div>
      )}

      {/* ── Vehicle type ─────────────────────────────────── */}
      <div className={section}>
        <p className={sectionHeading}>
          <span className="h-4 w-0.5 rounded-full bg-emerald-500" />
          Vehicle Type
        </p>
        <div>
          <label className={label}>Type</label>
          <select
            name="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className={input}
          >
            {vehicleTypeKeys.map((key) => (
              <option key={key} value={key}>
                {getVehicleType(key)?.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ── Core details ─────────────────────────────────── */}
      <div className={section}>
        <p className={sectionHeading}>
          <span className="h-4 w-0.5 rounded-full bg-emerald-500" />
          Core Details
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className={label}>Make</label>
            <input name="make" defaultValue={vehicle?.make} className={input} required />
          </div>
          <div>
            <label className={label}>Model</label>
            <input name="model" defaultValue={vehicle?.model} className={input} required />
          </div>
          <div>
            <label className={label}>Year</label>
            <input name="year" type="number" defaultValue={vehicle?.year} className={input} required />
          </div>
          <div>
            <label className={label}>Price (€)</label>
            <input
              name="priceEuros"
              type="number"
              step="0.01"
              defaultValue={vehicle ? vehicle.priceCents / 100 : ""}
              className={input}
              required
            />
          </div>
          <div>
            <label className={label}>Mileage (km)</label>
            <input name="mileageKm" type="number" defaultValue={vehicle?.mileageKm} className={input} required />
          </div>
          <div>
            <label className={label}>Status</label>
            <select name="status" defaultValue={vehicle?.status ?? "available"} className={input}>
              <option value="available">Available</option>
              <option value="reserved">Reserved</option>
              <option value="sold">Sold</option>
            </select>
          </div>
        </div>
      </div>

      {/* ── Media & description ──────────────────────────── */}
      <div className={section}>
        <p className={sectionHeading}>
          <span className="h-4 w-0.5 rounded-full bg-emerald-500" />
          Media &amp; Description
        </p>
        <div>
          <label className={label}>Image URL</label>
          <input name="imageUrl" defaultValue={vehicle?.images[0]} className={input} required />
        </div>
        <div>
          <label className={label}>Description</label>
          <textarea
            name="description"
            defaultValue={vehicle?.description}
            rows={3}
            className={input}
            required
          />
        </div>
      </div>

      {/* ── Type-specific specs ──────────────────────────── */}
      <div className={section}>
        <p className={sectionHeading}>
          <span className="h-4 w-0.5 rounded-full bg-emerald-500" />
          {typeDef?.label} Specifications
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {typeDef?.fields.map((field) => (
            <div key={field.key}>
              <label className={label}>
                {field.label}
                {field.unit ? ` (${field.unit})` : ""}
              </label>
              {field.input === "select" ? (
                <select
                  name={`spec_${field.key}`}
                  defaultValue={String(existingSpecs[field.key] ?? field.options?.[0] ?? "")}
                  className={input}
                >
                  {field.options?.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              ) : (
                <input
                  name={`spec_${field.key}`}
                  type={field.input === "number" ? "number" : "text"}
                  step="any"
                  defaultValue={existingSpecs[field.key] ?? ""}
                  className={input}
                  required
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── Actions ──────────────────────────────────────── */}
      <div className="flex items-center gap-3 pt-1">
        <button
          type="submit"
          className="rounded-lg bg-emerald-700 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800"
        >
          {vehicle ? "Save changes" : "Create vehicle"}
        </button>
        <a
          href="/admin"
          className="rounded-lg border border-neutral-200 px-6 py-2.5 text-sm font-medium text-neutral-600 transition hover:border-neutral-300 hover:bg-neutral-50 hover:text-neutral-900"
        >
          Cancel
        </a>
      </div>
    </form>
  );
}
