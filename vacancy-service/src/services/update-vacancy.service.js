const moment = require('moment-timezone');
const { updateVacancyDAO } = require('../dao/update-vacancy-dao');
const {
  notifyCandidatesAndHiredsService,
} = require('../services/user/notify-candidates-hireds.service');

const updateVacancyService = async (req, res) => {
  req.body.start_at = moment.tz(req.body.start_at, 'America/Bogota').format();
  req.body.end_at = moment.tz(req.body.end_at, 'America/Bogota').format();
  const values = Object.values(req.body);
  const candidates = {};
  const hireds = {};
  const updated_at = moment(new Date()).tz('America/Bogota').format();
  const vacancyId = req.params.vacancyId;
  values.push(candidates);
  values.push(hireds);
  values.push(updated_at);
  values.push(vacancyId);

  await notifyCandidatesAndHiredsService(vacancyId);
  await updateVacancyDAO(values);

  return res.status(200).json({
    message: 'Oferta actualizada con éxito',
    vacancyCost: req.params.vacancyCost,
  });
};

module.exports = { updateVacancyService };
