# Roman Numeral Converter

A simple web application for converting numbers to Roman numerals.

## Getting Started

### Clone the repository

```bash
git clone https://github.com/manasayedire/converter.git
cd converter
```

## Running with Docker

You can run both the webserver (backend) and webui (frontend) using Docker Compose:

```bash
docker-compose up --build
```

- The webserver will be available at [http://localhost:8080](http://localhost:8080)
- The webui will be available at [http://localhost:3000](http://localhost:3000)

## Running Locally (without Docker)

### Start the backend (webserver)

```bash
cd packages
cd webserver
npm install
npm start
```

The backend will run on [http://localhost:8080](http://localhost:8080)

### Start the frontend (webui)

Open a new terminal and run:

```bash
cd packages
cd webui
npm install
npm start
```

## G

The frontend will run on [http://localhost:3000](http://localhost:3000)

## End-to-End Testing with Playwright

End-to-end (E2E) tests for this project are implemented using [Playwright](https://playwright.dev/). Playwright automates browser interactions to verify that the Roman Numeral Converter App works as expected from the user's perspective.

### Running E2E Tests

The E2E tests are located in the [`e2eTests/`](./e2eTests/) directory. To run them:

```bash
cd e2eTests
npm install
npm test
```

- These tests cover key user flows and edge cases.
- For more details and available scripts, see [`e2eTests/README.md`](./e2eTests/README.md).

## Code Quality: Linting and Formatting

This project uses [ESLint](https://eslint.org/) for code linting and [Prettier](https://prettier.io/) for code formatting across all packages (`webserver`, `webui`, and `e2eTests`).

### Usage

Run the following commands in the respective package directory (e.g., `cd packages/webui`, `cd packages/webserver`, or `cd packages/e2eTests`):

- **`npm run format`** – Formats code with Prettier.
- **`npm run eslint`** – Lints code with ESLint.
- **`npm run eslint:fix`** – Lints and auto-fixes code with ESLint.

> **Tip:** Run these commands before committing code to ensure consistent style and catch potential issues early.

