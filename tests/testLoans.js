/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import {testLoans, testPayments, test_users} from './testData';
import loans from '../models/loans';
import users from '../models/users';

chai.use(chaiHttp);
should = chai.should();

// define variables to store three tokens for test purposes; 2 standard test_users and an admin
let user1 = process.env.user1;
let user2 = process.env.user2;
let admin = process.env.admin;
let loan = process.env.loan;

describe('test loans', () => {
    beforeEach((done) => {
        // clear the users' array
        users.splice(0);
        // signup 3 test test_users to get a token
        chai.request(app)
        .post('/api/v1/auth/signup')
        .send(test_users[0])
        .end((req, res) => {
            let token = res.body.data.token;
            user1 = `Bearer ${token}`;
            chai.request(app)
            .post('/api/v1/auth/signup')
            .send(test_users[1])
            .end((req, res) => {
                let token = res.body.data.token;
                user2 = `Bearer ${token}`;
                chai.request(app)
                .post('/api/v1/auth/signup')
                .send(test_users[4])
                .end((req, res) => {
                    let token = res.body.data.token;
                    admin = `Bearer ${token}`;
                    // setup; before each individual test, clear the loan's array
                    loans.splice(0);
                    chai.request(app)
                    .post('/api/v1/loans')
                    .send(testLoans[0])
                    .set('Authorization', user1)
                    .end((req, res) => {
                        loan = res.body.data;
                    });
                    done();
                });
            });
        });
    });
    describe('POST /api/v1/loans', () => {
        // start with loan creation so that loans can be created for testing other routes
        describe('create loan', () => {
            // test loan creation
            it('should create loan, all fields valid', (done) => {
                // test should register loan with all fields provided and valid
                chai.request(app)
                .post('/api/v1/loans')
                .send(testLoans[1])
                .set('Authorization', user1)
                .end((err, res) => {
                    res.status.should.eql(201);
                    res.body.data.should.be.a('object');
                    // check that other loan properties are added in instantiation
                    res.body.data.should.have.property('interest');
                    res.body.data.paymentInstallment.should.eql(2625);
                    done();
                });
            });
            it('should fail - duplicate application', (done) => {
                // test application fails if user has a loan
                chai.request(app)
                .post('/api/v1/loans')
                .send(testLoans[0])
                .set('Authorization', user1)
                .end((err, res) => {
                    res.should.have.status(403);
                    res.body.error.should.eql('you have a running loan');
                    done();
                });
            });
            describe('Test input validation', () => {
                it('should fail creation - missing field',
                    (done) => {
                    // test registration fails if no email provided
                    chai.request(app)
                    .post('/api/v1/loans')
                    .send(testLoans[5]) // has no amount entry
                    .set('Authorization', user1)
                    .end((err, res) => {
                        res.should.have.status(400);
                        res.body.error.should.eql('amount missing');
                        done();
                    });
                });
                it.skip('should fail - invalid loan data', (done) => {
                    // test registration fails if invalid amount provided
                    // submit loan application with a string amount instead of number
                    Object.assign(testLoans[1], {amount: 'ten thousand'});
                    chai.request(app)
                    .post('/api/v1/loans')
                    .send(testLoans[1])
                    .set('Authorization', user1)
                    .end((err, res) => {
                        res.should.have.status(400);
                        res.body.status.should.eql(400);
                        res.body.error.includes('amount should be a number');
                        done();
                    });
                });
                it('should fail - invalid field name', (done) => {
                    // replace the keyname user with typo use
                    delete Object.assign(testLoans[1], {use: testLoans[1].user}).user;
                    chai.request(app)
                    .post('/api/v1/loans')
                    .send(testLoans[1])
                    .set('Authorization', user1)
                    .end((err, res) => {
                        res.should.have.status(400);
                        res.body.status.should.eql(400);
                        res.body.error.includes('unknown field use');
                        done();
                    });
                });
            });
        });
        describe('post repayment', () => {
            it('should create repayment', (done) => {
                let id = loan.id + 1;
                chai.request(app)
                .post('/api/v1/loans')
                .send(testLoans[1])
                .set('Authorization', user2)
                .end();
                // approve the setup loan
                    chai.request(app).patch(`/api/v1/loans/${id}`).send({status: 'approved'}).set('Authorization', admin).end();
                    // process repayment
                    chai.request(app)
                    .post(`/api/v1/loans/${id}/repayment`)
                    .send({loanId: id, amount: 10000})
                    .set('Authorization', admin)
                    .end((err, res) => {
                        res.should.have.status(201);
                        res.body.data.paidAmount.should.eql(10000);
                        done();
                });
            });
            it('should not accept repayment if repaid is true');
            it('should not accept repayment if loan non-existent');
            it('should not accept repayment if loan not approved');
            it('should not accept repayment if amount paid exceeds current balance');
        });
    });
    describe('GET /api/v1/loans', () => {
        // test the get routes
        it("should return an array of all loans", (done) => {
            // test get all when list populated
            for(let loan of testLoans.slice(1,)){
                // create the loan objects from the test data
                chai.request(app).post('/api/v1/loans').send(loan);
            }
            chai.request(app)
            .get('/api/v1/loans')
            .set('Authorization', admin)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.data.should.be.a('array');
                done();
            });
        });
        it('should return a single loan object', (done) => {
            // test get single loan
            let loan_id = loan.id + 1;
            chai.request(app)
            .get(`/api/v1/loans/${loan_id}`)
            .set('Authorization', admin)
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
            .get(`/api/v1/loans/${loan_id}`)
            .set('Authorization', admin)
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
            .get('/api/v1/loans/?status=approved&repaid=false')
            .set('Authorization', admin)
            .end((err, res) => {
                res.should.have.status(200);
                for(let loan of res.body.data){
                    loan.status.should.eql('approved');
                    loan.repaid.should.eql(false);
                }
                done();
            });
        });
        it.skip('should return an empty array if no current loans', (done) => {
            // clear loans array
            loans.splice(0);
            // test get all when list populated
            for(let loan of testLoans.slice(1)){
                // create the loan objects from the test data
                chai.request(app).post('/api/v1/loans').send(loan).set('Authorization', admin).end();
            }
            // get current loans
            chai.request(app)
            .get('/api/v1/loans?status=approved&repaid=false')
            .set('Authorization', admin)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.data.should.be.a('array');
                res.body.data.should.eql([]);
                done();
            });
        });
        it('should return all repaid loans', (done) => {
            // create all test loans-last 3 the one at setup
            for(let i=1; i<testLoans.length; i++){
                chai.request(app).post('/api/v1/loans').send(testLoans[i]).set('Authorization', admin).end();
            }
            // approve and repay all of loan 2
            chai.request(app).patch('/api/v1/loans/2').send({status:'approved'}).set('Authorization', admin).end();
            chai.request(app).post('/api/v1/loans/2/repayment').send({amount: 15000}).set('Authorization', admin).end();
            // get repaid loans
            chai.request(app)
            .get('/api/v1/loans/?status=approved&repaid=true')
            .set('Authorization', admin)
            .end((err, res) => {
                res.should.have.status(200);
                for(let loan of res.body.data){
                    loan.status.should.eql('approved');
                    loan.repaid.should.eql(true);
                }
                done();
            });
        });
        it("should return a loan's repaymnets' log", (done) => {
            let loan_id = loan.id + 4;
            // create second loan
            chai.request(app).post('/api/v1/loans').send(testLoans[1]).set('Authorization', user2).end();
            // approve loan with admin roken
            chai.request(app).patch(`/api/v1/loans/${loan_id}`).send({status:'approved'}).set('Authorization', admin).end();
            // make a repayment
            chai.request(app).post(`/api/v1/loans/${loan_id}/repayment`).send({loanId: loan_id, amount: 3000}).set('Authorization', admin).end();
            chai.request(app)
            .get(`/api/v1/loans/${loan_id}/repayments`)
            .set('Authorization', user1)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.data[0].should.have.property('loanId');
                res.body.data[0].should.have.property('monthlyInstallment');
                res.body.data[0].should.have.property('amount');
                res.body.data[0].should.have.property('createdOn');
                done();
            });
        });
    });
    describe('PATCH /<:loan_id>', () => {
        it('should change loan status', (done) => {
            let loan_id = loan.id + 1;
            // change to required status and see that change happens
            chai.request(app)
            .patch(`/api/v1/loans/${loan_id}`)
            .send({status: 'approved'})
            .set('Authorization', admin)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.data.status.should.eql('approved');
                done();
            });
        });
        describe('should fail update, flag errors', () => {
            it('should fail to update if invalid status', (done) => {
                let loan_id = loan.id + 1;
                chai.request(app)
                .patch(`/api/v1/loans/${loan_id}`)
                .send({status: 'ok'}) // ok is not a valid status
                .set('Authorization', admin)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.error.should.eql('invalid status');
                    done();
                })
            });
            it('should fail update if not admin')
        });
    });
});
