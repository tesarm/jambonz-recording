
require('dotenv').config();

const assert = require('assert');
['JAMBONES_RECFOLDER', 'JAMBONES_RECFORMAT'].forEach((env) => assert.ok(process.env[env], `missing ${env} env var`));

assert.ok(['raw', 'wav'].indexOf(process.env.JAMBONES_RECFORMAT) >= 0, 'Unsupported recording format');

module.exports = {
  httpPort: process.env.HTTP_PORT || 3000,
  logLevel: process.env.JAMBONES_LOGLEVEL || 'info',

  recFolder: process.env.JAMBONES_RECFOLDER,
  recFormat: process.env.JAMBONES_RECFORMAT,
};
