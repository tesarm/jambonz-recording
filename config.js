
require('dotenv').config();

const assert = require('assert');
[
  'JAMBONES_RECFOLDER',
  'JAMBONES_RECDESTINATION',
  'JAMBONES_RECFOLDER'
]
  .forEach((env) => assert.ok(process.env[env], `missing ${env} env var`));

if (process.env.JAMBONES_RECDESTINATION === 'aws') {
  [
    'JAMBONES_AWSKEYID',
    'JAMBONES_AWSACCESSKEY',
    'JAMBONES_AWSBUCKET'
  ]
    .forEach((env) => assert.ok(process.env[env], `missing ${env} env var`));
}

assert.ok(['raw', 'wav'].indexOf(process.env.JAMBONES_RECFORMAT) >= 0, 'Unsupported recording format');

module.exports = {
  httpPort: process.env.HTTP_PORT || 3000,
  logLevel: process.env.JAMBONES_LOGLEVEL || 'info',

  recFolder: process.env.JAMBONES_RECFOLDER,
  recFormat: process.env.JAMBONES_RECFORMAT,
  recDestination: process.env.JAMBONES_RECDESTINATION,

  awsKeyId: process.env.JAMBONES_AWSKEYID,
  awsAccessKey: process.env.JAMBONES_AWSACCESSKEY,
  awsBucket: process.env.JAMBONES_AWSBUCKET,

};
