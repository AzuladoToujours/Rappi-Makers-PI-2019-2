const sgMail = require('@sendgrid/mail');
require('dotenv').config();

const sendForgotPasswordMail = async (req, res) => {
  let { email, token } = req.body;
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to: email,
    from: 'rappimakers@gmail.com',
    templateId: 'd-5c44b705cf0e457b8598d3e35f1e0a6f',
    dynamic_template_data: {
      token: token,
    },
  };
  sgMail.send(msg, (error, result) => {
    if (error) {
      console.log(error);
    } else {
      console.log(result);
      return res.status(200).send();
    }
  });
};

module.exports = { sendForgotPasswordMail };
