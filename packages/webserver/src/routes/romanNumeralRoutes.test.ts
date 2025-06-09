// Mock the romanNumeralController before any imports
const romanNumeralControllerMock = jest.fn((_req, res) => res.status(200).json({ mocked: true }));
jest.mock('../controllers/romanNumeralController', () => ({
  getRomanNumeral: romanNumeralControllerMock,
}));

import express from 'express';
import romanNumeralRoutes from './romanNumeralRoutes';
import request from 'supertest';

/*
 * Unit Test cases for romanNumeralRoutes
 * Calls the controller when GET /romannumeral is hit
 * Does not allow POST, PUT, DELETE, PATCH methods
 */
describe('romanNumeralRoutes', () => {
  let app: express.Application;
  beforeAll(() => {
    app = express();
    app.use('/romannumeral', romanNumeralRoutes);
  });

  const expectMethodNotAllowed = (res: request.Response) => {
    expect(res.statusCode).toBe(405);
    expect(res.text).toBe('Method Not Allowed');
  };

  it('should call the controller when GET /romannumeral is hit', async () => {
    await request(app).get('/romannumeral?query=1').set('Accept', 'application/json');
    // Check if the controller is called
    expect(romanNumeralControllerMock).toHaveBeenCalled();
  });

  it('should not allow POST method', async () => {
    const res = await request(app).post('/romannumeral?query=1').set('Accept', 'application/json');
    expectMethodNotAllowed(res);
  });

  it('should not allow PUT method', async () => {
    const res = await request(app).put('/romannumeral?query=1').set('Accept', 'application/json');
    expectMethodNotAllowed(res);
  });

  it('should not allow DELETE method', async () => {
    const res = await request(app).delete('/romannumeral?query=1').set('Accept', 'application/json');
    expectMethodNotAllowed(res);
  });

  it('should not allow PATCH method', async () => {
    const res = await request(app).patch('/romannumeral?query=1').set('Accept', 'application/json');
    expectMethodNotAllowed(res);
  });
});
