import request from 'supertest';
import express from 'express';
import romanNumeralRoutes from './routes/romanNumeralRoutes';

// Helper function to create the server
function createServer() {
  const app = express();
  app.use('/romannumeral', romanNumeralRoutes);
  return app;
}

/*
 * Unit Test cases for server.js
 * Returns 404 for non-existent routes
 */
describe('server.js tests', () => {
  let app: express.Application;
  beforeAll(() => {
    app = createServer();
  });

  it('should return 404 for non-existent routes', async () => {
    const res = await request(app).get('/nonexistentroute');
    expect(res.statusCode).toBe(404);
  });
});
