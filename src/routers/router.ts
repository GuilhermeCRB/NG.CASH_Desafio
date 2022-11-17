import { Router } from 'express';

import userRouter from './userRouter.js';
import accountRouter from './accountRouter.js';

const router = Router();

router.use(userRouter).use(accountRouter);

export default router;
