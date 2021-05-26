const fs = require('fs');
const wav = require('wav');

class Convertor {
  constructor(logger, input, mixType, sampleRate) {
    this.logger = logger;
    this.input = input;
    this.channels = mixType === 'stereo' ? 2 : 1;
    this.sampleRate = sampleRate;
  }

  convert() {
    const output = new wav.FileWriter(`${this.input}.wav`, {channels: this.channels, sampleRate: this.sampleRate})
      .on('error', (err) => this.logger.error(err))
      .on('finish', () => this.logger.debug(`wav file saved ${this.input}.wav`));

    fs.createReadStream(this.input).pipe(output);
  }
}

module.exports = Convertor;
