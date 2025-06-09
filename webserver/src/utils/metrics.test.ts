import { httpCounterMiddleware, setupMetricsEndpoint, requestCounter, responseCounter } from './metrics';
import express, { Request, Response, NextFunction } from 'express';
import request from 'supertest';

// Mock prom-client
jest.mock('prom-client', () => {
  const Counter = jest.fn().mockImplementation(() => ({
    inc: jest.fn(),
  }));
  const Registry = jest.fn().mockImplementation(() => ({
    registerMetric: jest.fn(),
    contentType: 'text/plain',
    metrics: jest.fn().mockResolvedValue('mocked_metrics'),
  }));
  return {
    Counter,
    Registry,
    collectDefaultMetrics: jest.fn(),
  };
});

/*
 * Unit Test cases for metrics.ts
 */
describe('metrics utils', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  /*
   * Unit Test cases for httpCounterMiddleware
   */
  describe('httpCounterMiddleware', () => {
    it('should increment request and response counters', () => {
      const req = { method: 'GET', url: '/test', originalUrl: '/test' } as Request;
      const res = {
        statusCode: 200,
        statusMessage: 'OK',
        on: jest.fn((event, cb) => {
          if (event === 'finish') cb();
        }),
      } as unknown as Response;
      const next = jest.fn() as NextFunction;

      httpCounterMiddleware(req, res, next);

      // Check that requestCounter.inc was called
      expect(requestCounter.inc).toHaveBeenCalledWith({ method: 'GET', endpoint: '/test' });

      // Check that responseCounter.inc was called
      expect(responseCounter.inc).toHaveBeenCalledWith({
        method: 'GET',
        endpoint: '/test',
        status_code: 200,
        status_message: 'OK',
      });

      expect(next).toHaveBeenCalled();
    });
  });

  /*
   * Unit Test cases for setupMetricsEndpoint
   */
  describe('setupMetricsEndpoint', () => {
    it('should setup /metrics endpoint and return metrics', async () => {
      const app = express();
      setupMetricsEndpoint(app);
      const res = await request(app).get('/metrics');
      expect(res.statusCode).toBe(200);
      expect(res.text).toBe('mocked_metrics');
      expect(res.header['content-type']).toContain('text/plain');
    });
  });
});
