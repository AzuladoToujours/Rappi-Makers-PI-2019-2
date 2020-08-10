const { createUserDAO } = require('../dao/create-user-dao');
const moment = require('moment-timezone');

const createUserService = async (req, res) => {
  req.body.positions = `{${req.body.positions.toString()}}`;
  // Get the values from the request JSON body
  const values = Object.values(req.body);
  const created_at = moment(new Date())
    .tz('America/Bogota')
    .format();
  values.push(created_at);
  let created = await createUserDAO(values);

  if (created) {
    return res.status(200).json(created);
  } else {
    return res.status(400).send();
  }
};

module.exports = { createUserService };
