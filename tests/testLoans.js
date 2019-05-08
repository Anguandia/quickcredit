/* eslint-disable no-undef */
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');

let testData = require('./testData');
let testloans = testData.testLoans;
let testpayments = testData.test_repayments;

chai.use(chaiHttp);
should = chai.should();

describe('test loans', () => {
    beforeEach((done) => {
        // setup; before each individual test, creat an empty loan's array
        chai.request(app).post('/loans').send(testloans[0]).end();
        done();
    });
    describe('POST /loans', () => {
        // start with loan creation so that loans can be created for testing other routes
        describe('create loan', () => {
            // test loan creation
            it('should create loan, all fields valid', (done) => {
                // test should register loan with all fields provided and valid
                chai.request(app)
                .post('/loans')
                .send(testloans[1])
                .end((err, res) => {
                    res.status.should.eql(201);
                    res.body.data.should.be.a('object');
                    // check that other loan properties are added in instantiation
                    res.body.data.should.have.property('interest');
                    res.body.data.paymentInstallment.should.eql(2625);
                    done();
                });
            });
            describe('Test input validation', () => {
                it('should fail creation - missing field',
                (done) => {
                    // test registration fails if no email provided
                    delete testloans[1].amount;
                    chai.request(app)
                    .post('/loans')
                    .send(testloans[1])
                    .end((err, res) => {
                        res.should.have.status(400);
                        res.body.error.should.eql('amount missing');
                        done();
                    });
                });
                it('should fail - invalid loan data', (done) => {
                    // test registration fails if invalid amount provided
                    // submit loan application with a string amount instead of number
                    Object.assign(testloans[1], {amount: 'ten thousand'});
                    chai.request(app)
                    .post('/loans')
                    .send(testloans[1])
                    .end((err, res) => {
                        res.should.have.status(400);
                        res.body.status.should.eql(400);
                        res.body.error.includes('amount should be a number');
                        done();
                    });
                });
                it('should fail - invalid field name', (done) => {
                    // replace the keyname user with typo use
                    delete Object.assign(testloans[1], {use: testloans[1].user}).user;
                    chai.request(app)
                    .post('/loans')
                    .send(testloans[1])
                    .end((err, res) => {
                        res.should.have.status(400);
                        res.body.status.should.eql(400);
                        res.body.error.includes('unknown field use');
                        done();
                    });
                });
                it('should fail - duplicate application', (done) => {
                    // test application fails if user has a loan
                    chai.request(app)
                    .post('/loans')
                    .send(testloans[0])
                    .end((err, res) => {
                        res.should.have.status(403);
                        res.body.error.should.eql('you have a running loan');
                        done();
                    });
                });
                });
            });
        describe('post repayment', () => {
            it('should create repayment', (done) => {
                let repayment = testpayments[0];
                chai.request(app)
                .post(`/loans/${repayment.loanId}/repayment`)
                .send(repayment)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.data.paidAmount.should.eql(repayment.amount);
                    done();
                });
            });
            it('should not accept repayment if repaid is true')
            it('should not accept repayment if loan non-existent')
            it('should not accept repayment if loan not approved')
            it('should not accept repayment if amount paid exceeds current balance')
        });
    });
    describe('GET /loans', () => {
        // test the get routes
        it("should return an array of all loans", (done) => {
            // test get all when list populated
            for(let loan of testloans.slice(1,)){
                // create the loan objects from the test data
                chai.request(app).post('/loans').send(loan);
            }
            chai.request(app)
            .get('/loans')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.data.should.be.a('array');
                done();
            });
        });
        it('should return a single loan object', (done) => {
            // test get single loan
            let loan_id = 1;
            chai.request(app)
            .get(`/loans/${loan_id}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.data.should.be.a('object');
                res.body.data.user.should.eql('user1@mail.com');
                // check that all fields values are of specified types
                res.body.data.id.should.be.a('number');
                res.body.data.tenor.should.be.a('number');
                res.body.data.status.should.be.a('string');
                res.body.data.amount.should.be.a('number');
                res.body.data.paymentInstallment.should.be.a('number');
                res.body.data.balance.should.be.a('number');
                res.body.data.interest.should.be.a('number');
                done();
            });
        });
        it('should return message loan unavailable', (done) => {
            // test get unavailable loan
            let loan_id = 10000;
            chai.request(app)
            .get(`/loans/${loan_id}`)
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.have.property('error');
                res.body.error.should.eql(`loan with id ${loan_id} does not exist`);
                done();
            });
        });
        it('should return all current loans not fully paid', (done) => {
            //needto create and approve loans
            chai.request(app)
            .get('/loans/?status=approved&repaid=false')
            .end((err, res) => {
                res.should.have.status(200);
                for(var loan of res.body.data){
                    loan.status.should.eql('approved');
                    loan.repaid.should.eql(false);
                }
                done();
            });
        });
        it('should return an empty array if no current loans', (done) => {
            chai.request(app)
            .get('/loans/?status=approved&repaid=false')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.data.should.be.a('array');
                res.body.data.length.should.eql(0);
                done();
            });
        });
        it('should return all repaid loans', (done) => {
            chai.request(app)
            .get('/loans/?status=approved&repaid=true')
            .end((err, res) => {
                res.should.have.status(200);
                for(var loan of res.body.data){
                    loan.status.should.eql('approved');
                    loan.repaid.should.eql(true);
                    loan.balance.should.eql(0.0);
                }
                done();
            });
        });
        it('should return repayment history of specified loac',
        (done) => {
            let loan_id = 1;
            chai.request(app)
            .get(`/loans/${loan_id}/repayments`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('loanId');
                res.body.should.have.property('monthlyInstallment');
                res.body.should.have.property('amount');
                res.body.should.have.property('createdOn');
                done();
            });
        });
    });
    describe('PATCH /<:loan_id>', () => {
        it('should change loan status', (done) => {
            let loan_id = 1;
            // change to required status and see that change happens
            chai.request(app)
            .patch(`/loans/${loan_id}`)
            .send({status: 'approved'})
            .end((err, res) => {
                res.should.have.status(200);
                res.body.data.status.should.eql('approved');
                done();
            });
        });
        describe('should fail update, flag errors', () => {
            it('should fail to update if invalid status', (done) => {
                let loan_id = 1;
                chai.request(app)
                .patch(`/loans/${loan_id}`)
                .send({status: 'ok'}) // ok is not a valid status
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.error.should.eql('invalid status ok');
                    done();
                })
            });
            it('should fail update if not admin')
        });
    });
});
