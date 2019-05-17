import express from 'express';
import {user_list, update, del, details} from '../controllers/userController';
import {auth} from '../utils/auth';

const router = express.Router();

/* GET users' listing. */
router.get('/', auth, user_list);

//post request for updating a user
router.patch('/:email/verify', auth, update);

//post request for deleting a user
router.delete('/:email', auth, del);

//route to display a particular user's details
router.get('/:email', auth, details);

export default router;
