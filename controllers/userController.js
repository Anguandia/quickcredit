const users = require('../models/users');
const User = require('../models/user').User;

// handle post request for signup
exports.signup = function(req, res){
    let data = req.body;
    let user = new User();// create skeleton user object
    Object.assign(user, data); // update properties fron request data
    if(users.find(target => target.email===user.email)){
        // check if user already in system
        res.status(400).json(
            {status: 400, error: `Account '${user.email}' exists, please signin`}
            );
    } else {
        user.setPassword(data.password);
        let format = user.toAuthJson();
        delete format.password;
        // to authJson method will call generate token
        res.status(201).json({status: 201, data: format});
        user.save();
    }
};

// handle signin post request
exports.signin = function(req, res){
    /**check if user exista, if so, validate paswwors and generate token
     * or return appropriate response
     */
    let user = users.find(target => target.email === req.body.email);
    if(!user){
        res.status(404).json({status: 404, error: 'user not found'});
    } else if(user.validatePassword(req.body.password)){
        // extract challenge document specified fields for response
        let format = user.toAuthJson();
        delete format.password;
        res.status(200).json({status: 200, data: format});
    } else {
        res.status(401).json({error: 'Wrong password'});
    }
};

// handle user update post request
exports.update = function(req, res){
    let data = req.body;
    let user = users.find((target) => target.email === req.params.email);
    if(!user){
        res.status(404).json({status: 404, error: 'User not found'});
    } else if(['verified', 'unverified'].includes(data.status)){
        Object.assign(user, {status: data.status});
        // filter out properties unwanted in the response
        let filtered = {
            email:user.email, firstName:user.firstName,
            lastName:user.lastName, password:user.password,
            address:user.address, status:user.status
        };
        res.status(200).json({status: 200, data: filtered});
    } else {
        res.status(400).json({error: 'invalid status'});
    }
};

// get a list of all users
exports.user_list = function(){};


// hanle signout post request
exports.signout = function(){};


// handle user deletion post request
exports.delete = function(){};

// display a particular user's profile page
exports.details = function(){};
