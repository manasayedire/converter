import '@testing-library/jest-dom/vitest';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RomanNumeralConveter from './RomanNumeralConverter';
import { lightTheme, Provider, ToastQueue } from '@adobe/react-spectrum';
import * as useRomanNumeralHook from '../hooks/useRomanNumeral';

// Mock Spectrum ToastQueue
vi.mock('@adobe/react-spectrum', async () => {
  const original = await vi.importActual<any>('@adobe/react-spectrum');
  return {
    ...original,
    ToastQueue: {
      negative: vi.fn(),
    },
  };
});

/*
 * Unit Test cases for RomanNumeralConveter component
 * Renders heading and input
 * Shows error for invalid input (empty)
 * Shows error for invalid input (out of range)
 * Converts number to roman numeral on valid input
 * Shows loading state while converting
 * Shows error toast on fetch failure
 * Calls useRomanNumeral hook on render
 */
describe('RomanNumeralConveter', () => {
  // Helper function to render the component
  const makeComponent = () =>
    render(
      <Provider theme={lightTheme}>
        <RomanNumeralConveter />
      </Provider>,
    );

  beforeEach(() => {
    vi.clearAllMocks();
    // Mock fetch to return a successful response
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ output: 'X' }),
      }),
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders heading and input', () => {
    makeComponent();
    expect(
      screen.getByTestId('roman-numeral-converter-heading'),
    ).toBeInTheDocument();
    expect(screen.getByText('Enter a number')).toBeInTheDocument();
    expect(
      screen.getByTestId('roman-numeral-converter-number'),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('roman-numeral-converter-roman-numeral'),
    ).toHaveTextContent('Roman numeral is -'),
      expect(
        screen.getByTestId('roman-numeral-converter-button'),
      ).toBeInTheDocument();
  });

  it('shows error for invalid input (empty)', async () => {
    makeComponent();
    await userEvent.click(screen.getByTestId('roman-numeral-converter-button'));
    expect(
      screen.getByText('Enter a number between 1 and 3999'),
    ).toBeInTheDocument();
  });

  it('shows error for invalid input (out of range)', async () => {
    makeComponent();
    const input = screen.getByTestId('roman-numeral-converter-number');
    await userEvent.clear(input);
    //show error for invalid input 0
    await userEvent.type(input, '0');
    await userEvent.click(screen.getByTestId('roman-numeral-converter-button'));
    expect(
      screen.getByTestId('roman-numeral-converter-number'),
    ).toHaveAttribute('aria-invalid', 'true');
    expect(
      screen.getByText('Enter a number between 1 and 3999'),
    ).toBeInTheDocument();
    await userEvent.clear(input);
    // show error for invalid input 4000
    await userEvent.type(input, '4000');
    await userEvent.click(screen.getByTestId('roman-numeral-converter-button'));
    expect(
      screen.getByTestId('roman-numeral-converter-number'),
    ).toHaveAttribute('aria-invalid', 'true');
    expect(
      screen.getByText('Enter a number between 1 and 3999'),
    ).toBeInTheDocument();
  });

  it('converts number to roman numeral on valid input', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ output: 'X' }),
    });
    makeComponent();
    const input = screen.getByTestId('roman-numeral-converter-number');
    await userEvent.clear(input);
    await userEvent.type(input, '10');
    await userEvent.click(screen.getByTestId('roman-numeral-converter-button'));
    // check if the roman numeral is displayed
    await waitFor(() =>
      expect(
        screen.getByTestId('roman-numeral-converter-roman-numeral'),
      ).toHaveTextContent('Roman numeral is X'),
    );
  });

  it('shows loading state while converting', async () => {
    let resolveFetch: (value: any) => void = () => {};
    global.fetch = vi.fn().mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveFetch = resolve;
        }),
    );
    makeComponent();
    const input = screen.getByTestId('roman-numeral-converter-number');
    await userEvent.clear(input);
    await userEvent.type(input, '10');
    await userEvent.click(screen.getByTestId('roman-numeral-converter-button'));
    // check if the loading state is displayed
    expect(
      screen.getByTestId('roman-numeral-converter-roman-numeral'),
    ).toHaveTextContent('Roman numeral is Loading...');
    resolveFetch({ ok: true, json: async () => ({ output: 'X' }) });
    await waitFor(() =>
      expect(
        screen.getByTestId('roman-numeral-converter-roman-numeral'),
      ).toHaveTextContent('Roman numeral is X'),
    );
  });

  it('shows error toast on fetch failure', async () => {
    vi.spyOn(global, 'fetch').mockRejectedValue(new Error('Mock API error'));
    makeComponent();
    const input = screen.getByTestId('roman-numeral-converter-number');
    await userEvent.clear(input);
    await userEvent.type(input, '10');
    await userEvent.click(screen.getByTestId('roman-numeral-converter-button'));
    // check if the error toast is displayed
    await waitFor(() => {
      expect(ToastQueue.negative).toHaveBeenCalledWith(
        'Something went wrong. Try again later.',
        { timeout: 3000 },
      );
    });
  });

  it('calls useRomanNumeral hook on render', () => {
    const spy = vi.spyOn(useRomanNumeralHook, 'useRomanNumeral');
    makeComponent();
    // check if the useRomanNumeral hook is called
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
});
