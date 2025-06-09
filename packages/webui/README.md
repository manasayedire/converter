# Roman Numeral Converter Frontend

Provides a user interface to convert numbers to Roman numerals using the backend API.

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

---

## Technologies Used

- **React**: UI library for building user interfaces
- **TypeScript**: Typed superset of JavaScript
- **Vite**: Fast frontend build tool
- **Adobe React Spectrum**: Accessible, adaptive, and themeable React component library
- **React Intl**: Internationalization for React
- **Vitest**: Unit testing framework
- **Testing Library**: Utilities for testing UI components
- **web-vitals**: Web performance metrics

---

## Localization

If you are adding or updating user-facing text, make sure to add the corresponding string to both the `en-us.json` and `es-ES.json` localization files. This ensures the app supports both English and Spanish languages consistently.

- Add new keys and values to `en-us.json` for English.
- Add the same keys with appropriate translations to `es-ES.json` for Spanish.
- Supports English and Spanish.
- Translation files are located in `packages/webui/src/translations/`.

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

---

## Dependencies

### Runtime dependencies

- **`react`**, **`react-dom`** – Core React libraries for building user interfaces and DOM rendering
- **`react-intl`** – Internationalization for React applications

### Development dependencies

- **`@adobe/react-spectrum`** – Adobe's accessible and adaptive React component library
- **`@eslint/js`**, **`eslint`** – JavaScript linter and core rules
- **`prettier`** – Opinionated code formatter
- **`typescript`**, **`typescript-eslint`** – TypeScript language, compiler, and ESLint integration
- **`vite`**, **`@vitejs/plugin-react`** – Next-generation frontend tooling and React plugin
- **`vitest`** – Fast unit testing framework
- **`jsdom`** – JavaScript implementation of the DOM and HTML standards
- **`web-vitals`** – Measures web performance metrics
- **`@testing-library/dom`**, **`@testing-library/jest-dom`**, **`@testing-library/react`**, **`@testing-library/user-event`** – Utilities for testing React components and simulating user interactions
- **`@types/jest`**, **`@types/node`**, **`@types/react`**, **`@types/react-dom`** – TypeScript type definitions for Jest, Node.js, React, and React DOM
