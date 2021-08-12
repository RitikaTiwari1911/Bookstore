/* eslint-disable no-unused-expressions */
/* eslint-disable consistent-return */
/**
 * @module       service
 * @file         user.js
 * @description  service class holds the callback method for controller
 * @author       Ritika <spk2ritika1911@gmail.com>
 * @since        30/07/2021
-----------------------------------------------------------------------------------------------*/
const userModel = require('../model/user');
const helper = require('../middleware/helperFile');
const sendEmail = require('../../utility/nodemailer');
require('dotenv').config();
const logger = require('../../config/logger');

class UserService {
    /**
     * @param {*} userDetails
     * @param {*} callback
     * @returns
     */
    createUser = (userDetails, callback) => {
      try {
        userModel.create(userDetails, (error, data) => {
          if (error) {
            logger.error('Error expected during registration', error);
            callback(error, null);
          } else {
            logger.info('User registered successfully!!', data);
            callback(null, data);
          }
        });
      } catch (error) {
        return callback(error, null);
      }
    }

    /**
     * @description callback for login
     * @param {*} loginInput
     * @param {*} callback
     * @returns
     */
     // eslint-disable-next-line consistent-return
     login = (loginInput, callback) => {
       try {
         userModel.login(loginInput, (error, data) => {
           if (!data) {
             logger.error('Unauthorized login', error);
             return callback('Unauthorized login!!', null);
           }
           if (helper.checkByBcrypt(loginInput.password, data.password)) {
             const token = helper.generateToken(loginInput);
             return (token) ? callback(null, token) : callback('Incorrect password', null);
           }
           if (error) {
             logger.error('Some error occured while loggin in!', error);
             callback(error, null);
           }
         });
       } catch (error) {
         return callback(error, null);
       }
     }

    /**
     * @description it acts as a middleware between controller and model for forgot password
     * @param {*} emailId
     * @param {*} callback
     */
    // eslint-disable-next-line consistent-return
    forgotPass = (emailId, callback) => {
      try {
        let link;
        let newToken;
        userModel.forgotPass(emailId, (error, data) => {
          if (error) {
            logger.error('Some error occured', error);
            callback(error, null);
          } else {
            newToken = helper.generateToken(data);
          }
          // eslint-disable-next-line no-sequences
          link = `${process.env.PASSWORD_URL}${newToken}`,
          sendEmail(data.emailId, 'Password Reset Link :: Bookstore Application', link),
          callback(null, link);
          logger.info('Password rest link sent successfully', data);
        });
      } catch (error) {
        return callback(error, null);
      }
    };

    // eslint-disable-next-line consistent-return
    passwordReset = (userInput, callback) => {
      try {
        const emailId = helper.getEmailFromToken(userInput.token);
        const inputData = {
          emailId,
          password: userInput.password,
        };

        userModel.updatePassword(inputData, (error, data) => {
          if (error) {
            logger.error('Some error occured while updating password', error);
            callback(error, null);
          } else {
            logger.info('Password has been reset successfully', data);
            callback(null, data);
          }
        });
      } catch (error) {
        return callback(error, null);
      }
    }
}

module.exports = new UserService();
