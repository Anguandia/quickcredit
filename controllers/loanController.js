/* eslint-disable no-param-reassign */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable linebreak-style */
/* eslint-disable eqeqeq */
/* eslint-disable linebreak-style */
/* eslint-disable linebreak-style */
import { Loan } from '../models/loan';
import Repayment from '../models/repayment';
import repayments from '../models/repayments';
import { pool } from '../utils/db';

// create loan
export const create = function create(req, res) {
  const loan = new Loan();
  Object.assign(loan, req.body);
  loan.setPaymentInstallment();
  pool.connect((error, client, done) => {
    client.query(`SELECT * FROM users WHERE email='${req.body.client}'`, (err, user) => {
      done();
      if (err) {
        res.status(500).json({ status: 500, error: err });
      } else if (user.rows.length == 0) {
        res.status(404).json({ status: 404, error: `user ${req.body.client} does not exist, signup?` });
      } else {
        // loan.client = JSON.stringify(user.rows[0]);
        client.query('SELECT id FROM loans ORDER BY id DESC', (err, resp) => {
          done();
          loan.id = resp.rows[0] ? (resp.rows[0].id + 1) : 1;
          const query = `INSERT INTO loans(client, amount, tenor, interest, balance, paymentinstallment, createdon, status, repaid) VALUES('${loan.client}', '${parseFloat(loan.amount)}', '${parseInt(loan.tenor, 10)}', '${parseFloat(loan.interest)}', '${parseFloat(loan.balance)}', '${parseFloat(loan.paymentInstallment)}', '${loan.createdOn}', '${loan.status}', ${loan.repaid})`;
          client.query(query, (errr) => {
            done();
            if (errr) {
              res.status(500).json({ status: 500, error: 'internal error' });
            } else {
              res.status(201).json({ status: 201, data: loan.toLoanJson() });
            }
          });
        });
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
  } else if (Object.keys(req.query).includes('email')) {
    selection = `SELECT * FROM loans WHERE status='${req.query.status}' AND repaid='${Boolean(req.query.repaid)}'
    AND client='${req.query.email}'`;
  } else if (Object.keys(req.query).includes('status' && 'repaid')) {
    selection = `SELECT * FROM loans WHERE status='${req.query.status}' AND repaid='${req.query.repaid}'`;
  } else if (Object.keys(req.query).includes('status')) {
    selection = `SELECT * FROM loans WHERE status='${req.query.status}'`;
  } else {
    selection = 'SELECT * FROM loans';
  }
  pool.connect((error, client) => {
    client.query(selection, (err, result) => {
      // done();
      if (err) {
        console.log(err);
        res.status(500).json({ status: 500, error: 'internal error' });
      } else {
        res.status(200).json({ status: 200, data: result.rows });
      }
    });
  });
};

// get specific loan details
export const detail = function detail(req, res) {
  pool.connect((err, client, done) => {
    client.query(`SELECT * FROM loans WHERE id=${req.params.loanId}`, (error, loan) => {
      done();
      if (error) {
        res.status(500).json({ status: 500, error: 'internal error' });
      }
      res.status(200).json({ status: 200, data: loan.rows[0] });
    });
  });
};

// approve a loan
export const approve = function approve(req, res) {
  pool.connect((error, client, done) => {
    client.query(`SELECT * FROM loans WHERE id=${req.params.loanId}`, (err, target) => {
      done();
      if (err) {
        res.status(500).json({ status: 500, error: 'internal error' });
      } else if (!['approved', 'rejected'].includes(req.body.status.toLowerCase())) {
        res.status(400).json({ status: 400, error: 'invalid status' });
      } else {
        const loan = new Loan();
        Object.assign(loan, target.rows[0]);
        // update if status value valid
        loan.approve(req.body.status);
        client.query(`UPDATE loans SET status='${loan.status}', balance='${loan.balance}' WHERE id=${loan.id}`, (errr) => {
          done();
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
  pool.connect((error, client, done) => {
    client.query(`SELECT * FROM loans WHERE id=${req.params.loanId}`, (err, result) => {
      done();
      const target = result.rows[0];
      const loan = new Loan();
      Object.assign(loan, target);
      if (err) {
        console.log({ err });
      }
      if (loan.status === 'pending') {
        res.status(400).json({ status: 400, error: 'loan not approved' });
      } else if (loan.repaid === true) {
        res.status(400).json({ status: 400, error: 'loan already fully serviced!' });
      } else {
        const repayment = new Repayment();
        Object.assign(repayment, { amount: req.body.amount, loanid: req.params.loanId });
        repayment.updateLoan(loan);
        client.query(`UPDATE loans SET status='${loan.status}', repaid=${loan.repaid}, balance=${loan.balance} WHERE id=${repayment.loanid}`).catch(error1 => console.log({ error1 }));
        client.query(`INSERT INTO repayments(loanid, createdon, amount, monthlyinstallment, paidamount, balance) VALUES(${repayment.loanid}, '${repayment.createdon}', ${repayment.amount}, ${repayment.monthlyinstallment}, ${repayment.paidamount}, ${repayment.balance})`).catch(error2 => console.log({ error2 }));
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
        // const out = hist.map(one => one.filterRepr(keys));
        res.status(200).json({ status: 200, data: hist });
      }
    });
  });
};
