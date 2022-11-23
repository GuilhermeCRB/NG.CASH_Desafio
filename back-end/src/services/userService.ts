import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { createUser, findUser } from '../repositories/userRepository.js';
import { UserCreation } from '../schemas/userSchema.js';
import { unauthorizedError } from '../utils/errorUtils.js';

async function signUpUser(user: UserCreation) {
  const encryptedPassword = encryptPassword(user.password);
  await createUser({ ...user, password: encryptedPassword });
}

function encryptPassword(password: string) {
  const SALT = 10;
  return bcrypt.hashSync(password, SALT);
}

async function signInUser(user: UserCreation) {
  const tokenInfo = await matchEmailAndPassword(user);
  return generateToken(tokenInfo);
}

async function matchEmailAndPassword(user: UserCreation) {
  const userFromDb: User = await findUser(user.username);
  if (!userFromDb) throw unauthorizedError('Nome de usuário ou senha inválidos.');

  const isValidated: boolean = bcrypt.compareSync(user.password, userFromDb.password);
  if (!isValidated) throw unauthorizedError('Nome de usuário ou senha inválidos.');

  return userFromDb.username;
}

function generateToken(username: string) {
  return jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '24h' });
}

const accessService = {
  signUpUser,
  signInUser,
};

export default accessService;
