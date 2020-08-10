const { Router } = require('express');
const router = Router();
const { getVacanciesService } = require('../services/get-vacancies.service');
const {
  getVacancyByIdService,
} = require('../services/get-vacancy-by-id.service');
const {
  checkRestaurantLogIn,
} = require('../middlewares/restaurant/has-authorization.middleware');

router.get('/', getVacanciesService);
router.get('/:id', checkRestaurantLogIn, getVacancyByIdService);

module.exports = router;
