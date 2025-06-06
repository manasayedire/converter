/*
 * Takes an integer input and converts it into its equivalent Roman numeral representation using standard notation.
 * Refer, https://en.wikipedia.org/wiki/Roman_numerals for more details.
 * @param number - The number to convert to a Roman numeral.
 * @returns The Roman numeral representation of the number.
 */
export function convertToRoman(number: number): string {
  if (number < 1 || number > 3999 || !Number.isInteger(number)) {
    return '';
  }
  var romannumeral = '';
  // TODO: Implement the logic to convert the number to a Roman numeral.
  return romannumeral;
}
