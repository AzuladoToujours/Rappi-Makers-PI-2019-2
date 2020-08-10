const { Router } = require('express');
const router = Router();

const {
  createContractService,
} = require('../services/create-contract.service');

router.post('/createcontract', createContractService);

module.exports = router;
