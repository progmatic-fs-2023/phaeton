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
    // returns with selected columns
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      password: true,
      role: true,
    },
  });
  return user;
}
