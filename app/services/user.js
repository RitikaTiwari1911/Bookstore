/**
 * @module       service
 * @file         user.js
 * @description  service class holds the callback method for controller 
 * @author       Ritika <spk2ritika1911@gmail.com>
 * @since        30/07/2021  
-----------------------------------------------------------------------------------------------*/
const userModel = require('../model/user.js');
const helper = require('../middleware/helperFile')

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
}

module.exports = new userService();