const { convertToRoman } = require('../utils');

exports.getRomanNumeral = (req, res, next) => {
  if (!req.accepts('json')) {
    return res.status(406).json({ status: '406', error: 'NOT_ACCEPTABLE', message: 'API only supports application/json responses.' });
  }

  try {
    if (!req.query.query) {
      return res.status(400).json({ status: '400', error: 'MISSING_QUERY_PARAM', message: 'Required query param is missing.' });
    }
    const number = parseInt(req.query.query);
    if (
      isNaN(number) ||
      number < 1 ||
      number > 3999 ||
      !Number.isInteger(Number(req.query.query))
    ) {
      return res.status(400).json({ status: '400', error: 'INVALID_QUERY_VALUE', message: 'Please provide a whole number between 1 and 3999.' });
    }

    const romanNumeral = convertToRoman(number);

    res.json({ input: number.toString(), output: romanNumeral });
  } catch (err) {
    return res.status(500).json({ status: '500', error: 'MISC_SERVER_ERROR', message: 'Some miscellaneous error has occurred.' });
  }
}; 