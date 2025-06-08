/*
 * Hook to convert the number to a roman numeral
 * @returns The convert function
 */
export function useRomanNumeral() {
  const baseUrl = import.meta.env.VITE_API_URL;

  /*
   * Converts the number to a roman numeral
   * @param number - The number to convert to a roman numeral
   * @returns The roman numeral representation of the number
   */
  const convert = async (number: number) => {
    try {
      // Calls the API to convert the number to a roman numeral
      const response = await fetch(`${baseUrl}/romannumeral?query=${number}`);
      // Check if the response is ok
      if (!response.ok) {
        const errorBody = await response.json();
        console.error(errorBody);
        throw new Error(`${errorBody.error} ${errorBody.message}`);
      }
      const data = await response.json();
      return data.output || '';
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return { convert };
}
