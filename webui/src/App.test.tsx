import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('App', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders main UI elements', () => {
    render(<App />);
    // Header button
    expect(screen.getByTestId('header-change-language-button')).toBeInTheDocument();
    // Converter heading, input, and button
    expect(screen.getByTestId('roman-numeral-converter-heading')).toBeInTheDocument();
    expect(screen.getByTestId('roman-numeral-converter-number')).toBeInTheDocument();
    expect(screen.getByTestId('roman-numeral-converter-button')).toBeInTheDocument();
  });

  it('switches language when a new language is selected', async () => {
    render(<App />);
    // Open language menu
    userEvent.click(screen.getByTestId('header-change-language-button'));
    // Select Spanish
    userEvent.click(screen.getByText('Spanish'));
    // Heading should update to Spanish
    await waitFor(() => {
      expect(screen.getByTestId('roman-numeral-converter-heading')).toHaveTextContent(/convertidor de números romanos/i);
    });
    // Switch back to English
    userEvent.click(screen.getByTestId('header-change-language-button'));
    userEvent.click(screen.getByText('English'));
    await waitFor(() => {
      expect(screen.getByTestId('roman-numeral-converter-heading')).toHaveTextContent(/roman numeral converter/i);
    });
  });

  it('converts a number to roman numeral (integration)', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: async () => ({ output: 'X' }),
    });
    render(<App />);
    const input = screen.getByTestId('roman-numeral-converter-number');
    userEvent.clear(input!);
    userEvent.type(input!, '10');
    userEvent.click(screen.getByTestId('roman-numeral-converter-button'));
    await waitFor(() => {
      expect(screen.getByTestId('roman-numeral-converter-roman-numeral')).toHaveTextContent('X');
    });
  });
});
