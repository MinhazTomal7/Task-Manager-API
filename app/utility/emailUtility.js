import nodemailer from 'nodemailer';
import {EMAIL_PASSWORD, EMAIL_USER} from "../config/config.js";

async function EmailSend(EmailTo,EmailText, EmailSubject,EmailHTMLBody) {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: EMAIL_USER,
                pass: EMAIL_PASSWORD,
            },
        });

        const mailOptions = {
            from: EMAIL_USER,
            to: EmailTo,
            subject: EmailText,
            text: EmailSubject,
            html: EmailHTMLBody,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        return false;
    }
}

export default EmailSend


