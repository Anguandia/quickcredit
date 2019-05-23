/* eslint-disable no-use-before-define */
/* eslint-disable linebreak-style */
/* eslint-disable func-names */
import { pool } from './db';

const check = function (req, res, next) {
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

export default check;
