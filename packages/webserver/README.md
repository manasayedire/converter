# Roman Numeral Converter Server

This is the backend (server) for the Roman Numeral Converter App. It provides an API to convert numbers to Roman numerals.

## Prerequisites

- [Node.js](https://nodejs.org/) (version 18 recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## Installation

Install dependencies:

```bash
npm install
```

## Running the Server

```bash
npm start
```

The server will be available at [http://localhost:8080](http://localhost:8080) by default.


## Technologies Used

- **Node.js** – JavaScript runtime for building scalable server-side applications
- **Express** – Fast, unopinionated, minimalist web framework for Node.js
- **Winston** – Logging library with support for daily log rotation
- **Prometheus (prom-client)** – Metrics collection and monitoring
- **TypeScript** – Typed superset of JavaScript for safer, scalable code
- **Jest** – Testing framework for unit and integration tests

### Logging with Winston

This server uses [Winston](https://github.com/winstonjs/winston) for logging. Logs are output to the console, to a file for errors, and to daily rotating log files. Log files are stored in the `logs/` directory. Winston provides structured logging with timestamps and supports different log levels (e.g., info, error).

### Default Metrics and Custom Metrics with Prometheus (prom-client)

The server exposes application metrics using [prom-client](https://github.com/siimon/prom-client), which allows Prometheus to scrape metrics for monitoring. Default and **`custom metrics (such as HTTP request and response counters)`** are collected. The `/metrics` endpoint is available for Prometheus to scrape these metrics. Metrics include request counts, response counts, and standard Node.js process metrics, all prefixed with `converter_`.

## Available Scripts

In the project directory, you can run:

- **`npm start`** – Starts the backend server (default: http://localhost:8080).
- **`npm test`** – Runs tests.
- **`npm run test:watch`** – Runs Jest in watch mode.
- **`npm run test:coverage`** – Generates a code coverage report.
- **`npm run format`** – Formats code with Prettier.
- **`npm run eslint`** – Lints code with ESLint.
- **`npm run eslint:fix`** – Lints and auto-fixes code with ESLint.

## Dependencies

### Runtime dependencies

- **`express`**, **`cors`**, **`express-allow-methods`** – Core server framework and middleware for HTTP handling and CORS
- **`dotenv`** – Loads environment variables from .env files
- **`prom-client`** – Prometheus client for collecting and exposing metrics
- **`winston`**, **`winston-daily-rotate-file`** – Logging with support for daily log rotation

### Development dependencies

- **`@eslint/js`**, **`eslint`** – JavaScript linter and core rules
- **`prettier`** – Opinionated code formatter
- **`typescript`**, **`typescript-eslint`**, **`ts-node`** – TypeScript language, compiler, and Node.js integration
- **`jest`**, **`ts-jest`**, **`supertest`** – Testing framework and HTTP assertions
- **`@types/cors`**, **`@types/jest`**, **`@types/supertest`** – TypeScript type definitions for development
