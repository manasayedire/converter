import express from 'express';
import allowMethods from 'express-allow-methods';
import romanNumeralController from '../controllers/romanNumeralController';

const router = express.Router();

router
  .route('/')
  .all(allowMethods('GET'))
  .get(romanNumeralController.getRomanNumeral);

export default router;
