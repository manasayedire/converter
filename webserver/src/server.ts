import express from 'express';
import cors from 'cors';
import romanNumeralRoutes from './routes/romanNumeralRoutes';
import { setupMetricsEndpoint } from './utils/metrics';
const app = express();
const logger = require('./utils/logger');

// Allow requests only from 3000 port
var corsOptions = {
  origin: process.env.FRONTEND_ORIGIN,
};

// Log all incoming requests with required info
app.use((req, res, next) => {
  const start = Date.now();
  logger.info({
    message: 'Incoming request',
    method: req.method,
    url: req.url,
    query: req.query,
  });

  res.on('finish', () => {
    const durationMs = Date.now() - start;
    logger.info({
      message: 'Request completed',
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      durationMs,
    });
  });
  next();
});

// Register Prometheus metrics endpoint
setupMetricsEndpoint(app);

// Apply CORS only to /romannumeral route
app.use('/romannumeral', cors(corsOptions), romanNumeralRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

export default app;
