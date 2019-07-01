/* eslint-disable linebreak-style */
/* eslint-disable radix */
/* eslint-disable no-underscore-dangle */
import encrypt from 'crypto';
import token from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const { SECRETE } = process.env;

export const User = class User {
  constructor(firstname, lastname, email, password, hash, salt,
    isadmin = false, status = 'unverified', tel = '') {
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.hash = hash;
    this.salt = salt;
    this.isadmin = isadmin;
    this.status = status;
    this.tel = tel;
    this._id = User.counter;
  }

  get id() {
    return this._id;
  }

  set id(id) {
    this._id = id;
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
    }, SECRETE);
  }

  // return json representation of user
  toAuthJson() {
    return {
      token: this.generateToken(),
      id: this.id,
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      isadmin: this.isadmin,
    };
  }
};

// define and export valid user property specifications to be validated against
export const specs = {
  id: 'integer',
  email: 'string',
  firstname: 'string',
  lastname: 'string',
  password: 'string',
  confirm: 'string',
  address: 'string',
  status: 'string',
  isadmin: 'boolean',
  tel: 'number',
};

// declare and export required user fields for given routes for use in validation
export const signup = [
  'email', 'firstname', 'lastname', 'password', 'address',
];

export const signin = [
  'email', 'password',
];

export const verify = [
  'status',
];

export const upgrade = [
  'isadmin',
];
