// import record object field specs and required listings
import {signin, signup, verify, specs} from '../models/user';
import {loanspecs, loan as apply, approve, payment as repayment} from '../models/loan';


function validateEmail(email, next){
    let re = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    return re.test(email);
}

export const validate = function(req, res, next){
    let must = required(req);
    let resp;
    let vali = validateType(req);
    for(let val of must){
        if(!(val in req.body)){
            resp = {status: 400, error: `${val} missing`};
        } else if(req.body[val]==''){
            resp = {status: 400, error: `${val} required`};
        } else if(vali){
            resp = {status: 400, error: vali};
        } else if(val==='email' && !validateEmail(req.body[val])){
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
    let resp;
    let spec;
    const patterns = [/signup/, /signin/, /verify/];
    spec =  patterns.some((pat) => pat.test(req.url))?specs: loanspecs;
    for(let key in req.body){
        if(!(Object.keys(spec).includes(key))){
            resp += `, unknown field ${key}`;
        }
        else if(spec[key]=='Float'){
            if(parseFloat(req.body[key])===NaN){
                resp += `, ${key} should be a float`;
            }
        }
        else if(spec[key] =='Integer' && parseInt(req.body[key])==NaN){
            resp += `, ${key} should be an integer`;
        }
        else if(spec[key]=='string' && typeof(req.body[key]) !== 'string'){
            resp += `, ${key} should be a ${spec[key]}`;
        }
        else {
            resp = '';
        }
    }
    return resp;
    // if(resp){
    //     // clean error output
    // }
}
