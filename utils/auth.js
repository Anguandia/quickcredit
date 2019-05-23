/* eslint-disable linebreak-style */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-return-assign */
/* eslint-disable eqeqeq */
/* eslint-disable new-cap */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import pool from './db';
import loans from '../models/loans';
import { validate } from './validation';

const auth = (req, res, next) => {
  let resp;
  if (req.headers.authorization) {
    // get token from header
    const token = req.headers.authorization.split(' ')[1];
    // decode the token
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const buff = new Buffer.from(base64, 'base64');
    const payloadinit = buff.toString('ascii');
    const payload = JSON.parse(payloadinit);
    // case valid token format
    if (payload.id) {
      // map token to user
      let user;
      pool.connect((error, client) => {
        client.query(`SELECT * FROM users WHERE id=${payload.id}`, (err, found) => {
          // eslint-disable-next-line prefer-destructuring
          user = found.rows[0];
        });
      });
      // get route permissions
      const access = checkPermission(req);
      if (!user) {
        resp = 'invalid token';
      } else if (access == 'admin' && user.isAdmin == false) {
        resp = 'this resource requires admin access';
        // protected resources identified by id, so match token owner to request url id
      } else if (access == 'owner') {
        const target = loans.find(one => one._id = req.params.loanId);
        if (target.user !== user.email) {
          resp = "this resource requires the owner's access";
        }
        // all checks passed, go to validate(if any) and execute the request
      } else {
        resp = '';
      }
    } else {
      resp = 'invalid token';
    }
  } else {
    resp = 'the resource you requested requires authorization, please login';
  }
  if (resp) {
    res.status(401).json({ status: 401, error: resp });
  } else {
    next();
  }
};

function checkPermission(req) {
  // define url patterns for admin only routes
  const admin = [/repayment/, /verify/, /\/\d/];
  // patterns for resource owner routes
  const owner = [/repayments/];
  const permission = owner.some(own => own.test(req.url)) ? 'owner' : admin.some(ad => ad.test(req.url)) ? 'admin' : 'general';
  return permission;
}

export default auth;
