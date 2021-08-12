/**
 * @module       app
 * @file         routes.js
 * @description  it contains the http methods
 * @author       Ritika <spk2ritika1911@gmail.com>
 * @since        30/07/2021
-----------------------------------------------------------------------------------------------*/
const userController = require('../controllers/user');

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
};
