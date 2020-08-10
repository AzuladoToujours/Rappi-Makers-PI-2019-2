const { createVacancyDAO } = require('../dao/create-vacancy-dao');
const moment = require('moment-timezone');

const createVacancyService = async (req, res) => {
  req.body.start_at = moment.tz(req.body.start_at, 'America/Bogota').format();
  req.body.end_at = moment.tz(req.body.end_at, 'America/Bogota').format();
  const values = Object.values(req.body);
  const candidates = {};
  const hireds = {};
  const restaurantId = req.authRestaurant.restaurantId;
  const created_at = moment(new Date()).tz('America/Bogota').format();
  values.push(candidates);
  values.push(hireds);
  values.push(restaurantId);
  values.push(created_at);

  let created = await createVacancyDAO(values);

  if (created) {
    return res.status(200).json({
      message: 'Oferta publicada correctamente',
      vacancyCost: req.params.vacancyCost,
    });
  } else {
    console.log(e);
    return res.status(400).json({ error: 'Error creando la oferta' });
  }
};

module.exports = { createVacancyService };
