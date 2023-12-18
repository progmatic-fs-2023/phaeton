import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createUser(newUser) {
  const user = await prisma.users.create({
    data: newUser,
  });
  return user;
}

export async function findUserByEmail(email) {
  const user = await prisma.users.findUnique({
    where: {
      email,
    },
  });
  return user;
}
