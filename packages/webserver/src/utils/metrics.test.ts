import { setupMetricsEndpoint } from './metrics';
import express from 'express';
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
