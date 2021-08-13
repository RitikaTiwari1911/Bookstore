/**
 * @module       app
 * @file         routes.js
 * @description  it contains the http methods
 * @author       Ritika <spk2ritika1911@gmail.com>
 * @since        30/07/2021
-----------------------------------------------------------------------------------------------*/
const userController = require('../controllers/user');
const bookController = require('../controllers/books');
// const helper = require('../middleware/helperFile');

module.exports = (app) => {
  // Registering a new user
  app.post('/register-user', (req, res) => {
    userController.registerUser(req, 'user', res);
  });

  // Registering a new admin
  app.post('/register-admin', (req, res) => {
    userController.registerUser(req, 'admin', res);
  });

  // User login
  app.post('/user-login', (req, res) => {
    userController.userLogin(req, 'user', res);
  });

  // Admin login
  app.post('/admin-login', (req, res) => {
    userController.userLogin(req, 'admin', res);
  });

  // forgot password
  app.post('/forgot-password', userController.forgotPassword);

  // reset password
  app.put('/reset-password', userController.resetPassword);

  // create books
  app.post('/books/createBook', bookController.addBook);

  // get books
  app.get('/books/getAllBooks', bookController.getAllBooks);

  // update books
  app.put('/books/updateBook/:bookId', bookController.updateBook);

  // delete book
  app.delete('/books/deleteBook/:bookId', bookController.deleteBook);
};
