const express = require('express');
const app = express();
const romanNumeralRoutes = require('./routes/romanNumeralRoutes');
const cors = require('cors');

// Allow requests only from 3000 port
var corsOptions = {
    origin: 'http://localhost:3000',
}
app.use(cors(corsOptions));

app.use('/romannumeral', romanNumeralRoutes);

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
    console.log('Press Ctrl+C to quit.');
});