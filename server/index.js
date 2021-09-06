const express = require('express');
const reports = require('../data/reports.json').elements;

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/reports', (_req, res) => {
  res.json(reports);
});

app.put('/reports/:reportId', (req, res) => {
  const reportIndex = reports.findIndex(r => r.id === req.params.reportId);
  if (reportIndex === -1) {
    res.sendStatus(404);
  } else {
    reports[reportIndex].state = req.body.ticketState;
    res.json(reports[reportIndex]);
  }
});

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});
