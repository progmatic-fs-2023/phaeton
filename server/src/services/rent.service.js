import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getAllCars() {
    const cars = await prisma.cars.findMany()
    return cars
}

export async function getCarById(id) {
    const car = await prisma.cars.findUnique({
        where: {
            id
          }
    })
    return car
}

export async function rentCarById(id, userId, ParkingStartDate, ParkingEndDate) {
    const car = await getCarById(id)
    if(car.userID == null) {
        await prisma.Cars.update({
            where: { id },
            data: { 
                Users: {
                    connect: { id: userId }
                }
            },
        });
        await prisma.Users.update({
            where: { id: userId },
            data: { 
                ParkingStartDate,
                ParkingEndDate
            },
        });
    } else {
        await prisma.Cars.update({
            where: { id },
            data: { 
                Users: {
                    disconnect: true
                }
            },
        });
        await prisma.Users.update({
            where: { id: userId },
            data: { 
                parkingstartdate: null,
                parkingenddate: null
            },
        });
    }
    return car
}

