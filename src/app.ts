import "express-async-errors";
import express, { Application } from 'express';

import userRoutes from './routers/users.routers';

import { handleErrors } from './errors';

import loginRouter from "./routers/login.routers";

const app: Application = express();

app.use(express.json());

app.use('/users', userRoutes);
app.use('/login', loginRouter);


app.use(handleErrors);

export default app

// "test": "cross-env NODE_ENV=test SECRET_KEY=chavesecreta jest --forceExit --runInBand",



