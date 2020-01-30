const sgMail = require('@sendgrid/mail');
const sendgridApiKey = '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';

sgMail.setApiKey(sendgridApiKey);

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'enn.shi@gmail.com',
        subject: 'Welcome',
        text: `Hello ${name}`
    })
};

module.exports = { sendWelcomeEmail };
