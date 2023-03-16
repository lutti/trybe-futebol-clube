import { NextFunction, Request, Response } from 'express';
import CustomAppError from '../errors/CustomAppError';

export default async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i;

  if (!email || !password) {
    throw new CustomAppError('All fields must be filled', 400);
  }
  if (!emailRegex.test(email) || String(password).length < 6) {
    throw new CustomAppError('Invalid email or password', 401);
  }

  return next;
};
