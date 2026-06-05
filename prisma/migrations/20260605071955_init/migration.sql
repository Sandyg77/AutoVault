-- CreateEnum
CREATE TYPE "Status" AS ENUM ('available', 'reserved', 'sold');

-- CreateTable
CREATE TABLE "Vehicle" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "make" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "priceCents" INTEGER NOT NULL,
    "mileageKm" INTEGER NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'available',
    "description" TEXT NOT NULL,
    "images" TEXT[],
    "specs" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Vehicle_pkey" PRIMARY KEY ("id")
);
