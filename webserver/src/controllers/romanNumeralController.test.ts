import request from 'supertest';
import express from 'express';
import romanNumeralRoutes from '../routes/romanNumeralRoutes';

jest.mock('../utils/utils', () => ({
  convertToRoman: jest.fn(() => 'X'),
}));

describe('GET /romannumeral', () => {
  let app: express.Application;
  beforeAll(() => {
    app = express();
    app.use('/romannumeral', romanNumeralRoutes);
  });

  it('should return roman numeral for valid input', async () => {
    const res = await request(app)
      .get('/romannumeral?query=10')
      .set('Accept', 'application/json');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ input: '10', output: 'X' });
  });

  it('should return 400 if query param is missing', async () => {
    const res = await request(app).get('/romannumeral');
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('MISSING_QUERY_PARAM');
  });

  it('should return 400 for invalid query value - less than 1', async () => {
    const res = await request(app).get('/romannumeral?query=0');
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('INVALID_QUERY_VALUE');
  });

  it('should return 400 for invalid query value - greater than 3999', async () => {
    const res = await request(app).get('/romannumeral?query=4000');
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('INVALID_QUERY_VALUE');
  });

  it('should return 400 for invalid query value - not a whole number', async () => {
    const res = await request(app).get('/romannumeral?query=4.5');
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('INVALID_QUERY_VALUE');
  });

  it('should return 400 for invalid query value - a character', async () => {
    const res = await request(app).get('/romannumeral?query=A');
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('INVALID_QUERY_VALUE');
  });

  it('should return 406 if Accept header is not application/json', async () => {
    const res = await request(app)
      .get('/romannumeral?query=10')
      .set('Accept', 'text/html');
    expect(res.statusCode).toBe(406);
    expect(res.body.error).toBe('NOT_ACCEPTABLE');
  });

  it('should return 500 for MISC_SERVER_ERROR if convertToRoman throws', async () => {
    const { convertToRoman } = require('../utils/utils');
    convertToRoman.mockImplementationOnce(() => {
      throw new Error('fail');
    });
    const res = await request(app).get('/romannumeral?query=10');
    expect(res.statusCode).toBe(500);
    expect(res.body.error).toBe('MISC_SERVER_ERROR');
  });
});
