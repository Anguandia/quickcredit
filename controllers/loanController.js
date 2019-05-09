const loans = require('../models/loans');
const Loan = require('../models/loan').Loan;

// create loan
exports.create = function(req, res){
    let loan = new Loan();
    Object.assign(loan, req.body);
    // check if requesting client has a current loan
    let existing = loans.find((one) => one.user == loan.user && one.status != 'repaid');
    if(existing){
        res.status(403).json({status: 403, error: 'you have a running loan'});
    } else {
        loan.save();
        res.status(201).json({status: 201, data: loan.toLoanJson()});
    }
};

// get all, current or repaid loans
exports.list = function(){};

// get specific loan details
exports.detail = function(){};

// approve a loan
exports.approve = function(){};

// post a repayment installment
exports.repay = function(){};

// get repaymnt history
exports.log = function(){};
