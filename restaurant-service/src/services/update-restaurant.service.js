const { updateRestaurantDAO } = require('../dao/update-restaurant-dao');
const moment = require('moment-timezone');

const updateRestaurantService = async (req, res) => {
  let updated_at = moment(new Date())
    .tz('America/Bogota')
    .format();
  let values = [
    req.params.id,
    req.body.name,
    req.body.mobile,
    req.body.country,
    req.body.state,
    req.body.city,
    req.body.address,
    req.body.description,
    updated_at
  ];

  try {
    await updateRestaurantDAO(values);

    return res
      .status(200)
      .json({ message: 'Restaurante actualizado con éxito' });
  } catch (e) {
    return res
      .status(400)
      .json({ error: 'Ha ocurrido un error actualizando al usuario' });
  }
};

module.exports = { updateRestaurantService };
