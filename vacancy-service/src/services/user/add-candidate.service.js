const { addCandidateDAO } = require('../../dao/user/add-candidate-dao');

const addCandidateService = async (req, res) => {
  let vacancyId = req.params.vacancyId;
  let userId = req.authUser.userId;

  let success = await addCandidateDAO(vacancyId, userId);

  if (success) {
    return res.status(200).json({ message: 'Aplicado satisfactoriamente!' });
  } else {
    return res.status(500).json({ error: 'Error aplicando a la oferta.' });
  }
};

module.exports = { addCandidateService };
