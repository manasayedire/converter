import { useState } from 'react';
import './App.css';
import { Button, Flex, Heading, Text, TextField } from '@adobe/react-spectrum';

function RomanNumeralConveter() {
  const [number, setNumber] = useState();
  const [romanNumeral, setRomanNumeral] = useState('');

  const onConvert = () => {
    setRomanNumeral('I');
  };

  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Heading>Roman Numeral Converter</Heading>
      <TextField
        label="Enter a number"
        name="email"
        type="number"
        value={number}
        isQuiet
      />
      <Text>Roman numeral is {romanNumeral}</Text>
      <Button variant="primary" onPress={onConvert}>
        Convert
      </Button>
    </Flex>
  );
}

export default RomanNumeralConveter;
