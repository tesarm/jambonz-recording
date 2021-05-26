const {promises : fs, createReadStream} = require('fs');
const wav = require('wav');

class Convertor {
  constructor(logger, input, mixType, sampleRate) {
    this.logger = logger;
    this.input = input;
    this.channels = mixType === 'stereo' ? 2 : 1;
    this.sampleRate = sampleRate;
  }

  convert() {
    const output = `${this.input}.wav`;

    const writer = new wav.FileWriter(output, {channels: this.channels, sampleRate: this.sampleRate})
      .on('error', (err) => this.logger.error(err))
      .on('finish', () => {
        this.logger.debug(`wav file saved ${output}`);
        return fs.unlink(this.input).catch((e) => this.logger.error(e));
      });

    createReadStream(this.input).pipe(writer);
    return output;
  }
}

module.exports = Convertor;
