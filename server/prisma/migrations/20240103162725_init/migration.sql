-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "Transmission" AS ENUM ('A', 'M');

-- CreateEnum
CREATE TYPE "Fuel" AS ENUM ('Diesel', 'Petrol', 'Electric');

-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "firstName" VARCHAR(50) NOT NULL,
    "lastName" VARCHAR(50) NOT NULL,
    "email" VARCHAR(30) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "driverLicence" VARCHAR(50),
    "IsGuestUser" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cars" (
    "id" TEXT NOT NULL,
    "model" VARCHAR(255) NOT NULL,
    "imageUrl" VARCHAR(255) NOT NULL,
    "seats" INTEGER NOT NULL,
    "transmission" "Transmission" NOT NULL,
    "price" INTEGER NOT NULL,
    "fuel" "Fuel" NOT NULL,
    "power" INTEGER NOT NULL,
    "trunkCapacity" INTEGER NOT NULL,

    CONSTRAINT "Cars_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ParkingLot" (
    "id" TEXT NOT NULL,
    "zone" VARCHAR(50) NOT NULL,

    CONSTRAINT "ParkingLot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Services" (
    "id" TEXT NOT NULL,
    "ServiceStartDate" TIMESTAMP(3),
    "ServiceEndDate" TIMESTAMP(3),
    "ActualServiceEndDate" TIMESTAMP(3),
    "ParkingLotID" TEXT,
    "userID" TEXT,
    "CarID" TEXT,

    CONSTRAINT "Services_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- AddForeignKey
ALTER TABLE "Services" ADD CONSTRAINT "Services_ParkingLotID_fkey" FOREIGN KEY ("ParkingLotID") REFERENCES "ParkingLot"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Services" ADD CONSTRAINT "Services_userID_fkey" FOREIGN KEY ("userID") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Services" ADD CONSTRAINT "Services_CarID_fkey" FOREIGN KEY ("CarID") REFERENCES "Cars"("id") ON DELETE SET NULL ON UPDATE CASCADE;
