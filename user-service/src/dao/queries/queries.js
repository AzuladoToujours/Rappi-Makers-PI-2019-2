exports.createUserQuery =
  'INSERT INTO users (dni_type_id, identity_card, names, last_names, gender, birthday, email,  mobile, country, state, city, address, positions, created_at ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING id';

exports.getUserFromAuthQuery =
  'SELECT id, identity_card, names, last_names, email, balance, photo FROM users WHERE id = $1';

exports.getUserByDniQuery = 'SELECT * FROM users WHERE identity_card = $1';

exports.getUsersQuery =
  'SELECT users.id, dni_type.description as dni_type, identity_card, names, last_names, email, mobile, country, state, city, address, positions, photo FROM users INNER JOIN dni_type ON users.dni_type_id = dni_type.id';

exports.getUserByIdQuery =
  'SELECT id, identity_card, names, last_names, gender, email, mobile, country, state, city, address, positions, description, photo  FROM users WHERE id = $1';

// exports.updateUserQuery =
//   'UPDATE users SET  names = $2, last_names = $3, email = $4,  mobile = $5, country = $6, state = $7, city = $8, address = $9, description = $10, updated_at = $11 WHERE id = $1';

// exports.deleteUserQuery = 'DELETE FROM users WHERE id = $1';

exports.updateUserPhotoQuery =
  'UPDATE users SET photo = $2, updated_at = $3 WHERE id = $1';

exports.updateUserQuery =
  'UPDATE users SET  names = $2, last_names = $3, mobile = $4, country = $5, state = $6, city = $7, address = $8, description = $9, updated_at = $10 WHERE id = $1';

exports.getEmailByIdQuery = 'SELECT email FROM users WHERE id = $1';

exports.updateBalanceQuery = 'UPDATE users SET balance = $2 WHERE id = $1';

exports.getBalanceQuery = 'SELECT balance FROM users WHERE id = $1';
