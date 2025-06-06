import { useCallback } from 'react';

export function useRomanNumeral() {
  const convert = useCallback(async (number: number) => {
      const response = await fetch(
        `http://localhost:8080/romannumeral?query=${number}`,
      );
      // Error logging
      const data = await response.json();
      return data.output || '';
  }, []);

  return { convert };
} 