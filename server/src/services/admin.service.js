import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// export individually when there's more function in it

async function cancelServiceById(userID, id) {
    const now = new Date(Date.now());
    now.toString() 
  const cancelledService = await prisma.Services.update({
    where: {
        id,
        userID,
        ActualServiceEndDate : null
    },
    data: {
        ActualServiceEndDate: now
    }
  })

  return cancelledService
}

export default cancelServiceById