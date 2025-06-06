import { useCallback } from 'react';

export function useRomanNumeral() {
  const convert = useCallback(async (number: number) => {
    try {
      const response = await fetch(
        `http://localhost:8080/romannumeral?query=${number}`,
      );
      // Error logging
      const data = await response.json();
      return data.output || '';
    } catch (err) {
      throw err;
    }
  }, []);

  return { convert };
} 