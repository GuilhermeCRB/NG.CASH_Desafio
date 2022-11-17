import { Request, Response } from 'express';

export async function getUserBalance(req: Request, res: Response) {
  res.sendStatus(200);
}
