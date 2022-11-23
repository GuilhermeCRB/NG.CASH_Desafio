import { Request, Response } from 'express';

import userService from '../services/userService.js';
import { UserCreation } from '../schemas/userSchema.js';

export async function signUp(req: Request, res: Response) {
  const user: UserCreation = res.locals.body;
  await userService.signUpUser(user);
  res.sendStatus(201);
}

export async function signIn(req: Request, res: Response) {
  const user: UserCreation = res.locals.body;
  const token = await userService.signInUser(user);
  res.status(200).send({ token });
}
