import express from 'express';
import {create, repay, approve, detail, list, log} from '../controllers/loanController';
import {validate} from '../utils/validation';
import {auth} from '../utils/auth';

const router = express.Router();

// post request for creating a loan
router.post('/', auth, validate, create);

// post request for loan repayment
router.post('/:loanId/repayment', auth, validate, repay);

// approve or reject a loan application
router.patch('/:loanId', auth, validate, approve);

// get a specific loan
router.get('/:loanId', auth, detail);

// get all loan applications
router.get('/', auth, list);

// get a specific loan's repayment history
router.get('/:loanId/repayments', auth, log);

export default router;
