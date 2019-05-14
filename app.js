const express = require('express');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const loansRouter = require('./routes/loans');
const authRouter = require('./routes/auth');

const port=process.env.PORT || 3000;

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/loans', loansRouter);
app.use('/api/v1/auth', authRouter);

module.exports = app;
