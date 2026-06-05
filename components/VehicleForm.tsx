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
    "mt-1 w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm outline-none focus:border-emerald-500";
  const label = "text-sm font-medium text-neutral-700";

  return (
    <form action={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 ring-1 ring-red-200">
          {error}
        </div>
      )}

      {/* ── Vehicle type selector ───────────────────────── */}
      <div>
        <label className={label}>Vehicle type</label>
        {/* name="type" so the server action receives it.
            Changing this swaps which spec fields render below. */}
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

      {/* ── Shared fields ───────────────────────────────── */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className={label}>Make</label>
          <input
            name="make"
            defaultValue={vehicle?.make}
            className={input}
            required
          />
        </div>
        <div>
          <label className={label}>Model</label>
          <input
            name="model"
            defaultValue={vehicle?.model}
            className={input}
            required
          />
        </div>
        <div>
          <label className={label}>Year</label>
          <input
            name="year"
            type="number"
            defaultValue={vehicle?.year}
            className={input}
            required
          />
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
          <input
            name="mileageKm"
            type="number"
            defaultValue={vehicle?.mileageKm}
            className={input}
            required
          />
        </div>
        <div>
          <label className={label}>Status</label>
          <select
            name="status"
            defaultValue={vehicle?.status ?? "available"}
            className={input}
          >
            <option value="available">Available</option>
            <option value="reserved">Reserved</option>
            <option value="sold">Sold</option>
          </select>
        </div>
      </div>

      <div>
        <label className={label}>Image URL</label>
        <input
          name="imageUrl"
          defaultValue={vehicle?.images[0]}
          className={input}
          required
        />
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

      {/* ── Type-specific spec fields — THE DYNAMIC PART ──────
          These are generated from typeDef.fields. Switch the type
          above and these inputs change with zero extra code. */}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-neutral-900">
          {typeDef?.label} specifications
        </h3>
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
                  defaultValue={String(
                    existingSpecs[field.key] ?? field.options?.[0] ?? "",
                  )}
                  className={input}
                >
                  {field.options?.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
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

      <div className="flex gap-3">
        <button
          type="submit"
          className="rounded-lg bg-emerald-700 px-5 py-2 text-sm font-medium text-white hover:bg-emerald-800"
        >
          {vehicle ? "Save changes" : "Create vehicle"}
        </button>
        <a
          href="/admin"
          className="rounded-lg px-5 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900"
        >
          Cancel
        </a>
      </div>
    </form>
  );
}
