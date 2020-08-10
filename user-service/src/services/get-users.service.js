const { getUsersDAO } = require('../dao/get-users-dao');

/**
 *Returns all the users from the database
 * @param {object} req
 * @param {object} res
 * @returns {json} json
 */
const getUsersService = async (req, res) => {
  let users = await getUsersDAO();

  return res.status(200).json(users);
};

module.exports = { getUsersService };
