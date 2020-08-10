const { getVacancyByIdDAO } = require('../../dao/get-vacancies-dao');
const NotFoundError = require('../../errors/not-found.error');
const UnauthorizeError = require('../../errors/unauthorize-error');
const PropertyRequiredError = require('../../errors/property-required.error');
var jwt = require('jsonwebtoken');
require('dotenv').config();

exports.hasRestaurantAuthorization = async (req, res, next) => {
  if (!req.params.vacancyId) {
    let propertyRequired = new PropertyRequiredError('vacancyId');
    return propertyRequired.errorResponse(res);
  }
  let vacancyId = req.params.vacancyId;
  let vacancy = await getVacancyByIdDAO(vacancyId);
  if (!vacancy) {
    let notFound = new NotFoundError();
    return notFound.errorResponse(res);
  }

  const hasAuthorization =
    req.authRestaurant.restaurantId === vacancy.restaurant_id;

  if (!hasAuthorization) {
    let unauthorize = new UnauthorizeError();
    return unauthorize.errorResponse(res);
  }

  req.params.vacancy = vacancy;
  next();
};

exports.checkRestaurantLogIn = async (req, res, next) => {
  const token = req.headers.authorization
    ? req.headers.authorization.split(' ')[1]
    : null;

  try {
    var decodedToken = jwt.verify(token, process.env.RESTAURANT_SECRET);

    req.params.restaurantId = decodedToken.restaurantId;
    next();
  } catch (e) {
    next();
  }
};
