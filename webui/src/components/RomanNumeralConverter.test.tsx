import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RomanNumeralConveter from './RomanNumeralConverter';
import { lightTheme, Provider, ToastQueue } from '@adobe/react-spectrum';
import * as useRomanNumeralHook from '../hooks/useRomanNumeral';

// Mock ToastQueue
jest.mock('@adobe/react-spectrum', () => {
  const original = jest.requireActual('@adobe/react-spectrum');
  return {
    ...original,
    ToastQueue: {
      negative: jest.fn(),
    },
  };
});

describe('RomanNumeralConveter', () => {
  const makeComponent = () =>
    render(
      <Provider theme={lightTheme}>
        <RomanNumeralConveter />
      </Provider>
    );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders heading and input', () => {
    makeComponent();
    expect(screen.getByTestId('roman-numeral-converter-heading')).toBeInTheDocument();
    expect(screen.getByTestId('roman-numeral-converter-number')).toBeInTheDocument();
    expect(screen.getByTestId('roman-numeral-converter-button')).toBeInTheDocument();
  });

  it('shows error for invalid input (empty)', async () => {
    makeComponent();
    userEvent.click(screen.getByTestId('roman-numeral-converter-button'));
    expect(screen.getByText(/enter a number between 1 and 3999/i)).toBeInTheDocument();
  });

  it('shows error for invalid input (out of range)', async () => {
    makeComponent();
    const input = screen.getByTestId('roman-numeral-converter-number');
    userEvent.clear(input!);
    userEvent.type(input!, '0');
    userEvent.click(screen.getByTestId('roman-numeral-converter-button'));
    expect(screen.getByText(/enter a number between 1 and 3999/i)).toBeInTheDocument();
  });

  it('converts number to roman numeral on success', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: async () => ({ output: 'X' }),
    });
    makeComponent();
    const input = screen.getByTestId('roman-numeral-converter-number');
    userEvent.clear(input!);
    userEvent.type(input!, '10');
    userEvent.click(screen.getByTestId('roman-numeral-converter-button'));
    await waitFor(() => expect(screen.getByTestId('roman-numeral-converter-roman-numeral')).toBeInTheDocument());
    expect(screen.getByText('X')).toBeInTheDocument();
  });

  it('shows loading state while converting', async () => {
    let resolveFetch: ((value: any) => void) = () => {};
    global.fetch = jest.fn().mockImplementation(
      () => new Promise((resolve) => { resolveFetch = resolve; })
    );
    makeComponent();
    const input = screen.getByTestId('roman-numeral-converter-number');
    userEvent.clear(input!);
    userEvent.type(input!, '10');
    userEvent.click(screen.getByTestId('roman-numeral-converter-button'));
    expect(screen.getByTestId('roman-numeral-converter-roman-numeral')).toHaveTextContent(/loading/i);
    resolveFetch({ json: async () => ({ output: 'X' }) });
    await waitFor(() => expect(screen.getByText('X')).toBeInTheDocument());
  });

  it('shows error toast on fetch failure', async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error('fail'));
    makeComponent();
    const input = screen.getByTestId('roman-numeral-converter-number');
    userEvent.clear(input!);
    userEvent.type(input!, '10');
    userEvent.click(screen.getByTestId('roman-numeral-converter-button'));
    await waitFor(() => {
      expect(ToastQueue.negative).toHaveBeenCalledWith(
        'Something went wrong. Try again later.',
        { timeout: 3000 }
      );
    });
  });

  it('calls useRomanNumeral hook on render', () => {
    const spy = jest.spyOn(useRomanNumeralHook, 'useRomanNumeral');
    makeComponent();
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
});
