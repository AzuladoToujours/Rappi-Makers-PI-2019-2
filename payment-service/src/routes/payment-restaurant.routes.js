const { Router } = require('express');
router = Router();

const {
  requireRestaurantSignIn,
} = require('../middlewares/restaurant/restaurant.middlewares');
const {
  createRestaurantTransanctionService,
} = require('../services/restaurant/create-restaurant-transaction.service');
router.post(
  '/registertransaction',
  requireRestaurantSignIn,
  createRestaurantTransanctionService
);

module.exports = router;
