/* eslint-disable linebreak-style */
/* eslint-disable no-shadow */
/* eslint-disable prefer-const */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

import users from '../models/users';
import { testUsers } from './testData';

chai.use(chaiHttp);
should = chai.should();

const configName = 'test';

// eslint-disable-next-line no-unused-vars
let client = process.env.client;
let admin = process.env.admin;

describe('test user end points', () => {
  before((done) => {
    // clear the users' array
    users.splice(0);
    // create one admin and one client user
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(testUsers[0])
      .end((req, res) => {
        let token1 = res.body.data.token;
        client = `Bearer ${token1}`;
        chai.request(app)
          .post('/api/v1/auth/signup')
          .send(testUsers[4])
          .end((req, res) => {
            let token2 = res.body.data.token;
            admin = `Bearer ${token2}`;
            done();
          });
      });
  });
  describe('GET /api/v1/users', () => {
    // test the get routes
    it.skip("should delete setup user and return empty users' array", () => {
      // test get all when empty list
      // delete user created during setup
      users.splice(0);
      it((done) => {
        chai.request(app)
          .get('/api/v1/users')
          .set('Authorization', admin)
          .end((req, res) => {
            res.should.have.status(200);
            res.body.data.should.be.a('array');
            res.body.data.length.should.eql(0);
            done();
          });
      });
      done();
    });
    it('should retuen an array of all users', () => {
      // test get all when list populated
      chai.request(app)
        .get('/api/v1/users')
        .set('Authorization', admin)
        .end((req, res) => {
          res.should.have.status(200);
          res.body.data.should.be.a('array');
          res.body.data[0].email.should.eql('user1@mail.com');
        });
    });
    it('should return a single user object', () => {
      // test get single user
      let email = 'user1@mail.com';
      chai.request(app)
        .get(`/api/v1/users/${email}`)
        .set('Authorization', admin)
        .end((req, res) => {
          res.should.have.status(200);
          res.body.data.should.be.a('object');
          res.body.data.firstName.should.eql('test1');
        });
    });
    it('should return message user unavailable', () => {
      // test get unavailable user
      let email = 'unavailable@matchMedia.com';
      chai.request(app)
        .get(`/api/v1/users/${email}`)
        .set('Authorization', admin)
        .end((req, res) => {
          res.should.have.status(404);
          res.body.should.have.property('error');
          res.body.error.should.eql(`user with email ${email} does not exist`);
        });
    });
  });
  describe('POST /', () => {
    describe('user signup/registration', () => {
      // test user creation
      describe('should register user', () => {
        // test successful registration
        it('should create user, all fields supplied', (done) => {
          // test should register user with all fields provided and valid
          chai.request(app)
            .post('/api/v1/auth/signup')
            .send(testUsers[1])
            .end((req, res) => {
              res.status.should.eql(201);
              res.body.data.should.be.a('object');
              res.body.data.firstName.should.eql(testUsers[1].firstName);
              done();
            });
        });
        it('Create user, non mandatory fields ommitted', (done) => {
          // should create user with non-essential fields missing
          delete testUsers[2].tel;
          chai.request(app)
            .post('/api/v1/auth/signup')
            .send(testUsers[2]) // no tel supplied
            .end((req, res) => {
              res.status.should.eql(201);
              res.body.data.should.be.a('object');
              res.body.data.firstName.should.eql(testUsers[2].firstName);
              done();
            });
        });
      });
      it('should fail - duplicate registration', (done) => {
        // test registration fails if email already exists
        chai.request(app)
          .post('/api/v1/auth/signup')
        // change testuser email to user1's email
          .send(testUsers[0])
          .end((req, res) => {
            res.should.have.status(400);
            res.body.status.should.eql(400);
            res.body.error.should.eql("Account 'user1@mail.com' exists, please signin");
            done();
          });
      });
      describe('field and value validation', () => {
        it('should fail registration, missing required field - no email',
          (done) => {
            // test registration fails if no email provided
            delete testUsers[0].email;
            chai.request(app)
              .post('/api/v1/auth/signup')
              .send(testUsers[0])
              .end((req, res) => {
                res.should.have.status(400);
                res.body.error.should.eql('email missing');
                done();
              });
          });
        it('should fail - invalid user data', (done) => {
          // test registration fails if invalid email provided
          chai.request(app)
            .post('/api/v1/auth/signup')
          // change testuser email to 'invalid email'
            .send(Object.assign(testUsers[0], { email: 'invalid email' }))
            .end((req, res) => {
              res.should.have.status(400);
              res.body.error.should.eql('invalid email');
              done();
            });
        });
        it('should fail - invalid/missing field(emai)', (done) => {
          // test registration fails if invalid email provided
          chai.request(app)
            .post('/api/v1/auth/signup')
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
      it('should signin', (done) => {
        chai.request(app)
          .post('/api/v1/auth/signin')
          .send({ email: 'user1@mail.com', password: 'user1' })
          .end((req, res) => {
            res.should.have.status(200);
            res.body.data.should.have.property('token');
            res.body.data.firstName.should.eql('test1');
            done();
          });
      });
      describe('Fail signin and flag errors', () => {
        it('should not signin but alert non-existent account', (done) => {
          chai.request(app)
            .post('/api/v1/auth/signin')
            .send({ email: 'noneexistent@mail.com', password: 'user1' })
            .end((req, res) => {
              res.should.have.status(404);
              res.body.should.have.property('error');
              res.body.error.should.eql('user not found');
              done();
            });
        });
        it('should not signin, flag wrong password', (done) => {
          chai.request(app)
            .post('/api/v1/auth/signin')
            .send({ email: 'user1@mail.com', password: 'wrong' })
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
    it('should change user status', (done) => {
      let email = 'user1@mail.com';
      chai.request(app)
        .patch(`/api/v1/users/${email}/verify`)
        .send({ status: 'verified' })
        .set('Authorization', admin)
        .end((req, res) => {
          res.should.have.status(200);
          res.body.data.email.should.eql(email);
          res.body.data.status.should.eql('verified');
          done();
        });
    });
    describe('should fail update, flag errors', () => {
      it('should fail to update if invalid status', (done) => {
        let email = 'user1@mail.com';
        chai.request(app)
          .patch(`/api/v1/users/${email}/verify`)
          .send({ status: 'approved' }) // approved is not a valid status
          .set('Authorization', admin)
          .end((req, res) => {
            res.should.have.status(400);
            res.body.error.should.eql('invalid status');
            done();
          });
      });
      it('should fail and inform "user not found"', (done) => {
        let email = 'vvu@mail.com';
        chai.request(app)
          .patch(`/api/v1/users/${email}/verify`)
          .send({ status: 'approved' })
          .set('Authorization', admin)
          .end((req, res) => {
            res.should.have.status(404);
            res.body.error.should.eql('User not found');
            done();
          });
      });
    });
  });
  describe('DELETE /<:user-email>', () => {
    describe('should delete user', () => {
      it('should delete a user if admin', (done) => {
        let email = 'user1@mail.com';
        chai.request(app)
          .delete(`/api/v1/users/${email}`)
          .set('Authorization', admin)
          .end((req, res) => {
            // res.should.have.status(200);
            res.body.data.msg.should.eql('user test1 user1 deleted');
            done();
          });
      });
      it('should notify of non existence of target', (done) => {
        let email = 'user10@mail.com';// doesn't exist
        chai.request(app)
          .delete(`/api/v1/users/${email}`)
          .set('Authorization', admin)
          .end((req, res) => {
            // res.should.have.status(200);
            res.body.error.includes('does not exist');
            done();
          });
      });
    });
  });
});
