const express = require('express');
const router = express.Router();

const { requireSignIn } = require('../middlewares/restaurant.middleware');
const {
  createVacancyService
} = require('../services/vacancy/create-vacancy.service');
const {
  createVacancyTestService
} = require('../services/vacancy/create-vacancy-test.service');
const {
  updateVacancyService
} = require('../services/vacancy/update-vacancy.service');
const {
  updateVacancyTestService
} = require('../services/vacancy/update-vacancy-test.service');
const {
  hireCandidateService
} = require('../services/vacancy/hire-candidate.service');
const {
  deleteVacancyService
} = require('../services/vacancy/delete-vacancy.service');

router.post('/createVacancy', requireSignIn, createVacancyService);
router.post('/test/createVacancy', requireSignIn, createVacancyTestService);
router.put('/updateVacancy/:vacancyId', requireSignIn, updateVacancyService);
router.put(
  '/test/updateVacancy/:vacancyId',
  requireSignIn,
  updateVacancyTestService
);
router.put(
  '/vacancy/:vacancyId/hirecandidate',
  requireSignIn,
  hireCandidateService
);
router.delete('/deleteVacancy/:vacancyId', requireSignIn, deleteVacancyService);

module.exports = router;
