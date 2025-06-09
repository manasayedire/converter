import '@testing-library/jest-dom/vitest';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from './Header';
import { lightTheme } from '@adobe/react-spectrum';
import { Provider } from '@adobe/react-spectrum';

const setLocale = vi.fn();
// Helper function to render the Header component
const makeComponent = () => {
  return render(
    <Provider theme={lightTheme}>
      <Header setLocale={setLocale} />
    </Provider>,
  );
};

/*
 * Unit Test cases for Header component
 * Renders the ActionButton with GlobeGrid icon
 * Opens the menu when ActionButton is clicked
 * Calls setLocale with the correct locale when a menu item is selected
 */
describe('Header', () => {
  it('renders the ActionButton with GlobeGrid icon', () => {
    makeComponent();
    expect(screen.getByTestId('header-change-language-button')).toBeInTheDocument();
  });

  it('opens the menu when ActionButton is clicked', async () => {
    makeComponent();
    await userEvent.click(screen.getByTestId('header-change-language-button'));
    expect(screen.getByText('English')).toBeInTheDocument();
    expect(screen.getByText('Español')).toBeInTheDocument();
  });

  it('calls setLocale with the correct locale when a menu item is selected', async () => {
    makeComponent();
    await userEvent.click(screen.getByTestId('header-change-language-button'));
    await userEvent.click(screen.getByText('Español'));
    expect(setLocale).toHaveBeenCalledWith('es-ES');
  });
});
