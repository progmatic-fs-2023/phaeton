import express from 'express';
import { PrismaClient } from '@prisma/client';
import 'dotenv/config';

const port = process.env.PORT;

const app = express();

const prisma = new PrismaClient();

app.use(express.json());

app.get('/', async (req, res) => {
  const result = await prisma.ParkingLot.findMany();
  console.log(result);
  res.json(result);
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

// Run these functions once to fill the database
// async function createLot(idx) {
//     const newParkingLot = await prisma.parkingLot.create({
//       data: {
//         name: `A${idx}`,
//       },
//     })
//     console.log(newParkingLot)

//   }

// for (let i = 1; i <= 15; i++) {
//     createLot(i)

// }

// async function CreateAdmin() {
//     const user = await prisma.Users.create({
//       data: {
//         firstName: `John`,
//         lastName: 'Doe',
//         email: 'johndoe@email.com',
//         password: 'password123',
//         role: 'ADMIN',
//         driverLicence: 'AS123456'
//       },
//     })
//     console.log(user)

//   }

//   CreateAdmin()

// async function CreateCar() {
//     const car = await prisma.Cars.create({
//       data: {
//         model: 'Ford Fiesta',
//         imageUrl: 'ford_fiesta.jpg',
//         seats: 5,
//         transmission: 'M',
//         price: 12000,
//         fuel: 'Petrol',
//         power: 56,
//         trunkCapacity: 2,
//       },
//     })
//     console.log(car)

//   }

//   CreateCar()
