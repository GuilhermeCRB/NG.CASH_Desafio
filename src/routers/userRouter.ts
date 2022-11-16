import { Router } from 'express';

import { signUp } from '../controllers/userController.js';

const userRouter = Router();

userRouter.post('/sign-up', signUp);

export default userRouter;
