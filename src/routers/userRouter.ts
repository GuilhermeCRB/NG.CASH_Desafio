import { Router } from 'express';

import { signUp } from '../controllers/userController.js';
import { sanitizeInputs } from '../middlewares/sanitizeInputs.js';

const userRouter = Router();

userRouter.post('/sign-up', sanitizeInputs(), signUp);

export default userRouter;
