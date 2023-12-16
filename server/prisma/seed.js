import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Run these functions once to fill the database

function main() {
  async function createLot(idx) {
    const newParkingLot = await prisma.parkingLot.create({
      data: {
        name: `A${idx}`,
      },
    });
    console.log(newParkingLot);
  }

  async function CreateAdmin() {
    const user = await prisma.Users.create({
      data: {
        firstName: `John`,
        lastName: 'Doe',
        email: 'johndoe@email.com',
        password: 'password123',
        role: 'ADMIN',
        driverLicence: 'AS123456',
      },
    });
    console.log(user);
  }

  async function CreateCar() {
    const car = await prisma.Cars.create({
      data: {
        model: 'Ford Fiesta',
        imageUrl: 'ford_fiesta.jpg',
        seats: 5,
        transmission: 'M',
        price: 12000,
        fuel: 'Petrol',
        power: 56,
        trunkCapacity: 2,
      },
    });
    console.log(car);
  }

  CreateAdmin();

  CreateCar();

  for (let i = 1; i <= 15; i += 1) {
    createLot(i);
  }
}

main();
