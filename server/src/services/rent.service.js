import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getAllCars() {
  const cars = await prisma.cars.findMany();
  return cars;
}

export async function getCarById(id) {
  const car = await prisma.cars.findUnique({
    where: {
      id,
    },
  });
  return car;
}

export async function rentCarById(id, userId, RentStartDate, RentEndDate) {
  const car = await getCarById(id);
  if (car.userID == null) {
    await prisma.Cars.update({
      where: { id },
      data: {
        Users: {
          connect: { id: userId },
        },
      },
    });
    await prisma.Users.update({
      where: { id: userId },
      data: {
        RentStartDate,
        RentEndDate,
      },
    });
  } else {
    await prisma.Cars.update({
      where: { id },
      data: {
        Users: {
          disconnect: true,
        },
      },
    });
    await prisma.Users.update({
      where: { id: userId },
      data: {
        RentStartDate: null,
        RentEndDate: null,
      },
    });
  }
  return car;
}
