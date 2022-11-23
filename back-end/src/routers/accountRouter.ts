import { Router } from 'express';

import { getUserBalance } from '../controllers/accountController.js';
import { validateAndSaveAccount } from '../middlewares/validateAndSaveAccount.js';
import validateToken from '../middlewares/validateToken.js';

const accountRouter = Router();

accountRouter.get('/balance', validateToken, validateAndSaveAccount, getUserBalance);

export default accountRouter;
