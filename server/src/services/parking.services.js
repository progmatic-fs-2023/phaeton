import { PrismaClient } from '@prisma/client';
import { findUserByEmail } from './users.service';

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
            lte: ServiceStartDate,
          },
        },
        {
          ServiceEndDate: {
            gte: ServiceEndDate,
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
export async function bookParkingLotById(parkingLot, userEmail, ServiceStartDate, ServiceEndDate) {
  try {
    let result;
    const user = await findUserByEmail(userEmail);
    const { id: userID } = user;

    const dateCheck = await getParkingAndServicesByDate(ServiceStartDate, ServiceEndDate);

    // check for already taken parkings
    const bookedParkingSpots = parkingLot.filter(parking => {
      const isParkingBooked = dateCheck.services.some(record => record.ParkingLotID === parking.id);
      return !isParkingBooked;
    });
    if (bookedParkingSpots.length === parkingLot.length) {
      result = await prisma.services.createMany({
        data: bookedParkingSpots.map(parking => ({
          ServiceStartDate,
          ServiceEndDate,
          userID,
          ParkingLotID: parking.id,
        })),
      });
      return result;
    }
    const error = new Error('Some parking lots are already taken');

    return error;
  } catch (err) {
    console.error('Error in bookParkingLotById:', err);
    return err;
  }
}
