import { convertToRoman } from './helpers';

/*
 * Unit Test cases for convertToRoman function
 * Converts 1 to I
 * Converts 4 to IV
 * Converts 9 to IX
 * Converts 58 to LVIII
 * Converts 1994 to MCMXCIV
 * Converts 3999 to MMMCMXCIX
 */
describe('convertToRoman', () => {
  it('converts 1 to I', () => {
    expect(convertToRoman(1)).toBe('I'); // I = 1
  });

  it('converts 4 to IV', () => {
    expect(convertToRoman(4)).toBe('IV'); // IV = 4
  });

  it('converts 9 to IX', () => {
    expect(convertToRoman(9)).toBe('IX'); // IX = 9
  });

  it('converts 58 to LVIII', () => {
    expect(convertToRoman(58)).toBe('LVIII'); // L = 50, V = 5, III = 3
  });

  it('converts 586 to DLXXXVI', () => {
    expect(convertToRoman(586)).toBe('DLXXXVI'); // D = 500, L = 50, VIII = 8
  });

  it('converts 785 to DCCLXXXV', () => {
    expect(convertToRoman(785)).toBe('DCCLXXXV'); // D = 500, C = 100, L = 50, VIII = 8
  });

  it('converts 222 to CCXXII', () => {
    expect(convertToRoman(222)).toBe('CCXXII'); // C = 100, C = 100, X = 10, II = 2
  });

  it('converts 3888 to MMMDCCCLXXXVIII', () => {
    expect(convertToRoman(3888)).toBe('MMMDCCCLXXXVIII'); // M = 1000, D = 500, C = 100, L = 50, VIII = 8
  });

  it('converts 3000 to MMM', () => {
    expect(convertToRoman(3000)).toBe('MMM'); // M = 1000, M = 1000, M = 1000
  });

  it('converts 500 to D', () => {
    expect(convertToRoman(500)).toBe('D'); // D = 500
  });

  it('converts 1994 to MCMXCIV', () => {
    expect(convertToRoman(1994)).toBe('MCMXCIV'); // M = 1000, C = 100, M = 1000, X = 10, C = 100, IV = 4
  });

  it('converts 3999 to MMMCMXCIX', () => {
    expect(convertToRoman(3999)).toBe('MMMCMXCIX');
  });

  it('returns empty string for 0', () => {
    expect(convertToRoman(0)).toBe('');
  });

  it('returns empty string for negative numbers', () => {
    expect(convertToRoman(-5)).toBe(''); // -5 is not a valid Roman numeral
  });

  it('returns empty string for non-integer numbers', () => {
    expect(convertToRoman(4.5)).toBe(''); // 4.5 is not a valid Roman numeral
  });

  it('returns empty string for numbers greater than 3999', () => {
    expect(convertToRoman(4000)).toBe(''); // 4000 is not a valid Roman numeral
  });
});
