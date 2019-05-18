/* eslint-disable linebreak-style */
/* eslint-disable radix */
/* eslint-disable no-underscore-dangle */
import encrypt from 'crypto';
import token from 'jsonwebtoken';
import users from './users';

export const User = class User {
  constructor(firstName, lastName, email, password, hash, salt,
    isAdmin = false, status = 'unverified', tel = '') {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.hash = hash;
    this.salt = salt;
    this.isAdmin = isAdmin;
    this.status = status;
    this.tel = tel;
    this._id = User.counter;
  }

  get id() {
    return this._id;
  }

  // initialize the class instance counter
  static get counter() {
    User._counter = (User._counter || 0) + 1;
    return User._counter;
  }

  // hash password
  setPassword(password) {
    this.salt = encrypt.randomBytes(16).toString('hex');
    this.hash = encrypt.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  }

  // validate password
  validatePassword(password) {
    const hash = encrypt.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
  }

  // generate token
  generateToken() {
    const now = new Date();
    const exp = new Date(now);
    exp.setMinutes(now.getMinutes() + 10);
    return token.sign({
      id: this.id,
      email: this.email,
      exp: parseInt(exp.getTime() / 1000),
    }, 'secret');
  }

  // push user object to users' array
  save() {
    users.push(this);
  }

  // return json representation of user
  toAuthJson() {
    return {
      id: this.id,
      token: this.generateToken(),
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.hash,
    };
  }
};

// define and export valid user property specifications to be validated against
export const specs = {
  id: 'integer',
  email: 'string',
  firstName: 'string',
  lastName: 'string',
  password: 'string',
  address: 'string',
  status: 'string',
  isAdmin: 'boolean',
  tel: 'number',
  username: 'string',
};

// declare and export required user fields for given routes for use in validation
export const signup = [
  'email', 'firstName', 'lastName', 'password', 'address',
];

export const signin = [
  'email', 'password',
];

export const verify = [
  'email', 'status',
];
