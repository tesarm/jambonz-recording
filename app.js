const opts = Object.assign({
  timestamp: () => {
    return `, "time": "${new Date().toISOString()}"`;
  }
}, {
  level: process.env.JAMBONES_LOGLEVEL || 'info'
});
const logger = require('pino')(opts);

const express = require('express');
const app = express();

const PORT = process.env.HTTP_PORT || 3000;

app.get('/', (req, res) => res.send('hello world'));

app.listen(PORT, () => logger.info(`listening for HTTP traffic on port ${PORT}`));
