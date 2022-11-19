import { Transaction } from '@prisma/client';

import db from '../config/database.js';

type TransactionCreation = Omit<Transaction, 'id' | 'createdAt'>;

export async function saveTransaction(transaction: TransactionCreation) {
  console.log(transaction);
  await db.transaction.create({
    data: transaction,
  });
}
