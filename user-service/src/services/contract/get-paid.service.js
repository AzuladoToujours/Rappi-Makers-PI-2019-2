const { getBalanceDAO } = require('../../dao/get-balance-dao');
const { updateBalanceDAO } = require('../../dao/update-balance-dao');

const getPaidService = async (req, res) => {
  let userId = req.params.userId;
  let user = await getBalanceDAO(userId);
  let amountToAdd = req.body.amount;
  let newBalance = parseFloat(user.balance) + parseFloat(amountToAdd);
  await updateBalanceDAO(userId, newBalance);

  return res.status(200).send();
};

module.exports = { getPaidService };
