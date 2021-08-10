const nodemailer = require('nodemailer')
require('dotenv').config();

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

        //send email
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


    