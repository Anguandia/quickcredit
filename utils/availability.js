/* eslint-disable no-use-before-define */
/* eslint-disable linebreak-style */
/* eslint-disable func-names */
import { pool } from './db';

export const check = function (req, res, next) {
  if (req.url == '/signup') {
    signup(req, res, next);
  }
};

function signup(req, res, next) {
  pool.connect((error, client) => {
    client.query(`SELECT * FROM users WHERE email='${req.body.email}'`, (err, result) => {
      if (err) {
        res.status(500).json(error);
      } else if (result.rows.length > 0) {
        res.status(403).json({ status: 403, error: 'user exists' });
      } else {
        next();
      }
    });
  });
}

export const userNot = function (req, res, next) {
  pool.connect((error, client) => {
    client.query(`SELECT * FROM users WHERE email='${req.body.email}'`, (err, result) => {
      if (err) {
        res.status(500).json({ status: 500, error: 'internal error' });
      } else if (result.rows.length === 0) {
        res.status(404).json({ status: 404, error: 'user does not exists' });
      } else {
        next();
      }
    });
  });
};

export const loanNot = function (req, res, next) {
  const key = req.params.loanId ? req.params.loanId : req.body.email;
  const field = req.params.loanId ? 'id' : 'email';
  pool.connect((error, client) => {
    client.query(`SELECT * FROM loans WHERE ${field}='${key}'`, (err, result) => {
      if (err) {
        res.status(500).json({ status: 500, error: 'internal error' });
      } else if (result.rows.length > 0 && field == 'email') {
        res.status(400).json({ status: 400, error: 'you have a running loan' });
      } else if (result.rows.length === 0 && field == 'id') {
        res.status(404).json({ status: 404, error: 'loan doesn not exist' });
      } else {
        next();
      }
    });
  });
};
