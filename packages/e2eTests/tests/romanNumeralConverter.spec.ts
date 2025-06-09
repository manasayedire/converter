import { test, expect } from '@playwright/test';

/*
 * End to end Test cases for roman numeral converter
 * Empty input
 * Number 10
 * Number 4000
 * Number 0
 * Decimal number
 * Backend error 500
 * Localization
 */
test.beforeEach(async ({ page }) => {
  // Navigate to the roman numeral converter page
  await page.goto('/');
});

test('test roman numeral converter for empty input', async ({ page }) => {
  await expect(page.getByTestId('header-change-language-button')).toBeVisible();
  await expect(page.getByTestId('roman-numeral-converter-heading')).toHaveText('Roman numeral converter');
  await expect(page.getByText('Enter a number')).toBeVisible();
  await expect(page.getByTestId('roman-numeral-converter-number')).toBeVisible();
  await expect(page.getByTestId('roman-numeral-converter-button')).toHaveText('Convert');
  await expect(page.getByTestId('roman-numeral-converter-roman-numeral')).toHaveText('Roman numeral is -');
  await page.getByTestId('roman-numeral-converter-button').click();
  // Check if the input is invalid and the error message is visible
  await expect(page.getByTestId('roman-numeral-converter-number')).toHaveAttribute('aria-invalid', 'true');
  await expect(page.getByText('Enter a number between 1 and 3999')).toBeVisible();
});

test('test roman numeral converter for empty input after one successful conversion', async ({ page }) => {
  await expect(page.getByTestId('roman-numeral-converter-number')).toBeVisible();
  await page.getByTestId('roman-numeral-converter-number').fill('8');
  await page.getByTestId('roman-numeral-converter-button').click();
  // Check if the roman numeral is displayed
  await expect(page.getByTestId('roman-numeral-converter-roman-numeral')).toHaveText('Roman numeral is VIII');
  await page.getByTestId('roman-numeral-converter-number').clear();
  await expect(page.getByTestId('roman-numeral-converter-number')).toHaveValue('');
  await page.getByTestId('roman-numeral-converter-button').click();
  // Check if the input is invalid and the error message is visible
  await expect(page.getByTestId('roman-numeral-converter-number')).toHaveAttribute('aria-invalid', 'true');
  await expect(page.getByText('Enter a number between 1 and 3999')).toBeVisible();
  await expect(page.getByTestId('roman-numeral-converter-roman-numeral')).toHaveText('Roman numeral is -');
});

test('test roman numeral converter for invalid input to valid the input field', async ({ page }) => {
  await expect(page.getByTestId('roman-numeral-converter-number')).toBeVisible();
  await page.getByTestId('roman-numeral-converter-number').fill('');
  await page.getByTestId('roman-numeral-converter-button').click();
  // Check if the input is invalid and the error message is visible
  await expect(page.getByTestId('roman-numeral-converter-number')).toHaveAttribute('aria-invalid', 'true');
  await expect(page.getByText('Enter a number between 1 and 3999')).toBeVisible();
  await expect(page.getByTestId('roman-numeral-converter-roman-numeral')).toHaveText('Roman numeral is -');
  await page.getByTestId('roman-numeral-converter-number').fill('10');
  await page.getByTestId('roman-numeral-converter-button').click();
  // check if the input is valid
  await expect(page.getByTestId('roman-numeral-converter-number')).not.toHaveAttribute('aria-invalid');
  await expect(page.getByText('Enter a number between 1 and 3999')).not.toBeVisible();
  // Check if the roman numeral is displayed
  await expect(page.getByTestId('roman-numeral-converter-roman-numeral')).toHaveText('Roman numeral is X');
});

test('test roman numeral converter for valid input to invalid the input field', async ({ page }) => {
  await expect(page.getByTestId('roman-numeral-converter-number')).toBeVisible();
  await page.getByTestId('roman-numeral-converter-number').fill('10');
  await page.getByTestId('roman-numeral-converter-button').click();
  // Check if the input is valid
  await expect(page.getByTestId('roman-numeral-converter-number')).not.toHaveAttribute('aria-invalid');
  await expect(page.getByText('Enter a number between 1 and 3999')).not.toBeVisible();
  // Check if the roman numeral is displayed
  await expect(page.getByTestId('roman-numeral-converter-roman-numeral')).toHaveText('Roman numeral is X');
  await page.getByTestId('roman-numeral-converter-number').fill('80000');
  await page.getByTestId('roman-numeral-converter-button').click();
  // check if the input is invalid
  await expect(page.getByTestId('roman-numeral-converter-number')).toHaveAttribute('aria-invalid', 'true');
  await expect(page.getByText('Enter a number between 1 and 3999')).toBeVisible();
  // Check if the roman numeral is displayed
  await expect(page.getByTestId('roman-numeral-converter-roman-numeral')).toHaveText('Roman numeral is -');
});


test('test roman numeral converter for number 10 - success', async ({ page }) => {
  await expect(page.getByTestId('roman-numeral-converter-number')).toBeVisible();
  await page.getByTestId('roman-numeral-converter-number').fill('10');
  await page.getByTestId('roman-numeral-converter-button').click();
  // Check if the roman numeral is displayed
  await expect(page.getByTestId('roman-numeral-converter-roman-numeral')).toHaveText('Roman numeral is X');
});

test('test roman numeral converter for number 1 - success', async ({ page }) => {
  await expect(page.getByTestId('roman-numeral-converter-number')).toBeVisible();
  await page.getByTestId('roman-numeral-converter-number').fill('1');
  await page.getByTestId('roman-numeral-converter-button').click();
  // Check if the roman numeral is displayed
  await expect(page.getByTestId('roman-numeral-converter-roman-numeral')).toHaveText('Roman numeral is I');
});

test('test roman numeral converter for number 3999 - success', async ({ page }) => {
  await expect(page.getByTestId('roman-numeral-converter-number')).toBeVisible();
  await page.getByTestId('roman-numeral-converter-number').fill('3999');
  await page.getByTestId('roman-numeral-converter-button').click();
  // Check if the roman numeral is displayed
  await expect(page.getByTestId('roman-numeral-converter-roman-numeral')).toHaveText('Roman numeral is MMMCMXCIX');
});
test('test roman numeral converter for 4000', async ({ page }) => {
  await expect(page.getByTestId('roman-numeral-converter-number')).toBeVisible();
  await page.getByTestId('roman-numeral-converter-number').fill('4000');
  await page.getByTestId('roman-numeral-converter-button').click();
  // Check if the input is invalid and the error message is visible
  await expect(page.getByTestId('roman-numeral-converter-number')).toHaveAttribute('aria-invalid', 'true');
  await expect(page.getByText('Enter a number between 1 and 3999')).toBeVisible();
});

test('test roman numeral converter for number 100 with trailing space', async ({ page }) => {
  await expect(page.getByTestId('roman-numeral-converter-number')).toBeVisible();
  await page.getByTestId('roman-numeral-converter-number').fill('   100');
  await page.getByTestId('roman-numeral-converter-button').click();
  // Check if the input is valid and the roman numeral is displayed
  await expect(page.getByTestId('roman-numeral-converter-number')).toHaveValue('100');
  await expect(page.getByTestId('roman-numeral-converter-roman-numeral')).toHaveText('Roman numeral is C');
});

test('test roman numeral converter for number 200 with leading zeros', async ({ page }) => {
  await expect(page.getByTestId('roman-numeral-converter-number')).toBeVisible();
  await page.getByTestId('roman-numeral-converter-number').fill('000200');
  await page.getByTestId('roman-numeral-converter-button').click();
  // Check if the input is valid and the roman numeral is displayed
  await expect(page.getByTestId('roman-numeral-converter-number')).toHaveValue('200');
  await expect(page.getByTestId('roman-numeral-converter-roman-numeral')).toHaveText('Roman numeral is CC');
});

test('test roman numeral converter for non numeric input character', async ({ page }) => {
  await expect(page.getByTestId('roman-numeral-converter-number')).toBeVisible();
  await page.getByTestId('roman-numeral-converter-number').fill('a');
  await expect(page.getByTestId('roman-numeral-converter-number')).toHaveValue('');
  await page.getByTestId('roman-numeral-converter-button').click();
  // Check if the input is invalid and the error message is visible
  await expect(page.getByTestId('roman-numeral-converter-number')).toHaveAttribute('aria-invalid', 'true');
  await expect(page.getByText('Enter a number between 1 and 3999')).toBeVisible();
  await expect(page.getByTestId('roman-numeral-converter-roman-numeral')).toHaveText('Roman numeral is -');
});

test('test roman numeral converter for non numeric input special character', async ({ page }) => {
  await expect(page.getByTestId('roman-numeral-converter-number')).toBeVisible();
  await page.getByTestId('roman-numeral-converter-number').fill('@@');
  await expect(page.getByTestId('roman-numeral-converter-number')).toHaveValue('');
  await page.getByTestId('roman-numeral-converter-button').click();
  // Check if the input is invalid and the error message is visible
  await expect(page.getByTestId('roman-numeral-converter-number')).toHaveAttribute('aria-invalid', 'true');
  await expect(page.getByText('Enter a number between 1 and 3999')).toBeVisible();
  await expect(page.getByTestId('roman-numeral-converter-roman-numeral')).toHaveText('Roman numeral is -');
});

test('test roman numeral converter for 0', async ({ page }) => {
  await expect(page.getByTestId('roman-numeral-converter-number')).toBeVisible();
  await page.getByTestId('roman-numeral-converter-number').fill('0');
  await page.getByTestId('roman-numeral-converter-button').click();
  // Check if the input is invalid and the error message is visible
  await expect(page.getByTestId('roman-numeral-converter-number')).toHaveAttribute('aria-invalid', 'true');
  await expect(page.getByText('Enter a number between 1 and 3999')).toBeVisible();
  await expect(page.getByTestId('roman-numeral-converter-roman-numeral')).toHaveText('Roman numeral is -');
});

test('test roman numeral converter for decimal number', async ({ page }) => {
  await expect(page.getByTestId('roman-numeral-converter-number')).toBeVisible();
  await page.getByTestId('roman-numeral-converter-number').fill('10.5');
  await page.getByTestId('roman-numeral-converter-button').click();
  // Check if the input is invalid and the error message is visible
  await expect(page.getByTestId('roman-numeral-converter-number')).toHaveAttribute('aria-invalid', 'true');
  await expect(page.getByText('Enter a number between 1 and 3999')).toBeVisible();
});

test('test roman numeral converter for browser refresh button', async ({ page }) => {
  await expect(page.getByTestId('roman-numeral-converter-number')).toBeVisible();
  await page.getByTestId('roman-numeral-converter-number').fill('10');
  await page.getByTestId('roman-numeral-converter-button').click();
  // Check if the roman numeral is displayed
  await expect(page.getByTestId('roman-numeral-converter-roman-numeral')).toHaveText('Roman numeral is X');
  await page.reload();
  await expect(page.getByTestId('roman-numeral-converter-number')).toBeVisible();
  await expect(page.getByTestId('roman-numeral-converter-number')).toHaveValue('');
  await expect(page.getByTestId('roman-numeral-converter-roman-numeral')).toHaveText('Roman numeral is -');
});

test('test roman numeral converter for backend error 500', async ({ page }) => {
  await page.route('http://localhost:8080/romannumeral?query=10', (route) => {
    route.fulfill({
      status: 500, // Internal Server Error
      body: JSON.stringify({
        code: '500',
        error: 'MISC_SERVER_ERROR',
        errorDetail: 'Some miscellaneous error has occurred.',
        message: 'Some miscellaneous error has occurred.',
      }),
    });
  });
  await expect(page.getByTestId('roman-numeral-converter-number')).toBeVisible();
  await page.getByTestId('roman-numeral-converter-number').fill('10');
  // Check if the error toast is displayed
  await page.getByTestId('roman-numeral-converter-button').click();
  await expect(page.getByText('Something went wrong. Try again later.')).toBeVisible();
});

test('test roman numeral converter for localization', async ({ page }) => {
  // check if localization is working
  await expect(page.getByTestId('header-change-language-button')).toBeVisible();
  await expect(page.getByText('Enter a number')).toBeVisible();
  await expect(page.getByTestId('roman-numeral-converter-heading')).toHaveText('Roman numeral converter');
  await expect(page.getByTestId('roman-numeral-converter-roman-numeral')).toHaveText('Roman numeral is -');
  await expect(page.getByTestId('roman-numeral-converter-button')).toHaveText('Convert');
  await page.getByTestId('header-change-language-button').click();
  await page.getByText('Español').click();
  await expect(page.getByTestId('roman-numeral-converter-heading')).toHaveText('Convertidor de números romanos');
  await expect(page.getByText('Introduce un número')).toBeVisible();
  await expect(page.getByTestId('roman-numeral-converter-roman-numeral')).toHaveText('El número romano es -');
  await expect(page.getByTestId('roman-numeral-converter-button')).toHaveText('Convertir');
  await page.getByTestId('roman-numeral-converter-button').click();
  await expect(page.getByTestId('roman-numeral-converter-number')).toHaveAttribute('aria-invalid', 'true');
  await expect(page.getByText('Introduce un número entre 1 y 3999')).toBeVisible();
});

test('test roman numeral converter for backend error 500 for localization', async ({ page }) => {
  await expect(page.getByTestId('header-change-language-button')).toBeVisible();
  await page.getByTestId('header-change-language-button').click();
  await page.getByText('Español').click();
  await page.route('http://localhost:8080/romannumeral?query=10', (route) => {
    route.fulfill({
      status: 500, // Internal Server Error
      body: JSON.stringify({
        code: '500',
        error: 'MISC_SERVER_ERROR',
        errorDetail: 'Some miscellaneous error has occurred.',
        message: 'Some miscellaneous error has occurred.',
      }),
    });
  });
  await expect(page.getByTestId('roman-numeral-converter-number')).toBeVisible();
  await page.getByTestId('roman-numeral-converter-number').fill('10');
  // Check if the error toast is displayed
  await page.getByTestId('roman-numeral-converter-button').click();
  await expect(page.getByText('Algo salió mal. Inténtalo de nuevo más tarde.')).toBeVisible();
});
