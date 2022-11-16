import { User } from '@prisma/client';
import bcrypt from 'bcrypt';

import { createUser } from '../repositories/userRepositories.js';

export type UserCreation = Omit<User, 'id' | 'accountId'>;
export type UserWithAccount = Omit<User, 'id'>;

async function signUpUser(user: UserCreation) {
  const encryptedPassword = encryptPassword(user.password);
  await createUser({ ...user, password: encryptedPassword, accountId: 1 });
}

function encryptPassword(password: string) {
  const SALT = 10;
  return bcrypt.hashSync(password, SALT);
}

const accessService = {
  signUpUser,
};

export default accessService;
