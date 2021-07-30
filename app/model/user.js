/**
 * @module       Model
 * @file         user.js
 * @description  schema holds the database Schema 
 * @author       Ritika <spk2ritika1911@gmail.com>
 * @since        30/07/2021  
-----------------------------------------------------------------------------------------------*/
//connecting to the mongoDB through mongoose
const mongoose = require('mongoose');

//schema for addressbook
const userSchema = mongoose.Schema({
    firstName:{
        type: String,
        required: true,
        validate: /^[a-zA-Z ]{3,30}$/
    },
    lastName: {
        type: String,
        required: true,
        validate: /^[a-zA-Z ]{3,30}$/
    },
    emailId:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true,
        validate: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
    },{
        //Applying time stamp
        timestamps: true
    });

    //exporting model module
    module.exports = mongoose.model("bookstore", userSchema)