import loans from '../models/loans';
import {Loan} from '../models/loan';
import {Repayment} from '../models/repayment';
import repayments from '../models/repayments';

// create loan
export const create = function(req, res){
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
export const list = function(req, res){
    let selection, repaid;
    if(req.query.status){
        // convert string status representation inquery to boolean
        repaid = req.query.repaid=='true'?true: false;
        selection = loans.filter(one => one.status===req.query.status &
            one.repaid===repaid);
    } else {
        selection = loans;
    }
    res.status(200).json({status: 200, data: selection.map(loan => loan.toLoanJson())});
};

// get specific loan details
export const detail = function(req, res){
    let loan = loans.find(one => one._id == req.params.loanId);
    if(!loan){
        res.status(404).json({status: 404, error: `loan with id ${req.params.loanId} does not exist`});
    } else {
        res.status(200).json({status: 200, data: loan.toLoanJson()});
    }
};

// approve a loan
export const approve = function(req, res){
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
export const repay = function(req, res){
    let loan = loans.find(one => one._id == req.params.loanId);
    if(!loan){
        res.status(404).json({status: 404, error: `no loan with id ${req.params.loanId}`});
    }
    else if(loan.status != 'approved'){
        res.status(403).json({status: 403, error: 'loan not approved'});
    }
    else if(loan.repaid==true){
        res.status(403).json({status: 403, error: 'loan already fully serviced!'});
    }
    else {
        let repayment = new Repayment();
        Object.assign(repayment, {amount: req.body.amount, loanId: req.params.loanId});
        repayment.updateLoan(loan);
        repayment.save();
        res.status(201).json({status: 201, data: repayment.toRepaymentJson()});
    }
};

// get repaymnt history
export const log = function(req, res){
    if(!loans.find(one => one._id == req.params.loanId)){
        res.status(404).json({status: 404, error: `loan ${req.params.loanId} not found`});
    } else {
        let log = repayments.filter(rep => rep.loanId == req.params.loanId);
        let keys = ['loanId', 'createdOn', 'monthlyInstallment', 'amount'];
        let out = log.map(one => one.filterRepr(keys));
        res.status(200).json({status: 200, data: out});
    }
};
