import { Transaction } from '@prisma/client';

import db from '../config/database.js';

type TransactionCreation = Omit<Transaction, 'id' | 'createdAt'>;

export async function saveTransaction(prisma = db, transaction: TransactionCreation) {
  await prisma.transaction.create({
    data: transaction,
  });
}
