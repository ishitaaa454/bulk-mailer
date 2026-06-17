require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

async function sendEmail(to, subject, message) {
    return transporter.sendMail({
        from: process.env.FROM_EMAIL,
        to,
        subject,
        text: message
    });
}

module.exports = { sendEmail };