const { dbQuery } = require('../../config/index');
const { createContractTransactionQuery } = require('../queries/queries');

const createContractTransactionDAO = async (contractId, userId, paymentId) => {
  try {
    await dbQuery.query(createContractTransactionQuery, [
      contractId,
      userId,
      paymentId,
    ]);
  } catch (e) {
    console.log(e);
  }
};

module.exports = { createContractTransactionDAO };
