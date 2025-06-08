export function useRomanNumeral() {
  const baseUrl = import.meta.env.VITE_API_URL;

  const convert = async (number: number) => {
    try {
      const response = await fetch(`${baseUrl}/romannumeral?query=${number}`);
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
