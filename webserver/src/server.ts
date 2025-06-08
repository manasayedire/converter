import express from 'express';
import cors from 'cors';
import romanNumeralRoutes from './routes/romanNumeralRoutes';
const app = express();

// Allow requests only from 3000 port
var corsOptions = {
  origin: 'http://localhost:3000',
};

// Apply CORS only to /romannumeral route
app.use('/romannumeral', cors(corsOptions), romanNumeralRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

export default app;
