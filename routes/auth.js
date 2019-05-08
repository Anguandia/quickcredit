// any route that caries an access token in the request or response body is considered an authentication route while in the headers only, an authenticated/protected route

const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/userController');

// post request for creating a user
router.post('/signup', user_controller.signup);

// post request for user signin
router.post('/signin', user_controller.signin);

// post request user signout
router.post('/signout', user_controller.signout);

module.exports = router;
