const { check, validationResult } = require('express-validator');

exports.validator = async (req, res, next) => {
  //Check for error
  const errors = validationResult(req);

  //if error show the first one as they happend
  if (!errors.isEmpty()) {
    const extractedErrors = [];
    errors.array().map(err => extractedErrors.push(err.msg));
    return res.status(400).json({ error: extractedErrors[0] });
  }
  //Proceed to next middleware
  next();
};

exports.updateRestaurantValidations = [
  //NAMES ARE NOT NULL
  check('name', 'Los nombres deben contener entre 1 y 40 carácteres').matches(
    /[a-zA-Z]{1,40}/
  ),
  //MOBILE MUST HAVE TEN DIGITS AND NOT BE NULL
  check('mobile', 'Celular debe contener 10 dígitos')
    .matches(/[0-9]{10}/)
    .isLength({ max: 10 }),

  check('country', 'País debe ser Colombia').matches(/Colombia/),

  check('state', 'Estado es requerido').matches(/[a-zA-Z]{1,40}/),

  check('city', 'Ciudad es requerido').matches(/[a-zA-Z]{1,40}/),

  check('address', 'Dirección requerida').notEmpty(),

  check('description', 'Descripción requerida').notEmpty()
];
