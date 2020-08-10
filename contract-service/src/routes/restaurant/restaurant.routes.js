const { Router } = require('express');
const router = Router();

const {
  getRestaurantsContractsService,
} = require('../../services/restaurant/get-restaurant-contracts.service');
const {
  getContractByIdService,
} = require('../../services/get-contract-by-id.service');
const {
  requireRestaurantSignIn,
  hasRestaurantAuthorization,
} = require('../../middlewares/restaurant/restaurant.middlewares');

router.get(
  '/restaurant/',
  requireRestaurantSignIn,
  getRestaurantsContractsService
);

router.get(
  '/restaurant/:contractId',
  requireRestaurantSignIn,
  hasRestaurantAuthorization,
  getContractByIdService
);

module.exports = router;
