import { Router } from 'express';

import userRouter from './userRouter.js';
import accountRouter from './accountRouter.js';
import transactionRouter from './transactionRouter.js';

const router = Router();

router.use(userRouter).use(accountRouter).use(transactionRouter);

export default router;
