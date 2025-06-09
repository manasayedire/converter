# Roman Numeral Converter End-to-End Tests

This project contains end-to-end (E2E) tests for the Roman Numeral Converter App, using [Playwright](https://playwright.dev/).

**Note:** Playwright is configured to run tests on all major browsers (Chromium, Firefox, WebKit) and also on mobile devices using device emulation. This ensures comprehensive coverage across desktop and mobile environments.

## Prerequisites

- [Node.js](https://nodejs.org/) (version 18 recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## Installation

Install dependencies:

```bash
npm i
```

## Running the Tests

Run all end-to-end tests:

```bash
npm test
```

## Technologies Used

- **Playwright** – For end-to-end browser automation and testing.
- **Node.js** – JavaScript runtime environment.
- **TypeScript** – (If used) Adds static typing to JavaScript.
- **dotenv** – Loads environment variables from .env files.

## Available Scripts

- **`npm test`** – Runs all Playwright end-to-end tests.
- **`npm run test:watch`** – Runs tests in watch mode (if configured).
- **`npm run test:coverage`** – Generates a code coverage report (if configured).
- **`npm run format`** – Formats code with Prettier.
- **`npm run eslint`** – Lints code with ESLint.
- **`npm run eslint:fix`** – Lints and auto-fixes code with ESLint.

## Dependencies

### Runtime dependencies

- **`dotenv`** – Loads environment variables from .env files

### Development dependencies

- **`@playwright/test`** – End-to-end browser testing framework
- **`@eslint/js`**, **`eslint`** – JavaScript linter and core rules
- **`prettier`** – Opinionated code formatter
- **`typescript-eslint`** – TypeScript support for ESLint
- **`@types/node`** – TypeScript type definitions for Node.js
