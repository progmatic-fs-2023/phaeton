import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getAllParkingLot() {
  const parkingLots = await prisma.parkingLot.findMany();
  return parkingLots;
}

export async function getParkingLotById(id) {
  const parkingLot = await prisma.parkingLot.findUnique({
    where: {
      id,
    },
  });
  return parkingLot;
}
