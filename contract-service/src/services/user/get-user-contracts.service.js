const { getUserContractsDAO } = require('../../dao/get-contracts-dao');
const { fixManyDatesAndHours } = require('../fix-dates-hours.service');

const getUserContractsService = async (req, res) => {
  let userId = req.authUser.userId;
  let contracts = await getUserContractsDAO(userId);

  contracts = fixManyDatesAndHours(contracts);

  return res.status(200).json(contracts);
};

module.exports = { getUserContractsService };
