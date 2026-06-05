import { Suspense } from "react";
import { getVehicles } from "@/lib/queries";
import { getVehicleType } from "@/lib/vehicle-types";
import { formatPrice } from "@/lib/format";
import { StatusBadge } from "@/components/StatusBadge";
import { deleteVehicle } from "@/app/admin/actions";
import { ArrowLeft, Plus, Pencil, Trash2 } from "lucide-react";
import { ToastListener } from "@/components/ToastListener";

export const dynamic = "force-dynamic";
export default async function AdminPage() {
  const vehicles = await getVehicles();

  return (
    <main className="min-h-screen bg-neutral-50">
      <Suspense>
        <ToastListener />
      </Suspense>
      <div className="mx-auto max-w-6xl px-6 py-10">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <a
              href="/"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-700 hover:text-emerald-900"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              View storefront
            </a>
            <h1 className="mt-1 text-2xl font-bold text-neutral-900">
              Manage Inventory
            </h1>
            <p className="mt-0.5 text-sm text-neutral-500">
              {vehicles.length} vehicles total
            </p>
          </div>
          <a
            href="/admin/new"
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-700 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-emerald-800"
          >
            <Plus className="h-4 w-4" />
            Add vehicle
          </a>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-emerald-900 bg-linear-to-r from-emerald-900 to-emerald-800 text-neutral-300">
              <tr>
                <th className="px-5 py-3.5 font-medium">Vehicle</th>
                <th className="px-5 py-3.5 font-medium">Type</th>
                <th className="px-5 py-3.5 font-medium">Price</th>
                <th className="px-5 py-3.5 font-medium">Status</th>
                <th className="px-5 py-3.5 text-center font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((v) => (
                <tr
                  key={v.id}
                  className="border-b border-neutral-100 transition hover:bg-emerald-50/40 last:border-0"
                >
                  <td className="px-5 py-4">
                    <span className="font-semibold text-neutral-900">
                      {v.make} {v.model}
                    </span>
                    <span className="block text-xs text-neutral-400">
                      {v.year}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-600">
                      {getVehicleType(v.type)?.label ?? v.type}
                    </span>
                  </td>
                  <td className="px-5 py-4 font-medium text-neutral-900">
                    {formatPrice(v.priceCents)}
                  </td>
                  <td className="px-5 py-4">
                    <StatusBadge status={v.status} />
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <a
                        href={`/admin/${v.id}/edit`}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-200 bg-white px-3 py-1.5 text-xs font-medium text-neutral-700 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                        Edit
                      </a>
                      <form action={deleteVehicle.bind(null, v.id)}>
                        <button
                          type="submit"
                          className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-200 bg-white px-3 py-1.5 text-xs font-medium text-neutral-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          Delete
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
