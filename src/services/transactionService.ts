import db from '../config/database.js';
import { Account, PrismaClient } from '@prisma/client';

import { TransactionReceived } from '../controllers/transactionController.js';
import { findAccountByUserId, updateAccountBalance } from '../repositories/accountRepository.js';
import { saveTransaction } from '../repositories/transactionRepository.js';
import { findUser } from '../repositories/userRepository.js';
import { badRequestError, notFoundError } from '../utils/errorUtils.js';

async function makeTransaction(username: string, userAccount: Account, transactionInfo: TransactionReceived) {
  const { creditedUsername, value } = transactionInfo;
  const formatedValue = formatValue(value);
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

function formatValue(value: string) {
  const formatedValue = value.replace(/R\$|,/gi, '').trim();
  return parseInt(formatedValue);
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

const transactionService = {
  makeTransaction,
};

export default transactionService;
