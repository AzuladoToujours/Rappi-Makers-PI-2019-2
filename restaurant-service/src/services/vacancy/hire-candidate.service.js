const FetchError = require('../../errors/fetch.error');
const PropertyRequiredError = require('../../errors/property-required.error');
const {
  hireCandidateFetch
} = require('../../fetchs/vacancy/hire-candidate-fetch');

const hireCandidateService = async (req, res) => {
  if (!req.params.vacancyId) {
    let propertyRequired = new PropertyRequiredError(vacancyId);
    return propertyRequired.errorResponse(res);
  }

  let vacancyId = req.params.vacancyId;
  const token = req.headers.authorization.split(' ')[1];

  const response = await hireCandidateFetch(token, vacancyId, req.body);
  if (response.status == 200) {
    return res.status(200).json({
      message: response.data.message
    });
  } else if (response.code == 'ECONNREFUSED') {
    let fetch = 'vacancy';
    let fetchError = new FetchError(fetch);
    return fetchError.errorResponse(res);
  } else {
    return res.status(response.response.status).json(response.response.data);
  }
};

module.exports = { hireCandidateService };
