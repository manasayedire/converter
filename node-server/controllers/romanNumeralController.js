exports.getRomanNumeral = (req, res) => {
  const number = parseInt(req.query.query, 10);
  if (isNaN(number) || number < 1 || number > 3999) {
    return res.status(400).json({ error: 'Please provide a valid number between 1 and 3999.' });
  }

  // TODO: Implement the logic to convert the number to a roman numeral
  const result = 'I';

  res.json({ input: number, output: result });
}; 