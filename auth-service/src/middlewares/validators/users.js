const { check } = require('express-validator');

exports.userSignUpvalidations = [
  check('dni_type_id', 'Debe ser cédula').matches(/1/),

  check('identity_card', 'La cédula debe contener entre 5 y 10 dígitos')
    .matches(/[0-9]/)
    .isLength({ min: 5, max: 10 }),

  //NAMES ARE NOT NULL
  check('names', 'Los nombres deben contener entre 1 y 40 carácteres').matches(
    /[a-zA-Z]{1,40}/
  ),
  //LAST NAMES ARE NOT NULL
  check(
    'last_names',
    'Los apellidos deben contener entre 1 y 40 carácteres'
  ).matches(/[a-zA-Z]{1,40}/),
  //MOBILE MUST HAVE TEN DIGITS AND NOT BE NULL
  check('mobile', 'Celular debe contener 10 dígitos')
    .matches(/[0-9]{10}/)
    .isLength({ max: 10 }),
  //EMAIL VALID AND NORMALIZED
  check('email', 'Provea un email válido').isEmail(),

  check('country', 'País debe ser Colombia').matches(/Colombia/),

  check('state', 'Estado es requerido').matches(/[a-zA-Z]{1,40}/),

  check('city', 'Ciudad es requerido').matches(/[a-zA-Z]{1,40}/),

  check('address', 'Dirección requerida').notEmpty(),
];
