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

class userService{
    /**
     * @param {*} userDetails 
     * @param {*} callback 
     * @returns 
     */
    createUser = (userDetails, callback) => {
        try{
            userModel.create(userDetails, (error, data) => {
                return error? callback(error, null): callback(null, data)    
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
                    return callback("Unauthorized login!!", null)
                }
                if(helper.checkByBcrypt(loginInput.password, data.password)){
                    const token = helper.generateToken(loginInput)
                    return(token)?callback(null, token):callback("Incorrect password", null);
                }
                else if(error){
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
        userModel.forgotPass(emailId, (err, data) =>{
            return err? callback(err, null)
            : newToken = helper.generateToken(data),
            link =`${'https://localhost:3000/reset-password/'}${newToken}`,

            sendEmail(data.emailId, "Password Reset Request", link),
            callback(null, link)
        })
    };
}


module.exports = new userService();