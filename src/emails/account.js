const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'radwa.elyamany92@gmail.com',
    subject: 'Thanks for joining in',
    text: `Welcome to the app, ${name}`
  });
};

const sendCancelEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'radwa.elyamany92@gmail.com',
    subject: 'Sorry to see you go',
    text: `Goodbye, ${name}`
  });
};

module.exports = {
  sendWelcomeEmail,
  sendCancelEmail
};
