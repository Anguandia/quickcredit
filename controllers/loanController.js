/* eslint-disable no-unneeded-ternary */
/* eslint-disable linebreak-style */
/* eslint-disable eqeqeq */
/* eslint-disable linebreak-style */
/* eslint-disable linebreak-style */
import loans from '../models/loans';
import { Loan } from '../models/loan';
import Repayment from '../models/repayment';
import repayments from '../models/repayments';
import { pool } from '../utils/db';

// create loan
export const create = function create(req, res) {
  const loan = new Loan();
  Object.assign(loan, req.body);
  console.log(loan);
  const checkLoan = `SELECT * FROM loans WHERE email=${req.body.email}`;
  const query = `INSERT INTO loans(email, amount, tenor, interest, balance, paymentinstallment, createdon, status, repaid) VALUES('${loan.email}', ${parseFloat(loan.amount)}, '${parseInt(loan.tenor)}', '${parseFloat(loan.interest)}', '${parseFloat(loan.balance)}', '${parseFloat(loan.paymentInstallment)}', '${loan.createdOn}', '${loan.status}', ${loan.repaid})`;
  pool.connect((error, client) => {
    client.query(query, (err) => {
      if (err) {
        // console.log(err);
        res.status(500).json({ status: 500, error: 'internal error' });
      } else {
        res.status(201).json({ status: 201, data: loan.toLoanJson() });
      }
    });
  });
};

// get all, current or repaid loans
export const list = function list(req, res) {
  const selection = 'SELECT * FROM loans';
  pool.connect((error, client) => {
    client.query(selection, (err, result) => {
      if (err) {
        res.status(500).json({ status: 500, error: 'internal error' });
      }
      res.status(200).json({ status: 200, data: result.rows });
    });
  });
};

// get specific loan details
export const detail = function detail(req, res) {
  pool.connect((err, client) => {
    client.query(`SELECT * FROM loans WHERE id=${req.params.loanId}`, (error, loan) => {
      if (error) {
        res.status(500).json({ status: 500, error: 'internal error' });
      }
      res.status(200).json({ status: 200, data: loan.rows[0] });
    });
  });
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
