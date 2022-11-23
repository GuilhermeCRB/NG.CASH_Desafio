import { Request, Response } from 'express';
import { Account } from '@prisma/client';

import accountService from '../services/accountService.js';
import { UserFromToken } from '../middlewares/validateToken.js';

export async function getUserBalance(req: Request, res: Response) {
  const user: UserFromToken = res.locals.user;
  const userAccount: Account = res.locals.userAccount;
  const balance = await accountService.getAccountBalance(userAccount);
  res.status(200).send({ balance });
}
