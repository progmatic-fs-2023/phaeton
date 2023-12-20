import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createUser, findUserByEmail } from '../services/users.service';
import 'dotenv/config';

// user registration
export const signUp = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const passwordHash = await bcrypt.hash(password, 10);
    const createdUser = await createUser({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });
    delete createdUser.password;

    res.status(201).json({
      message: 'User created.',
      user: createdUser,
    });
  } catch (err) {
    res.status(400).json({
      message: 'Failed to create user.',
      error: err.message,
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({
      message: 'Failed to login.',
      error: 'Email or password is missing.',
    });
    return;
  }

  try {
    const user = await findUserByEmail(email); // getting the user from table by email

    if (!user) {
      res.status(401)({
        message: 'Failed to login.',
        error: 'Email is invalid.',
      });
    } else {
      const result = await bcrypt.compare(password, user.password); // true if password matching
      if (result) {
        // client gets user object without password
        delete user.password;

        const payload = {
          email: user.email,
          role: user.role,
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '3h' });

        res.status(200).json({
          message: 'Login successful',
          user,
          token,
        });
      } else {
        throw new Error();
        // res.status(404).json({
        //   message: 'Failed to login.',
        //   error: 'Password is incorrect.',
        // });
      }
    }
  } catch (err) {
    res.status(404).json({
      message: 'Failed to get user',
      err: err.message,
    });
  }
};
