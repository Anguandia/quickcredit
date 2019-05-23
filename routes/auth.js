/* eslint-disable linebreak-style */
/* any route that caries an access token in the request or response body
isconsidered an authentication route while in the headers only, an
authenticated/protected route
*/

import express from 'express';
import { signup, signin, signout } from '../controllers/userController';
import validate from '../utils/validation';
import availability from '../utils/availability';

const router = express.Router();

// post request for creating a user
router.post('/signup', validate, availability, signup);

// post request for user signin
router.post('/signin', validate, signin);

// post request user signout
router.post('/signout', signout);

export default router;
