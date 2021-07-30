/**
 * @module       service
 * @file         user.js
 * @description  service class holds the callback method for controller 
 * @author       Ritika <spk2ritika1911@gmail.com>
 * @since        30/07/2021  
-----------------------------------------------------------------------------------------------*/
const userModel = require('../model/user.js');

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
                return error? callback(error, null): callback(null, data)
            })
        }catch(error){
            return callback(error,null);
        }
    }
}

module.exports = new userService();