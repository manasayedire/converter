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
  // Roman numerals are a numeral system that uses letters to represent numbers.
  const romanNumerals = [
    { value: 1000, numeral: 'M' },
    { value: 900, numeral: 'CM' },
    { value: 500, numeral: 'D' },
    { value: 400, numeral: 'CD' },
    { value: 100, numeral: 'C' },
    { value: 90, numeral: 'XC' },
    { value: 50, numeral: 'L' },
    { value: 40, numeral: 'XL' },
    { value: 10, numeral: 'X' },
    { value: 9, numeral: 'IX' },
    { value: 5, numeral: 'V' },
    { value: 4, numeral: 'IV' },
    { value: 1, numeral: 'I' },
  ];
  let roman = '';
  // Iterate through the romanNumerals array
  romanNumerals.forEach((romanNumeral) => {
    // While the number is greater than or equal to the value of the roman numeral,
    // subtract the value from the number and add the numeral to the roman string
    while (number >= romanNumeral.value) {
      number = number - romanNumeral.value;
      roman = roman.concat(romanNumeral.numeral);
    }
  });
  return roman;
}
