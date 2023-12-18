import express from 'express';
import 'dotenv/config';
import { Prisma, PrismaClient } from '@prisma/client';

const port = process.env.PORT;

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.get('/', async (req, res) => {
  const result = await prisma.Users.findMany();
  console.log(result);
  res.json(result);
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
