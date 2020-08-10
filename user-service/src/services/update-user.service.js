const { updateUserDAO } = require('../dao/update-user-dao');
const moment = require('moment-timezone');

const updateUserService = async (req, res) => {
  let updated_at = moment(new Date())
    .tz('America/Bogota')
    .format();
  let values = [
    req.params.id,
    req.body.names,
    req.body.last_names,
    req.body.mobile,
    req.body.country,
    req.body.state,
    req.body.city,
    req.body.address,
    req.body.description,
    updated_at
  ];

  try {
    await updateUserDAO(values);

    return res.status(200).json({ message: 'Usuario actualizado con éxito' });
  } catch (e) {
    return res
      .status(400)
      .json({ error: 'Ha ocurrido un error actualizando al usuario' });
  }
};

module.exports = { updateUserService };
