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
        // to authJson method will call generate token
        res.status(201).json({status: 201, data: user.toAuthJson()});
        user.save();
    }
};

// get a list of all users
exports.user_list = function(){};

// handle signin post request
exports.signin = function(){};

// hanle signout post request
exports.signout = function(){};

// handle user update post request
exports.update = function(){};

// handle user deletion post request
exports.delete = function(){};

// display a particular user's profile page
exports.details = function(){};
