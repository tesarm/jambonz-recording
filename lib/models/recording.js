const fs = require('fs');
const config = require('../../config');

class Recording {
  constructor() {
    this.stream = null;
    this.info = {};
  }

  create(msg) {
    console.log(msg);
    this.info = {...msg, file: `${config.recFolder}${msg.callId}.pcm.raw`};
    this.stream = fs.createWriteStream(this.info.file);
  }

  write(msg) {
    this.stream.write(msg);
  }

  close() {
    this.stream.close();
  }
}

module.exports = Recording;
