const express = require('express');
const reports = require('./data/reports.json').elements;

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(express.static('public'));

app.use((_req, res, next) => {
  res.append('Access-Control-Allow-Origin', [process.env.CLIENT_URL]);
  res.append('Access-Control-Allow-Methods', 'GET,PUT');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/reports', (_req, res) => {
  return res.json(reports);
});

app.put('/reports/:reportId', (req, res) => {
  const reportIndex = reports.findIndex(r => r.id === req.params.reportId);

  if (reportIndex === -1) {
    return res.sendStatus(404);
  }

  reports[reportIndex].state = req.body.ticketState;
  return res.json(reports[reportIndex]);
});

module.exports = app;

if (process.env['NODE_ENV'] !== 'test') {
  app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`);
  });
}
