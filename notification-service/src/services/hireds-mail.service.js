const sgMail = require('@sendgrid/mail');
require('dotenv').config();

const sendMailHireds = async (req, res) => {
  let { emails, link } = req.body;
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to: emails,
    from: 'rappimakers@gmail.com',
    templateId: 'd-fe09eeeafe5343d496c881daa23b132a',
    dynamic_template_data: {
      link: link,
    },
  };
  sgMail.sendMultiple(msg, (error, result) => {
    if (error) {
      console.log(error);
    } else {
      console.log('did it');
      return res.status(200).send();
    }
  });
};

module.exports = { sendMailHireds };
