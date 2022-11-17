import { Router } from 'express';

import { signUp } from '../controllers/userController.js';
import { sanitizeInputs } from '../middlewares/sanitizeInputs.js';
import { validateSchema } from '../middlewares/validateSchema.js';
import userSchema from '../schemas/userSchema.js';

const userRouter = Router();

userRouter.post('/sign-up', sanitizeInputs(), validateSchema(userSchema), signUp);

export default userRouter;
