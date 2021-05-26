const {promises: fs} = require('fs');
const path = require('path');
const config = require('../../config');
const aws = require('aws-sdk');

const s3 = new aws.S3({
  accessKeyId: config.awsKeyId,
  secretAccessKey: config.awsAccessKey
});

const uploadToAWS = (logger, file) => fs.readFile(file)
  .then((content) => new Promise((resolve, reject) => {
    const params = {Bucket: config.awsBucket, Key: path.basename(file), Body:content};

    s3.upload(params, {}, function(err, data) {
      if (err) return reject(err);
      resolve(data);
    });
  }))
  .then(() => {
    logger.debug(`file ${file} uploaded to aws`);
    return fs.unlink(file);
  })
  .catch((err) => logger.error(err));

module.exports = uploadToAWS;
