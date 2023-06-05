import { decodeToken } from '../utils';
import { Request, Response, NextFunction } from 'express';

const authenticate = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) throw new Error('Access denied. Token missing.')
    const decoded = decodeToken(token);
    res.locals.currentUser = decoded;

    next();
  } catch (error: any) {
    throw new Error(error);
  }
};

export { authenticate };
