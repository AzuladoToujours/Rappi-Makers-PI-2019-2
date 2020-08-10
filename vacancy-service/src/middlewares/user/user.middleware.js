const expressJwt = require('express-jwt');

exports.requireUserSignIn = expressJwt({
  //if the token is valid, express jwt appends the verified admin id
  //in an auth key to the request object
  secret: process.env.USER_SECRET,
  userProperty: 'authUser',
});
