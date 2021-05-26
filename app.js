const config = require('./config');

const loggerOpts = {
  timestamp: () => `, "time": "${new Date().toISOString()}"`,
  level: config.logLevel
};
const logger = require('pino')(loggerOpts);
const express = require('express');
const cors = require('cors');
const expressWs = require('express-ws');

const routes = require('./lib/routes/index');
const ws = require('./lib/ws/handler');

const app = express();
expressWs(app);

app.use(cors());
app.use('/', routes);
app.ws('/', ws);
app.use((err, req, res, next) => {
  logger.error(err, 'burped error');
  res.status(err.status || 500).json({msg: err.message});
});

app.listen(config.httpPort, () => logger.info(`listening for HTTP traffic on port ${config.httpPort}`));
