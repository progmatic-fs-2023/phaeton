import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getAllParkingLot() {
  const parkingLots = await prisma.parkingLot.findMany();
  return parkingLots;
}

export async function getParkingAndServicesByDate(ServiceStartDate, ServiceEndDate) {
  const parkings = await prisma.parkingLot.findMany();
  const services = await prisma.services.findMany({
    where: {
      AND: [
        {
          ServiceStartDate: {
            gte: ServiceStartDate,
          },
        },
        {
          ServiceEndDate: {
            lte: ServiceEndDate,
          },
        },
      ],
    },
  });
  return { parkings, services };
}

export async function getParkingLotById(id) {
  const parkingLot = await prisma.parkingLot.findUnique({
    where: {
      id,
    },
  });
  return parkingLot;
}

export async function bookParkingLotById(ParkingLotID, userID, ServiceStartDate, ServiceEndDate) {
  const parkingCheck = await getParkingLotById(ParkingLotID);
  let result;
  if (parkingCheck) {
    const dateCheck = await getParkingAndServicesByDate(ServiceStartDate, ServiceEndDate);
    const filteredParkingLots = dateCheck.services.filter(
      parking => parking.ParkingLotID === ParkingLotId,
    );
    if (filteredParkingLots.length === 0) {
      result = await prisma.services.create({
        data: {
          ServiceStartDate,
          ServiceEndDate,
          userID,
          ParkingLotID,
        },
      });
    } else {
      throw new Error('Parking lot is already taken');
    }
  } else {
    throw new Error('Parking lot dose not exist');
  }
}
