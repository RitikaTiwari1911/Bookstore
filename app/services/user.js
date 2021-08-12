/**
 * @module       service
 * @file         user.js
 * @description  service class holds the callback method for controller 
 * @author       Ritika <spk2ritika1911@gmail.com>
 * @since        30/07/2021  
-----------------------------------------------------------------------------------------------*/
const userModel = require('../model/user.js');
const helper = require('../middleware/helperFile')
const sendEmail = require('../../utility/nodemailer')
require('dotenv').config();
const logger = require('../../config/logger')
class userService{
    /**
     * @param {*} userDetails 
     * @param {*} callback 
     * @returns 
     */
    createUser = (userDetails, callback) => {
        try{
            userModel.create(userDetails, (error, data) => {
                if(error){
                    logger.error("Error expected during registration", error);
                    callback(error, null)
                }else{
                    //logger.info("User registered successfully!!", data);
                    callback(null, data)
                }
                })
        }catch(error){
            return callback(error,null);
        }
    }

    /**
     * @description callback for login
     * @param {*} loginInput 
     * @param {*} callback 
     * @returns 
     */
     login = (loginInput, callback)=>{
        try{
            userModel.login(loginInput,(error, data)=>{
                if(!data){
                    logger.error("Unauthorized login", error);
                    return callback("Unauthorized login!!", null)
                }
                if(helper.checkByBcrypt(loginInput.password, data.password)){
                    const token = helper.generateToken(loginInput)
                    return(token)?callback(null, token):callback("Incorrect password", null);
                }
                else if(error){
                    logger.error("Some error occured while loggin in!", error);
                    callback(error, null)
                }
            })
        }catch(error){
            return callback(error,null);
        }
    }

    /**
     * @description it acts as a middleware between controller and model for forgot password
     * @param {*} emailId 
     * @param {*} callback 
     */
    forgotPass = (emailId, callback) =>{
        let link;
        let newToken;
        userModel.forgotPass(emailId, (error, data) =>{
            if(error){
                logger.error("Some error occured", error)
                callback(error, null)
             }else{
                newToken = helper.generateToken(data)
             } 
            link =`${process.env.PASSWORD_URL}${newToken}`,
            sendEmail(data.emailId, "Password Reset Link :: Bookstore Application", link),
            callback(null, link)
        })
    };

    passwordReset = (userInput, callback) => {
        var emailId = helper.getEmailFromToken(userInput.token)
        var inputData = {
            emailId: emailId,
            password: userInput.password
        }

        userModel.updatePassword(inputData, (error, data) =>{
            if(error){
                logger.error("Some error occured while updating password", error)
                callback(error, null)
             }else{
                callback(null, data)
             } 
        })
    }
}


module.exports = new userService();