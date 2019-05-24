/* eslint-disable no-param-reassign */
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
  let selection;
  if (!['pending', 'approved', 'rejected', 'repaid', undefined].includes(req.query.status)) {
    res.status(400).json({ status: 400, error: 'invalid value for query parameter status' });
  } else if (!['true', 'false', undefined].includes(req.query.repaid)) {
    res.status(400).json({ status: 400, error: 'invalid value for query parameter repaid' });
  } else if (Object.keys(req.query).includes('status' && 'repaid')) {
    selection = `SELECT * FROM loans WHERE status='${req.query.status}' AND repaid='${req.query.repaid}'`;
  } else if (Object.keys(req.query).includes('status')) {
    selection = `SELECT * FROM loans WHERE status='${req.query.status}'`;
  } else {
    selection = 'SELECT * FROM loans';
  }
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
  pool.connect((error, client) => {
    client.query(`SELECT * FROM loans WHERE id=${req.params.loanId}`, (err, target) => {
      if (err) {
        res.status(500).json({ status: 500, error: 'internal error' });
      } else if (!['approved', 'rejected'].includes(req.body.status.toLowerCase())) {
        res.status(400).json({ status: 400, error: 'invalid status' });
      } else {
        const loan = new Loan();
        Object.assign(loan, target.rows[0]);
        // update if status value valid
        loan.approve(req.body.status);
        loan.setPaymentInstallment();
        client.query(`UPDATE loans SET status='${loan.status}'`, (errr) => {
          if (errr) {
            res.status(500).json({ status: 500, error: 'internal error' });
          } else {
            const fields = ['id', 'amount', 'balance', 'tenor', 'status', 'paymentinstallment', 'interest'];
            res.status(200).json({ status: 200, data: loan.filterRepr(fields) });
          }
        });
      }
    });
  });
};

// post a repayment installment
export const repay = function repay(req, res) {
  pool.connect((error, client) => {
    client.query(`SELECT * FROM loans WHERE id=${req.params.loanId}`, (err, result) => {
      const target = result.rows[0];
      const loan = new Loan();
      Object.assign(loan, target);
      if (loan.status != 'approved') {
        res.status(400).json({ status: 400, error: 'loan not approved' });
      } else if (loan.repaid === true) {
        res.status(400).json({ status: 400, error: 'loan already fully serviced!' });
      } else {
        const repayment = new Repayment();
        Object.assign(repayment, { amount: req.body.amount, loanId: req.params.loanId });
        repayment.updateLoan(loan);
        client.query(`UPDATE loans SET(status, repaid, balance) VALUES('${loan.status}', ${loan.repaid}, ${loan.balance})`);
        client.query(`INSERT INTO repayments(loanid, createdon, amount, monthlyinstallment, paidamount, balance) VALUES(${repayment.loanid}, ${repayment.createdon}, ${repayment.amount}, ${repayment.monthlyinstallment}), ${repayment.paidamount}, ${repayment.balance}`);
        res.status(201).json({ status: 201, data: repayment.toRepaymentJson() });
      }
    });
  });
};

// get repaymnt history
export const log = function log(req, res) {
  pool.connect((error, client) => {
    client.query(`SELECT * FROM repayments WHERE loanid=${req.params.loanId}`, (err, result) => {
      if (err) {
        res.status(500).json({ status: 500, error: 'internal error' });
      } else {
        const hist = result.rows;
        console.log(hist);
        const rep = new Repayment();
        hist.map((val) => {
          val = Object.assign(rep, val);
        });
        const keys = ['loanid', 'createdon', 'monthlyinstallment', 'amount'];
        const out = hist.map(one => one.filterRepr(keys));
        res.status(200).json({ status: 200, data: hist });
      }
    });
  });
};
