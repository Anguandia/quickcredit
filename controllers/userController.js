/* eslint-disable comma-dangle */
/* eslint-disable linebreak-style */
import { pool } from '../utils/db';
import { User } from '../models/user';

const listQuery = 'select * from users';

// handle post request for signup
export const signup = function signup(req, res) {
  const data = req.body;
  const user = new User();// create skeleton user object
  Object.assign(user, data); // update properties fron request data
  user.setPassword(data.password);
  user.token = user.generateToken();
  const query = `INSERT INTO users(
    firstname, lastname, email, hash, salt, status, tel, token, isadmin)
    VALUES('${user.firstname}', '${user.lastname}', '${user.email}', '${user.hash}',
    '${user.salt}', '${user.status}', '${user.tel}', '${user.token}', ${user.isadmin})`;

  pool.connect((error, client) => {
    client.query(query, (err) => {
      // done();
      if (err) {
        console.log(err);
        res.status(500).json({ status: 500, error: 'internal error' });
      } else {
        // to authJson method will call generate token
        res.status(201).json({ status: 201, data: user.toAuthJson() });
      }
    });
  });
};

// handle signin post request
export const signin = function signin(req, res) {
  /** check if user exista, if so, validate paswwors and generate token
     * or return appropriate response
     */
  pool.connect((error, client) => {
    client.query(`SELECT * FROM users WHERE email='${req.body.email}'`, (err, found) => {
      if (err) {
        res.status(500).json({ status: 400, error: 'internal error' });
      } else if (found.rows.length == 0) {
        res.status(404).json({ status: 404, error: 'user does not exist' });
      } else {
        const data = found.rows[0];
        let user = new User();
        user.id = data.id;
        Object.assign(user, data);
        if (user.validatePassword(req.body.password)) {
          // extract challenge document specified fields for response
          res.status(200).json({ status: 200, data: user.toAuthJson() });
        } else {
          res.status(401).json({ error: 'Wrong password' });
        }
      }
    });
  });
};

// handle user update post request
export const update = function update(req, res) {
  const data = req.body;
  const verify = `UPDATE users SET status='${req.body.status}' WHERE email='${req.params.email}'`;
  const check = `SELECT * FROM users WHERE email='${req.params.email}'`;
  if (['verified', 'unverified'].includes(data.status)) {
    pool.connect((error, client) => {
      client.query(verify, (err, resp) => {
        if (err) {
          res.status(500).json({ status: 500, error: 'internal error' });
        }
        client.query(check, (err, result) => {
          const user = result.rows[0];
          // filter out properties unwanted in the response
          const filtered = {
            email: user.email,
            firstName: user.firstname,
            lastName: user.lastname,
            address: user.address,
            status: user.status,
          };
          res.status(200).json({ status: 200, data: filtered });
        });
      });
    });
  } else {
    res.status(400).json({ status: 400, error: 'invalid status' });
  }
};

// get a list of all users
export const userList = function userList(req, res) {
  if (!['unverified', 'verified', undefined].includes(req.query.status)) {
    res.status(400).json({ status: 400, error: 'invalid value for query parameter status' });
  }
  const query = req.query.status ? `SELECT * FROM users WHERE status='${req.query.status}'` : listQuery;
  pool.connect((err, client) => {
    client.query(query, (error, result) => {
      if (error) {
        res.status(400).json({ error });
      } else {
        res.status(200).json({ status: 200, data: result.rows });
      }
    });
  });
};


// hanle signout post request
export const signout = function signout() {};


// handle user deletion post request
export const del = function del(req, res) {
  const user = users.find(target => target.email === req.params.email);
  if (!user) {
    res.status(404).json({ status: 404, error: 'user does not exist' });
  } else {
    res.status(200).json({ status: 200, data: { id: user.id, msg: `user ${`${user.firstName} ${user.lastName}`} deleted` } });
  }
};

// display a particular user's profile page
export const details = function details(req, res) {
  pool.connect((err, client) => {
    client.query(`SELECT * FROM users WHERE email='${req.params.email}'`, (error, user) => {
      if (error) {
        res.status(500).json({ error });
      } else if (user.rowCount === 0) {
        res.status(404).json({ status: 404, error: `user with email ${req.params.email} does not exist` });
      } else {
        // filter out undisplay-worthy properties of user by estructuring
        // const {hash, salt, ...filtered} = user;
        res.status(200).json({ status: 200, data: user.rows[0] });
      }
    });
  });
};
