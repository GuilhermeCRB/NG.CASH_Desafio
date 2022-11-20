import { Account } from '@prisma/client';
import { Request, Response } from 'express';

import transactionService from '../services/transactionService.js';

export type TransactionReceived = {
  creditedUsername: string;
  value: string;
};

export async function makeUserTransaction(req: Request, res: Response) {
  const userAccount: Account = res.locals.userAccount;
  const { username }: { username: string } = res.locals.user;
  const transactionInfo: TransactionReceived = res.locals.body;
  await transactionService.makeTransaction(username, userAccount, transactionInfo);
  res.sendStatus(200);
}
