const nodemailer = require('nodemailer');
const MailKey = require('../../secret/mail-key.json')

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: MailKey.EMAIL,
        pass: MailKey.EMAIL_APP_PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    }
});

module.exports = async (from_mail, to_mail, subject, content) => {
    await transporter.sendMail({
        from: from_mail,
        to: to_mail,
        subject: subject,
        html: content,
        amp: content,
    })
}