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
    "driverLicence" VARCHAR(50) NOT NULL,
    "RentStartDate" TIMESTAMP(3) NOT NULL,
    "RentEndtDate" TIMESTAMP(3) NOT NULL,
    "ParkingStartDate" TIMESTAMP(3) NOT NULL,
    "ParkingEndtDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GuestUsers" (
    "id" TEXT NOT NULL,
    "firstName" VARCHAR(50) NOT NULL,
    "lastName" VARCHAR(50) NOT NULL,
    "email" VARCHAR(30) NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "driverLicence" VARCHAR(50) NOT NULL,
    "RentStartDate" TIMESTAMP(3) NOT NULL,
    "RentEndtDate" TIMESTAMP(3) NOT NULL,
    "ParkingStartDate" TIMESTAMP(3) NOT NULL,
    "ParkingEndtDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GuestUsers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cars" (
    "id" TEXT NOT NULL,
    "seats" INTEGER NOT NULL,
    "transmission" "Transmission" NOT NULL,
    "price" INTEGER NOT NULL,
    "fuel" "Fuel" NOT NULL,
    "power" INTEGER NOT NULL,
    "trunkCapacity" INTEGER NOT NULL,
    "userID" TEXT,
    "guestUserID" TEXT,

    CONSTRAINT "Cars_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ParkingLot" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "userID" TEXT,
    "guestUserID" TEXT,

    CONSTRAINT "ParkingLot_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_id_key" ON "Users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "GuestUsers_id_key" ON "GuestUsers"("id");

-- CreateIndex
CREATE UNIQUE INDEX "GuestUsers_email_key" ON "GuestUsers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Cars_id_key" ON "Cars"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ParkingLot_id_key" ON "ParkingLot"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ParkingLot_name_key" ON "ParkingLot"("name");

-- AddForeignKey
ALTER TABLE "Cars" ADD CONSTRAINT "Cars_userID_fkey" FOREIGN KEY ("userID") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cars" ADD CONSTRAINT "Cars_guestUserID_fkey" FOREIGN KEY ("guestUserID") REFERENCES "GuestUsers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParkingLot" ADD CONSTRAINT "ParkingLot_userID_fkey" FOREIGN KEY ("userID") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParkingLot" ADD CONSTRAINT "ParkingLot_guestUserID_fkey" FOREIGN KEY ("guestUserID") REFERENCES "GuestUsers"("id") ON DELETE SET NULL ON UPDATE CASCADE;
