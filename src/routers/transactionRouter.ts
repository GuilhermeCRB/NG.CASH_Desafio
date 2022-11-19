import { Router } from 'express';

import { makeUserTransaction } from '../controllers/transactionController.js';
import { sanitizeInputs } from '../middlewares/sanitizeInputs.js';
import { validateAccountAndSaveId } from '../middlewares/validateAccountAndSaveId.js';
import validateToken from '../middlewares/validateToken.js';

const transactionRouter = Router();

transactionRouter.post('/transactions', validateToken, sanitizeInputs, validateAccountAndSaveId, makeUserTransaction);

export default transactionRouter;
