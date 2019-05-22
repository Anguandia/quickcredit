/* eslint-disable linebreak-style */
import express from 'express';
import logger from 'morgan';
import dotenv from 'dotenv';

import indexRouter from './routes/index';
import usersRouter from './routes/users';
import loansRouter from './routes/loans';
import authRouter from './routes/auth';
import config from './config';

dotenv.config();
const { port } = config;
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/loans', loansRouter);
app.use('/api/v1/auth', authRouter);

app.listen(port, () => {
  console.log(`quickcredit running on ${port}`);
});

export default app;
