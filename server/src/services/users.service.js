import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createUser(newUser) {
  const user = await prisma.users.create({
    data: newUser,
  });
  return user;
}

export async function findUserByEmail(email, IsGuestUser) {
  const user = await prisma.users.findUnique({
    where: {
      email,
      IsGuestUser,
    },
    // returns with selected columns
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      password: true,
      role: true,
      DateOfBirth: true,
    },
  });
  console.log(user);
  return user;
}
