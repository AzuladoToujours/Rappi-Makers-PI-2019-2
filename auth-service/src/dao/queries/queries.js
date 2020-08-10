exports.getAccountByEmailQuery = 'SELECT * FROM accounts WHERE email = $1';

exports.getAccountByIdQuery = 'SELECT * FROM accounts WHERE id = $1';

exports.createUserAccountQuery =
  'INSERT INTO accounts (id, email, user_id, hashed_password) VALUES ($1, $2, $3, $4)';

exports.createRestaurantAccountQuery =
  'INSERT INTO accounts (id, email, restaurant_id, hashed_password) VALUES ($1, $2, $3, $4)';

exports.passwordResetsQuery =
  'INSERT INTO password_resets (email, token, created_at, account_id) VALUES ($1, $2, $3, $4)';

exports.getAccountByTokenQuery =
  'SELECT id, hashed_password FROM (SELECT account_id FROM password_resets WHERE token = $1 ) AS pr INNER JOIN accounts acc ON (pr.account_id = acc.id) ';

exports.updatePasswordQuery =
  'UPDATE accounts SET hashed_password = $2 WHERE id=$1';
