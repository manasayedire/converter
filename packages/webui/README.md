# Roman Numeral Converter Frontend

This is the frontend (web UI) for the Roman Numeral Converter App. It provides a user interface to convert numbers to Roman numerals using the backend API.

## Prerequisites

- [Node.js](https://nodejs.org/) (version 18 recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## Installation

Install dependencies:

```bash
npm install
```

## Running the Frontend

```bash
npm start
```

The frontend will be available at [http://localhost:3000](http://localhost:3000) by default.

## Usage

- Enter a number in the input field to receive its Roman numeral representation.
- The frontend communicates with the backend API to perform the conversion.

---

### Web Vitals

This project measures [Web Vitals](https://web.dev/vitals/) (such as Largest Contentful Paint, Cumulative Layout Shift, and Interaction to Next Paint) using the [`web-vitals`](https://www.npmjs.com/package/web-vitals) library.

- In development mode, web vitals metrics are logged to the console.

**Reference:**  
See [`src/reportWebVitals.ts`](./src/reportWebVitals.ts) and [`src/index.tsx`](./src/index.tsx) for implementation details.

---

### Adobe React Spectrum

This project uses [Adobe React Spectrum](https://react-spectrum.adobe.com/) as its primary UI component library. React Spectrum provides accessible, adaptive, and themeable React components that ensure a consistent and high-quality user experience.

**Reference:**  
See usage in [`src/App.tsx`](./src/App.tsx) and [`src/components/`](./src/components/) for implementation details.

---

### Available Scripts

In the project directory, you can run:

- **`npm start`** – Starts the frontend development server (default: http://localhost:3000).
- **`npm run build`** – Builds the app for production.
- **`npm run preview`** – Previews the production build locally.
- **`npm test`** – Runs tests using Vitest.
- **`npm run test:watch`** – Runs Vitest in watch mode.
- **`npm run format`** – Formats code with Prettier.
- **`npm run eslint`** – Lints code with ESLint.
- **`npm run eslint:fix`** – Lints and auto-fixes code with ESLint.
