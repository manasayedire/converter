import { Application, Request, Response, NextFunction } from 'express';
import client from 'prom-client';

// REGISTERS A NEW PROMETHEUS CLIENT
const register = new client.Registry();
client.collectDefaultMetrics({
  register: register,
  prefix: 'converter_', // Prefixes the default app metrics name with the specified string
});

/**
 * Sets up the /metrics endpoint for Prometheus scraping
 * @param app The Express app instance
 */
function setupMetricsEndpoint(app: Application) {
  app.get('/metrics', async (req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Content-type', register.contentType);
    res.send(await register.metrics());
    if (next) next();
  });
}

export { register, setupMetricsEndpoint };
