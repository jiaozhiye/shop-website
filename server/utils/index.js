const jwt = require('jsonwebtoken');
const config = require('../config');

const getTokenName = token => {
  return jwt.verify(token, config.auth.admin_secret).name;
};

const createPagination = (num, size) => {
  const offset = (num - 1) * size;
  return ` LIMIT ${offset}, ${size}`;
};

const formatDateTime = datetime => {
  return `FROM_UNIXTIME(UNIX_TIMESTAMP(${datetime}), '%Y-%m-%d %H:%i:%s')`;
};

module.exports = {
  getTokenName,
  createPagination,
  formatDateTime
};
