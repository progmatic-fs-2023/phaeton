/*
  Warnings:

  - You are about to drop the column `guestUserID` on the `Cars` table. All the data in the column will be lost.
  - You are about to drop the column `guestUserID` on the `ParkingLot` table. All the data in the column will be lost.
  - You are about to drop the `GuestUsers` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `imageUrl` to the `Cars` table without a default value. This is not possible if the table is not empty.
  - Added the required column `model` to the `Cars` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Cars" DROP CONSTRAINT "Cars_guestUserID_fkey";

-- DropForeignKey
ALTER TABLE "ParkingLot" DROP CONSTRAINT "ParkingLot_guestUserID_fkey";

-- DropIndex
DROP INDEX "Cars_id_key";

-- AlterTable
ALTER TABLE "Cars" DROP COLUMN "guestUserID",
ADD COLUMN     "imageUrl" VARCHAR(255) NOT NULL,
ADD COLUMN     "model" VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE "ParkingLot" DROP COLUMN "guestUserID";

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "IsGuestUser" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "RentStartDate" DROP NOT NULL,
ALTER COLUMN "RentEndtDate" DROP NOT NULL,
ALTER COLUMN "ParkingStartDate" DROP NOT NULL,
ALTER COLUMN "ParkingEndtDate" DROP NOT NULL;

-- DropTable
DROP TABLE "GuestUsers";
