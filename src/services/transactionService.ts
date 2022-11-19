import { TransactionReceived } from '../controllers/transactionController.js';
import { findAccountByUserId } from '../repositories/accountRepository.js';
import { saveTransaction } from '../repositories/transactionRepository.js';
import { findUser } from '../repositories/userRepository.js';
import { notFoundError } from '../utils/errorUtils.js';

async function makeTransaction(debitedAccountId: number, transactionInfo: TransactionReceived) {
  const { creditedUsername, value } = transactionInfo;
  const formatedValue = formatValue(value);
  const creditedAccountId = await findAccountId(creditedUsername);
  await saveTransaction({ creditedAccountId, debitedAccountId, value: formatedValue });
}

function formatValue(value: string) {
  const formatedValue = value.replace(/R\$|,/gi, '').trim();
  return parseInt(formatedValue);
}

async function findAccountId(username: string) {
  const userFromDb = await findUser(username);
  if (!userFromDb)
    throw notFoundError(
      'Não foi possível localizar o nome de usuário destinatário. Por favor, confira os dados e tente novamente.',
    );

  const account = await findAccountByUserId(userFromDb.accountId);
  if (!account)
    throw notFoundError(
      'Não foi possível localizar conta do destinatário. Por favor, confira os dados e tente novamente. Caso o probelma persista, entre em contato com nossa equipe de suporte.',
    );

  return account.id;
}

const transactionService = {
  makeTransaction,
};

export default transactionService;
