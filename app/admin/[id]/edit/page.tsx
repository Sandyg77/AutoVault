import { notFound } from "next/navigation";
import { VehicleForm } from "@/components/VehicleForm";
import { getVehicleById } from "@/lib/queries";
import { updateVehicle } from "@/app/admin/actions";

export default async function EditVehiclePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const vehicle = await getVehicleById(id);
  if (!vehicle) notFound();

  // Bind the id so the form's action has the same (formData) shape
  // the component expects, with the id already supplied.
  const action = updateVehicle.bind(null, id);

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
          Edit {vehicle.make} {vehicle.model}
        </h1>
        <VehicleForm vehicle={vehicle} action={action} />
      </div>
    </main>
  );
}
