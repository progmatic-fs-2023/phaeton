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
      OR: [
        {
          ServiceEndDate: {
            lt: ServiceStartDate
          }
        },
        {
          ServiceStartDate: {
            gt: ServiceEndDate
          }
        }
      ]
    }
  });
  
  return {cars, services};
  

}

export async function getCarById(id) {
  const car = await prisma.cars.findUnique({
    where: {
      id,
    },
  });
  return car;
}

export async function rentCarById(CarID, userID, ServiceStartDate, ServiceEndDate) {
  const check = await getCarsAndServicesByDate(ServiceStartDate, ServiceEndDate)
  let result 
  console.log(check)
  if(check.services.length > 0) {
    result =  await prisma.Services.create({
        data: {
          ServiceStartDate,
          ServiceEndDate,
          userID,
          CarID
        },
      });     
    } else {
      throw new Error('Car is already taken')
    }
    return result;
}

