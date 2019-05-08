const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/userController');

/* GET users' listing. */
router.get('/', user_controller.user_list);

//post request for updating a user
router.patch('/:email/verify', user_controller.update);

//post request for deleting a user
router.delete('/:email', user_controller.delete);

//route to display a particular user's details
router.get('/:email', user_controller.details);

module.exports = router;
