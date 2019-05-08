const express = require('express');
const router = express.Router();
const loan_controller = require('../controllers/loanController');

// post request for creating a loan
router.post('/', loan_controller.create);

// post request for loan repayment
router.post('/:loanId/repayment', loan_controller.repay);

// approve or reject a loan application
router.patch('/:loanId', loan_controller.approve);

// get a specific loan
router.get('/:loanId', loan_controller.detail);

// get all loan applications
router.get('/', loan_controller.list);

// get a specific loan's repayment history
router.get('/:loanId/repayments', loan_controller.log);

module.exports = router;
