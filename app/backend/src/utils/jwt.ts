import * as jwt from 'jsonwebtoken';
import IUser from '../interfaces/IUser';

const JWT_SECRET = process.env.JWT_SECRET || 'jwt_secret';

const generateToken = (payload: IUser) =>
  jwt.sign(payload, JWT_SECRET, {
    expiresIn: '6h',
    algorithm: 'HS256',
  });

const authenticateToken = async (token: string) => {
  if (!token) {
    const error = new Error();
    error.message = 'Token not found';
    // error.status = 401;
    return error;
  }

  try {
    const verificationResponse = await jwt.verify(token, JWT_SECRET);
    return verificationResponse;
  } catch (err) {
    const error = new Error();
    error.message = 'Expired or invalid token';
    // error.status = 401;
    return error;
  }
};

export default {
  generateToken,
  authenticateToken,
};
