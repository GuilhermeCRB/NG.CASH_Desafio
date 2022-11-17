import bcrypt from 'bcrypt';

import { createUser } from '../repositories/userRepositories.js';
import { UserCreation } from '../schemas/userSchema.js';

async function signUpUser(user: UserCreation) {
  const encryptedPassword = encryptPassword(user.password);
  await createUser({ ...user, password: encryptedPassword });
}

function encryptPassword(password: string) {
  const SALT = 10;
  return bcrypt.hashSync(password, SALT);
}

const accessService = {
  signUpUser,
};

export default accessService;
