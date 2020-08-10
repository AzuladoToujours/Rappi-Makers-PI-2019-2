const {
  summatoryOfHiredsDAO,
} = require('../../dao/restaurant/summatory-hireds-dao');
const { hireCandidateDAO } = require('../../dao/restaurant/hire-candidate-dao');
const {
  updateVacancyStatusDAO,
} = require('../../dao/update-vacancy-status-dao');
const {
  createContractFetch,
} = require('../../fetchs/contract/create-contract-fetch');
const { notifyHiredsService } = require('../user/notify-hireds.service');

const hireCandidateService = async (req, res) => {
  let hiredsNumber = await summatoryOfHiredsDAO(req.params.vacancyId);
  let offersQuantity = req.params.vacancy.offers_quantity;
  let createContract;
  if (parseInt(hiredsNumber) + 1 == parseInt(offersQuantity)) {
    createContract = true;
  }

  if (createContract == true) {
    let contractCreated = await createContractFetch(
      req.params.vacancyId,
      req.body.userId
    );
    if (contractCreated) {
      await hireCandidateDAO(req.params.vacancyId, req.body.userId);
      await updateVacancyStatusDAO(req.params.vacancyId);
      await notifyHiredsService(req.params.vacancyId);
      return res.status(200).json({
        message:
          'Usuario contratado satisfactoriamente, se procede a crear el contrato',
      });
    } else {
      return res.status(400).json({
        error: 'Error en la creación del contrato.',
      });
    }
  } else {
    await hireCandidateDAO(req.params.vacancyId, req.body.userId);
    return res.status(200).json({
      message: 'Usuario contratado satisfactoriamente.',
    });
  }
};

module.exports = { hireCandidateService };
