import { Transaction } from '@prisma/client';

import db from '../config/database.js';

type TransactionCreation = Omit<Transaction, 'id' | 'createdAt'>;

export async function saveTransaction(prisma = db, transaction: TransactionCreation) {
  await prisma.transaction.create({
    data: transaction,
  });
}

export async function findTransactions(accountId: number) {
  return await db.transaction.findMany({
    where: { OR: [{ debitedAccountId: accountId }, { creditedAccountId: accountId }] },
    orderBy: { createdAt: 'desc' },
    select: {
      debitedAccount: {
        select: {
          user: {
            select: {
              username: true,
            },
          },
        },
      },
      creditedAccount: {
        select: {
          user: {
            select: {
              username: true,
            },
          },
        },
      },
      value: true,
      createdAt: true,
    },
  });
}
