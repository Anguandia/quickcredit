import express from 'express';
import {create, repay, approve, detail, list, log} from '../controllers/loanController';
import {validate} from '../utils/validation';

const router = express.Router();

// post request for creating a loan
router.post('/', validate, create);

// post request for loan repayment
router.post('/:loanId/repayment', validate, repay);

// approve or reject a loan application
router.patch('/:loanId', validate, approve);

// get a specific loan
router.get('/:loanId', detail);

// get all loan applications
router.get('/', list);

// get a specific loan's repayment history
router.get('/:loanId/repayments', log);

export default router;
