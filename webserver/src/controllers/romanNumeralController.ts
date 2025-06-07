import { convertToRoman } from '../utils/helpers';
import { Request, Response, NextFunction } from 'express';
import { RomanNumeralResponse, RomanNumeralError } from '../types/romanNumeral';
const logger = require('../utils/logger');

const getRomanNumeral = (req: Request, res: Response, next: NextFunction) => {
  if (!req.accepts('json')) {
    const error: RomanNumeralError = {
      code: '406',
      error: 'NOT_ACCEPTABLE',
      message: 'API only supports application/json responses.',
    };
    logger.error(error);
    return res.status(406).json(error);
  }

  try {
    if (!req.query.query) {
      const error: RomanNumeralError = {
        code: '400',
        error: 'MISSING_QUERY_PARAM',
        message: 'Required query param is missing.',
      };
      logger.error(error);
      return res.status(400).json(error);
    }
    const number: number = parseInt(req.query.query as string);
    if (
      isNaN(number) ||
      number < 1 ||
      number > 3999 ||
      !Number.isInteger(Number(req.query.query))
    ) {
      const error: RomanNumeralError = {
        code: '400',
        error: 'INVALID_QUERY_VALUE',
        message: 'Please provide a whole number between 1 and 3999.',
      };
      logger.error(error);
      return res.status(400).json(error);
    }

    const romanNumeral = convertToRoman(number);
    
    const response: RomanNumeralResponse = { input: number.toString(), output: romanNumeral };
    logger.info(response);
    return res.status(200).json(response);
  } catch (err) {
    const error: RomanNumeralError = {
      code: '500',
      error: 'MISC_SERVER_ERROR',
      errorDetail: err,
      message: 'Some miscellaneous error has occurred.',
    };
    logger.error(error);
    return res.status(500).json(error);
  }
};

export default { getRomanNumeral };
