/* eslint-disable linebreak-style */
import express from 'express';
import {
  create, repay, approve, detail, list, log,
} from '../controllers/loanController';
import validate from '../utils/validation';
import auth from '../utils/auth';
import { loanNot } from '../utils/availability';

const router = express.Router();

// post request for creating a loan
router.post('/', loanNot, validate, create);

// post request for loan repayment
router.post('/:loanId/repayment', loanNot, validate, repay);

// approve or reject a loan application
router.patch('/:loanId', validate, loanNot, approve);

// get a specific loan
router.get('/:loanId', loanNot, detail);

// get all loan applications
router.get('/', list);

// get a specific loan's repayment history
router.get('/:loanId/repayments', loanNot, log);

export default router;
