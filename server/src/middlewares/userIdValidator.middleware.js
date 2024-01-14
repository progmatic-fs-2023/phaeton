import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function idError(res, message) {
  res.status(405).json({
    error: `Internal server error code: 405`,
    message,
  });
}

function isValidCUID(str) {
  const CUID_REGEX = /^[0-9a-zA-Z]{25}$/;
  return CUID_REGEX.test(str);
}

export async function userIdValidatorInBody(req, res, next) {
  if (!isValidCUID(req.body.userID)) {
    idError(res, 'UserID is invalid');
  } else {
    const user = await prisma.Users.findUnique({
      where: {
        id: req.body.userID,
      },
    });
    if (user) {
      // eslint-disable-next-line prefer-destructuring
      const length = Object.keys(user).length;
      if (length > 0) {
        if (user.userID == null) {
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
  if (!isValidCUID(req.params.userID)) {
    idError(res, 'UserID is invalid');
  } else {
    const user = await prisma.Users.findUnique({
      where: {
        id: req.params.userID,
      },
    });
    if (user) {
      if (Object.keys(user).length) {
        if (user.userID == null) {
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
