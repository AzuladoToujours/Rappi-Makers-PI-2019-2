const { getContractByIdUserDAO } = require('../../dao/get-contracts-dao');
const expressJwt = require('express-jwt');
const PropertyRequiredError = require('../../errors/property-required.error');
const NotFoundError = require('../../errors/not-found.error');

exports.requireUserSignIn = expressJwt({
  //if the token is valid, express jwt appends the verified admin id
  //in an auth key to the request object
  secret: process.env.USER_SECRET,
  userProperty: 'authUser',
});

exports.hasUserAuthorization = async (req, res, next) => {
  if (!req.params.contractId) {
    let propertyRequired = new PropertyRequiredError('contractId');
    return propertyRequired.errorResponse(res);
  }
  let contractId = req.params.contractId;
  let userId = req.authUser.userId;
  let contract = await getContractByIdUserDAO(contractId, userId);
  if (!contract) {
    let notFound = new NotFoundError();
    return notFound.errorResponse(res);
  }

  req.params.contract = contract;
  next();
};
