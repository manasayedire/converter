import { convertToRoman } from './helpers';

describe('convertToRoman', () => {
  xit('converts 1 to I', () => {
    expect(convertToRoman(1)).toBe('I');
  });

  xit('converts 4 to IV', () => {
    expect(convertToRoman(4)).toBe('IV');
  });

  xit('converts 9 to IX', () => {
    expect(convertToRoman(9)).toBe('IX');
  });

  xit('converts 58 to LVIII', () => {
    expect(convertToRoman(58)).toBe('LVIII'); // L = 50, V = 5, III = 3
  });

  xit('converts 1994 to MCMXCIV', () => {
    expect(convertToRoman(1994)).toBe('MCMXCIV');
  });

  xit('converts 3999 to MMMCMXCIX', () => {
    expect(convertToRoman(3999)).toBe('MMMCMXCIX');
  });

  it('returns empty string for 0', () => {
    expect(convertToRoman(0)).toBe('');
  });

  it('returns empty string for negative numbers', () => {
    expect(convertToRoman(-5)).toBe('');
  });

  it('returns empty string for non-integer numbers', () => {
    expect(convertToRoman(4.5)).toBe('');
  });

  it('returns empty string for numbers greater than 3999', () => {
    expect(convertToRoman(4000)).toBe('');
  });
});
