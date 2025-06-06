const express = require('express');
const allowMethods = require('express-allow-methods').default;

const router = express.Router();
const romanNumeralController = require('../controllers/romanNumeralController');

router
  .route('/')
  .all(allowMethods('GET'))
  .get(romanNumeralController.getRomanNumeral);

module.exports = router;
