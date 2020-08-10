const { getVacancyByIdDAO } = require('../../dao/get-vacancies-dao');
const NotFoundError = require('../../errors/not-found.error');
const UnauthorizeError = require('../../errors/unauthorize-error');

exports.checkVacancyStatus = async (req, res, next) => {
  let vacancyId = req.params.vacancyId;
  let vacancy = await getVacancyByIdDAO(vacancyId);
  if (!vacancy) {
    let notFound = new NotFoundError();
    return notFound.errorResponse(res);
  }
  if (vacancy.status == 'CLOSED') {
    let unauthorize = new UnauthorizeError();
    return unauthorize.errorStatus(res);
  }
  req.params.vacancy = vacancy;
  next();
};
