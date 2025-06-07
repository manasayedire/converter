import { useCallback } from 'react';

export function useRomanNumeral() {
  const baseUrl = process.env.REACT_APP_API_URL;
  const convert = useCallback(async (number: number) => {
      const response = await fetch(
        `${baseUrl}/romannumeral?query=${number}`,
      );
      // Error logging
      const data = await response.json();
      return data.output || '';
  }, []);

  return { convert };
} 