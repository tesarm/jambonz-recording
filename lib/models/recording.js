const fs = require('fs');
const config = require('../../config');
const {v4:uuid} = require('uuid');

class Recording {
  constructor(logger) {
    this.logger = logger;
    this.stream = null;
    this.info = {};
  }

  create(msg) {
    this.logger.info(`New Recording request ${JSON.stringify(msg)}`);
    this.info = {...msg, file: `${config.recFolder}${msg.callId}_${uuid()}`};
    this.stream = fs.createWriteStream(this.info.file);
  }

  write(msg) {
    this.stream.write(msg);
  }

  close() {
    this.stream.close();
    this.logger.debug(`Raw recording saved ${this.info.file}`);
  }
}

module.exports = Recording;
