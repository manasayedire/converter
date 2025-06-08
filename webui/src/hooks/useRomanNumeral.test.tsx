import { describe, it, expect, vi, afterEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useRomanNumeral } from './useRomanNumeral';

/*
 * Unit Test cases for useRomanNumeral hook
 * Converts number to roman numeral (success)
 * Returns empty string if output is missing
 * Throws error if fetch fails
 */
describe('useRomanNumeral', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should convert number to roman numeral (success)', async () => {
    // Mock fetch to return a successful response
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ output: 'X' }),
    });

    const { result } = renderHook(() => useRomanNumeral());
    const output = await result.current.convert(10);
    expect(global.fetch).toHaveBeenCalledWith(
      'http://localhost:8080/romannumeral?query=10',
    );
    expect(output).toBe('X');
  });

  it('should return empty string if output is missing', async () => {
    // Mock fetch to return a successful response with no output
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({}),
    });

    const { result } = renderHook(() => useRomanNumeral());
    const output = await result.current.convert(10);
    expect(output).toBe('');
  });

  it('should throw error if fetch fails', async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error('Mock API error'));
    const { result } = renderHook(() => useRomanNumeral());
    await expect(result.current.convert(10)).rejects.toThrow('Mock API error');
  });
});
