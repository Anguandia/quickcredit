/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import {testLoans as testloans, testPayments, test_users as users} from './testData';
import loans from '../models/loans';

chai.use(chaiHttp);
should = chai.should();

// these tests will only cover authentication failures, successful authentication tests are incoporated in each rotes tests in the testUsers and testLoans modules
describe('test route authentication', () => {
    describe('Unauthenticated access to protected route denied, right message', () => {
        // start with loan creation so that loans can be created for testing other routes
        describe('create loan without token', () => {
            // test loan creation
            it('should fail, ask user to sign in', (done) => {
                // create a loan without signing in
                let token = getToken();
                console.log(token);
                chai.request(app)
                .post('/api/v1/loans')
                .send(testloans[1])
                .end((err, res) => {
                    res.status.should.eql(401);
                    res.body.error.includes('please login');
                    done();
                });
            });
        });
    });
    describe('Wrong authentication denied access, right message', () => {
        beforeEach((done) => {
            // signup/in 1 admin and 2 clients
            chai.request(app).post('/api/v1/auth/signup').send(testloans[0]).end();
            done();
        });
        describe('Authenication with invalid token flagged', () => {
        });
        describe('Authenticated access to unpermitted resources denied, right message', () => {
        });
    });
});

function getToken(){
    chai.request(app).post('/api/v1/auth/signup').send(users[0]).end((err, res) => {
        return res.body.data.token;
    });
}
