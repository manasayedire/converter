import '@testing-library/jest-dom/vitest';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

/*
 * Unit Test cases for App component
 * Renders main UI elements
 * Switches language when a new language is selected
 * Converts a number to roman numeral (integration)
 */
describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders main UI elements', () => {
    render(<App />);
    // Header button
    expect(
      screen.getByTestId('header-change-language-button'),
    ).toBeInTheDocument();
    // Converter heading, input, and button
    expect(
      screen.getByTestId('roman-numeral-converter-heading'),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('roman-numeral-converter-number'),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('roman-numeral-converter-button'),
    ).toBeInTheDocument();
  });

  it('switches language when a new language is selected', async () => {
    render(<App />);
    // Open language menu
    await userEvent.click(screen.getByTestId('header-change-language-button'));
    // Select Spanish
    await userEvent.click(screen.getByText('Español'));
    // Heading should update to Spanish
    await waitFor(() => {
      expect(
        screen.getByTestId('roman-numeral-converter-heading'),
      ).toHaveTextContent(/convertidor de números romanos/i);
    });
    // Switch back to English
    await userEvent.click(screen.getByTestId('header-change-language-button'));
    await userEvent.click(screen.getByText('English'));
    await waitFor(() => {
      expect(
        screen.getByTestId('roman-numeral-converter-heading'),
      ).toHaveTextContent(/roman numeral converter/i);
    });
  });

  it('converts a number to roman numeral (integration)', async () => {
    // Mock fetch to return a successful response
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ output: 'X' }),
    });
    render(<App />);
    const input = screen.getByTestId('roman-numeral-converter-number');
    await userEvent.clear(input);
    await userEvent.type(input, '10');
    await userEvent.click(screen.getByTestId('roman-numeral-converter-button'));
    await waitFor(() => {
      expect(
        screen.getByTestId('roman-numeral-converter-roman-numeral'),
      ).toHaveTextContent('X');
    });
  });
});
