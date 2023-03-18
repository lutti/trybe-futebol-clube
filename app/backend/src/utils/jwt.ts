import * as jwt from 'jsonwebtoken';
import CustomAppError from '../errors/CustomAppError';
import IUser from '../interfaces/IUser';

const JWT_SECRET = 'jwt_secret';

const generateToken = (payload: IUser) =>
  jwt.sign(payload, JWT_SECRET, {
    expiresIn: '6h',
    algorithm: 'HS256',
  });

const authenticateToken = async (token: string) => {
  try {
    const verificationResponse = await jwt.verify(token, JWT_SECRET);
    return verificationResponse;
  } catch (err) {
    throw new CustomAppError('Token must be a valid token', 401);
  }
};

export default {
  generateToken,
  authenticateToken,
};
