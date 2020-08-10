const { Router } = require('express');
const router = Router();
const {
  requireRestaurantSignIn,
} = require('../middlewares/restaurant/restaurant.middleware');
const {
  hasRestaurantAuthorization,
} = require('../middlewares/restaurant/has-authorization.middleware');
const {
  vacancyValidations,
  vacancyValidator,
} = require('../middlewares/vacancy.validator');

const {
  checkBalance,
  checkBalanceAtUpdateVacancy,
} = require('../middlewares/restaurant/check-balance.middleware');
const { checkDates } = require('../middlewares/check-dates.middleware');
const {
  checkVacancyStatus,
} = require('../middlewares/user/check-vacancy-status.middleware');
const {
  checkUserInVacancyHire,
} = require('../middlewares/user/check-user-in-vacancy.middleware');
const { createVacancyService } = require('../services/create-vacancy.service');
const { updateVacancyService } = require('../services/update-vacancy.service');
const { deleVacancyService } = require('../services/delete-vacancy.service');
const {
  hireCandidateService,
} = require('../services/restaurant/hire-candidate.service');

router.post(
  '/newVacancy',
  requireRestaurantSignIn,
  vacancyValidations,
  vacancyValidator,
  checkDates,
  checkBalance,
  createVacancyService
);

// TESTING;
router.post(
  '/test/newVacancy',
  requireRestaurantSignIn,
  vacancyValidations,
  vacancyValidator,
  checkBalance,
  createVacancyService
);

router.put(
  '/:vacancyId',
  requireRestaurantSignIn,
  hasRestaurantAuthorization,
  vacancyValidations,
  vacancyValidator,
  checkDates,
  checkBalanceAtUpdateVacancy,
  updateVacancyService
);

//TESTING
router.put(
  '/test/:vacancyId',
  requireRestaurantSignIn,
  hasRestaurantAuthorization,
  vacancyValidations,
  vacancyValidator,
  checkBalanceAtUpdateVacancy,
  updateVacancyService
);

router.put(
  '/:vacancyId/hire',
  requireRestaurantSignIn,
  hasRestaurantAuthorization,
  checkVacancyStatus,
  checkUserInVacancyHire,
  hireCandidateService
);

router.delete(
  '/:vacancyId',
  requireRestaurantSignIn,
  hasRestaurantAuthorization,
  checkVacancyStatus,
  deleVacancyService
);

module.exports = router;
