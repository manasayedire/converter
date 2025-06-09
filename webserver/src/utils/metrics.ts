import { Application, Request, Response, NextFunction } from 'express';
import client from 'prom-client';

// REGISTERS A NEW PROMETHEUS CLIENT
const register = new client.Registry();

// Collects default metrics from the app
client.collectDefaultMetrics({
  register: register,
  prefix: 'converter_', // Prefixes the default app metrics name with the specified string
});

// Custom metric - Request Counter
const requestCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'endpoint', 'status_code', 'status_message'],
});
register.registerMetric(requestCounter);

// Custom metric - Response Counter
const responseCounter = new client.Counter({
  name: 'http_responses_total',
  help: 'Total number of HTTP responses',
  labelNames: ['method', 'endpoint', 'status_code', 'status_message'],
});
register.registerMetric(responseCounter);

// Middleware to increment the counter on each request
function httpCounterMiddleware(req: Request, res: Response, next: NextFunction) {
  res.on('finish', () => {
    responseCounter.inc({
      method: req.method,
      endpoint: req.originalUrl,
      status_code: res.statusCode,
      status_message: res.statusMessage || '',
    });
  });
  requestCounter.inc({ method: req.method, endpoint: req.url });
  next();
}

/**
 * Sets up the /metrics endpoint for Prometheus scraping
 * @param app The Express app instance
 */
function setupMetricsEndpoint(app: Application) {
  app.get('/metrics', async (_req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Content-type', register.contentType);
    res.send(await register.metrics());
    if (next) next();
  });
}

export { setupMetricsEndpoint, httpCounterMiddleware, requestCounter, responseCounter };
