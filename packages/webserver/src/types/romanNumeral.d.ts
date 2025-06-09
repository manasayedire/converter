/*
 * Response type for the roman numeral converter
 * @param input - The input number
 * @param output - The roman numeral for the input number
 */
export type RomanNumeralResponse = {
  input: string;
  output: string;
};

/*
 * Error type for the roman numeral converter
 * @param code - The error code
 * @param error - The error message
 * @param message - The error message
 * @param errorDetail - The error detail
 */
export type RomanNumeralError = {
  code: string;
  error: string;
  message: string;
  errorDetail?: unknown;
};
