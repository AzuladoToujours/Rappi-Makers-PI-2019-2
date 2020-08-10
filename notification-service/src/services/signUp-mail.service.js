const sgMail = require('@sendgrid/mail');
require('dotenv').config();

const sendSignUpMailService = async (req, res) => {
  let email = req.body.email;
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to: `${email}`,
    from: 'rappimakers@gmail.com',
    templateId: 'd-4be7648f4eec41688e1c46a4a151a275',
  };
  sgMail.send(msg, (error, result) => {
    if (error) {
      console.log(error);
    } else {
      return res
        .status(200)
        .json({ message: `Un email ha sido enviado a ${email} ` });
    }
  });
};

module.exports = { sendSignUpMailService };
