import { NextFunction, Request, Response } from 'express';
import CustomAppError from '../errors/CustomAppError';

export default (err: Error, req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof CustomAppError) {
    const cError = err as CustomAppError;
    return res.status(cError.statusCode).json({ message: cError.message });
  }
  return res.status(500).json({ message: err.message });
};
