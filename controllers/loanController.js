const loans = require('../models/loans');
const Loan = require('../models/loan').Loan;

// create loan
exports.create = function(req, res){
    let loan = new Loan();
    Object.assign(loan, req.body);
    // check if requesting client has a current loan
    let existing = loans.find(one => one.user == loan.user && one.status != 'repaid');
    if(existing){
        res.status(403).json({status: 403, error: 'you have a running loan'});
    } else {
        loan.save();
        res.status(201).json({status: 201, data: loan.toLoanJson()});
    }
};

// get all, current or repaid loans
exports.list = function(req, res){
    let selection;
    if(req.query.status){
        // convert string status representation inquery to boolean
        let status = req.query.status=='true'?true: false;
        selection = loans.filter(one => one.status === req.query.status &
            one.repaid === status);
    } else {
        selection = loans;
    }
    res.status(200).json({status: 200, data: selection.map(loan => loan.toLoanJson())});
};

// get specific loan details
exports.detail = function(req, res){
    let loan = loans.find(one => one._id == req.params.loanId);
    if(!loan){
        res.status(404).json({status: 404, error: `loan with id ${req.params.loanId} does not exist`});
    } else {
        res.status(200).json({status: 200, data: loan.toLoanJson()});
    }
};

// approve a loan
exports.approve = function(req, res){
    let loan = loans.find(one => one._id == req.params.loanId);
    if(!loan){
        res.status(404).json({status: 404, error: `no loan with id ${req.params.loanId}`});
    } else if(['approved', 'rejected'].includes(req.body.status)){
        // update if status value valid
        let fields = ['id', 'amount', 'tenor', 'status', 'paymentInstallment', 'interest'];
        loan.approve(req.body.status);
        res.status(200).json({status: 200, data: loan.filterRepr(fields)});
    } else {
        res.status(400).json({status: 400, error: 'invalid status'});
    }
};

// post a repayment installment
exports.repay = function(){};

// get repaymnt history
exports.log = function(){};
