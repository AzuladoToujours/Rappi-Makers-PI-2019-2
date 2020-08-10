const { createRestaurantDAO } = require('../dao/create-restaurant-dao');
const moment = require('moment-timezone');

const createRestaurantService = async (req, res) => {
  const values = Object.values(req.body);
  const created_at = moment(new Date())
    .tz('America/Bogota')
    .format();
  values.push(created_at);
  let created = await createRestaurantDAO(values);

  if (created) {
    return res.status(200).json(created);
  } else {
    console.log(e);
    return res.status(400).send();
  }
};

module.exports = { createRestaurantService };
