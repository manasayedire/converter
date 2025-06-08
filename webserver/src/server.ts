import express from 'express';
import cors from 'cors';
import romanNumeralRoutes from './routes/romanNumeralRoutes';
import { setupMetricsEndpoint, httpCounterMiddleware } from './utils/metrics';
const app = express();

// Allow requests only from 3000 port
const corsOptions = {
  origin: 'http://localhost:3000',
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
