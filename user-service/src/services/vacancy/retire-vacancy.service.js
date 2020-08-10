const {
  retireFromVacancyFetch
} = require('../../fetchs/vacancy/retire-vacancy-fetch');
const PropertyRequiredError = require('../../errors/property-required.error');
const FetchError = require('../../errors/fetch.error');

const retireFromVacancyService = async (req, res) => {
  if (!req.params.vacancyId) {
    let propertyRequired = new PropertyRequiredError(id);
    return propertyRequired.errorResponse(res);
  }

  let vacancyId = req.params.vacancyId;
  let token = req.headers.authorization.split(' ')[1];
  let response = await retireFromVacancyFetch(vacancyId, token);

  if (response.status == 200) {
    return res.status(200).json(response.data);
  } else {
    if (response.code == 'ECONNREFUSED') {
      let fetch = 'vacancy';
      let fetchError = new FetchError(fetch);
      return fetchError.errorResponse(res);
    } else {
      return res.status(response.response.status).json(response.response.data);
    }
  }
};

module.exports = { retireFromVacancyService };
