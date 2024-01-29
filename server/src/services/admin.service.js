import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// export functions individually when there's more function in it

export async function returnServiceById(userID, id) {
  const now = new Date(Date.now());
  now.toString();
  const returnedService = await prisma.Services.update({
    where: {
      id,
      userID,
      ActualServiceEndDate: null,
    },
    data: {
      ActualServiceEndDate: now,
      IsActive: false,
    },
  });

  return returnedService;
}

export async function cancelServiceById(userID, id) {
  const canceledService = await prisma.Services.update({
    where: {
      id,
      userID,
      ActualServiceEndDate: null,
    },
    data: {
      IsActive: false,
    },
  });

  return canceledService;
}

export async function serviceQuery() {
  const services = await prisma.services.findMany({
    select: {
      id: true,
      ServiceStartDate: true,
      ServiceEndDate: true,
      ActualServiceEndDate: true,
      PhoneNumber: true,
      IsActive: true,
      Users: {
        select: {
          id: true,
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
    orderBy: [
      {
        ServiceStartDate: 'desc',
      },
      {
        ServiceEndDate: 'asc',
      },
    ],
  });

  const flattenedServices = services.map(service => ({
    ...service,
    ...service.Cars,
    ...service.ParkingLot,
    userId: service.Users.id,
    name: `${service.Users.firstName} ${service.Users.lastName}`,
  }));

  return flattenedServices;
}
