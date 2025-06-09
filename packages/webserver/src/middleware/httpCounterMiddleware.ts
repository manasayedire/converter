import { Request, Response, NextFunction } from 'express';
import { requestCounter, responseCounter } from '../utils/metrics';

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

export default httpCounterMiddleware;
