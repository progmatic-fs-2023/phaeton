import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getAllCars() {
  const cars = await prisma.cars.findMany();
  return cars;
}

export async function getCarsAndServicesByDate(ServiceStartDate, ServiceEndDate) {
  const cars = await prisma.Cars.findMany();
  const services = await prisma.services.findMany({
    where: {
      AND: [
        {
          ServiceStartDate: {
            lte: ServiceEndDate,
          },
        },
        {
          ServiceEndDate: {
            gte: ServiceStartDate,
          },
        },
        {IsActive: true}
      ],
    },
  });
  console.log(services)

  return { cars, services };
}

export async function getCarById(id) {
  const car = await prisma.cars.findUnique({
    where: {
      id,
    },
  });
  return car;
}

export async function rentCarById(CarID, userID, ServiceStartDate, ServiceEndDate, PhoneNumber) {
  const carCheck = await getCarById(CarID);
  let result;
  if (carCheck) {
    const dateCheck = await getCarsAndServicesByDate(ServiceStartDate, ServiceEndDate);
    const filteredCars = dateCheck.services.filter(car => car.CarID === CarID);
    if (filteredCars.length === 0) {
      result = await prisma.Services.create({
        data: {
          ServiceStartDate,
          ServiceEndDate,
          userID,
          CarID,
          PhoneNumber,
        },
      });
    } else {
      throw new Error('Car is already taken');
    }
  } else {
    throw new Error('Car does not exist');
  }
  return result;
}
