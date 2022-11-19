import { Request, Response } from 'express';

import transactionService from '../services/transactionService.js';

export type TransactionReceived = {
  creditedUsername: string;
  value: string;
};

export async function makeUserTransaction(req: Request, res: Response) {
  const userAccountId: number = res.locals.userAccountId;
  const transactionInfo: TransactionReceived = res.locals.body;
  await transactionService.makeTransaction(userAccountId, transactionInfo);
  res.sendStatus(201);
}
