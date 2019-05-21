/* eslint-disable linebreak-style */
/* eslint-disable no-shadow */
/* eslint-disable prefer-const */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import { testLoans, testPayments, testUsers } from './testData';
import loans from '../models/loans';
import users from '../models/users';

chai.use(chaiHttp);
should = chai.should();

const configName = 'test';
let user1 = process.env.user1;
let user2 = process.env.user2;
let admin = process.env.admin;
let loan = process.env.loan;

// these tests will only cover authentication failures, successful
// authentication tests are incoporated in each rotes tests in the testtestUsers
// and testLoans modules
describe('test route authentication', () => {
  before((done) => {
    // clear the testUsers' array
    users.splice(0);
    loans.splice(0);
    // signup 3 test test_testUsers to get a token
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(testUsers[0])
      .end((req, res) => {
        let token = res.body.data.token;
        user1 = `Bearer ${token}`;
        chai.request(app)
          .post('/api/v1/auth/signup')
          .send(testUsers[1])
          .end((req, res) => {
            let token1 = res.body.data.token;
            user2 = `Bearer invalid.${token1}`;
            chai.request(app)
              .post('/api/v1/auth/signup')
              .send(testUsers[4])
              .end((req, res) => {
                let token2 = res.body.data.token;
                admin = `Bearer ${token2}`;
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
  describe('Unauthenticated access to protected route denied, right message', () => {
    // start with loan creation so that loans can be created for testing other routes
    describe('create loan without token', () => {
      // test loan creation
      it('should fail, ask user to sign in', (done) => {
        // create a loan without signing in
        chai.request(app)
          .post('/api/v1/loans')
          .send(testLoans[1])
          .end((err, res) => {
            res.status.should.eql(401);
            res.body.error.includes('please login');
            done();
          });
      });
    });
  });
  describe('Wrong authentication denied access, right message', () => {
    describe('Authenication with invalid token flagged', () => {
      it.skip('should not create loan, notify of invalid token', (done) => {
        // delete user created in setup
        users.splice(0);
        chai.request(app)
          .post('/api/v1/loans')
          .send(testLoans[1])
          .send('Authorization', user2)
          .end((req, res) => {
            res.status.should.eql(401);
            res.body.error.should.eql('invalid token');
            done();
          });
      });
    });
    describe('Authenticated access to unpermitted resources denied, right message', () => {
      it('should not update loan, respond with admin required', (done) => {
        let id = loan.id;
        chai.request(app)
          .patch(`/api/v1/loans/${id}`)
          .send({ status: 'approved' })
          .set('Authorization', user1)
          .end((err, res) => {
            res.should.have.status(401);
            res.body.error.includes('requires admin');
            done();
          });
      });
      it('should not display repayment history, respond with owner required', (done) => {
        let id = loan.id;
        chai.request(app)
          .get(`/api/v1/loans/${id}/repayments`)
          .set('Authorization', admin)
          .end((err, res) => {
            res.should.have.status(401);
            res.body.error.includes("requires owner's access");
            done();
          });
      });
    });
  });
});
