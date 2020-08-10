const expressJwt = require('express-jwt');

exports.validateToken = expressJwt({
  secret: process.env.AUTH_SECRET
});

exports.requireSignIn = expressJwt({
  //if the token is valid, express jwt appends the verified restaurants id
  //in an auth key to the request object
  secret: process.env.JWT_SECRET,
  userProperty: 'auth'
});

/**
 *Check the restaurant's authorization
 * @param {object} req
 * @param {object} res
 * @param {object}
 * @returns {json} json
 */
exports.hasAuthorization = (req, res, next) => {
  /*If there's an id in the params, if the auth exist and if the id 
   in the params matches the id of the auth*/
  let isSameUser =
    req.params.id && req.auth && req.params.id == req.auth.restaurantId;
  const authorized = isSameUser;
  if (!authorized) {
    return res
      .status(403)
      .json({ error: 'User is not authorized to perform this action' });
  }
  next();
};
