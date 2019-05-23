/* eslint-disable linebreak-style */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-restricted-syntax */
/* eslint-disable linebreak-style */
import loans from './loans';

export const Loan = class Loan {
  // create loan object with the given defaults
  constructor(email, amount, tenor, balance = 0, interest = 0.05,
    createdOn = new Date(), status = 'pending', repaid = false) {
    this.email = email;
    this.amount = amount;
    this.tenor = tenor;
    this.interest = interest;
    this.balance = balance;
    this.createdOn = createdOn;
    this.status = status;
    this.repaid = repaid;
    this._id = Loan.counter;
  }

  get id() {
    return this._id;
  }

  set id(id) {
    this._id = id;
  }

  // initialize the class instance counter
  static get counter() {
    Loan._counter = (Loan._counter || 0) + 1;
    return Loan._counter;
  }

  // calculate paymentInstallment
  setPaymentInstallment() {
    this.paymentInstallment = (1 + this.interest) * this.amount / this.tenor;
  }

  // approve loan instance
  approve(status) {
    this.status = status;
    // credit the loan to client account on approval
    this.credit();
  }

  // credit account with loan amount but reflect balance inclussive of interest
  credit() {
    this.balance = (1 + this.interest) * this.amount;
  }

  // update balance
  updateBalance(repayment) {
    this.balance -= repayment;
    // change the status to repaid upon 0 balance
    if (this.balance <= 0) {
      this.status = 'repaid';
      this.repaid = true;
    }
  }

  // push Loan object to loans' array
  save() {
    // set the repayment installation on save
    this.setPaymentInstallment();
    loans.push(this);
  }

  // return json representation of Loan
  toLoanJson() {
    return {
      id: this.id,
      email: this.email,
      amount: this.amount,
      tenor: this.tenor,
      paymentinstallment: this.paymentInstallment,
      interest: this.interest,
      balance: this.balance,
      createdOn: this.createdOn,
      status: this.status,
      repaid: this.repaid,
    };
  }

  // Add filter to get output with specified fieldsonly
  filterRepr(keys) {
    const filter = {};
    for (const key of keys) {
      filter[key] = this.toLoanJson()[key];
    }
    return filter;
  }
};

// define and export valid Loan property specifications to be validated against
export const loanspecs = {
  id: 'Integer',
  tenor: 'Integer',
  email: 'string',
  amount: 'Float',
  paymentInstallment: 'Float',
  interest: 'Float',
  status: 'string',
  createdOn: 'DateTime',
  repaid: 'boolean',
  balance: 'Float',
  loanId: 'Integer',
};

// declare and export required Loan fields for given routes for use in validation
export const loan = [
  'tenor', 'email', 'amount',
];

export const payment = [
  'amount', 'loanId',
];

export const approve = [
  'status',
];
