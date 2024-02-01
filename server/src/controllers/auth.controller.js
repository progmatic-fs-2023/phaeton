import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { createUser, findUserByEmail, findServicesByUserId } from '../services/users.service';
import 'dotenv/config';

// user registration
export const signUp = async (req, res) => {
  const { firstName, lastName, email, dateOfBirth, password, IsGuestUser } = req.body;

  try {
    const passwordHash = await bcrypt.hash(password, 10);
    const createdUser = await createUser({
      firstName,
      lastName,
      email,
      DateOfBirth: new Date(dateOfBirth),
      password: passwordHash,
      IsGuestUser,
    });

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
  const { email, password, IsGuestUser } = req.body;

  if (!email || !password) {
    res.status(400).json({
      message: 'Failed to login.',
      error: 'Email or password is missing.',
    });
    return;
  }

  try {
    const user = await findUserByEmail(email, IsGuestUser); // getting the user from table by email

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
          id: user.id,
          email: user.email,
          role: user.role,
          lastName: user.lastName,
          firstName: user.firstName,
          dateOfBirth: user.DateOfBirth,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '3h' });

        res.status(200).json({
          message: 'Login successful',
          user,
          token,
        });
      } else {
        res.status(401).json({
          message: 'Failed to login.',
          error: 'Password is incorrect.',
        });
      }
    }
  } catch (err) {
    res.status(404).json({
      message: 'Failed to get user',
      error: err.message,
    });
  }
};

export const check = (req, res) => {
  try {
    const decoded = jwt.verify(req.body.token, process.env.JWT_SECRET);
    if (decoded) {
      res.status(201).json(decoded);
    }
  } catch (err) {
    res.status(400).json('GuestUser');
  }
};

export const list = async (req, res) => {
  const userId = req.body;
  try {
    const services = await findServicesByUserId(userId);
    res.status(200).json(services);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const prisma = new PrismaClient();

export const activateAccount = async (req, res) => {
  const { email } = req.params;
  console.log('lefutok');
  try {
    const user = await prisma.users.findUnique({
      where: { email },
    });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    console.log('lefutok222');
    await prisma.users.update({
      where: { email },
      data: { Verified: true },
    });
    return res.status(200).json({ message: 'Account activated successfully' });
  } catch (error) {
    console.error('Error activating account:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
