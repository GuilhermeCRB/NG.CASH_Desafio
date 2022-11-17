import { Router } from 'express';

import { signUp } from '../controllers/userController.js';
import { isUsernamelUnique } from '../middlewares/isUsernameUnique.js';
import { sanitizeInputs } from '../middlewares/sanitizeInputs.js';
import { validateSchema } from '../middlewares/validateSchema.js';
import userSchema from '../schemas/userSchema.js';

const userRouter = Router();

userRouter.post('/sign-up', sanitizeInputs(), validateSchema(userSchema), isUsernamelUnique, signUp);

export default userRouter;
