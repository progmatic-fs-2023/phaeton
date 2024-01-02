/*
  Warnings:

  - You are about to drop the column `userID` on the `Cars` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `ParkingLot` table. All the data in the column will be lost.
  - You are about to drop the column `userID` on the `ParkingLot` table. All the data in the column will be lost.
  - You are about to drop the column `ParkingEndtDate` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `ParkingStartDate` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `RentEndtDate` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `RentStartDate` on the `Users` table. All the data in the column will be lost.
  - Added the required column `zone` to the `ParkingLot` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Cars" DROP CONSTRAINT "Cars_userID_fkey";

-- DropForeignKey
ALTER TABLE "ParkingLot" DROP CONSTRAINT "ParkingLot_userID_fkey";

-- DropIndex
DROP INDEX "ParkingLot_id_key";

-- DropIndex
DROP INDEX "ParkingLot_name_key";

-- DropIndex
DROP INDEX "Users_id_key";

-- AlterTable
ALTER TABLE "Cars" DROP COLUMN "userID";

-- AlterTable
ALTER TABLE "ParkingLot" DROP COLUMN "name",
DROP COLUMN "userID",
ADD COLUMN     "zone" VARCHAR(50) NOT NULL;

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "ParkingEndtDate",
DROP COLUMN "ParkingStartDate",
DROP COLUMN "RentEndtDate",
DROP COLUMN "RentStartDate";

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

-- AddForeignKey
ALTER TABLE "Services" ADD CONSTRAINT "Services_ParkingLotID_fkey" FOREIGN KEY ("ParkingLotID") REFERENCES "ParkingLot"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Services" ADD CONSTRAINT "Services_userID_fkey" FOREIGN KEY ("userID") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Services" ADD CONSTRAINT "Services_CarID_fkey" FOREIGN KEY ("CarID") REFERENCES "Cars"("id") ON DELETE SET NULL ON UPDATE CASCADE;
