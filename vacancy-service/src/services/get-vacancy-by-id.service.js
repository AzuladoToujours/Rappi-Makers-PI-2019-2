const { getVacancyByIdDAO } = require('../dao/get-vacancies-dao');
const PropertyRequiredError = require('../errors/property-required.error');
const NotFoundError = require('../errors/not-found.error');
const moment = require('moment-timezone');

/**
 *Returns single vacancy from the database
 * @param {object} req
 * @param {object} res
 * @returns {json} json
 */
const getVacancyByIdService = async (req, res) => {
  if (!req.params.id) {
    let propertyRequired = new PropertyRequiredError(id);
    return propertyRequired.errorResponse(res);
  }

  let id = req.params.id;
  let vacancy = await getVacancyByIdDAO(id);

  if (!vacancy) {
    let notFound = new NotFoundError();

    return notFound.errorResponse(res);
  }

  let restaurantLogged = req.params.restaurantId
    ? req.params.restaurantId
    : false;

  if (restaurantLogged == vacancy.restaurant_id) {
    vacancy.candidates = vacancy.candidates.filter(
      (val) => !vacancy.hireds.includes(val)
    );

    vacancy = fixDatesAndHours(vacancy);

    return res.status(200).json(vacancy);
  } else {
    vacancy.hireds = undefined;
    vacancy = fixDatesAndHours(vacancy);
    return res.status(200).json(vacancy);
  }
};

const fixDatesAndHours = (vacancy) => {
  vacancy.start_at = moment.tz(vacancy.start_at, 'America/Bogota').format();
  vacancy.end_at = moment.tz(vacancy.end_at, 'America/Bogota').format();
  vacancy.created_at = moment.tz(vacancy.created_at, 'America/Bogota').format();
  vacancy.updated_at
    ? (vacancy.updated_at = moment
        .tz(vacancy.updated_at, 'America/Bogota')
        .format())
    : null;

  return vacancy;
};

module.exports = { getVacancyByIdService };
