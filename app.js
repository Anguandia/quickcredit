import express from 'express';
import logger from 'morgan';

import indexRouter from './routes/index';
import usersRouter from './routes/users';
import loansRouter from './routes/loans';
import authRouter from './routes/auth';

const port=process.env.PORT || 3000;

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/loans', loansRouter);
app.use('/api/v1/auth', authRouter);

app.listen(port, ()=>{
    console.log(`running Anguandia quick-credit on ${port}`);
});

export default app;
