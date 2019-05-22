/* eslint-disable linebreak-style */
/* eslint-disable func-names */
import pool from './db';

const check = function (req, res, next) {
  let query;
  let error;
  if (req.params) {
    const param = Object.keys(req.params)[0];
    const value = req.params[param];
    if (req.params.loanId) {
      query = `SELECT * FROM loans WHERE id=${value}`;
    } else {
      query = `SELECT * FROM users WHERE userEmail=${value}`;
    }
  } else if (req.url == '/loans') {
    query = `SELECT * FROM loans WHERE id=${req.body.loanId}`;
  } else {
    query = `SELECT * FROM users WHERE email=${req.body.email}`;
  }
  pool.connect((err, client, done) => {
    client.query(query, (target) => {
      done();
      if (target.rows.length === 0) {
        error = 'target not found';
      }
    });
  });
  if (req.url == '/signup' || req.url == '/loans') {
    res.status = 403;
  } else {
    res.status = 404;
  }
  if (error) {
    res.json({ error });
  } else {
    next();
  }
};

export default check;
