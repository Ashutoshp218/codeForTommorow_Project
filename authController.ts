import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const adminEmail = 'admin@codesfortomorrow.com';
const adminPassword = 'Admin123!@#';

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (email !== adminEmail || !await bcrypt.compare(password, await bcrypt.hash(adminPassword, 10))) {
    return res.status(400).send('Invalid credentials');
  }

  const token = jwt.sign({ email }, process.env.JWT_SECRET!, { expiresIn: '1h' });
  res.send({ token });
};

export { login };
