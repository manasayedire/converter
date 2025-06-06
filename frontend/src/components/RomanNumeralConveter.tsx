import { useState } from 'react';
import {
  Button,
  Flex,
  Heading,
  TextField,
  LabeledValue,
  Divider,
} from '@adobe/react-spectrum';
import { useTranslations } from '../hooks/useTranslations';

function RomanNumeralConveter() {
  const [number, setNumber] = useState('');
  const [romanNumeral, setRomanNumeral] = useState('');
  const { formatMessage } = useTranslations();

  const onConvert = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/romannumeral?query=${Number(number)}`,
      );
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setRomanNumeral(data.output || '');
    } catch (error) {
      console.error('Error');
    }
  };

  return (
    <Flex direction="column" justifyContent="center" alignItems="center">
      <Flex direction="column" margin="size-200">
        <Heading level={2}>{formatMessage.format('heading')}</Heading>
        <Divider size="S" />
        <TextField
          marginY="size-200"
          label={formatMessage.format('input.label')}
          labelPosition="side"
          type="number"
          value={number}
          onChange={setNumber}
          isQuiet
        />
        <LabeledValue
          marginY="size-150"
          label={formatMessage.format('output.label')}
          labelPosition="side"
          value={romanNumeral}
        />
        <Button marginY="size-200" variant="primary" onPress={onConvert}>
          {formatMessage.format('button.convert')}
        </Button>
      </Flex>
    </Flex>
  );
}

export default RomanNumeralConveter;
