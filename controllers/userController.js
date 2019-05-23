/* eslint-disable comma-dangle */
/* eslint-disable linebreak-style */
import { pool } from '../utils/db';
// import users from '../models/users';
import { User } from '../models/user';

const listQuery = 'select * from users';

// handle post request for signup
export const signup = function signup(req, res) {
  const data = req.body;
  const user = new User();// create skeleton user object
  Object.assign(user, data); // update properties fron request data
  user.setPassword(data.password);
  user.token = user.generateToken();
  // const userFields = '(firstName, lastName, email, hash, salt, status, tel, token, isAdmin)';
  const query = `INSERT INTO users(firstName, lastName, email, hash, salt, status, tel, token, isAdmin) VALUES('${user.firstName}', '${user.lastName}', '${user.email}', '${user.hash}', '${user.salt}', '${user.status}', '${user.tel}', '${user.token}', ${user.isAdmin})`;

  pool.connect((error, client) => {
    client.query(query, () => {
      // done();
      if (error) {
        res.status(500).json({ error });
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
      // done();
      if (err) {
        res.status(500).json({ status: 400, error: err });
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
  const user = users.find(target => target.email === req.params.email);
  if (!user) {
    res.status(404).json({ status: 404, error: 'User not found' });
  } else if (['verified', 'unverified'].includes(data.status)) {
    Object.assign(user, { status: data.status });
    // filter out properties unwanted in the response
    const filtered = {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      password: user.password,
      address: user.address,
      status: user.status,
    };
    res.status(200).json({ status: 200, data: filtered });
  } else {
    res.status(400).json({ error: 'invalid status' });
  }
};

// get a list of all users
export const userList = function userList(req, res) {
  pool.connect((err, client) => {
    client.query(listQuery, (error, result) => {
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
  const user = users.find(target => target.email === req.params.email);
  if (!user) {
    res.status(404).json({ status: 404, error: `user with email ${req.params.email} does not exist` });
  } else {
    // filter out undisplay-worthy properties of user by estructuring
    // const {hash, salt, ...filtered} = user;
    res.status(200).json({ status: 200, data: user });
  }
};
