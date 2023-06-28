import { decodeToken } from '../utils';
import { Request, Response, NextFunction } from 'express';

const authenticate = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    console.log({ authHeader }, "@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");

    if (!token) {
      return res.status(401).json({ error: 'Access denied. Token missing.' });
    }

    const decoded = decodeToken(token);
    res.locals.currentUser = decoded;

    next();
  } catch (error: any) {
    return res.status(401).json({ error: 'Invalid token, Plz logged-in again' });
  }
};

export { authenticate };
