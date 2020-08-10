const expressJwt = require('express-jwt');
const PropertyRequiredError = require('../../errors/property-required.error');
const NotFoundError = require('../../errors/not-found.error');
const UnauthorizeError = require('../../errors/unauthorize-error');
const { getContractByIdDAO } = require('../../dao/get-contracts-dao');
require('dotenv').config();

exports.requireRestaurantSignIn = expressJwt({
  //if the token is valid, express jwt appends the verified admin id
  //in an auth key to the request object
  secret: process.env.RESTAURANT_SECRET,
  userProperty: 'authRestaurant',
});

exports.hasRestaurantAuthorization = async (req, res, next) => {
  if (!req.params.contractId) {
    let propertyRequired = new PropertyRequiredError('contractId');
    return propertyRequired.errorResponse(res);
  }
  let contractId = req.params.contractId;
  let contract = await getContractByIdDAO(contractId);
  if (!contract) {
    let notFound = new NotFoundError();
    return notFound.errorResponse(res);
  }

  const hasAuthorization =
    req.authRestaurant.restaurantId === contract.restaurant_id;

  if (!hasAuthorization) {
    let unauthorize = new UnauthorizeError();
    return unauthorize.errorResponse(res);
  }

  req.params.contract = contract;
  next();
};
