const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

const Helper = {
  /**
   * Hash the user's password
   * @param {string} password
   * @returns {string} returns hashed password
   */
  hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  },
  /**
   * Compares a hashPassword and a password
   * @param {string} hashPassword
   * @param {string} password
   * @returns {Boolean} return true or false
   */
  comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  },
  /**
   * Generates a Token with the user's id
   * @param {string} id
   * @returns {string} token
   */
  generateUserToken(id) {
    const token = jwt.sign(
      {
        userId: id,
      },
      process.env.USER_SECRET,
      { expiresIn: '1h' }
    );
    return token;
  },

  /**
   * Generates a Token with the user's id
   * @param {string} id
   * @returns {string} token
   */
  generateRestaurantToken(id, balance) {
    const token = jwt.sign(
      {
        restaurantId: id,
        restaurantBalance: balance,
      },
      process.env.RESTAURANT_SECRET,
      { expiresIn: '1h' }
    );
    return token;
  },

  /**
   * Generates a Token with the user's password
   * @param {string} id
   * @returns {string} token
   */
  generatePasswordResetToken(hashed_password) {
    const token = jwt.sign(
      {
        hashed_password: hashed_password,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    return token;
  },

  decodePasswordToken(token) {
    try {
      let payload = jwt.verify(token, process.env.JWT_SECRET);

      return payload;
    } catch (e) {
      return false;
    }
  },

  generateAPIToken() {
    const token = jwt.sign({}, process.env.JWT_SECRET, { expiresIn: '7d' });
    return token;
  },
};

module.exports = Helper;
