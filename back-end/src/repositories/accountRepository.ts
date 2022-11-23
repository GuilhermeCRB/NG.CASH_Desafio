import db from '../config/database.js';

export async function findAccountByUserId(accountId: number) {
  return db.account.findUnique({
    where: { id: accountId },
  });
}

export async function updateAccountBalance(prisma = db, accountId: number, value: number, type: string) {
  await prisma.account.update({
    where: { id: accountId },
    data: { balance: { [type]: value } },
  });
}
