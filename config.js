
require('dotenv').config();

module.exports = {
  httpPort: process.env.HTTP_PORT || 3000,
  logLevel: process.env.JAMBONES_LOGLEVEL || 'info',
};
