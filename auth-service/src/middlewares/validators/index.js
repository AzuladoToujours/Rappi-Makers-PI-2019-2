const { validationResult } = require('express-validator');
const passwordValidator = require('password-validator');

exports.validator = async (req, res, next) => {
  //Check for error
  const errors = validationResult(req);

  //if error show the first one as they happend
  if (!errors.isEmpty()) {
    const extractedErrors = [];
    errors.array().map((err) => extractedErrors.push(err.msg));
    return res.status(400).json({ error: extractedErrors[0] });
  }
  //Proceed to next middleware
  next();
};

exports.passwordValidator = (req, res, next) => {
  var schema = new passwordValidator();

  // Add properties to it
  schema
    .is()
    .min(6) // Minimum length 6
    .is()
    .max(50) // Maximum length 50
    .has()
    .uppercase() // Must have uppercase letters
    .has()
    .lowercase() // Must have lowercase letters
    .has()
    .digits() // Must have digits
    .has()
    .not()
    .spaces() // Should not have spaces
    .is()
    .not()
    .oneOf(['Passw0rd', 'Password123']); // Blacklist these values

  if (schema.validate(req.body.password)) {
    next();
  } else {
    let errorMessage =
      'La contraseña debe contener 6 o más dígitos, entre los cuales debe haber mayúsculas, mínusculas y por lo menos un número';

    return res.status(400).json({ error: errorMessage });
  }
};
