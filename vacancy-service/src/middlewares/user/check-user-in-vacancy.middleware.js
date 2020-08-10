const UnauthorizeError = require('../../errors/unauthorize-error');
const PropertyRequiredError = require('../../errors/property-required.error');

const { checkUserInVacancyDAO } = require('../../dao/user/user-in-vacancy-dao');
const {
  checkHiredInVacancyDAO,
} = require('../../dao/user/hired-in-vacancy-dao');
exports.checkUserInVacancyAdd = async (req, res, next) => {
  let vacancy = req.params.vacancy;
  const userId = req.authUser.userId;
  let userInVacancy = await checkUserInVacancyDAO(vacancy.id, userId);
  if (!userInVacancy) {
    next();
  } else {
    let unauthorize = new UnauthorizeError();
    return unauthorize.errorUserInVacancy(res);
  }
};

exports.checkUserInVacancyRemove = async (req, res, next) => {
  let vacancy = req.params.vacancy;
  const userId = req.authUser.userId;
  let userInVacancy = await checkUserInVacancyDAO(vacancy.id, userId);
  if (userInVacancy) {
    next();
  } else {
    let unauthorize = new UnauthorizeError();
    return unauthorize.errorUserNotInVacancy(res);
  }
};

exports.checkUserInVacancyHire = async (req, res, next) => {
  if (!req.body.userId) {
    let propertyRequired = new PropertyRequiredError('userId');
    return propertyRequired.errorResponse(res);
  }
  let vacancy = req.params.vacancy;
  let userId = req.body.userId;
  let userInVacancy = await checkUserInVacancyDAO(vacancy.id, userId);
  let userHired = await checkHiredInVacancyDAO(vacancy.id, userId);
  if (userInVacancy && !userHired) {
    next();
  } else {
    let unauthorize = new UnauthorizeError();
    return unauthorize.errorUserNotInVacancy(res);
  }
};
