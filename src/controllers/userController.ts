import { Request, Response } from 'express';

import userService, { UserCreation } from '../services/userService.js';

export async function signUp(req: Request, res: Response) {
  const user: UserCreation = res.locals.body;
  await userService.signUpUser(user);
  res.sendStatus(201);
}
