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
app.use('/users', usersRouter);
app.use('/loans', loansRouter);
app.use('/auth', authRouter);

module.exports = app;
