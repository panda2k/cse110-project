const request = require('supertest');
const app = require('../index.ts'); // Your Express app

afterAll(() => {
  app.server.close();
});

describe('GET /users/testroute', () => {
  it('works', async () => {
    const response = await request(app.app).get('/users/testroute');
    expect(response.statusCode).toBe(200);
  });
});