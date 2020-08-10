const { check, validationResult } = require('express-validator');

exports.vacancyValidations = [
  check('description', 'Debe agregar una descripción').notEmpty(),
  check(
    'start_at',
    'Ingrese una fecha válida para empezar la oferta.'
  ).isISO8601(),
  check(
    'end_at',
    'Ingrese una fecha válida para terminar la oferta.'
  ).isISO8601(),
  check(
    'offers_quantity',
    'La oferta debe contener por lo menos una vacante.'
  ).matches(/[1-9]/),
  check('payment_per_hour', 'La oferta debe incluir un pago').matches(/[1-9]/),
  check('country', 'La oferta debe ser en Colombia').matches(/Colombia/),
  check('state', 'Estado es requerido.').notEmpty(),
  check('city', 'Ciudad es requerida.').notEmpty(),
  check('address', 'Dirección es requerida').notEmpty(),
  check('position', 'Debe ingresar una posición válida').matches(/[1-9]/),
];

exports.vacancyValidator = (req, res, next) => {
  //Check for error
  const errors = validationResult(req);
  //if error show the first one as they happend
  if (!errors.isEmpty()) {
    const extractedErrors = [];
    errors.array().map((err) => extractedErrors.push(err.msg));
    return res.status(400).json({ error: extractedErrors[0] });
  }

  next();
};
