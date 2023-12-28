-- DropIndex
DROP INDEX "ParkingLot_id_key";

-- DropIndex
DROP INDEX "Users_id_key";

-- AlterTable
ALTER TABLE "Users" ALTER COLUMN "driverLicence" DROP NOT NULL;
