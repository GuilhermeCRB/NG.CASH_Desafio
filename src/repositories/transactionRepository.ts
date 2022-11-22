import { Transaction } from '@prisma/client';

import db from '../config/database.js';

type TransactionCreation = Omit<Transaction, 'id' | 'createdAt'>;

export async function saveTransaction(prisma = db, transaction: TransactionCreation) {
  await prisma.transaction.create({
    data: transaction,
  });
}

export async function findTransactions(
  { limit = '10', offset = '0', dateFilter = '', typeFilter = 'no-filter' },
  accountId: number,
) {
  const nextDay = new Date(dateFilter);
  nextDay.setDate(nextDay.getDate() + 1);
  const cashInFilter = typeFilter === 'cash-in' || typeFilter === 'no-filter';
  const cashOuFilter = typeFilter === 'cash-out' || typeFilter === 'no-filter';

  return await db.transaction.findMany({
    where: {
      OR: [
        {
          ...(cashOuFilter ? { debitedAccountId: accountId } : ''),
        },
        { ...(cashInFilter ? { creditedAccountId: accountId } : '') },
      ],
      AND: [
        {
          ...(dateFilter ? { createdAt: { gte: dateFilter } } : ''),
        },
        {
          ...(dateFilter ? { createdAt: { lte: nextDay } } : ''),
        },
      ],
    },
    orderBy: { createdAt: 'desc' },
    take: Number(limit),
    skip: Number(offset),
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
