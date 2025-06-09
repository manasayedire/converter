import express from 'express';
import cors from 'cors';
import romanNumeralRoutes from './routes/romanNumeralRoutes';
import { setupMetricsEndpoint } from './utils/metrics';
import httpCounterMiddleware from './middleware/httpCounterMiddleware';
import dotenv from 'dotenv';

// Create express app
const app = express();

// Load environment variables from .env file
dotenv.config();

// Allow requests only from frontend origin
const corsOptions = {
  origin: process.env.FRONTEND_ORIGIN,
};

// Use http counter middleware
app.use(httpCounterMiddleware);
// Setup /metrics endpoint
setupMetricsEndpoint(app);

// Apply CORS only to /romannumeral route
app.use('/romannumeral', cors(corsOptions), romanNumeralRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

export default app;
