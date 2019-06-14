/* eslint-disable linebreak-style */
/* eslint-disable comma-dangle */
/* eslint-disable eqeqeq */
/* eslint-disable radix */
/* eslint-disable use-isnan */
/* eslint-disable prefer-const */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
// import record object field specs and required listings
import {
  signin, signup, verify, specs
} from '../models/user';
import {
  loanspecs, loan as apply, approve, payment as repayment
} from '../models/loan';


function validateEmail(email, next) {
  const re = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  return re.test(email);
}

const validate = function validate(req, res, next) {
  const must = required(req);
  console.log('validating', must);
  let resp = [];
  const vali = validateType(req);
  for (const val of must) {
    if (!(val in req.body)) {
      resp.push(`${val} key missing`);
    } else if (req.body[val] === '') {
      resp.push(`value for ${val} required`);
    } else if (vali) {
      resp.push(vali);
    }
  } if (req.body.email && !validateEmail(req.body.email)) {
    resp.push('invalid email');
  }
  if (resp[0]) {
    console.log(resp);
    res.status(400).json({ status: 400, error: resp.join(', ') });
  } else {
    next();
  }
};

function required(req) {
  // check url to get the route's required field's list
  let res = '';
  if (req.url == '/signup') {
    res = signup;
  } else if (req.url == '/signin') {
    res = signin;
  } else if (/verify/.test(req.url)) {
    res = verify;
  } else if (req.url == '/') {
    res = apply;
  } else if (req.url.match(/\/\d/) && req.method == 'PATCH') {
    res = approve;
  } else {
    res = repayment;
  }
  return res;
}

function validateType(req) {
  console.log('validate type', req.body);
// only validate user supplied input, date and boolean input for
//   createdOn and repaid values are system generated and therefor
// not prone to user errors
  let resp = '';
  const patterns = [/signup/, /signin/, /verify/];
  const spec = patterns.some(pat => pat.test(req.url)) ? specs : loanspecs;
  // eslint-disable-next-line guard-for-in
  for (const key in req.body) {
    if (!(Object.keys(spec).includes(key))) {
      resp += `, unknown field ${key}`;
    // } else if (!req.body[key]) {
    //   resp += `, please supply a value for ${key}`;
    } else if (spec[key] == 'Float' && !parseFloat(req.body[key])) {
      // if (parseFloat(req.body[key]) != req.body[key]) {
      resp += `, ${key} should be a float`;
      // }
    } else if (spec[key] == 'Integer' && parseInt(req.body[key]) !== req.body[key]) {
      resp += `, ${key} should be an integer`;
    } else if (spec[key] == 'string' && typeof (req.body[key]) !== 'string') {
      resp += `, ${key} should be a ${spec[key]}`;
    } else {
      resp = '';
    }
  }
  return resp.slice(2);
}

export default validate;
