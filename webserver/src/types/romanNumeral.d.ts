export type RomanNumeralResponse = {
  input: string;
  output: string;
};

export type RomanNumeralError = {
  code: string;
  error: string;
  message: string;
  errorDetail?: unknown;
}; 