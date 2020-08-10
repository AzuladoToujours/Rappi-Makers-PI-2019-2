const { fixOneDatesAndHours } = require('./fix-dates-hours.service');

const getContractByIdService = async (req, res) => {
  let contract = req.params.contract;

  contract = fixOneDatesAndHours(contract);

  return res.status(200).json(contract);
};

module.exports = { getContractByIdService };
