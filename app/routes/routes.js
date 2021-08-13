/**
 * @module       app
 * @file         routes.js
 * @description  it contains the http methods
 * @author       Ritika <spk2ritika1911@gmail.com>
 * @since        30/07/2021
-----------------------------------------------------------------------------------------------*/
const userController = require('../controllers/user');
const bookController = require('../controllers/books');
const helper = require('../middleware/helperFile');

module.exports = (app) => {
  // Registering a new user
  app.post('/register-user', helper.setRole('user'), userController.registerUser);

  // Registering a new admin
  app.post('/register-admin', helper.setRole('admin'), userController.registerUser);

  // User login
  app.post('/user-login', helper.checkRole('user'), userController.userLogin);

  // Admin login
  app.post('/admin-login', helper.checkRole('admin'), userController.userLogin);

  // forgot password
  app.post('/forgot-password', userController.forgotPassword);

  // reset password
  app.put('/reset-password', userController.resetPassword);

  // create books
  app.post('/books/createBook', helper.verifyRole1, bookController.addBook);

  // get books
  app.get('/books/getAllBooks', bookController.getAllBooks);

  // update books
  app.put('/books/updateBook/:bookId', helper.verifyRole1, bookController.updateBook);

  // delete book
  app.delete('/books/deleteBook/:bookId', helper.verifyRole1, bookController.deleteBook);
};
