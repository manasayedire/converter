const express = require('express');
const app = express();
const romanNumeralRoutes = require('./node-server/routes/romanNumeralRoutes');

app.use('/romannumeral', romanNumeralRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 