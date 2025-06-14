import { convertToRoman } from '../utils/helpers';
import { Request, Response } from 'express';
import { RomanNumeralResponse, RomanNumeralError } from '../types/romanNumeral';
import logger from '../utils/logger';

/*
 * Returns the roman numeral for the given number
 * @param req - The request object
 * @param res - The response object
 * @param next - The next function
 * @returns The roman numeral for the given number
 */
const getRomanNumeral = (req: Request, res: Response) => {
  // Validate: Accept header must be application/json
  if (!req.accepts('json')) {
    const notAcceptableError: RomanNumeralError = {
      code: '406',
      error: 'NOT_ACCEPTABLE',
      message: 'API only supports application/json responses.',
    };
    logger.error(notAcceptableError);
    return res.status(406).json(notAcceptableError);
  }

  try {
    // Validate: query param is present
    if (!req.query.query) {
      const missingQueryParamError: RomanNumeralError = {
        code: '400',
        error: 'MISSING_QUERY_PARAM',
        message: 'Required query param is missing.',
      };
      logger.error(missingQueryParamError);
      return res.status(400).json(missingQueryParamError);
    }

    const invalidQueryError: RomanNumeralError = {
      code: '400',
      error: 'INVALID_QUERY_PARAM',
      message: 'Please provide a whole number between 1 and 3999.',
    };
    // Validate: must be only digits
    if (!/^\d+$/.test(req.query.query as string)) {
      logger.error(invalidQueryError);
      return res.status(400).json(invalidQueryError);
    }
    // Validate: must be a whole number between 1 and 3999
    const number: number = parseInt(req.query.query as string);
    if (number < 1 || number > 3999 || !Number.isInteger(number)) {
      logger.error(invalidQueryError);
      return res.status(400).json(invalidQueryError);
    }

    // Convert the number to a roman numeral
    const romanNumeral = convertToRoman(number);

    // Return the roman numeral
    const response: RomanNumeralResponse = {
      input: number.toString(),
      output: romanNumeral,
    };
    logger.info(response);
    return res.status(200).json(response);
  } catch (err) {
    // Return 500 error if there is an error
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
