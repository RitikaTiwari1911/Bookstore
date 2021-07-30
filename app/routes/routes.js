/**
 * @module       app
 * @file         routes.js
 * @description  it contains the http methods 
 * @author       Ritika <spk2ritika1911@gmail.com>
 * @since        30/07/2021  
-----------------------------------------------------------------------------------------------*/
const userController = require('../controllers/user.js')
module.exports = (app) =>{
    //Registering a new user
    app.post('/registerUser', userController.registerUser)
}