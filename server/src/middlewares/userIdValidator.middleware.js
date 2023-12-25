import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function idError(res, message) {
  res.status(405).json({
    error: `Internal server error code: 405`,
    message,
  });
}

async function userIdValidator(req, res, next) {
  if (req.body.userId.length !== 25) {
    idError(res, 'UserID is invalid');
  } else {
    const userCheck = await prisma.Users.findUnique({
      where: {
        id: req.body.userId,
      },
    });
    if (userCheck) {
      // eslint-disable-next-line prefer-destructuring
      const length = Object.keys(userCheck).length;
      if (length > 0) {
        if (userCheck.userId == null) {
          next();
        } else {
          idError(res, 'Already taken');
        }
      } else {
        idError(res, 'UserID is invalid');
      }
    } else {
      idError(res, 'UserID is invalid');
    }
  }
}

export default userIdValidator;
