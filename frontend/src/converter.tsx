import { useState } from 'react';
import './App.css';
import { Button, Flex, Heading, Text, TextField } from '@adobe/react-spectrum';

function RomanNumeralConveter() {
  const [number, setNumber] = useState('');
  const [romanNumeral, setRomanNumeral] = useState('');

  const onConvert = async () => {
    try {
      const response = await fetch(`http://localhost:8080/romannumeral?query=${Number(number)}`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setRomanNumeral(data.output || '');
    } catch (error) {
      console.error('Error');
    }
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
        onChange={setNumber}
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
