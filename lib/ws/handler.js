const config = require('../../config');

const Recording = require('../models/recording');
const Convertor = require('../models/convertor');
const uploadToAWS = require('../models/aws-uploader');

const handler = (ws, req) => {
  const {logger} = req.app.locals;

  const recording = new Recording(logger);

  ws.on('message', (msg) => {
    if (typeof msg === 'string') return recording.create(JSON.parse(msg));
    if (msg instanceof Buffer) return recording.write(msg);
  });

  ws.on('close', () => {
    recording.close();

    let file = recording.info.file;
    if (config.recFormat !== 'raw') {
      file = new Convertor(logger, recording.info.file, recording.info.mixType, recording.info.sampleRate).convert();
    }

    switch (config.recDestination) {
      case 'aws': {
        uploadToAWS(logger, file);
      }
    }
  });
};

module.exports = handler;
