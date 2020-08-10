const { Router } = require('express');
const router = Router();
const {
  restaurantSignUpvalidations,
  decryptToken,
} = require('../middlewares/validators/restaurants');
const {
  validator,
  passwordValidator,
} = require('../middlewares/validators/index');
const {
  restaurantSignUpService,
} = require('../services/restaurants/restaurant-signup.service');
const {
  refreshTokenService,
} = require('../services/restaurants/refresh-token.service');

router.post(
  '/signup',
  restaurantSignUpvalidations,
  validator,
  passwordValidator,
  restaurantSignUpService
);

router.get('/refreshtoken', decryptToken, refreshTokenService);

module.exports = router;
