import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createUser(newUser) {
  const user = await prisma.users.create({
    data: newUser,
  });
  return user;
}

export async function updateGuestUser(guestUser) {
  const user = await prisma.users.update({
    where: {
      email: guestUser.email,
    },
    data: guestUser,
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
      IsGuestUser: true,
    },
  });
  return user;
}

export async function findServicesByUserId({ userId }) {
  const services = await prisma.services.findMany({
    where: {
      userID: userId,
    },
    include: {
      Cars: true,
      ParkingLot: true,
    },
  });

  return services;
}

export async function removeUserByEmail(email) {
  const deletedUser = await prisma.users.update({
    where: {
      email,
    },
    data: {
      IsGuestUser: true
    }
  });
  return deletedUser;
}
