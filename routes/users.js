import express from 'express';
import {user_list, update, del, details} from '../controllers/userController';

const router = express.Router();

/* GET users' listing. */
router.get('/', user_list);

//post request for updating a user
router.patch('/:email/verify', update);

//post request for deleting a user
router.delete('/:email', del);

//route to display a particular user's details
router.get('/:email', details);

export default router;
