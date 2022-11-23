import { Account, PrismaClient, User } from '@prisma/client';

import db from '../config/database.js';
import { Filters, UserTransaction } from '../controllers/transactionController.js';
import { findAccountByUserId, updateAccountBalance } from '../repositories/accountRepository.js';
import { findTransactions, saveTransaction } from '../repositories/transactionRepository.js';
import { findUser } from '../repositories/userRepository.js';
import { badRequestError, internalServerError, notFoundError } from '../utils/errorUtils.js';
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
  if (formatedValue < 0) throw badRequestError('Forneça um valor válido para realizar a transferência');

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

async function findTransactionsHistory(filters: Filters, username: string, accountId: number) {
  let formatedFilters;
  if (filters.dateFilter) {
    formatedFilters = { ...filters, dateFilter: formatStringToDate(filters.dateFilter) };
  } else {
    formatedFilters = filters;
  }
  const transactions: any = await findTransactions(formatedFilters, accountId);
  const formatedTransactions = formatTransactions(username, transactions);
  return formatedTransactions;
}

function formatTransactions(username: string, transactions: FoundDbTransaction[]) {
  return transactions.map((transaction) => {
    if (transaction.debitedAccount.user.username === username) {
      return {
        creditedAccount: transaction.creditedAccount.user.username,
        value: formatValueToString(transaction.value),
        date: formatDateToString(transaction.createdAt),
      };
    }

    if (transaction.creditedAccount.user.username === username) {
      return {
        debitedAccount: transaction.debitedAccount.user.username,
        value: formatValueToString(transaction.value),
        date: formatDateToString(transaction.createdAt),
      };
    }

    throw internalServerError(
      'Ocorreu um erro ao tentar obter seu histórico de transações. Por favor, tente novamente e, caso persista o erro, entre em contato com nossa equipe de suporte',
    );
  });
}

function formatDateToString(date: Date) {
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const userLocale = Intl.DateTimeFormat().resolvedOptions().locale;
  const today = new Date().toLocaleString(userLocale, { timeZone: userTimezone });
  const brDate = date.toLocaleString(userLocale, { timeZone: userTimezone });
  const [todayDate, todayTime] = today.split(' ');
  const [brDateDate, brDateTime] = brDate.split(' ');

  if (todayDate === brDateDate) return brDateTime;
  if (todayDate !== brDateDate) return brDateDate;
}

function formatStringToDate(stringifiedDate: string) {
  const [stringifiedDay, stringifiedMonth, stringifiedYear] = stringifiedDate.split('/');
  const date = new Date(`${stringifiedYear}-${stringifiedMonth}-${stringifiedDay}T00:00:00Z`);
  return convertDateToUTC(date);
}

function convertDateToUTC(date: any) {
  return new Date(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds(),
  );
}

const transactionService = {
  makeTransaction,
  findTransactionsHistory,
};

export default transactionService;
