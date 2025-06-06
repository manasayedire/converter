const express = require('express');
const router = express.Router();
const romanNumeralController = require('../controllers/romanNumeralController');

router.get('/', romanNumeralController.getRomanNumeral);

module.exports = router; 