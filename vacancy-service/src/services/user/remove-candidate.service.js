const { removeCandidateDAO } = require('../../dao/user/remove-candidate-dao');

const removeCandidateService = async (req, res) => {
  let vacancyId = req.params.vacancyId;
  let userId = req.authUser.userId;

  let success = await removeCandidateDAO(vacancyId, userId);

  if (success) {
    return res.status(200).json({ message: 'Retirado satisfactoriamente!' });
  } else {
    return res.status(500).json({ error: 'Error retirando de la oferta.' });
  }
};

module.exports = { removeCandidateService };
