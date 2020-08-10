const { Router } = require('express');
const router = Router();

const {
  getUserContractsService,
} = require('../../services/user/get-user-contracts.service');
const {
  getContractByIdService,
} = require('../../services/get-contract-by-id.service');
const {
  generateContract,
} = require('../../services/user/generate-contract.service');
const {
  requireUserSignIn,
  hasUserAuthorization,
} = require('../../middlewares/user/user.middleware');

router.get('/user/', requireUserSignIn, getUserContractsService);

router.get(
  '/user/:contractId',
  requireUserSignIn,
  hasUserAuthorization,
  getContractByIdService
);

router.get(
  '/user/generate/:contractId',
  requireUserSignIn,
  hasUserAuthorization,
  generateContract
);

module.exports = router;
