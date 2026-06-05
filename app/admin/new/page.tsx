import { VehicleForm } from "@/components/VehicleForm";
import { createVehicle } from "@/app/admin/actions";
import { ArrowLeft } from "lucide-react";

export default function NewVehiclePage() {
  return (
    <main className="min-h-screen bg-neutral-50">
      <div className="mx-auto max-w-3xl px-6 py-10">
        <a
          href="/admin"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-700 hover:text-emerald-900"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to inventory
        </a>
        <h1 className="mb-8 mt-1 text-2xl font-bold text-neutral-900">
          Add vehicle
        </h1>
        <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm">
          <div className="h-1 bg-linear-to-r from-emerald-600 via-emerald-400 to-emerald-700" />
          <div className="p-8">
            <VehicleForm action={createVehicle} />
          </div>
        </div>
      </div>
    </main>
  );
}
