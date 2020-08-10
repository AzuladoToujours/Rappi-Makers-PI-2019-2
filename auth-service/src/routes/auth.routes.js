const { Router } = require('express');
const router = Router();

const { signInService } = require('../services/signin.service');
const {
  forgotPasswordService,
} = require('../services/forgot-password.service');
const { resetPasswordService } = require('../services/reset-password.service');
const { passwordValidator } = require('../middlewares/validators/index');

router.post('/signin', signInService);
router.post('/forgotpassword', forgotPasswordService);
router.put('/reset-password/:token', passwordValidator, resetPasswordService);

module.exports = router;
