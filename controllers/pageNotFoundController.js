/* eslint-disable no-unused-vars */
const NotFoundError = require('../errors/NotFoundError');

const pageNotFound = (req, res) => {
  throw new NotFoundError();
};
module.exports = pageNotFound;
