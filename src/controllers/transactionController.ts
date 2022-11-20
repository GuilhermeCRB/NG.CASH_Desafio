import { Account } from '@prisma/client';
import { Request, Response } from 'express';
import { UserFromToken } from '../middlewares/validateToken.js';

import transactionService from '../services/transactionService.js';

export type UserTransaction = {
  creditedUsername: string;
  value: string;
};

export type ResponseTransaction = {
  creditedUsername?: string;
  debitedUsername?: string;
  value: string;
  date: string;
};

export async function makeUserTransaction(req: Request, res: Response) {
  const userAccount: Account = res.locals.userAccount;
  const user: UserFromToken = res.locals.user;
  const transactionInfo: UserTransaction = res.locals.body;
  await transactionService.makeTransaction(user.username, userAccount, transactionInfo);
  res.sendStatus(200);
}

export async function getTransactionsHistory(req: Request, res: Response) {
  const userAccount: Account = res.locals.userAccount;
  const user: UserFromToken = res.locals.user;
  const transactions: ResponseTransaction[] = await transactionService.findTransactionsHistory(
    user.username,
    userAccount.id,
  );
  res.status(200).send(transactions);
}
