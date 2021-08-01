/**
 * @module       controller
 * @file         user.js
 * @description  userController holds the API 
 * @author       Ritika <spk2ritika1911@gmail.com>
 * @since        30/07/2021  
-----------------------------------------------------------------------------------------------*/
const userService = require('../services/user.js')
const { userValidation } = require('../middleware/userValidation')
const bcrypt = require('bcryptjs')

class userController{
    registerUser = (req, res) => {
        try{
            const validation = userValidation.validate(req.body)
            if(validation.error){
                res.status(400).send({message:validation.error.details[0].message})
            }
            const userDetails = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                emailId: req.body.emailId,
                password: req.body.password,
                role: req.body.role
            }

            userService.createUser(userDetails, (error, data) => {
                return ((error) ?
                    res.status(400).send({
                        success: false,
                        message: "Email already exists!"
                    }) :
                
                res.send({
                    success: true,
                    message: "You are successfully registered!!",
                    data: data
                }));
            });
        }catch(error){
            return res.status(500).send({
                success: false,
                message: error.message
            });
        };
    }

    /**
     * @description this will let the registerd user login into their account
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
     userLogin  = (req, res)=>{
        try{
            const loginInput = {
                emailId: req.body.emailId,
                password: req.body.password
            }
            userService.login(loginInput,(error, data)=>{
                return((error)? res.status(400).send({
                    success: false,
                    message: "Invalid credential"
                }) :
                res.send({
                    success: true,
                    message: "Login successful!",
                    data: data
                }));                
            });
        }catch(error){
            return res.send(500).send({
                success: false,
                message: error.message
            });
        }
    }
}

module.exports = new userController();
