exports.createContractQuery =
  'INSERT INTO contracts (vacacancy_id, restaurant_id, description, start_at, end_at, payment_per_hour, country, state, city, address, workers, position_id, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING id';

exports.getRestaurantContractsQuery =
  'SELECT * FROM contracts where restaurant_id = $1';

exports.getUserContractsQuery = 'SELECT * FROM contracts where workers @> $1';

exports.getContractQuery = 'SELECT * FROM contracts WHERE id = $1';

exports.changeContractStatus =
  "UPDATE contracts SET status = 'FINISHED' WHERE id = $1 ";

exports.getContractByWorkerQuery =
  'SELECT * FROM contracts where id = $1 AND workers @> $2';
