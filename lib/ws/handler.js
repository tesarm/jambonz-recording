
const Recording = require('../models/recording');

const handler = (ws) => {
  const recording = new Recording();

  ws.on('message', (msg) => {
    if (typeof msg === 'string') return recording.create(JSON.parse(msg));
    if (msg instanceof Buffer) return recording.write(msg);
  });

  ws.on('close', () => recording.close());
};

module.exports = handler;
