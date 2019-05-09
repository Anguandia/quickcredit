let loans = require('./loans');

exports.Loan = class Loan{
    // create loan object with the given defaults
    constructor(user, amount, tenor, balance=0, interest=0.05,
        createdOn=new Date(), status='pending', repaid=false
    ){
        this.user = user;
        this.amount = amount;
        this.tenor = tenor;
        this.interest = interest;
        this.balance = balance;
        this.createdOn = createdOn;
        this.status = status;
        this.repaid = repaid;
        this._id = Loan.counter;
    }
    get id(){
        return this._id;
    }

    // initialize the class instance counter
    static get counter() {
        Loan._counter = (Loan._counter || 0) + 1;
        return Loan._counter;
    }

    // calculate paymentInstallment
    setPaymentInstallment(){
        this.paymentInstallment = (1+this.interest)*this.amount/this.tenor;
    }

    // approve loan instance
    approve(status){
        this.status = status;
        // credit the loan to client account on approval
        this.credit();
    }

    // credit account with loan amount but reflect balance inclussive of interest
    credit(){
        this.balance = (1+this.interest)*this.amount;
    }

    // update balance
    updateBalance(repayment){
        this.balance -= repayment;
        // change the status to repaid upon 0 balance
        if(this.balance <= 0){
            this.status = 'repaid';
            this.repaid = true;
        }
    }

    // push Loan object to loans' array
    save(){
        // set the repayment installation on save
        this.setPaymentInstallment();
        loans.push(this);
    }

    //return json representation of Loan
    toLoanJson(){
        return {
            id: this.id,
            user: this.user,
            amount: this.amount,
            tenor: this.tenor,
            paymentInstallment: this.paymentInstallment,
            interest: this.interest,
            balance: this.balance,
            createdOn: this.createdOn,
            status: this.status,
            repaid: this.repaid
        };
    }

    // Add filter to get output with specified fieldsonly
    filterRepr(keys){
        let filter = {};
        for(let key of keys){
            filter[key] = this.toLoanJson()[key];
        }
        return filter;
    }
};
