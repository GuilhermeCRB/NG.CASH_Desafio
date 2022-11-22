import { Account } from '@prisma/client';

import { formatValueToString } from '../utils/formatValue.js';

async function getAccountBalance(userAccount: Account) {
  return formatValueToString(userAccount.balance);
}

const accountService = {
  getAccountBalance,
};

export default accountService;
