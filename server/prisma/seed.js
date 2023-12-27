import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// Run these functions once to fill the database

function main() {
  const zoneNames = ["A", "B", "C", "D", "E", "F"]

  let zoneInc = 0;

  const carsArray = [
    {
      model: 'Ford Fiesta',
      imageUrl: 'ford_fiesta.jpg',
      seats: 5,
      transmission: 'M',
      price: 12000,
      fuel: 'Petrol',
      power: 56,
      trunkCapacity: 2,
    },
    {
      model: 'Ford Focus',
      imageUrl: 'ford_focus.jpg',
      seats: 5,
      transmission: 'A',
      price: 15000,
      fuel: 'Diesel',
      power: 80,
      trunkCapacity: 4,
    },
    {
      model: 'Ford Mondeo',
      imageUrl: 'ford_mondeo.jpg',
      seats: 5,
      transmission: 'M',
      price: 17000,
      fuel: 'Diesel',
      power: 100,
      trunkCapacity: 3,
    },
    {
      model: 'Ford Mondeo Wagon Hybrid',
      imageUrl: 'ford_mondeo_wagon_hybrid.jpg',
      seats: 4,
      transmission: 'A',
      price: 19000,
      fuel: 'Electric',
      power: 95,
      trunkCapacity: 6,
    },
    {
      model: 'Mini Cooper Cabrio',
      imageUrl: 'mini_cooper_cabrio.jpg',
      seats: 4,
      transmission: 'A',
      price: 13000,
      fuel: 'Petrol',
      power: 58,
      trunkCapacity: 2,
    },
    {
      model: 'Mercedes-Benz Viano',
      imageUrl: 'mercedes_benz_viano.jpg',
      seats: 9,
      transmission: 'A',
      price: 20000,
      fuel: 'Diesel',
      power: 140,
      trunkCapacity: 8,
    },
    {
      model: 'Opel Zafira',
      imageUrl: 'opel_zafira.jpg',
      seats: 7,
      transmission: 'M',
      price: 15000,
      fuel: 'Petrol',
      power: 90,
      trunkCapacity: 6,
    },
    {
      model: 'Toyota Yaris',
      imageUrl: 'toyota_yaris.jpg',
      seats: 5,
      transmission: 'M',
      price: 12000,
      fuel: 'Petrol',
      power: 52,
      trunkCapacity: 2,
    },
    {
      model: 'BMW 325i Touring',
      imageUrl: 'bmw_325i.jpg',
      seats: 5,
      transmission: 'A',
      price: 17000,
      fuel: 'Diesel',
      power: 150,
      trunkCapacity: 4,
    },
    {
      model: 'Mazda MX-5',
      imageUrl: 'mazda_mx5.jpg',
      seats: 2,
      transmission: 'M',
      price: 11000,
      fuel: 'Petrol',
      power: 72,
      trunkCapacity: 1,
    },
        {
      model: 'Renault Zoe',
      imageUrl: 'renault_zoe.jpg',
      seats: 4,
      transmission: 'A',
      price: 12000,
      fuel: 'Electric',
      power: 54,
      trunkCapacity: 2,
    },
    {
      model: 'Tesla Model 3',
      imageUrl: 'tesla_model_3.jpg',
      seats: 5,
      transmission: 'A',
      price: 19000,
      fuel: 'Electric',
      power: 198,
      trunkCapacity: 1,
    }, 
  ];

  async function createLot() {
    const newParkingLot = await prisma.parkingLot.create({
      data: {
        zone: zoneNames[zoneInc],
      },
    });
    console.log(newParkingLot);
  }

  async function CreateAdmin() {
    const passwordHash = await bcrypt.hash('password123', 10);
    const user = await prisma.Users.create({
      data: {
        firstName: `John`,
        lastName: 'Doe',
        email: 'johndoe@email.com',
        password: passwordHash,
        role: 'ADMIN',
        driverLicence: 'AS123456',
      },
    });
    console.log(user);
  }

  async function CreateCars() {
    const cars = await prisma.cars.createMany({
      data: carsArray
    });
    console.log(cars)
  }

  CreateAdmin();

  CreateCars();

  for (let i = 1; i <= 599; i += 1) {
    if (i % 100 === 0) {
      zoneInc += 1
    }
    createLot();
  }

}

main();
