import { Router } from 'express';

import { getUserBalance } from '../controllers/accountController.js';
import validateToken from '../middlewares/validateToken.js';

const accountRouter = Router();

accountRouter.get('/balance', validateToken, getUserBalance);

export default accountRouter;
