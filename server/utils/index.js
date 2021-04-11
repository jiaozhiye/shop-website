const createPagination = (num, size) => {
  const offset = (num - 1) * size;
  return ` LIMIT ${offset}, ${size}`;
};

const formatDateTime = (datetime) => {
  return `FROM_UNIXTIME(UNIX_TIMESTAMP(${datetime}), '%Y-%m-%d %H:%i:%s')`;
};

module.exports = {
  createPagination,
  formatDateTime,
};
