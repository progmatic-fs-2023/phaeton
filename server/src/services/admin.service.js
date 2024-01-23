import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// export functions individually when there's more function in it

export async function cancelServiceById(userID, id) {
  const now = new Date(Date.now());
  now.toString();
  const cancelledService = await prisma.Services.update({
    where: {
      id,
      userID,
      ActualServiceEndDate: null,
    },
    data: {
      ActualServiceEndDate: now,
    },
  });

  return cancelledService;
}

export async function serviceQuery() {
  const services = await prisma.services.findMany({
    // include: {
    //   ParkingLot: true,
    //   Users: true,
    //   Cars: true,
    // },
    select: {
      id: true,
      ServiceStartDate: true,
      ServiceEndDate: true,
      ActualServiceEndDate: true,
      Users: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
      Cars: {
        select: {
          model: true,
        },
      },
      ParkingLot: {
        select: {
          zone: true,
        },
      },
    },
  });

  return services;
}
