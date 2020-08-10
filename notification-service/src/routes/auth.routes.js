const { Router } = require('express');
const router = Router();

const { sendSignUpMailService } = require('../services/signUp-mail.service');
const {
  sendForgotPasswordMail,
} = require('../services/forgot-password-mail.service');

router.post('/sendsignupmail', sendSignUpMailService);
router.post('/sendforgotpasswordmail', sendForgotPasswordMail);

module.exports = router;
