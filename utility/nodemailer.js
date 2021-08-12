/**
 * @module       utility
 * @file         nodemailer.js
 * @description  it contains the code for nodemailer to send email to user 
 * @author       Ritika <spk2ritika1911@gmail.com>
 * @since        11/08/2021  
-----------------------------------------------------------------------------------------------*/
const nodemailer = require('nodemailer')
require('dotenv').config();

/**
 * @description used to send email to the user 
 * @param {*} emailId 
 * @param {*} subject 
 * @param {*} link 
 * @returns 
 */
const sendEmail = async(emailId, subject, link) =>{
    try{
        const transporter = nodemailer.createTransport({
            host: 'smpt.gmail.com',
            service: 'gmail',
            port: 467,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            },
        });

        transporter.sendMail({
            from: process.env.EMAIL,
            to: emailId,
            subject: subject,
            html: `
            <h2>Please click on the link</h2>
            <p>${link}</p>`
        })
    }catch(error){
            return error;
        }
    }

    module.exports = sendEmail;