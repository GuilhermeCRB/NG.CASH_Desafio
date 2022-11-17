import db from '../config/database.js';

export async function findAccountByUserId(accountId: number) {
  return db.account.findUnique({
    where: { id: accountId },
  });
}
