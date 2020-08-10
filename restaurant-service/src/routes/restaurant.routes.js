const express = require('express');
const router = express.Router();

const { validateToken } = require('../middlewares/restaurant.middleware');
const {
  getRestaurantsService
} = require('../services/get-restaurants.service');
const {
  getRestaurantByIdService
} = require('../services/get-restaurant-by-id.service');
const {
  getRestaurantByNitService
} = require('../services/get-restaurant-by-nit.service');
const {
  getRestaurantFromAuthService
} = require('../services/get-restaurant-auth.service');
const {
  createRestaurantService
} = require('../services/create-restaurant.service');
const {
  updateRestaurantPhotoService
} = require('../services/update-restaurant-photo.service');
const {
  updateRestaurantService
} = require('../services/update-restaurant.service');
const upload = require('../utils/multer');
const {
  requireSignIn,
  hasAuthorization
} = require('../middlewares/restaurant.middleware');
const {
  updateRestaurantValidations,
  validator
} = require('../middlewares/validators/restaurant-update.validator');

router.get('/', getRestaurantsService);
router.get('/:id', getRestaurantByIdService);
router.get('/nit/:nit', validateToken, getRestaurantByNitService);
router.get('/auth/:id', validateToken, getRestaurantFromAuthService);
router.post('/create', validateToken, createRestaurantService);
router.put(
  '/updatephoto/:id',
  requireSignIn,
  upload.single('photo'),
  updateRestaurantPhotoService
);
router.put(
  '/:id',
  requireSignIn,
  hasAuthorization,
  updateRestaurantValidations,
  validator,
  updateRestaurantService
);

module.exports = router;
