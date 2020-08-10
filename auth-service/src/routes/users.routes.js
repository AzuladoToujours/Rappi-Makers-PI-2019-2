const { Router } = require('express');
const router = Router();
const { userSignUpvalidations } = require('../middlewares/validators/users');
const {
  validator,
  passwordValidator,
} = require('../middlewares/validators/index');
const { userSignUpService } = require('../services/users/user-signup.service');

router.post(
  '/signup',
  userSignUpvalidations,
  validator,
  passwordValidator,
  userSignUpService
);

module.exports = router;
