const express = require('express');
const router = express.Router();
const { getPaidService } = require('../services/contract/get-paid.service');

router.put('/pay/:userId', getPaidService);

module.exports = router;
