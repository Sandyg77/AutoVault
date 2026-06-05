"use client";

import { useMemo, useState } from "react";
import { VehicleCard } from "@/components/VehicleCard";
import { vehicleTypeKeys, getVehicleType } from "@/lib/vehicle-types";
import type { VehicleItem } from "@/lib/queries";

// Price brackets (values in cents) for the price filter.
const priceBrackets = [
  { value: "all", label: "Any price" },
  { value: "0-5000000", label: "Under €50k" },
  { value: "5000000-8000000", label: "€50k–€80k" },
  { value: "8000000-999999999", label: "Over €80k" },
];

export function InventoryBrowser({ vehicles }: { vehicles: VehicleItem[] }) {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("all");
  const [price, setPrice] = useState("all");
  const [sort, setSort] = useState("newest");

  // Recompute the visible list whenever a control changes.
  const filtered = useMemo(() => {
    let list = [...vehicles];

    // Text search on make + model
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((v) =>
        `${v.make} ${v.model}`.toLowerCase().includes(q),
      );
    }

    // Type filter
    if (type !== "all") {
      list = list.filter((v) => v.type === type);
    }

    // Price bracket filter
    if (price !== "all") {
      const [min, max] = price.split("-").map(Number);
      list = list.filter((v) => v.priceCents >= min && v.priceCents <= max);
    }

    // Sort
    if (sort === "price-asc") list.sort((a, b) => a.priceCents - b.priceCents);
    else if (sort === "price-desc")
      list.sort((a, b) => b.priceCents - a.priceCents);
    // "newest" keeps the query's default order (createdAt desc)

    return list;
  }, [vehicles, search, type, price, sort]);

  return (
    <div>
      {/* ── Controls ─────────────────────────────────────── */}
      <div className="mb-6 flex flex-col gap-4">
        {/* Type filter pills — options come from the registry */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setType("all")}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
              type === "all"
                ? "bg-emerald-700 text-white"
                : "bg-white text-neutral-700 ring-1 ring-neutral-200 hover:bg-neutral-50"
            }`}
          >
            All
          </button>
          {vehicleTypeKeys.map((key) => (
            <button
              key={key}
              onClick={() => setType(key)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                type === key
                  ? "bg-emerald-700 text-white"
                  : "bg-white text-neutral-700 ring-1 ring-neutral-200 hover:bg-neutral-50"
              }`}
            >
              {getVehicleType(key)?.label}
            </button>
          ))}
        </div>

        {/* Search + price + sort */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            type="text"
            placeholder="Search make or model..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 rounded-lg border border-neutral-200 bg-white px-4 py-2 text-sm outline-none focus:border-emerald-500"
          />
          <select
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="rounded-lg border border-neutral-200 bg-white px-4 py-2 text-sm outline-none focus:border-emerald-500"
          >
            {priceBrackets.map((b) => (
              <option key={b.value} value={b.value}>
                {b.label}
              </option>
            ))}
          </select>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-lg border border-neutral-200 bg-white px-4 py-2 text-sm outline-none focus:border-emerald-500"
          >
            <option value="newest">Newest</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
          </select>
        </div>
      </div>

      {/* Result count */}
      <p className="mb-4 text-sm text-neutral-500">
        {filtered.length} {filtered.length === 1 ? "vehicle" : "vehicles"}
      </p>

      {/* ── Grid (or empty state) ────────────────────────── */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-neutral-300 bg-white py-16 text-center">
          <p className="text-neutral-500">No vehicles match your filters.</p>
        </div>
      )}
    </div>
  );
}
