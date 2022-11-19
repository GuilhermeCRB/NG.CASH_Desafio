import { Account } from '@prisma/client';
import { Request, Response } from 'express';

import transactionService from '../services/transactionService.js';

export type TransactionReceived = {
  creditedUsername: string;
  value: string;
};

export async function makeUserTransaction(req: Request, res: Response) {
  const userAccount: Account = res.locals.userAccount;
  const transactionInfo: TransactionReceived = res.locals.body;
  await transactionService.makeTransaction(userAccount, transactionInfo);
  res.sendStatus(200);
}
