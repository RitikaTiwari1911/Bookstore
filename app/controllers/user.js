/**
 * @module       controller
 * @file         user.js
 * @description  userController holds the API
 * @author       Ritika <spk2ritika1911@gmail.com>
 * @since        30/07/2021
-----------------------------------------------------------------------------------------------*/
const userService = require('../services/user');
const { userValidation, resetPasswordValidation } = require('../middleware/userValidation');

class UserController {
    registerUser = (req, role, res) => {
      try {
        const validation = userValidation.validate(req.body);
        if (validation.error) {
          res.status(400).send({ message: validation.error.details[0].message });
        }
        const userDetails = {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          emailId: req.body.emailId,
          password: req.body.password,
          role,
        };

        userService.createUser(userDetails, (error, data) => ((error)
          ? res.status(400).send({
            success: false,
            message: 'Email already exists',
          })

          : res.send({
            success: true,
            message: 'You are successfully registered!!',
            data,
          })));
      } catch (error) {
        return res.status(500).send({
          success: false,
          message: error.message,
        });
      }
    }

    /**
     * @description this will let the registerd user login into their account
     * @param {*} req
     * @param {*} res
     * @returns
     */
    userLogin = (req, role, res) => {
      try {
        const loginInput = {
          emailId: req.body.emailId,
          password: req.body.password,
          role,
        };
        userService.login(loginInput, (error, data) => ((error) ? res.status(400).send({
          success: false,
          message: error,
        })
          : res.send({
            success: true,
            message: 'Login successful!',
            data,
          })));
      } catch (error) {
        return res.status(500).send({
          success: false,
          message: error.message,
        });
      }
    }

    /**
     * description controller function for forgot password
     * @param {*} req
     * @param {*} res
     * @returns
     */
   forgotPassword = (req, res) => {
     try {
       const userData = {
         emailId: req.body.emailId,
       };
       userService.forgotPass(userData, (error) => ((error) ? res.status(400).send({
         success: false,
         message: error,
       })
         : res.status({
           success: true,
           message: 'Link sent successfully',
         })));
     } catch (error) {
       return res.status(500).send({
         sucess: false,
         message: error.message,
       });
     }
   }

    resetPassword = (req, res) => {
      try {
        const passwordValidation = resetPasswordValidation.validate(req.body);
        if (passwordValidation.error) {
          res.status(400).send({ message: passwordValidation.error.details[0].message });
        }

        const userData = {
          token: req.headers.token,
          password: req.body.password,
        };
        userService.passwordReset(userData, (error, data) => ((error) ? res.status(400).send({
          sucess: false,
          message: error,
        })
          : res.status(200).send({
            success: true,
            message: 'Your password has been reset successfully!!',
            data,
          })));
      } catch (error) {
        return res.status(500).send({
          sucess: false,
          message: error.message,

        });
      }
    }
}

module.exports = new UserController();
