import { Request, Response, NextFunction } from 'express';
import { auth } from '../connections/databaseConnection';

export const verifyAuth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split('Bearer ')[1];

  if (!token) {
    return res.status(403).json({ success: false, message: 'Token missing' });
  }

  try {
    const decoded = await auth.verifyIdToken(token);
    (req as any).user = decoded;
    next();

    return;
  } catch (err) {
    console.error('Auth failed:', err);
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }
};
