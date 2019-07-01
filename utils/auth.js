/* eslint-disable linebreak-style */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-return-assign */
/* eslint-disable eqeqeq */
/* eslint-disable new-cap */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import { pool } from './db';
import loans from '../models/loans';
import { validate } from './validation';

const auth = (req, res, next) => {
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
    if (payload.email) {
      // map token to user
      pool.connect((error, client) => {
        client.query(`SELECT * FROM users WHERE email='${payload.email}'`, (err, found) => {
          if (err) {
            console.log(err);
          } else {
            // eslint-disable-next-line prefer-destructuring
            const user = found.rows[0];
            // get route permissions
            const access = checkPermission(req);
            if (!user) {
              res.status(401).json({error: 'invalid token'});
            } else if (access == 'admin' && !user.isadmin) {
              res.status(401).json({ error: 'this resource requires admin access'});
              // protected resources identified by id, so match token owner to request url id
            } else if (access == 'owner') {
              pool.connect((erro, client) => {
                client.query(`SELECT * FROM loans WHERE id='${req.params.loanId}'`, (err, found) => {
                  if (err) {
                    console.log(err);
                  } else {
                    // eslint-disable-next-line prefer-destructuring
                    const target = found.rows[0];
                    if (target.client !== user.email && !user.isadmin) {
                      res.status(401).json({status: 401, error: "this resource requires the owner's access"});
                    } else {
                      next();
                    }
                  }
                });
              });
              // all checks passed, go to validate(if any) and execute the request
            } else {
              next();
            }
          }
        });
      });
    } else {
      res.status(401).json({ status: 401, error: 'invalid user' })
    }
  } else {
    res.status(401).json({ error: 'the resource you requested requires authorization, please login'});
  }
}

function checkPermission(req) {
  // define url patterns for admin only routes
  const admin = [/repayment/, /verify/];
  // patterns for resource owner routes
  const owner = [/repayments/, /\/\d/];
  let permission;
  if (owner.some(own => own.test(req.url))) {
    permission = 'owner';
  }
  else if(admin.some(ad => ad.test(req.url))) {
    permission = 'admin';
  } else {
    permission = 'general';
  }
  return permission;
}

export default auth;
