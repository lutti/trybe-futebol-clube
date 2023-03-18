import 'express-async-errors';
import { NextFunction, Request, Response } from 'express';
// import CustomAppError from '../errors/CustomAppError';
import jwt from '../utils/jwt';
import IUser from '../interfaces/IUser';

export interface CustomRequest extends Request {
  user: IUser;
}

export default async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ message: 'Token not found' });

  const result = await jwt.authenticateToken(authorization);
  const user = result as IUser;
  (req as CustomRequest).user = user;
  // return res.status(200).json(user);

  // const { email } = result;
  // if (!email)

  // if (message) return res.status(status).json({ message });

  return next();
};
