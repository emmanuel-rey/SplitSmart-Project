import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export const sendEmail = async (to, subject, text) => {
    
    try{
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER, // Your email address
                pass: process.env.EMAIL_PASS  // Your email password or app password
            }

        });

        const mailOptions = {
            from: process.env.EMAIL_USER, 
            to,
            subject,
            text
            
        };


        await transporter.sendMail(mailOptions);

    } catch (error) {
        console.error('Error sending email:', error);
    };

};