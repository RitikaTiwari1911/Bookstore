/**
 * @module       middleware
 * @file         userValidation.js
 * @description  holds the user input validation regex
 * @author       Ritika <spk2ritika1911@gmail.com>
 * @since        30/07/2021  
-----------------------------------------------------------------------------------------------*/

const joi = require('joi');

const userValidation = joi.object({
    firstName: joi.string().min(3).max(30).pattern(new RegExp('^[a-zA-Z ]{3,30}$')).required(),
    lastName: joi.string().min(3).max(30).pattern(new RegExp('^[a-zA-Z ]{3,30}$')).required(),
    emailId: joi.string().email().required().pattern(new RegExp()).required(),
    password: joi.string().pattern(new RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/)).required(),
    //role:joi.string()
});

const forgotPasswordValidation = joi.object({
    emailId: joi.string().email().required().pattern(new RegExp()).required()
})

const resetPasswordValidation = joi.object({
    password: joi.string().pattern(new RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/)).required()
})

module.exports = {userValidation, forgotPasswordValidation, resetPasswordValidation};