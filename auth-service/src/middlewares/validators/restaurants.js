const { check } = require('express-validator');
const expressJwt = require('express-jwt');

exports.restaurantSignUpvalidations = [
  check('nit', 'El nit debe contener 10 dígitos')
    .matches(/[0-9]/)
    .isLength({ min: 10, max: 10 }),

  //NAMES ARE NOT NULL
  check('name', 'Los nombres deben contener entre 1 y 40 carácteres').matches(
    /[a-zA-Z]{1,40}/
  ),

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

exports.decryptToken = expressJwt({
  //if the token is valid, express jwt appends the verified restaurants id
  //in an auth key to the request object
  secret: process.env.RESTAURANT_SECRET,
  userProperty: 'auth',
});
