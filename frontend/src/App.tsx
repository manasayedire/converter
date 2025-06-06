import { lightTheme, Provider } from '@adobe/react-spectrum';
import { IntlProvider } from 'react-intl';
import RomanNumeralConveter from './converter';

const locale = 'en-US';

function App() {
  return (
    <IntlProvider locale={locale}>
      <Provider
        theme={lightTheme}
        colorScheme="light"
        breakpoints={{ tablet: 640, desktop: 1024 }}
        locale={locale}
      >
        <RomanNumeralConveter />
      </Provider>
    </IntlProvider>
  );
}

export default App;
