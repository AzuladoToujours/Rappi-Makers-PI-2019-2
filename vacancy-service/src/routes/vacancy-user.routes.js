const { Router } = require('express');
const router = Router();
const { requireUserSignIn } = require('../middlewares/user/user.middleware');
const {
  checkVacancyStatus,
} = require('../middlewares/user/check-vacancy-status.middleware');
const {
  checkUserInVacancyAdd,
  checkUserInVacancyRemove,
} = require('../middlewares/user/check-user-in-vacancy.middleware');

const {
  addCandidateService,
} = require('../services/user/add-candidate.service');
const {
  removeCandidateService,
} = require('../services/user/remove-candidate.service');

const {
  notifyCandidatesAndHiredsService,
} = require('../services/user/notify-candidates-hireds.service');

router.put(
  '/:vacancyId/addcandidate',
  requireUserSignIn,
  checkVacancyStatus,
  checkUserInVacancyAdd,
  addCandidateService
);

router.put(
  '/:vacancyId/removecandidate',
  requireUserSignIn,
  checkVacancyStatus,
  checkUserInVacancyRemove,
  removeCandidateService
);

module.exports = router;
