/* eslint-disable no-unneeded-ternary */
/* eslint-disable linebreak-style */
/* eslint-disable eqeqeq */
/* eslint-disable linebreak-style */
/* eslint-disable linebreak-style */
import loans from '../models/loans';
import { Loan } from '../models/loan';
import Repayment from '../models/repayment';
import repayments from '../models/repayments';

// create loan
export const create = function create(req, res) {
  const loan = new Loan();
  Object.assign(loan, req.body);
  // check if requesting client has a current loan
  const existing = loans.find(one => one.user === loan.user && one.status !== 'repaid');
  if (existing) {
    res.status(403).json({ status: 403, error: 'you have a running loan' });
  } else {
    loan.save();
    res.status(201).json({ status: 201, data: loan.toLoanJson() });
  }
};

// get all, current or repaid loans
export const list = function list(req, res) {
  let selection;
  if (req.query.status) {
    // convert string status representation in query to boolean
    const repaid = req.query.repaid === 'true' ? true : false;
    selection = loans.filter(one => one.status === req.query.status && one.repaid === repaid);
  } else {
    selection = loans;
  }
  res.status(200).json({ status: 200, data: selection.map(loan => loan.toLoanJson()) });
};

// get specific loan details
export const detail = function detail(req, res) {
  const loan = loans.find(one => one.id == req.params.loanId);
  if (!loan) {
    res.status(404).json({ status: 404, error: `loan with id ${req.params.loanId} does not exist` });
  } else {
    res.status(200).json({ status: 200, data: loan.toLoanJson() });
  }
};

// approve a loan
export const approve = function approve(req, res) {
  const loan = loans.find(one => one.id == req.params.loanId);
  if (!loan) {
    res.status(404).json({ status: 404, error: `no loan with id ${req.params.loanId}` });
  } else if (['approved', 'rejected'].includes(req.body.status)) {
    // update if status value valid
    const fields = ['id', 'amount', 'tenor', 'status', 'paymentInstallment', 'interest'];
    loan.approve(req.body.status);
    res.status(200).json({ status: 200, data: loan.filterRepr(fields) });
  } else {
    res.status(400).json({ status: 400, error: 'invalid status' });
  }
};

// post a repayment installment
export const repay = function repay(req, res) {
  const loan = loans.find(one => one.id == req.params.loanId);
  if (!loan) {
    res.status(404).json({ status: 404, error: `no loan with id ${req.params.loanId}` });
  } else if (loan.status != 'approved') {
    res.status(403).json({ status: 403, error: 'loan not approved' });
  } else if (loan.repaid === true) {
    res.status(403).json({ status: 403, error: 'loan already fully serviced!' });
  } else {
    const repayment = new Repayment();
    Object.assign(repayment, { amount: req.body.amount, loanId: req.params.loanId });
    repayment.updateLoan(loan);
    repayment.save();
    res.status(201).json({ status: 201, data: repayment.toRepaymentJson() });
  }
};

// get repaymnt history
export const log = function log(req, res) {
  if (!loans.find(one => one.id == req.params.loanId)) {
    res.status(404).json({ status: 404, error: `loan ${req.params.loanId} not found` });
  } else {
    const hist = repayments.filter(rep => rep.loanId === req.params.loanId);
    const keys = ['loanId', 'createdOn', 'monthlyInstallment', 'amount'];
    const out = hist.map(one => one.filterRepr(keys));
    res.status(200).json({ status: 200, data: out });
  }
};
