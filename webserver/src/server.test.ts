import request from 'supertest';
import express from 'express';
import romanNumeralRoutes from './routes/romanNumeralRoutes';

function createServer() {
  const app = express();
  app.use('/romannumeral', romanNumeralRoutes);
  return app;
}

describe('server.js tests', () => {
  let app: express.Application;
  beforeAll(() => {
    app = createServer();
  });

  it('should return 404 for non-existent routes', async () => {
    const res = await request(app).get('/nonexistent');
    expect(res.statusCode).toBe(404);
  });
});
