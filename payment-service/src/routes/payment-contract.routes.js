const { Router } = require('express');
router = Router();

const {
  createContractTransactionService,
} = require('../services/contract-user/create-contract-transaction-service');

router.post('/paytouser', createContractTransactionService);

module.exports = router;
