import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { unauthorizedError } from '../utils/errorUtils.js';

export type UserFromToken = {
  username: string;
  iat: number;
  exp: number;
};

export default function validateToken(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;
  const token = authorization?.replace('Bearer', '').trim();

  if (!token) throw unauthorizedError('Esta operação requer o envio do token do usuário');

  jwt.verify(token, process.env.JWT_SECRET, (e, user) => {
    if (e) throw unauthorizedError('Token inválido');
    res.locals.user = user;
  });

  next();
}
