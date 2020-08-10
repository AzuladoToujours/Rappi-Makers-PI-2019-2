const { getVacanciesDAO } = require('../dao/get-vacancies-dao');
const moment = require('moment-timezone');

/**
 *Returns all the vacancies from the database
 * @param {object} req
 * @param {object} res
 * @returns {json} json
 */
const getVacanciesService = async (req, res) => {
  let vacancies = await getVacanciesDAO();

  vacancies = fixDatesAndHours(vacancies);

  return res.status(200).json(vacancies);
};

const fixDatesAndHours = (vacancies) => {
  vacancies.map((vacancy) => {
    vacancy.start_at = moment.tz(vacancy.start_at, 'America/Bogota').format();
    vacancy.end_at = moment.tz(vacancy.end_at, 'America/Bogota').format();
    vacancy.created_at = moment
      .tz(vacancy.created_at, 'America/Bogota')
      .format();
    vacancy.updated_at
      ? (vacancy.updated_at = moment
          .tz(vacancy.updated_at, 'America/Bogota')
          .format())
      : null;
  });

  return vacancies;
};

module.exports = { getVacanciesService };
