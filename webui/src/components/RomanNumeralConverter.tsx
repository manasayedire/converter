import { useState } from 'react';
import {
  Button,
  Flex,
  Heading,
  NumberField,
  LabeledValue,
  Divider,
  ToastQueue,
} from '@adobe/react-spectrum';
import { useTranslations } from '../hooks/useTranslations';
import { useRomanNumeral } from '../hooks/useRomanNumeral';

function RomanNumeralConveter() {
  const [number, setNumber] = useState<number | undefined>(undefined);
  const [romanNumeral, setRomanNumeral] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<boolean>(false);
  const { formatMessage } = useTranslations();
  const { convert } = useRomanNumeral();

  const onConvert = async () => {
    if (number === undefined || number < 1 || number > 3999) {
      setError(true);
      return;
    }
    setError(false);
    setLoading(true);
    try {
      const result = await convert(number);
      setRomanNumeral(result);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error(err);
      ToastQueue.negative(formatMessage.format('toast.error'), {timeout: 3000});
    }
  };

  return (
    <Flex direction="column" justifyContent="center" alignItems="center">
      <Flex direction="column" margin="size-200" width="308px">
        <Heading data-testid="roman-numeral-converter-heading" level={2}>{formatMessage.format('heading')}</Heading>
        <Divider size="S" />
        <NumberField
          data-testid="roman-numeral-converter-number"
          marginY="size-200"
          maxWidth="size-7000"
          height="size-400"
          label={formatMessage.format('input.label')}
          labelPosition="side"
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
        <Button data-testid="roman-numeral-converter-button" marginY="size-200" variant="primary" onPress={onConvert}>
          {formatMessage.format('button.convert')}
        </Button>
      </Flex>
    </Flex>
  );
}

export default RomanNumeralConveter;
