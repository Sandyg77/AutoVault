import { getVehicles } from "@/lib/queries";
import { getVehicleType } from "@/lib/vehicle-types";
import { formatPrice } from "@/lib/format";
import { StatusBadge } from "@/components/StatusBadge";
import { deleteVehicle } from "@/app/admin/actions";

export default async function AdminPage() {
  const vehicles = await getVehicles();

  return (
    <main className="min-h-screen bg-neutral-50">
      <div className="mx-auto max-w-6xl px-6 py-10">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <a
              href="/"
              className="text-sm font-medium text-emerald-700 hover:text-emerald-900"
            >
              ← View storefront
            </a>
            <h1 className="mt-1 text-2xl font-bold text-neutral-900">
              Manage Inventory
            </h1>
          </div>
          <a
            href="/admin/new"
            className="rounded-lg bg-emerald-700 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-800"
          >
            + Add vehicle
          </a>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-neutral-200 bg-neutral-50 text-neutral-500">
              <tr>
                <th className="px-4 py-3 font-medium">Vehicle</th>
                <th className="px-4 py-3 font-medium">Type</th>
                <th className="px-4 py-3 font-medium">Price</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((v) => (
                <tr
                  key={v.id}
                  className="border-b border-neutral-100 last:border-0"
                >
                  <td className="px-4 py-3">
                    <span className="font-medium text-neutral-900">
                      {v.make} {v.model}
                    </span>
                    <span className="block text-xs text-neutral-400">
                      {v.year}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-neutral-600">
                    {getVehicleType(v.type)?.label ?? v.type}
                  </td>
                  <td className="px-4 py-3 text-neutral-900">
                    {formatPrice(v.priceCents)}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={v.status} />
                  </td>
                  <td className="px-4 py-3">
                    <div>
                      <a
                        href={`/admin/${v.id}/edit`}
                        className="text-emerald-700 hover:text-emerald-900"
                      >
                        Edit
                      </a>
                      {/* Delete is a tiny form that calls the server action.
                          We bind the id so the action knows which to delete. */}
                      <form action={deleteVehicle.bind(null, v.id)}>
                        <button
                          type="submit"
                          className="text-red-600 hover:text-red-800"
                        >
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
