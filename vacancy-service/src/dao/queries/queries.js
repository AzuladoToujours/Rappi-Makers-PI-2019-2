exports.createVacancyQuery =
  'INSERT INTO vacancies (description, start_at, end_at, offers_quantity, payment_per_hour, country, state, city, address, position_id, candidates, hireds, restaurant_id , created_at ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)';

exports.updateVacancyQuery =
  'UPDATE vacancies SET description = $1, start_at = $2, end_at = $3, offers_quantity = $4, payment_per_hour = $5, country = $6, state = $7, city = $8, address = $9, position_id = $10, candidates = $11, hireds = $12, updated_at = $13   WHERE id = $14 ';

exports.deleteVacancyQuery =
  'DELETE FROM vacancies where id = $1 RETURNING start_at, end_at, offers_quantity, payment_per_hour';

exports.getAllVacanciesQuery =
  'SELECT id, restaurant_id, description, start_at, end_at, offers_quantity, payment_per_hour, country, state, city, address, candidates, status, position_id, created_at, updated_at FROM vacancies ORDER BY created_at DESC, updated_at DESC';

exports.getVacancyQuery = 'SELECT * FROM vacancies where id = $1';

exports.addCandidateQuery =
  'UPDATE vacancies set candidates = array_append(candidates, $2) where id = $1';

exports.hireCandidateQuery =
  'UPDATE vacancies set hireds = array_append(hireds, $2) where id = $1';

exports.removeCandidateQuery =
  'UPDATE vacancies set candidates = array_remove(candidates, $2) where id = $1';

exports.searchCandidateQuery =
  'SELECT * FROM vacancies where id = $1 AND candidates @> $2';

exports.searchHiredQuery =
  'SELECT * FROM vacancies where id = $1 AND hireds @> $2';

exports.getRestaurantIdQuery =
  'SELECT restaurant_id FROM vacancies WHERE id = $1';

exports.summatoryHiredQuery =
  'SELECT array_length(hireds, 1) FROM vacancies WHERE  id = $1';

exports.getCandidatesQuery = 'SELECT candidates FROM vacancies WHERE id = $1';

exports.getHiredsQuery = 'SELECT hireds FROM vacancies WHERE id = $1';

exports.changeVacancyStatus =
  "UPDATE vacancies SET status = 'CLOSED' WHERE id = $1 ";
