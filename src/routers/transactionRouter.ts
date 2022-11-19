import { Router } from 'express';

import { makeUserTransaction } from '../controllers/transactionController.js';
import { sanitizeInputs } from '../middlewares/sanitizeInputs.js';
import { validateAndSaveAccount } from '../middlewares/validateAndSaveAccount.js';
import validateToken from '../middlewares/validateToken.js';

const transactionRouter = Router();

transactionRouter.post('/transactions', validateToken, sanitizeInputs, validateAndSaveAccount, makeUserTransaction);

export default transactionRouter;
