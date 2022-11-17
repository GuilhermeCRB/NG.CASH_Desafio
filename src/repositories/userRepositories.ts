import db from '../config/database.js';

import { UserCreation } from '../schemas/userSchema.js';

export async function createUser(userData: UserCreation, initialBalance = 10000) {
  await db.$transaction(async (db) => {
    const account = await db.account.create({
      data: { balance: initialBalance },
    });

    await db.user.create({
      data: { ...userData, accountId: account.id },
    });
  });
}

export async function findUser(username: string) {
  return await db.user.findFirst({
    where: { username },
  });
}
