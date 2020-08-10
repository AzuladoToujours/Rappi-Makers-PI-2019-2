const sgMail = require('@sendgrid/mail');
require('dotenv').config();

const sendMailHiredsAndCandidates = async (req, res) => {
  let { emails, link } = req.body;
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to: emails,
    from: 'rappimakers@gmail.com',
    templateId: 'd-3f6d9e5c71e54462ad63e06305c80ebf',
    dynamic_template_data: {
      link: link,
    },
  };
  sgMail.sendMultiple(msg, (error, result) => {
    if (error) {
      console.log(error);
    } else {
      console.log(result);
      return res.status(200).send();
    }
  });
};

module.exports = { sendMailHiredsAndCandidates };
