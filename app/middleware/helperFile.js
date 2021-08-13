/* eslint-disable */
require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class Helper {
  /**
     * @description generating token for user authentication
     * @param {*} loginInput
     * @returns
     */
  generateToken(loginInput) {
    const token = jwt.sign(loginInput, process.env.SECRET_KEY, {
      expiresIn: '3000s',
    });
    return token;
  }

  /**
     * @description comparing the password provided by the user and the password kept in
     * database using bcrypt as the password in database is hashed
     * @param {*} loginData
     * @param {*} databaseData
     * @returns
     */
  checkByBcrypt(loginData, databaseData) {
    return (loginData && databaseData) ? (bcrypt.compareSync(loginData, databaseData)) : false;
  }

  /**
     * @description authorizes the user only if the token is validated
     * @param {*} req
     * @param {*} res
     * @param {*} next
     * @returns
     */
  checkToken(req, res, next) {
    const token = req.get('token');
    return (token)
      ? jwt.verify(token, SECRET_KEY, (error) => ((error) ? res.status(400).send({ message: 'Invalid Token' }) : next()))
      : res.status(401).send({ message: 'Missing token! Unauthorized User!' });
  }

    getEmailFromToken(token) {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      return decoded.emailId;
    }

    setRole = (role) => {
      return (req, res, next) => {
        req.role = role;
        next();
      }
    }
  
    checkRole = (role) => (req, res, next) => {
      req.role = role;
      if (role.includes(req.role)) {
        next();
      } else {
        return res.status(401).send({
          success: false,
          message: 'In-Correct role'
        });
      }
    };
}
module.exports = new Helper();
