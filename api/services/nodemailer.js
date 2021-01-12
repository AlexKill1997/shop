const mailer = require('nodemailer')

module.exports = async ({ to, text, html = false, subject,attachments = [] }) => {
  const transporter = mailer.createTransport({
    host: process.env.EMAIL_SERVICE,
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_LOGIN,
      pass: process.env.EMAIL_PASSWORD
    }
  })

  const mail = await transporter.sendMail({
    from: process.env.EMAIL_FROM_ADRESS,
    to: to || process.env.EMAIL_TO_ADRESS,
    subject,
    text,
    html,
    attachments,
  })
  
  return mail
}