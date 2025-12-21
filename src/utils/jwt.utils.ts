import { config } from 'dotenv';
import jwt from 'jsonwebtoken';
import { envVars } from '../config/env';

export const generateToken = (payload: any): string => {
  const secret = envVars.JWT_ACCESS_SECRET as string;
  const expiresIn = typeof envVars.JWT_EXPIRES_IN === 'string' 
    ? parseInt(envVars.JWT_EXPIRES_IN, 10) 
    : envVars.JWT_EXPIRES_IN;
  
  return jwt.sign(payload, secret, {
    expiresIn,
  });
};

export const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, envVars.JWT_ACCESS_SECRET);
  } catch (error) {
    return null;
  }
};