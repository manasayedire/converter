import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from './Header';
import { lightTheme } from '@adobe/react-spectrum';
import { Provider } from '@adobe/react-spectrum';

const setLocale = jest.fn();
const makeComponent = () => {
  return render(
    <Provider theme={lightTheme}>
  <Header setLocale={setLocale} />
  </Provider>
);
};

describe('Header', () => {
  it('renders the ActionButton with GlobeGrid icon', () => {
    makeComponent();
    expect(screen.getByTestId('header-change-language-button')).toBeInTheDocument();
  });

  it('opens the menu when ActionButton is clicked', async () => {
    makeComponent();
    userEvent.click(screen.getByTestId('header-change-language-button'));
    expect(screen.getByText('English')).toBeInTheDocument();
    expect(screen.getByText('Spanish')).toBeInTheDocument();
  });

  it('calls setLocale with the correct locale when a menu item is selected', async () => {
   
    makeComponent();
    userEvent.click(screen.getByTestId('header-change-language-button'));
    userEvent.click(screen.getByText('Spanish'));
    expect(setLocale).toHaveBeenCalledWith('es-ES');
  });
});
