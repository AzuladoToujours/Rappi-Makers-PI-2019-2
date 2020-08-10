const { deleteVacancyDAO } = require('../dao/delete-vacancy-dao');
const {
  calculateVacancyCost,
} = require('../middlewares/restaurant/check-balance.middleware');

const deleVacancyService = async (req, res) => {
  let vacancy = req.params.vacancy;
  let vacancyCost = await calculateVacancyCost(vacancy);
  let deleted = await deleteVacancyDAO(vacancy.id);

  if (deleted) {
    return res.status(200).json({
      message: 'Oferta borrada satisfactoriamente',
      vacancyCost: vacancyCost,
    });
  } else {
    return res.status(400).json({ error: 'Error al borrar la oferta' });
  }
};

module.exports = { deleVacancyService };
