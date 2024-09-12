import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

const secretKey = process.env.SECRET_KEY || 'secret';

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.header('Authorization').replace('Bearer ', '');

  if (!token) {
    return res.status(401).send({ error: 'Please authenticate.' });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).send({ error: 'Invalid token.' });
  }
}