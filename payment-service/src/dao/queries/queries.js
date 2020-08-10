exports.createPaymentQuery =
  'INSERT INTO payments (date, amount) VALUES ($1, $2) RETURNING id;';

exports.createRestaurantTransactionQuery =
  'INSERT INTO transactions (restaurant_id, payment_id) VALUES ($1, $2);';

exports.createContractTransactionQuery =
  'INSERT INTO contracts_transactions (contract_id, user_id, payment_id) VALUES ($1, $2, $3)';
