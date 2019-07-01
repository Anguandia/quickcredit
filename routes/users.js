/* eslint-disable linebreak-style */
import express from 'express';
import {
  userList, update, del, details,
} from '../controllers/userController';
import auth from '../utils/auth';
import { userNot } from '../utils/availability';
import validate from '../utils/validation';


const router = express.Router();

/* GET users' listing. */
router.get('/', userList);

// post request for updating a user
router.patch('/:email/verify', userNot, validate, update);

// post request for up/down-grading a user to/from admin
router.patch('/:email/upgrade', userNot, validate, update);

// post request for deleting a user
router.delete('/:email', auth, del);

// route to display a particular user's details
router.get('/:email', details);

export default router;
