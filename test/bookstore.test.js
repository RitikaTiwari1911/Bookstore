/* eslint-disable no-unused-vars */
/* eslint-disable func-names */
/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');
const { response } = require('express');
const server = require('../server');
const testData = require('./bookstore.data.json');

// Assertion style
chai.should();

chai.use(chaiHttp);

describe('Bookstore', () => {
  describe('POST/register-user', () => {
    it('givenAlreadyRegisteredInput_shouldNot_registerRoleWithUser', function (done) {
      this.timeout(10000);
      const userDetails = testData.alreadyRegisteredUser;
      chai.request(server)
        .post('/register-user')
        .send(userDetails)
        .end((err, res) => {
          res.should.be.a('object');
          res.should.have.status(400);
          res.body.should.have.a.property('success').eq(false);
          res.body.should.have.a.property('message').eq('Email already exists');
          done();
        });
    });
  });

  describe('POST/register-user', () => {
    it('givenWrongUrl_shouldNot_registerRoleWithUser', function (done) {
      this.timeout(10000);
      const userDetails = testData.registerUserPositive;
      chai.request(server)
        .post('/register-use')
        .send(userDetails)
        .end((err, res) => {
          res.should.be.a('object');
          res.should.have.status(404);
          done();
        });
    });
  });
});
