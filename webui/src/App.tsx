import { useState } from 'react';
import { lightTheme, Provider, ToastContainer } from '@adobe/react-spectrum';
import { IntlProvider } from 'react-intl';
import RomanNumeralConveter from './components/RomanNumeralConverter';
import Header from './components/Header';

function App() {
  const [locale, setLocale] = useState('en-US');

  /*
   * Sets the spectrum theme
   * Sets the intl provider
   * Renders the Header component and RomanNumeralConverter component
   */
  return (
    <Provider theme={lightTheme} breakpoints={{ tablet: 640, desktop: 1024 }} locale={locale}>
      <IntlProvider locale={locale}>
        <Header setLocale={setLocale} />
        <RomanNumeralConveter />
        <ToastContainer />
      </IntlProvider>
    </Provider>
  );
}

export default App;
