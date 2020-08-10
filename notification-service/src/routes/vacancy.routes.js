const { Router } = require('express');
const router = Router();

const {
  sendMailHiredsAndCandidates,
} = require('../services/hireds-candidates-mail.service');

const { sendMailHireds } = require('../services/hireds-mail.service');

router.post('/notifycandidateshireds', sendMailHiredsAndCandidates);

router.post('/notifyhireds', sendMailHireds);

module.exports = router;
