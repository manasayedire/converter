import { useState } from 'react';
import { Button, Flex, Heading, NumberField, LabeledValue, Divider, ToastQueue } from '@adobe/react-spectrum';
import { useTranslations } from '../hooks/useTranslations';
import { useRomanNumeral } from '../hooks/useRomanNumeral';

/*
 * RomanNumeralConverter component for the roman numeral converter.
 * Displays the heading, number input, roman numeral output, and convert button.
 * Checks if the number is valid input.
 * Displays loading state when converting.
 * Displays toast when converting fails.
 */
function RomanNumeralConveter() {
  const [number, setNumber] = useState<number | undefined>(undefined);
  const [romanNumeral, setRomanNumeral] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<boolean>(false);

  const { formatMessage } = useTranslations();
  const { convert } = useRomanNumeral();

  // Converts the number to a roman numeral
  const onConvert = async () => {
    // Check if the number is valid input
    if (number === undefined || number < 1 || number > 3999 || number % 1 !== 0) {
      setError(true);
      // clear the roman numeral
      setRomanNumeral('');
      return;
    }
    setError(false);
    setLoading(true);
    try {
      // Calls the convert function for fetching the roman numeral
      const result = await convert(number);
      setRomanNumeral(result);
    } catch (error) {
      console.error(error);
      ToastQueue.negative(formatMessage.format('toast.error'), {
        timeout: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex direction="column" justifyContent="center" alignItems="center">
      <Flex direction="column" margin="size-200" width="340px">
        <Heading data-testid="roman-numeral-converter-heading" level={2}>
          {formatMessage.format('heading')}
        </Heading>
        <Divider size="S" />
        <NumberField
          data-testid="roman-numeral-converter-number"
          marginY="size-200"
          height="size-400"
          maxWidth="size-8000"
          label={formatMessage.format('input.label')}
          labelPosition="side"
          defaultValue={number}
          value={number}
          onChange={setNumber}
          validationState={error ? 'invalid' : undefined}
          errorMessage={formatMessage.format('input.error')}
          isQuiet
          hideStepper
        />
        <LabeledValue
          data-testid="roman-numeral-converter-roman-numeral"
          marginY="size-150"
          label={formatMessage.format('output.label')}
          labelPosition="side"
          value={loading ? 'Loading...' : romanNumeral || '-'}
        />
        <Button
          alignSelf="center"
          data-testid="roman-numeral-converter-button"
          marginY="size-200"
          variant="accent"
          onPress={onConvert}
        >
          {formatMessage.format('button.convert')}
        </Button>
      </Flex>
    </Flex>
  );
}

export default RomanNumeralConveter;
