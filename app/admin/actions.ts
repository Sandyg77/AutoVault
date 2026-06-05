"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { getVehicleType } from "@/lib/vehicle-types";
import { z } from "zod";
import { Prisma } from "@/app/generated/prisma/client";

// Validation for the fields shared by every vehicle type.
// z.coerce.* converts the string values that HTML forms always submit
// into the numbers our schema expects.
const baseSchema = z.object({
  type: z.string().min(1),
  make: z.string().min(1, "Make is required"),
  model: z.string().min(1, "Model is required"),
  year: z.coerce.number().int().min(1900).max(2100),
  priceEuros: z.coerce.number().positive("Price must be positive"),
  mileageKm: z.coerce.number().int().min(0),
  status: z.enum(["available", "reserved", "sold"]),
  description: z.string().min(1, "Description is required"),
  imageUrl: z.string().url("Must be a valid image URL"),
});

// Shared logic for create + update. Returns either an error message
// or the validated data ready to write to the database.
function parseForm(formData: FormData) {
  // Pull the base fields and validate them.
  const base = baseSchema.safeParse(Object.fromEntries(formData));
  if (!base.success) {
    return {
      ok: false as const,
      error: base.error.issues[0]?.message ?? "Invalid input",
    };
  }

  // Look up this type's spec schema from the registry.
  const typeDef = getVehicleType(base.data.type);
  if (!typeDef) return { ok: false as const, error: "Unknown vehicle type" };

  // Build the specs object from the type's fields, coercing numbers.
  const rawSpecs: Record<string, unknown> = {};
  for (const field of typeDef.fields) {
    const value = formData.get(`spec_${field.key}`);
    rawSpecs[field.key] =
      field.input === "number" ? Number(value) : String(value ?? "");
  }

  // Validate specs against the registry's Zod schema for this type.
  const specs = typeDef.specsSchema.safeParse(rawSpecs);
  if (!specs.success) {
    return {
      ok: false as const,
      error: specs.error.issues[0]?.message ?? "Invalid specs",
    };
  }

  // Assemble the database-ready record.
  return {
    ok: true as const,
    data: {
      type: base.data.type,
      make: base.data.make,
      model: base.data.model,
      year: base.data.year,
      priceCents: Math.round(base.data.priceEuros * 100), // euros → cents
      mileageKm: base.data.mileageKm,
      status: base.data.status,
      description: base.data.description,
      images: [base.data.imageUrl],
      specs: specs.data as Prisma.InputJsonValue,
    },
  };
}

// CREATE
export async function createVehicle(
  formData: FormData,
): Promise<{ error: string } | void> {
  const result = parseForm(formData);
  if (!result.ok) return { error: result.error };

  await prisma.vehicle.create({ data: result.data });

  revalidatePath("/"); // refresh the public storefront
  revalidatePath("/admin"); // refresh the admin list
  redirect("/admin");
}

// UPDATE
export async function updateVehicle(
  id: string,
  formData: FormData,
): Promise<{ error: string } | void> {
  const result = parseForm(formData);
  if (!result.ok) return { error: result.error };

  await prisma.vehicle.update({ where: { id }, data: result.data });

  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/admin");
}

// DELETE
export async function deleteVehicle(id: string) {
  await prisma.vehicle.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin");
}
