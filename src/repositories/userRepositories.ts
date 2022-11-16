import db from '../config/database.js';

import { UserWithAccount } from '../services/userService.js';

export async function createUser(userData: UserWithAccount) {
  await db.user.create({
    data: userData,
  });
}
