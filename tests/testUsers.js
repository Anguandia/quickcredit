/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

const users = require('../models/users');
const testUsers = require('./testData').test_users;

chai.use(chaiHttp);
should = chai.should();

describe('test user end points', () => {
    beforeEach(done => {
        users.slice();
        chai.request(app).post('/auth/signup').send(testUsers[0]).end();
        done();
    });
    describe.skip('GET /users', () => {
        // test the get routes
        it("should delete setup user and return empty users' array", done => {
            // test get all when empty list
            // delete user created during setup
            users.splice(0);
            it(done => {
                chai.request(app)
                .get('/users')
                .end((req, res) => {
                    res.should.have.status(200);
                    res.body.data.should.be.a('array');
                    res.body.data.length.should.eql(0);
                    done();
                });
            });
        });
        it("should retuen an array of all users", done => {
            // test get all when list populated
            chai.request(app)
            .get('/users')
            .end((req, res) => {
                res.should.have.status(200);
                res.body.data.should.be.a('array');
                res.body.data[0].email.should.eql('user1@mail.com');
                done();
            });
        });
        it('should return a single user object', done => {
            // test get single user
            const email = 'user1@mail.com';
            chai.request(app)
            .get(`/users/${email}`)
            .end((req, res) => {
                res.should.have.status(200);
                res.body.data.should.be.a('object');
                res.body.data.firstName.should.eql('test1');
                done();
            });
        });
        it('should return message user unavailable', done => {
            // test get unavailable user
            let email = 'unavailable@matchMedia.com';
            chai.request(app)
            .get(`/users/${email}`)
            .end((req, res) => {
                res.should.have.status(404);
                res.body.should.have.property('error');
                res.body.error.should.eql(`user with email ${email} does not exist`);
                done();
            });
        });
    });
    describe('POST /', () => {
        describe('user signup/registration', () => {
            // test user creation
            describe('should register user', () => {
                // test successful registration
                it('should create user, all fields supplied', done => {
                    // test should register user with all fields provided and valid
                    chai.request(app)
                    .post('/auth/signup')
                    .send(testUsers[1])
                    .end((req, res) => {
                        res.status.should.eql(201);
                        res.body.data.should.be.a('object');
                        res.body.data.firstName.should.eql(testUsers[1].firstName);
                        done();
                    });
                });
                it('Create user, non mandatory fields ommitted', done => {
                    // should create user with non-essential fields missing
                    delete testUsers[2].tel;
                    chai.request(app)
                    .post('/auth/signup')
                    .send(testUsers[2]) // no tel supplied
                    .end((req, res) => {
                        res.status.should.eql(201);
                        res.body.data.should.be.a('object');
                        res.body.data.firstName.should.eql(testUsers[2].firstName);
                        done();
                    });
                });
            });
            it('should fail - duplicate registration', done => {
                // test registration fails if email already exists
                chai.request(app)
                .post('/auth/signup')
                // change testuser email to user1's email
                .send(testUsers[0])
                .end((req, res) => {
                    res.should.have.status(400);
                    res.body.status.should.eql(400);
                    res.body.error.should.eql("Account 'user1@mail.com' exists, please signin");
                    done();
                });
            });
            describe.skip('field and value validation', () => {
                it('should fail registration, missing required field - no email',
                done => {
                    // test registration fails if no email provided
                    delete testUsers[0].email;
                    chai.request(app)
                    .post('/auth/signup')
                    .send(testUsers[0])
                    .end((req, res) => {
                        res.should.have.status(400);
                        res.body.error.should.eql('email missing');
                        done();
                    });
                });
                it('should fail - invalid user data', done => {
                    // test registration fails if invalid email provided
                    chai.request(app)
                    .post('/auth/signup')
                    // change testuser email to 'invalid email'
                    .send(Object.assign(testUsers[0], {email: 'invalid email'}))
                    .end((req, res) => {
                        res.should.have.status(400);
                        res.body.error.should.eql('invalid email');
                        done();
                    });
                });
                it('should fail - invalid/missing field(emai)', done => {
                    // test registration fails if invalid email provided
                    chai.request(app)
                    .post('/auth/signup')
                    .send(testUsers[3]) // has intentional typo in email as mail
                    .end((req, res) => {
                        res.should.have.status(400);
                        res.body.error.should.eql('email missing');
                        done();
                    });
                });
            });
        });
        describe('user signin', () => {
            // test user can signin
            it('should signin', done => {
                chai.request(app)
                .post('/auth/signin')
                .send({email: 'user1@mail.com', password: 'user1'})
                .end((req, res) => {
                    res.should.have.status(200);
                    res.body.data.should.have.property('token');
                    res.body.data.firstName.should.eql('test1');
                    done();
                });
            });
            describe('Fail signin and flag errors', () => {
                it('should not signin but alert non-existent account', done => {
                    chai.request(app)
                    .post('/auth/signin')
                    .send({email:'noneexistent@mail.com', password: 'user1'})
                    .end((req, res) => {
                        res.should.have.status(404);
                        res.body.should.have.property('error');
                        res.body.error.should.eql('user not found');
                        done();
                    });
                });
                it('should not signin, flag wrong password', done => {
                    chai.request(app)
                    .post('/auth/signin')
                    .send({email:'user1@mail.com', password: 'wrong'})
                    .end((req, res) => {
                        res.should.have.status(401);
                        res.body.should.have.property('error');
                        res.body.error.should.eql('Wrong password');
                        done();
                    });
                });
            });
        });
    });
    describe('PATCH users/:user-email/verify', () => {
        it('should change user status', done => {
            let email = 'user1@mail.com';
            chai.request(app)
            .patch(`/users/${email}/verify`)
            .send({status: 'verified'})
            .end((req, res) => {
                res.should.have.status(200);
                res.body.data.email.should.eql(email);
                res.body.data.status.should.eql('verified');
                done();
            });
        });
        describe('should fail update, flag errors', () => {
            it('should fail to update if invalid status', done => {
                let email = 'user1@mail.com';
                chai.request(app)
                .patch(`/users/${email}/verify`)
                .send({status: 'approved'}) // approved is not a valid status
                .end((req, res) => {
                    res.should.have.status(400);
                    res.body.error.should.eql('invalid status');
                    done();
                })
            });
            it('should fail and inform "user not found"', (done) => {
                let email = 'vvu@mail.com';
                chai.request(app)
                .patch(`/users/${email}/verify`)
                .send({status: 'approved'})
                .end((req, res) => {
                    res.should.have.status(404);
                    res.body.error.should.eql('User not found');
                    done();
                })
            })
        });

    });
    describe.skip('DELETE /<:user-email>', () => {
        describe('should delete user', () => {
            it('should delete a user if admin', done => {
                let email = 'user1@mail.com';
                chai.request(app)
                .delete(`/users/${email}`)
                .end((req, res) => {
                    // res.should.have.status(200);
                    res.body.data.msg.should.eql(`user test1 user1 deleted`)
                    done();
                })
            });
        });
    });
});
