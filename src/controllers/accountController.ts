import { Request, Response } from 'express';

import accountService from '../services/accountService.js';
import { UserFromToken } from '../middlewares/validateToken.js';

export async function getUserBalance(req: Request, res: Response) {
  const user: UserFromToken = res.locals.user;
  const balance = await accountService.getAccountBalance(user.username);
  res.status(200).send({ balance });
}
