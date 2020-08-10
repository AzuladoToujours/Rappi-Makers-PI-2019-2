const express = require('express');
const router = express.Router();

const { requireSignIn } = require('../middlewares/restaurant.middleware');
const {
  rechargeBalanceService
} = require('../services/payment/recharge.service');

router.post('/recharge', requireSignIn, rechargeBalanceService);

module.exports = router;
