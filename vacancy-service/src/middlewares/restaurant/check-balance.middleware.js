const moment = require('moment');
const NotEnoughBalanceError = require('../../errors/not-enough-balance.error');

const checkBalance = async (req, res, next) => {
  let vacancyCost = await calculateVacancyCost(req.body);
  let restaurantBalance = parseFloat(req.authRestaurant.restaurantBalance);
  const enoughBalance = checkEnoughBalance(vacancyCost, restaurantBalance, req);
  if (enoughBalance) {
    next();
  } else {
    let notEnoughBalance = new NotEnoughBalanceError();
    return notEnoughBalance.errorResponse(res);
  }
};

const checkBalanceAtUpdateVacancy = async (req, res, next) => {
  let vacancy = req.params.vacancy;

  let oldVacancyCost = await calculateVacancyCost(vacancy);
  let newVacancyCost = await calculateVacancyCost(req.body);

  if (newVacancyCost > oldVacancyCost) {
    let vacancyCost = parseFloat(newVacancyCost - oldVacancyCost);
    let restaurantBalance = parseFloat(req.authRestaurant.restaurantBalance);
    const enoughBalance = checkEnoughBalance(
      vacancyCost,
      restaurantBalance,
      req
    );

    if (!enoughBalance) {
      let notEnoughBalance = new NotEnoughBalanceError();
      return notEnoughBalance.errorResponse(res);
    } else {
      next();
    }
  } else if (oldVacancyCost > newVacancyCost) {
    let vacancyCost = oldVacancyCost - newVacancyCost;
    req.params.vacancyCost = vacancyCost;
    next();
  } else {
    req.params.vacancyCost = 0;
    next();
  }
};

const calculateVacancyCost = async (valuesAtVacancy) => {
  let startAt = moment(moment(valuesAtVacancy.start_at).format());
  let endAt = moment(moment(valuesAtVacancy.end_at).format());

  var vacancyDuration = parseFloat(
    moment.duration(endAt.diff(startAt)).asHours()
  );
  let vacants = parseFloat(valuesAtVacancy.offers_quantity);
  let paymentPerHour = parseFloat(valuesAtVacancy.payment_per_hour);

  let vacancyCost = vacancyDuration * paymentPerHour * vacants;

  return vacancyCost;
};

checkEnoughBalance = (vacancyCost, restaurantBalance, req) => {
  if (vacancyCost > restaurantBalance) {
    return false;
  } else {
    req.params.vacancyCost = -vacancyCost;
    return true;
  }
};

module.exports = {
  checkBalance,
  checkBalanceAtUpdateVacancy,
  calculateVacancyCost,
};
