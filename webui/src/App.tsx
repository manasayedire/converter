import { useState } from 'react';
import { defaultTheme, Provider, ToastContainer } from '@adobe/react-spectrum';
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
    <Provider theme={defaultTheme} locale={locale} height="100%">
      <IntlProvider locale={locale}>
        <Header setLocale={setLocale} />
        <RomanNumeralConveter />
        <ToastContainer />
      </IntlProvider>
    </Provider>
  );
}

export default App;
