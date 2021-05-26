const config = require('./config');
const loggerOpts = {
  timestamp: () => `, "time": "${new Date().toISOString()}"`,
  level: config.logLevel
};
const logger = require('pino')(loggerOpts);
const express = require('express');
const cors = require('cors');

const routes = require('./lib/routes/index');

const app = express();
app.use(cors());
app.use('/', routes);
app.use((err, req, res, next) => {
  logger.error(err, 'burped error');
  res.status(err.status || 500).json({msg: err.message});
});
app.get('/', (req, res) => res.send('hello world'));


app.listen(config.httpPort, () => logger.info(`listening for HTTP traffic on port ${config.httpPort}`));
