import { findAccountByUserId } from '../repositories/accountRepository.js';
import { findUser } from '../repositories/userRepository.js';
import { notFoundError } from '../utils/errorUtils.js';

async function getAccountBalance(username: string) {
  const userFromDb = await findUser(username);
  if (!userFromDb) throw notFoundError('Não foi possível localizar o usuário. Tente logar novamente');

  const account = await findAccountByUserId(userFromDb.accountId);
  if (!account)
    throw notFoundError(
      'Não foi possível localizar sua conta. Tente logar novamente e se persistir o problema, entre em contato com nossa equipe de suporte',
    );

  return formatBalance(account.balance);
}

function formatBalance(balance: number) {
  const stringfiedBalance = balance.toString();
  const fullValuePart = stringfiedBalance.slice(0, -2);
  const centsPart = stringfiedBalance.slice(-2);
  return `R$ ${fullValuePart},${centsPart}`;
}

const accountService = {
  getAccountBalance,
};

export default accountService;
