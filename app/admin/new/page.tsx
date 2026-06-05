import { VehicleForm } from "@/components/VehicleForm";
import { createVehicle } from "@/app/admin/actions";

export default function NewVehiclePage() {
  return (
    <main className="min-h-screen bg-neutral-50">
      <div className="mx-auto max-w-3xl px-6 py-10">
        <a
          href="/admin"
          className="text-sm font-medium text-emerald-700 hover:text-emerald-900"
        >
          ← Back to inventory
        </a>
        <h1 className="mb-8 mt-1 text-2xl font-bold text-neutral-900">
          Add vehicle
        </h1>
        <VehicleForm action={createVehicle} />
      </div>
    </main>
  );
}
