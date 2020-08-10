const FetchError = require('../../errors/fetch.error');
const PropertyRequiredError = require('../../errors/property-required.error');
const {
  updateVacancyFetch
} = require('../../fetchs/vacancy/update-vacancy-fetch');
const { getBalanceDAO } = require('../../dao/get-balance-dao');
const { updateBalanceDAO } = require('../../dao/update-balance-dao');
const { refreshTokenFetch } = require('../../fetchs/auth/refresh-token-fetch');
const { returnNewBalance } = require('../payment/recharge.service');

const updateVacancyService = async (req, res) => {
  if (!req.params.vacancyId) {
    let propertyRequired = new PropertyRequiredError('vacancyId');
    return propertyRequired.errorResponse(res);
  }

  let vacancyId = req.params.vacancyId;
  const token = req.headers.authorization.split(' ')[1];

  const response = await updateVacancyFetch(token, vacancyId, req.body);
  if (response.status == 200) {
    const { restaurantId } = req.auth;

    let restaurant = await getBalanceDAO(restaurantId);

    let newBalance = returnNewBalance(
      restaurant.balance,
      response.data.vacancyCost
    );
    await updateBalanceDAO(restaurantId, newBalance);

    let authResponse = await refreshTokenFetch(token);

    return res.status(200).json({
      message: response.data.message,
      token: authResponse.data.token,
      balance: authResponse.data.balance
    });
  } else if (response.code == 'ECONNREFUSED') {
    let fetch = 'vacancy';
    let fetchError = new FetchError(fetch);
    return fetchError.errorResponse(res);
  } else {
    return res.status(response.response.status).json(response.response.data);
  }
};

module.exports = { updateVacancyService };
