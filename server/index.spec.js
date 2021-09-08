const supertest = require('supertest');
const app = require('./index');
const REPORTS = require('../data/reports.json');

const request = supertest(app);

describe('Server test suite', () => {
  it('fetch reports', async () => {
    const response = await request.get('/reports');
    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual(REPORTS.elements);
  });

  it('update report', async () => {
    const response = await request
      .put(`/reports/${REPORTS.elements[0].id}`)
      .send({
        ticketState: 'someState',
      });
    expect(response.body.state).toEqual('someState');
  });
});
