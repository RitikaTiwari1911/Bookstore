let chai = require('chai');
let chaiHttp = require('chai-http');
const { response } = require('express');
let server = require('../server');
const testData = require("./bookstore.data.json");

//Assertion style
chai.should();

chai.use(chaiHttp);

describe('Bookstore', () => {
    describe('POST/register-user', () => {
        it("givenAlreadyRegisteredInput_shouldNot_registerRoleWithUser",function(done) {
            this.timeout(10000)
            const userDetails = testData.alreadyRegisteredUser;
            chai.request(server)
            .post('/register-user')
            .send(userDetails)
            .end((err, res) => {
                res.should.be.a('object');
                res.should.have.status(400);
                res.body.should.have.a.property('success').eq(false)
                res.body.should.have.a.property('message').eq("Email already exists")
                done();
            })
        })
    })

    describe('POST/register-user', () => {
        it("givenWrongUrl_shouldNot_registerRoleWithUser",function(done) {
            this.timeout(10000)
            const userDetails = testData.registerUserPositive;
            chai.request(server)
            .post('/register-use')
            .send(userDetails)
            .end((err, res) => {
                res.should.be.a('object');
                res.should.have.status(404);
                done();
            })
        })
    })

    describe('POST/register-user', () => {
        it("givenWrongInput_shouldNot_registerRoleWithUser",function(done) {
            this.timeout(10000)
            const userDetails = testData.wrongInput;
            chai.request(server)
            .post('/register-user')
            .send(userDetails)
            .end((err, res) => {
                res.should.be.a('object');
                res.should.have.status(400);
                done();
            })
        })
    })
})

//describe("Negative testcases", () =>{
//    describe('POST/register-user', () => {
//        it("givenWrongInput_shouldNot_registerRoleWithUser",function(done) {
//            this.timeout(10000)
//            const userDetails = testData.wrongInput;
//            chai.request(server)
//            .post('/register-user')
//            .send(userDetails)
//            .end((err, res) => {
//                res.should.be.a('object');
//                res.should.have.status(400);
//                done();
//            })
//        })
//    })
//
//})
//