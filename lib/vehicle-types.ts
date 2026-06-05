import { z } from "zod";

/**
 * ─────────────────────────────────────────────────────────────
 * THE VEHICLE TYPE REGISTRY  —
 * ─────────────────────────────────────────────────────────────
 * This file defines every vehicle type the dealership sells.
 * The admin form, the detail page, and the filters all READ from here
 * instead of hardcoding "if electric car... if camper van...".
 *
 * To add a brand-new vehicle type later (e.g. a snowmobile), just add
 * ONE entry to the `vehicleTypes` object below. Forms, validation, and
 * display all update automatically.
 */

/**
 * Describes ONE spec field so the UI knows how to render and label it.
 *  - key:       property name stored in the vehicle's `specs` JSON
 *  - label:     human-readable label shown in forms and the detail page
 *  - unit:      optional unit shown after the value (e.g. "kWh", "km")
 *  - input:     which form control to render
 *  - options:   the choices, only for "select" fields
 */
export type FieldDef = {
  key: string;
  label: string;
  unit?: string;
  input: "number" | "text" | "select";
  options?: string[];
};

/**
 * Describes ONE vehicle type:
 *  - label:       display name (e.g. "Electric Car")
 *  - specsSchema: Zod schema that validates the type-specific specs
 *  - fields:      metadata that drives the form + detail-page display
 */
export type VehicleTypeDef = {
  label: string;
  specsSchema: z.ZodTypeAny;
  fields: FieldDef[];
};

/**
 * The registry itself. Keys (e.g. "electric-car") are what gets stored
 * in the Vehicle.type column in the database.
 */
export const vehicleTypes = {
  "electric-car": {
    label: "Electric Car",
    // Validation rules for an electric car's specs.
    // Numbers must be positive; drivetrain must be one of the three options.
    specsSchema: z.object({
      batteryKwh: z.number().positive(),
      rangeKm: z.number().positive(),
      powerKw: z.number().positive(),
      drivetrain: z.enum(["FWD", "RWD", "AWD"]),
      seats: z.number().int().positive(),
    }),
    // How each spec appears in the form and on the detail page.
    fields: [
      { key: "batteryKwh", label: "Battery", unit: "kWh", input: "number" },
      { key: "rangeKm", label: "Range", unit: "km", input: "number" },
      { key: "powerKw", label: "Power", unit: "kW", input: "number" },
      // Drivetrain means which wheels the engine powers to move the car
      {
        key: "drivetrain",
        label: "Drivetrain",
        input: "select",
        options: ["FWD", "RWD", "AWD"],
      },
      { key: "seats", label: "Seats", input: "number" },
    ],
  },

  "camper-van": {
    label: "Camper Van",
    specsSchema: z.object({
      berths: z.number().int().positive(),
      lengthM: z.number().positive(),
      freshWaterL: z.number().positive(),
      transmission: z.enum(["manual", "automatic"]),
      fuelType: z.enum(["diesel", "petrol"]),
    }),
    fields: [
      { key: "berths", label: "Berths", input: "number" },
      { key: "lengthM", label: "Length", unit: "m", input: "number" },
      {
        key: "freshWaterL",
        label: "Fresh-water tank",
        unit: "L",
        input: "number",
      },
      {
        key: "transmission",
        label: "Transmission",
        input: "select",
        options: ["manual", "automatic"],
      },
      {
        key: "fuelType",
        label: "Fuel type",
        input: "select",
        options: ["diesel", "petrol"],
      },
    ],
  },
} satisfies Record<string, VehicleTypeDef>;

/**
 * Helper exports
 * utilities so the rest of the app never touches the raw object.
 */

// A union type of the valid keys: "electric-car" | "camper-van".
// Gives autocomplete and type-safety wherever a vehicle type is used.
export type VehicleTypeKey = keyof typeof vehicleTypes;

// All type keys as an array — for building filter dropdowns.
export const vehicleTypeKeys = Object.keys(vehicleTypes) as VehicleTypeKey[];

// Safely fetch one type definition by its key.
export function getVehicleType(key: string): VehicleTypeDef | undefined {
  return vehicleTypes[key as VehicleTypeKey];
}
