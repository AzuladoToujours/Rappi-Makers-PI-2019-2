const FetchError = require('../../errors/fetch.error');
const {
  fetchToPayment
} = require('../../fetchs/payment/register-transaction-fetch');
const { getBalanceDAO } = require('../../dao/get-balance-dao');
const { updateBalanceDAO } = require('../../dao/update-balance-dao');
const { refreshTokenFetch } = require('../../fetchs/auth/refresh-token-fetch');

const rechargeBalanceService = async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const response = await fetchToPayment(token, req.body);
  if (response.status == 200) {
    //const amountToAdd = parseFloat(req.body.amount);
    const restaurantId = req.auth.restaurantId;
    let restaurant = await getBalanceDAO(restaurantId);
    let newBalance = returnNewBalance(restaurant.balance, req.body.amount);
    await updateBalanceDAO(restaurantId, newBalance);

    let response = await refreshTokenFetch(token);

    return res.status(200).json({
      message: 'Recharged succesfully',
      token: response.data.token,
      balance: response.data.balance
    });
  } else if (response.code == 'ECONNREFUSED') {
    let fetch = 'payment';
    let fetchError = new FetchError(fetch);
    return fetchError.errorResponse(res);
  } else {
    return res.status(response.response.status).json(response.response.data);
  }
};

const returnNewBalance = (oldBalance, amountToAdd) => {
  return parseFloat(oldBalance) + parseFloat(amountToAdd);
};

module.exports = { rechargeBalanceService, returnNewBalance };
