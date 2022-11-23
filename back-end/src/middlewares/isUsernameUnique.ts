import { Request, Response, NextFunction } from 'express';

import { conflictError } from '../utils/errorUtils.js';
import { UserCreation } from '../schemas/userSchema.js';
import { findUser } from '../repositories/userRepository.js';

export async function isUsernamelUnique(req: Request, res: Response, next: NextFunction) {
  const user: UserCreation = res.locals.body;
  const userFromDb = await findUser(user.username);

  if (userFromDb) throw conflictError('O nome de usuário já está em uso. Por favor, escolha outro nome');

  next();
}
