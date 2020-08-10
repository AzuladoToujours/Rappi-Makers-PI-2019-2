exports.createRestaurantQuery =
  'INSERT INTO restaurants (nit, name, email, mobile, country, state, city, address, description, created_at ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id';

exports.getRestaurantFromAuthQuery =
  'SELECT id, nit, name, email, balance, photo FROM restaurants WHERE id = $1';

exports.getRestaurantByNitQuery = 'SELECT * FROM restaurants WHERE nit = $1';

exports.getRestaurantsQuery =
  'SELECT id, name, nit, email, mobile, description, photo FROM restaurants';

exports.getRestaurantByIdQuery =
  'SELECT id, name, nit, email, mobile, country, state, city, address, description, photo FROM restaurants WHERE id = $1';

exports.getBalanceQuery = 'SELECT balance FROM restaurants WHERE id = $1';

exports.updateBalanceQuery =
  'UPDATE restaurants SET balance = $2 WHERE id = $1 RETURNING balance';

exports.updateRestaurantPhotoQuery =
  'UPDATE restaurants SET photo = $2, updated_at = $3 WHERE id = $1';

exports.updateRestaurantQuery =
  'UPDATE restaurants SET  name = $2, mobile = $3, country = $4, state = $5, city = $6, address = $7, description = $8, updated_at = $9 WHERE id = $1';
