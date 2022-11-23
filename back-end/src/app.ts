import express, { json } from 'express';
import cors from 'cors';
import 'express-async-errors';

import { errorHandlerMiddleware } from './middlewares/errorHandlerMiddleware.js';
import router from './routers/router.js';

const app = express();

app.use(cors());
app.use(json());
app.use(router);
app.use(errorHandlerMiddleware);

export default app;
