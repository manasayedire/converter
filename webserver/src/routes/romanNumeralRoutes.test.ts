import express from 'express';
import romanNumeralController from '../controllers/romanNumeralController';
import romanNumeralRoutes from './romanNumeralRoutes';
import request from 'supertest';

// Mock romanNumeralController
jest.mock('../controllers/romanNumeralController', () => ({
  getRomanNumeral: jest.fn((req, res) =>
    res.status(200).json({ mocked: true }),
  ),
}));

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

  it('should call the controller when GET /romannumeral is hit', async () => {
    await request(app)
      .get('/romannumeral?query=1')
      .set('Accept', 'application/json');
    // Check if the controller is called
    expect(romanNumeralController.getRomanNumeral).toHaveBeenCalled();
  });

  it('should not allow POST, PUT, DELETE, PATCH methods', async () => {
    const methods = ['post', 'put', 'delete', 'patch'];
    for (const method of methods) {
      const res = await (request(app) as any)
        [method]('/romannumeral?query=1')
        .set('Accept', 'application/json');
      // Check if the method is not allowed
      expect(res.statusCode).toBe(405);
    }
  });
});
