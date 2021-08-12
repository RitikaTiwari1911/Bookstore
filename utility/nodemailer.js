/**
 * @module       utility
 * @file         nodemailer.js
 * @description  it contains the code for nodemailer to send email to user 
 * @author       Ritika <spk2ritika1911@gmail.com>
 * @since        11/08/2021  
-----------------------------------------------------------------------------------------------*/
const nodemailer = require('nodemailer')
require('dotenv').config();
const logger = require('../config/logger')
const ejs = require('ejs')


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

        ejs.renderFile('view/email.ejs', (error, result) =>{
            if(error){
                logger.error("nodemailer error", error)
            }else{
                const mailOptions = {
                    from: process.env.EMAIL,
                    to: emailId,
                    subject: subject,
                    html: `
                    ${result}<p>${link}</p>`
                }

        transporter.sendMail(mailOptions,(error, info) =>{
            const sendEmailInfo = error? logger.error('error',error):logger.info('info', info);
            return sendEmailInfo;

            })
        }
    })
    

    }catch(error){
            return error;
        }
    }

module.exports = sendEmail;