// import record object field specs and required listings
const user = require('../models/user');
const loan = require('../models/loan');

// assign required lists to routes
const signin = user.signin;
const signup = user.signup;
const verify = user.verify;
const apply = loan.loan;
const repayment = loan.payment;
const approve = loan.approve;

function validateEmail(email, next){
    let re = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    return re.test(email);
}

exports.validate = function(req, res, next){
    let must = required(req);
    console.log(must);
    let resp;
    for(let i=0; i<must.length; i++){
        if(!(must[i] in req.body)){
            resp = {status: 400, error: `${must[i]} missing`};
        } else if(req.body[must[i]]==''){
            resp = {status: 400, error: `${must[i]} required`};
        } else if(validateType(req)){
            resp = {status: 400, error: validateType(req, res)};
        } else if(must[i]==='email' && !validateEmail(req.body[must[i]])){
            resp = {status: 400, error: 'invalid email'};
        }
    }
    if(resp){
        res.status(400).json(resp);
    } else {
        next();
    }
};

function required(req){
    // check url to get the route's required field's list
    let res = '';
    if(req.url == '/signup'){
        res = signup;
    } else if(req.url == '/signin'){
        res = signin;
    } else if(req.url == '/:email/verify'){
        res = verify;
    } else if(req.url == '/'){
        res = apply;
    } else if(req.url.match(/\/\d/) && req.method == 'PATCH'){
        res = approve;
    } else {
        res = repayment;
    }
    return res;
}

function validateType(req){
    // only validate user supplied input, date and boolean input for createdOn and repaid values are system generated and therefor not prone to user errors
    let resp = '', specs;
    let patterns = [/signup/, /signin/, /verify/];
    specs =  patterns.some((pat) => pat.test(req.url))?user.specs: loan.specs;
    for(let key in req.body){
        if(!(Object.keys(specs).includes(key))){
            resp += `, unknown field ${key}`;
        }
        else if(specs.key=='Float' && !parseFloat(req.body.key)){
            resp += `, ${key} should be a float`;
        }
        else if(specs.key =='Integer' && !parseInt(req.body.key)){
            resp += `, ${key} should be an integer`;
        }
        else if(specs.key=='string' && typeof(req.body.key) !== 'string'){
            resp += `, ${key} should be a ${specs[key]}`;
        }
        else {
            resp = '';
        }
    }
    if(resp){
        // clean error output
        return resp.slice(2);
    }
}
