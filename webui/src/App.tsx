import { useState } from 'react';
import { lightTheme, Provider, ToastContainer } from '@adobe/react-spectrum';
import { IntlProvider } from 'react-intl';
import RomanNumeralConveter from './components/RomanNumeralConveter';
import Header from './components/Header';

function App() {
  const [locale, setLocale] = useState('en-US');

  return (
    <Provider
      theme={lightTheme}
      breakpoints={{ tablet: 640, desktop: 1024 }}
      locale={locale}
    >
      <IntlProvider locale={locale}>
        <Header setLocale={setLocale} />
        <RomanNumeralConveter />
        <ToastContainer />
      </IntlProvider>
    </Provider>
  );
}

export default App;
