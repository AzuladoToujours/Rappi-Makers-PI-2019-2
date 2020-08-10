exports.checkBalanceAtUpdateVacancy = async (req, res, next) => {
  let vacancyId = req.params.vacancyId;
  let queryString =
    'SELECT start_at, end_at, offers_quantity, payment_per_hour FROM vacancies WHERE id = $1';
  let valuesAtVacancy = await dbQuery.query(queryString, [vacancyId]);
  let operationAtVacancy = await doOperationAtRows(valuesAtVacancy.rows[0]);
  let newOperation = await doOperationOfVacancy(req);
  console.log('new operation:', newOperation);
  console.log('old operation:', operationAtVacancy);

  if (newOperation > operationAtVacancy) {
    operation = parseInt(newOperation - operationAtVacancy);
    let restaurantBalance = parseInt(req.authRestaurant.restaurantBalance);
    const enoughBalance = checkEnoughBalance(operation, restaurantBalance, req);

    if (!enoughBalance) {
      return res.status(400).json({
        error: 'Fondos insuficientes, lo invitamos a recargar su cuenta.',
      });
    } else {
      next();
    }
  } else if (operationAtVacancy > newOperation) {
    const operation = operationAtVacancy - newOperation;
    req.params.vacancyCost = operation;
    next();
  } else {
    req.params.vacancyCost = 0;
    next();
  }
};
