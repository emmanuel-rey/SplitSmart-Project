import dotenv from 'dotenv';
import nodemailer from 'nodemailer';


// Load environmental variables 
dotenv.config();

// Environment variables for email configuration

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,  // User email address
        pass: process.env.EMAIL_PASS  // User email password or app password
    }
});


// Function to send email

const sendEmail = async ({ to, subject, html }) => {
    await transporter.sendMail({
        from: `"SplitSmart" <${process.env.EMAIL_USER}>`, // SplitSmart address
        to, // Recipient email address
        subject, // SplitSmart email subject
        html // HTML body content containing the invite link
    });
    console.log(`Email sent to ${to} with subject "${subject}"`);
}

export default sendEmail;