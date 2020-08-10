const { createPaymentDAO } = require('../../dao/create-payment-dao');
const {
  createContractTransactionDAO,
} = require('../../dao/contract-user/create-contract-transaction-dao');
const { payToUserFetch } = require('../../fetch/user/pay-user-fetch');

const createContractTransactionService = async (req, res) => {
  const { contractId, userId, amount } = req.body;

  let createAndGetId = await createPaymentDAO(amount);
  await createContractTransactionDAO(contractId, userId, createAndGetId);
  await payToUserFetch(userId, amount);

  return res.status(200).send();
};

module.exports = { createContractTransactionService };
