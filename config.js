
require('dotenv').config();

const assert = require('assert');
assert.ok(process.env.JAMBONES_RECFOLDER, 'missing JAMBONES_RECFOLDER env var');

module.exports = {
  httpPort: process.env.HTTP_PORT || 3000,
  logLevel: process.env.JAMBONES_LOGLEVEL || 'info',

  recFolder: process.env.JAMBONES_REC_FOLDER
};
