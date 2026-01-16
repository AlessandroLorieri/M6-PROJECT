const nodemailer = require("nodemailer");


class EmailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: Number(process.env.MAIL_PORT),
            secure: process.env.MAIL_SECURE === "true",
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });
    }

    async send({to, subject, html}) {
        const mailOptions = {
            from: process.env.MAIL_FROM,
            to,
            subject,
            html,
        };

        return this.transporter.sendMail(mailOptions);
    }
}

module.exports = EmailService;
