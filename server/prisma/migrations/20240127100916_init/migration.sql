-- AlterTable
ALTER TABLE "Services" ADD COLUMN     "IsActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "PhoneNumber" TEXT;

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "DateOfBirth" TIMESTAMP(3),
ADD COLUMN     "Verified" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "password" DROP NOT NULL;
