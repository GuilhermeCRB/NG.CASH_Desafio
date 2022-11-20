import db from '../config/database.js';
import { Account, PrismaClient, User } from '@prisma/client';

import { UserTransaction } from '../controllers/transactionController.js';
import { findAccountByUserId, updateAccountBalance } from '../repositories/accountRepository.js';
import { findTransactions, saveTransaction } from '../repositories/transactionRepository.js';
import { findUser } from '../repositories/userRepository.js';
import { badRequestError, notFoundError } from '../utils/errorUtils.js';
import { formatValueToNumber, formatValueToString } from '../utils/formatValue.js';

type FoundDbTransaction = {
  createdAt: Date;
  value: number;
  debitedAccount: {
    user: Omit<User, 'id' | 'password' | 'accountId'>;
  };
  creditedAccount: {
    user: Omit<User, 'id' | 'password' | 'accountId'>;
  };
};

async function makeTransaction(username: string, userAccount: Account, transactionInfo: UserTransaction) {
  const { creditedUsername, value } = transactionInfo;
  const formatedValue = formatValueToNumber(value);
  const creditedAccount = await findAccount(creditedUsername);

  if (creditedUsername === username)
    throw badRequestError('Não é possível realizar uma tranferência de uma conta para ela mesma');
  if (formatedValue > userAccount.balance) throw badRequestError('Saldo insuficiente');

  await db.$transaction(async (prisma: PrismaClient) => {
    await updateAccountBalance(prisma, userAccount.id, formatedValue, 'decrement');
    await updateAccountBalance(prisma, creditedAccount.id, formatedValue, 'increment');
    await saveTransaction(prisma, {
      creditedAccountId: creditedAccount.id,
      debitedAccountId: userAccount.id,
      value: formatedValue,
    });
  });
}

async function findAccount(username: string) {
  const userFromDb = await findUser(username);
  if (!userFromDb)
    throw notFoundError(
      'Não foi possível localizar o nome de usuário destinatário. Por favor, confira os dados e tente novamente',
    );

  const account = await findAccountByUserId(userFromDb.accountId);
  if (!account)
    throw notFoundError(
      'Não foi possível localizar conta do destinatário. Por favor, confira os dados e tente novamente. Caso o probelma persista, entre em contato com nossa equipe de suporte',
    );

  return account;
}

async function findTransactionsHistory(username: string, accountId: number) {
  const transactions: FoundDbTransaction[] = await findTransactions(accountId);
  const formatedTransactions = formatTransactions(username, transactions);
  return formatedTransactions;
}

function formatTransactions(username: string, transactions: FoundDbTransaction[]) {
  return transactions.map((transaction) => {
    if (transaction.debitedAccount.user.username === username) {
      formatDate(transaction.createdAt);
      return {
        creditedAccount: transaction.creditedAccount.user.username,
        value: formatValueToString(transaction.value),
        date: formatDate(transaction.createdAt),
      };
    } else {
      formatDate(transaction.createdAt);
      return {
        debitedAccount: transaction.debitedAccount.user.username,
        value: formatValueToString(transaction.value),
        date: formatDate(transaction.createdAt),
      };
    }
  });
}

function formatDate(date: Date) {
  const today = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
  const brDate = date.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
  const [todayDate, todayTime] = today.split(' ');
  const [brDateDate, brDateTime] = brDate.split(' ');

  if (todayDate === brDateDate) return brDateTime;
  if (todayDate !== brDateDate) return brDateDate;
}

const transactionService = {
  makeTransaction,
  findTransactionsHistory,
};

export default transactionService;
