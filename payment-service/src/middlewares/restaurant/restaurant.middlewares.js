const expressJwt = require('express-jwt');
const dotenv = require('dotenv');
dotenv.config();

exports.requireRestaurantSignIn = expressJwt({
  //if the token is valid, express jwt appends the verified admin id
  //in an auth key to the request object
  secret: process.env.RESTAURANT_SECRET,
  userProperty: 'authRestaurant',
});
