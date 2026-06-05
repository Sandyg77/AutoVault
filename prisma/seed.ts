import "dotenv/config";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// ── Image pool
// Three distinct car photos and three distinct van photos, assigned
// below so no two neighbouring cards share an image.
const carA =
  "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&auto=format&fit=crop&q=80";
const carB =
  "https://images.unsplash.com/photo-1572191267337-c1705e46645c?w=800&auto=format&fit=crop&q=80"; // Tesla Model 3
const carC =
  "https://images.unsplash.com/photo-1712193424561-d1e2c09f524e?w=800&auto=format&fit=crop&q=80"; // Hyundai IONIQ 5
const vanA =
  "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?w=800&auto=format&fit=crop&q=80";
const vanB =
  "https://images.unsplash.com/photo-1511533910568-be3ffdc229bb?w=800&auto=format&fit=crop&q=80";
const vanC =
  "https://images.unsplash.com/photo-1581706677636-f6630fd1edf8?w=800&auto=format&fit=crop&q=80";

const vehicles = [
  // ── Electric cars ──────────────────────────────────────────
  {
    type: "electric-car",
    make: "Volkswagen",
    model: "ID.4 Pro",
    year: 2024,
    priceCents: 4499900,
    mileageKm: 12000,
    status: "available" as const,
    description: "Spacious electric SUV with a long range, ideal for families.",
    images: [carA],
    specs: {
      batteryKwh: 77,
      rangeKm: 520,
      powerKw: 150,
      drivetrain: "RWD",
      seats: 5,
    },
  },
  {
    type: "electric-car",
    make: "BMW",
    model: "i4 eDrive40",
    year: 2023,
    priceCents: 5599900,
    mileageKm: 18500,
    status: "available" as const,
    description:
      "Sporty electric gran coupé with premium interior and quick charging.",
    images: [carC],
    specs: {
      batteryKwh: 84,
      rangeKm: 590,
      powerKw: 250,
      drivetrain: "RWD",
      seats: 5,
    },
  },
  {
    type: "electric-car",
    make: "Tesla",
    model: "Model 3 Long Range",
    year: 2024,
    priceCents: 4899900,
    mileageKm: 8000,
    status: "reserved" as const,
    description:
      "Efficient dual-motor sedan with class-leading software and range.",
    images: [carB],
    specs: {
      batteryKwh: 79,
      rangeKm: 629,
      powerKw: 324,
      drivetrain: "AWD",
      seats: 5,
    },
  },
  {
    type: "electric-car",
    make: "Hyundai",
    model: "IONIQ 5",
    year: 2023,
    priceCents: 4199900,
    mileageKm: 22000,
    status: "available" as const,
    description: "Retro-futuristic crossover with ultra-fast 800V charging.",
    images: [carC],
    specs: {
      batteryKwh: 72,
      rangeKm: 481,
      powerKw: 168,
      drivetrain: "AWD",
      seats: 5,
    },
  },
  {
    type: "electric-car",
    make: "Renault",
    model: "Megane E-Tech",
    year: 2024,
    priceCents: 3699900,
    mileageKm: 9500,
    status: "available" as const,
    description: "Compact, agile city EV with a comfortable, tech-rich cabin.",
    images: [carA],
    specs: {
      batteryKwh: 60,
      rangeKm: 450,
      powerKw: 160,
      drivetrain: "FWD",
      seats: 5,
    },
  },
  {
    type: "electric-car",
    make: "Mercedes-Benz",
    model: "EQB 300",
    year: 2023,
    priceCents: 5299900,
    mileageKm: 15000,
    status: "sold" as const,
    description: "Premium compact SUV with optional seven seats.",
    images: [carB],
    specs: {
      batteryKwh: 67,
      rangeKm: 423,
      powerKw: 168,
      drivetrain: "AWD",
      seats: 7,
    },
  },

  // ── Camper vans ────────────────────────────────────────────
  {
    type: "camper-van",
    make: "Volkswagen",
    model: "California Ocean",
    year: 2023,
    priceCents: 7999900,
    mileageKm: 28000,
    status: "available" as const,
    description: "Iconic pop-top camper, perfect for weekend trips for two.",
    images: [vanA],
    specs: {
      berths: 4,
      lengthM: 4.9,
      freshWaterL: 30,
      transmission: "automatic",
      fuelType: "diesel",
    },
  },
  {
    type: "camper-van",
    make: "Hymer",
    model: "Free 600",
    year: 2022,
    priceCents: 8999900,
    mileageKm: 41000,
    status: "available" as const,
    description: "Compact motorhome with a clever layout and full kitchen.",
    images: [vanB],
    specs: {
      berths: 4,
      lengthM: 5.99,
      freshWaterL: 110,
      transmission: "manual",
      fuelType: "diesel",
    },
  },
  {
    type: "camper-van",
    make: "Pössl",
    model: "Roadcamp",
    year: 2024,
    priceCents: 6999900,
    mileageKm: 12000,
    status: "reserved" as const,
    description: "Versatile panel van conversion with rear bed and wet room.",
    images: [vanC],
    specs: {
      berths: 2,
      lengthM: 6.0,
      freshWaterL: 100,
      transmission: "automatic",
      fuelType: "diesel",
    },
  },
  {
    type: "camper-van",
    make: "Knaus",
    model: "Boxstar 600",
    year: 2023,
    priceCents: 7499900,
    mileageKm: 19000,
    status: "available" as const,
    description: "Comfortable two-berth van with a spacious living area.",
    images: [vanA],
    specs: {
      berths: 2,
      lengthM: 5.99,
      freshWaterL: 90,
      transmission: "manual",
      fuelType: "diesel",
    },
  },
  {
    type: "camper-van",
    make: "Westfalia",
    model: "Columbus 540",
    year: 2022,
    priceCents: 6499900,
    mileageKm: 35000,
    status: "sold" as const,
    description: "Well-equipped compact camper with a transverse rear bed.",
    images: [vanB],
    specs: {
      berths: 2,
      lengthM: 5.41,
      freshWaterL: 90,
      transmission: "manual",
      fuelType: "diesel",
    },
  },
  {
    type: "camper-van",
    make: "Adria",
    model: "Twin Supreme 640",
    year: 2024,
    priceCents: 8499900,
    mileageKm: 7000,
    status: "available" as const,
    description: "Premium van with twin beds, large garage, and solar panel.",
    images: [vanC],
    specs: {
      berths: 3,
      lengthM: 6.36,
      freshWaterL: 100,
      transmission: "automatic",
      fuelType: "diesel",
    },
  },
];

async function main() {
  console.log("Clearing existing vehicles...");
  await prisma.vehicle.deleteMany();

  console.log(`Seeding ${vehicles.length} vehicles...`);
  for (const v of vehicles) {
    await prisma.vehicle.create({ data: v });
  }
  console.log("Done.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
