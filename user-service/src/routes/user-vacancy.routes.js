const express = require('express');
const router = express.Router();

const { requireSignIn } = require('../middlewares/user.middleware');
const {
  applyToVacancyService
} = require('../services/vacancy/apply-vacancy.service');
const {
  retireFromVacancyService
} = require('../services/vacancy/retire-vacancy.service');

router.put('/apply/:vacancyId', requireSignIn, applyToVacancyService);
router.put('/retire/:vacancyId', requireSignIn, retireFromVacancyService);

module.exports = router;
