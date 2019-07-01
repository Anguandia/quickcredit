/* eslint-disable linebreak-style */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-underscore-dangle */
/* eslint-disable linebreak-style */

class Repayment {
  // create repayment object with the given defaults
  constructor(loanid, amount, balance, paidamount, monthlyinstallment, createdon = new Date()) {
    this.loanid = loanid;
    this.amount = amount;
    this.balance = balance;
    this.paidamount = paidamount;
    this.monthlyinstallment = monthlyinstallment;
    this.createdon = createdon;
    this._id = Repayment.counter;
  }

  get id() {
    return this._id;
  }

  // initialize the class instance counter
  static get counter() {
    Repayment._counter = (Repayment._counter || 0) + 1;
    return Repayment._counter;
  }

  set id(id) {
    this._id = id;
  }

  // update parent loan and set payment history property values
  updateLoan(loan) {
    loan.updateBalance(this.amount);
    // set the balance after this repayment
    this.balance = loan.balance;
    // change amount field to paid amount for history
    this.paidamount = this.amount;
    // set the laon amount for the repayment history item
    this.amount = loan.amount;
    // set the paymentInstallment from the loan object
    this.monthlyinstallment = loan.paymentinstallment;
  }

  // return json representation of repayment
  toRepaymentJson() {
    return {
      id: this.id,
      loanid: this.loanid,
      createdon: this.createdon,
      amount: this.amount,
      monthlyinstallment: this.monthlyinstallment,
      paidamount: this.paidamount,
      balance: this.balance,
    };
  }

  // Add filter to get output with specified fieldsonly
  filterRepr(keys) {
    const filter = {};
    for (const key of keys) {
      filter[key] = this.toRepaymentJson()[key];
    }
    return filter;
  }
}

export default Repayment;
