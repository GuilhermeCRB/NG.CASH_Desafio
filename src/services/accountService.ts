import { findAccountByUserId } from '../repositories/accountRepository.js';
import { findUser } from '../repositories/userRepository.js';
import { notFoundError } from '../utils/errorUtils.js';
import { formatValueToString } from '../utils/formatValue.js';

async function getAccountBalance(username: string) {
  const userFromDb = await findUser(username);
  if (!userFromDb) throw notFoundError('Não foi possível localizar o usuário. Tente logar novamente');

  const account = await findAccountByUserId(userFromDb.accountId);
  if (!account)
    throw notFoundError(
      'Não foi possível localizar sua conta. Tente logar novamente e se persistir o problema, entre em contato com nossa equipe de suporte',
    );

  return formatValueToString(account.balance);
}

const accountService = {
  getAccountBalance,
};

export default accountService;
