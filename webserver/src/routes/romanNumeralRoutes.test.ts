import express from 'express';

jest.mock('../controllers/romanNumeralController', () => ({
  getRomanNumeral: jest.fn((req, res) =>
    res.status(200).json({ mocked: true }),
  ),
}));
import romanNumeralController from '../controllers/romanNumeralController';
import romanNumeralRoutes from './romanNumeralRoutes';
import request from 'supertest';

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
    expect(romanNumeralController.getRomanNumeral).toHaveBeenCalled();
  });

  it('should not allow POST, PUT, DELETE, PATCH methods', async () => {
    const methods = ['post', 'put', 'delete', 'patch'];
    for (const method of methods) {
      const res = await (request(app) as any)
        [method]('/romannumeral?query=1')
        .set('Accept', 'application/json');
      expect(res.statusCode).toBe(405);
    }
  });
});
