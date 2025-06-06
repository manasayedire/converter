import { renderHook } from '@testing-library/react';
import { useRomanNumeral } from './useRomanNumeral';

describe('useRomanNumeral', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should convert number to roman numeral (success)', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: async () => ({ output: 'X' }),
    }) as jest.Mock;

    const { result } = renderHook(() => useRomanNumeral());
    const output = await result.current.convert(10);
    expect(global.fetch).toHaveBeenCalledWith('http://localhost:8080/romannumeral?query=10');
    expect(output).toBe('X');
  });

  it('should return empty string if output is missing', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: async () => ({}),
    }) as jest.Mock;

    const { result } = renderHook(() => useRomanNumeral());
    const output = await result.current.convert(10);
    expect(output).toBe('');
  });

  it('should throw error if fetch fails', async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error('fail'));
    const { result } = renderHook(() => useRomanNumeral());
    await expect(result.current.convert(10)).rejects.toThrow('fail');
  });
});
