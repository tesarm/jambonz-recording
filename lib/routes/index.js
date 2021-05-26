const express = require('express');
const routes = express.Router();

// health checks
routes.get('/', (req, res) => {
  res.sendStatus(200);
});

routes.get('/health', (req, res) => {
  res.sendStatus(200);
});

module.exports = routes;
