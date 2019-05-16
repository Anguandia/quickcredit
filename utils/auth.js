import users from '../models/users';
import { validate } from './validation';

export const auth = (req, res, next) => {
    let resp;
    if(req.headers.authorization){
        // get token from header
        let token = req.headers.authorization.split(' ')[1];
        // decode the token
        let base64Url = token.split('.')[1];
        let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        let buff = new Buffer.from(base64, 'base64');
        let payloadinit = buff.toString('ascii');
        let payload = JSON.parse(payloadinit);
        // case valid token format
        if(payload.id){
            // map token to user
            let user = users.find(usr => usr.id == payload.id);
            // get route permissions
            let access = checkPermission(req);
            if(!user){
            } else if(access=='admin' && user.isAdmin == false){
                resp = 'this resource requires admin access';
                // protected resources identified by id, so match token owner to request url id
            } else if(access=='owner' && !user.id.test(req.url)){
                resp = "this resource requires the owner's access";
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
    if(resp){
        res.status(401).json({status: 401, error: resp});
    } else {
        next();
    }
};

function checkPermission(req){
    // define url patterns for admin only routes
    const admin = [/repayment/, /verify/, /\/\\d/];
    // patterns for resource owner routes
    const owner = [/repayments/];
    let permission = admin.some(ad => ad.test(req.url))?'admin': owner.some(own => own.test(req.url))?'owner': 'general';
    return permission;
}

// exports.authAdmin = function(req, res, next){
//     let id = auth(req);
//     if(typeof(id)=='object'){
//         id[1].isAdmin == false?res.status(401).json({status: 401,error: 'requires admin'}): next();
//     }
//     else {
//         res.status(401).json({status: 401, error: id});
//     }
// };

// exports.authOwner = function(req, res, next){
//     let id = auth(req);
//     if(typeof(id)=='object'){
//         (id[1]._id != id[0] || !id[1].isAdmin)?res.status(401).json({status: 401,error: 'requires owner'}): next();
//     }
//     else {
//         res.status(401).json({status: 401, error: id});
//     }
// };
