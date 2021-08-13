/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
/* eslint-disable linebreak-style */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable linebreak-style */
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

chai.use(chaiHttp);
const crudData = require('./crudData.json');

chai.should();

let token = '';


// describe('Books CRUD Api', () => {
before((done) => {
  chai.request(server).post('/admin-login')
    .send(crudData.adminLogin)
    .end((err, res) => {
      token = res.body.token;
      done();
    });
});
// });
console.log('token', token);
describe('add book', () => {
  it('givenBookDetails_whenProper_shouldAddBook', (done) => {
    chai.request(server).post('/books/createBook')
      .set('token', token).send(crudData.addBookWithCorrectDetails)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('givenBookDetails_withWrongHttpMethod_shouldNotAddBook', (done) => {
    chai.request(server).put('/books/createBook')
      .set('token', token).send(crudData.addBookWithNoTitle)
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
});

describe('get all books', () => {
  it('givenBookDetails_whenProper_shouldGetAllBook', (done) => {
    chai.request(server).get('/books/getAllBooks')
      .set('token', token).send()
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('givenBookDetails_whenWrongHttpMethod_shouldNotGetAllBook', (done) => {
    chai.request(server).post('/books/getAllBooks')
      .set('token', token).send()
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });

  it('givenBookDetails_whenMissingToken_thenAlsoShouldGetAllBook', (done) => {
    chai.request(server).get('/books/getAllBooks')
      .send().end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});


describe('update book', () => {
  it('givenBookDetails_whenProper_shouldUpdateBook', (done) => {
    chai.request(server).put('/books/updateBook/611654e2a2f0493ca4ac2215')
      .set('token', token)
      .send(crudData.updateBookWithCorrectDetails)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('givenBookDetails_whenWrongId_shouldNotUpdateBook', (done) => {
    chai.request(server).put('/books/updateBook/611654e2a2f0493ca4ac2')
      .set('token', token)
      .send(crudData.updateBookWithCorrectDetails)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it('givenBookDetails_whenWrongURL_shouldNotUpdateBook', (done) => {
    chai.request(server).put('/books/updateBook/611654e2a2f0493ca4ac2215')
      .set('token', token)
      .send(crudData.updateBookWithCorrectDetails)
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });

  it('givenBookDetails_whenWrongHttpMathod_shouldNotUpdateBook', (done) => {
    chai.request(server).post('/books/updateBook/611654e2a2f0493ca4ac2215')
      .set('token', token)
      .send(crudData.updateBookWithCorrectDetails)
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
});

describe('delete book', () => {
  it.skip('givenBookDetails_whenProper_shouldDeleteBook', (done) => {
    chai.request(server).delete('/books/deleteBook/61166e8534a6c54ad86c0452')
      .set('token', token).end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('givenBookDetails_whenImproperId_shouldNotDeleteBook', (done) => {
    chai.request(server).delete('/books/deleteBook/61166e8534a6c54ad86c2')
      .set('token', token).end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it('givenBookDetails_whenImproperURL_shouldNotDeleteBook', (done) => {
    chai.request(server).post('/books/delete/61166e8534a6c54ad86c2')
      .set('token', token).end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });

  it('givenBookDetails_whenNoToken_shouldNotDeleteBook', (done) => {
    chai.request(server).delete('/books/delete/61166e8534a6c54ad86c2')
      .send().end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
});

