import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function idError(res, message) {
  res.status(405).json({
    error: `Internal server error code: 405`,
    message,
  });
}

export async function userIdValidatorInBody(req, res, next) {
  if (req.body.userID.length !== 25) {
    idError(res, 'UserID is invalid');
  } else {
    const userCheck = await prisma.Users.findUnique({
      where: {
        id: req.body.userID,
      },
    });
    if (userCheck) {
      // eslint-disable-next-line prefer-destructuring
      const length = Object.keys(userCheck).length;
      if (length > 0) {
        if (userCheck.userID == null) {
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

export async function userIdValidatorInParams(req, res, next) {
  if (req.params.userID.length !== 25) {
    idError(res, 'UserID is invalid');
  } else {
    const userCheck = await prisma.Users.findUnique({
      where: {
        id: req.params.userID,
      },
    });
    if (userCheck) {
      // eslint-disable-next-line prefer-destructuring
      const length = Object.keys(userCheck).length;
      if (length > 0) {
        if (userCheck.userID == null) {
          next();
        } else {
          idError(res, 'UserID is invalid');
        }
      } else {
        idError(res, 'UserID is invalid');
      }
    } else {
      idError(res, 'UserID is invalid');
    }
  }
}
