import { Request, Response, NextFunction } from 'express';

import { findAccountByUserId } from '../repositories/accountRepository.js';
import { findUser } from '../repositories/userRepository.js';
import { notFoundError } from '../utils/errorUtils.js';
import { UserFromToken } from './validateToken.js';

export async function validateAndSaveAccount(req: Request, res: Response, next: NextFunction) {
  const user: UserFromToken = res.locals.user;

  const userFromDb = await findUser(user.username);
  if (!userFromDb) throw notFoundError('Não foi possível localizar o usuário. Tente logar novamente.');

  const userAccount = await findAccountByUserId(userFromDb.accountId);
  if (!userAccount)
    throw notFoundError(
      'Não foi possível localizar sua conta. Tente logar novamente e se persistir o problema, entre em contato com nossa equipe de suporte.',
    );

  res.locals.userAccount = userAccount;

  next();
}
