# Roman Numeral Converter

A full-stack web application that allows users to seamlessly convert numbers to Roman numerals, featuring a modern user interface, robust backend logic, and comprehensive end-to-end testing to ensure accuracy and reliability across devices.

---

## Tech Stack

| Area                  | Technology(s)                        |
|-----------------------|--------------------------------------|
| Frontend              | React, Vite, Adobe React Spectrum    |
| Backend               | Node.js, Express                     |
| E2E Testing           | Playwright                           |
| Containerization      | Docker, Docker Compose               |
| Code Quality          | ESLint, Prettier                     |
| Localization          | react-intl                           |
| Metrics & Monitoring  | Winston, Prometheus                  |
| Performance Monitoring| Web Vitals                           |

---
## Reasoning for choosing the stack

- **React:** Selected for its modular component structure, extensive library ecosystem, and active community, making it well-suited for scalable and maintainable modern UIs.
- **Vite:** Chosen for its fast development server and optimized build process, greatly enhancing developer productivity and reducing build times compared to traditional tools.
- **Adobe React Spectrum:** Provides accessible, visually consistent, and production-ready UI components, ensuring a polished and standards-compliant user interface.
- **Node.js & Express:** Node.js delivers a performant, event-driven runtime for server-side JavaScript, while Express offers a minimal, flexible framework for building robust REST APIs efficiently.
- **Playwright:** Enables comprehensive end-to-end testing across all major browsers and devices, ensuring consistent user experience and application reliability.
- **Docker & Docker Compose:** Facilitate containerization and orchestration, making development, testing, and deployment consistent and reproducible across different environments.
- **ESLint & Prettier:** Maintain code quality and consistent formatting, helping to prevent bugs and improve long-term maintainability.
- **react-intl:** Provides powerful internationalization features, making it straightforward to support multiple languages and locales in the frontend.
- **Web Vitals:** Integrated to monitor and improve key frontend performance metrics, directly enhancing user experience and SEO.
- **Winston:** Used for structured, configurable backend logging, aiding in effective debugging and monitoring of application events.
- **Prometheus:** Supports robust metrics collection and monitoring, enabling observability and alerting for backend services.

---

## Directory Structure

This project is organized as a **monorepo** that includes the frontend (React web UI), backend (Node.js/Express web server), and end-to-end tests (Playwright E2E tests) packages in a single repository.

```
converter/
├── packages/
│   ├── webui/           # Frontend React app
│   │   ├── src/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── assests/
│   │   │   └── translations/
│   │   ├── package.json
│   │   └── ...
│   ├── webserver/       # Backend Node/Express server
│   │   ├── src/
│   │   │   ├── controllers/
│   │   │   ├── middleware/
│   │   │   ├── routes/
│   │   │   ├── types/
│   │   │   └── utils/
│   │   ├── package.json
│   │   └── ...
│   └── e2eTests/        # End-to-end Playwright tests
│       ├── tests/
│       ├── package.json
│       └── ...
├── docker-compose.yml
└── README.md
```

---

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/manasayedire/converter.git
cd converter
```

---

### Running with Docker

You can run both the webserver (backend) and webui (frontend) using Docker Compose:

```bash
docker-compose up --build

docker-compose exec webui npm test
docker-compose exec webserver npm test
```

- The webserver will be available at [http://localhost:8080](http://localhost:8080)
- The webui will be available at [http://localhost:3000](http://localhost:3000)

---

### Running Locally (without Docker)

#### Start the Backend (webserver)

```bash
cd packages/webserver
npm install
npm start
npm test
```

#### Start the Frontend (webui)

Open a new terminal and run:

```bash
cd packages/webui
npm install
npm start
npm test
```

---

## End-to-End Testing with Playwright

End-to-end (E2E) tests for this project are implemented using [Playwright](https://playwright.dev/). Playwright automates browser interactions to verify that the Roman Numeral Converter App works as expected from the user's perspective.

**Note:** Playwright is configured to run tests on all major browsers (Chromium, Firefox, WebKit) and also on mobile devices using device emulation. This ensures comprehensive coverage across desktop and mobile environments.

To run E2E tests:

```bash
cd e2eTests
npm install
npm test
```

---

## Code Quality

### Linting and Formatting

This project uses [ESLint](https://eslint.org/) for code linting and [Prettier](https://prettier.io/) for code formatting across all packages (`webserver`, `webui`, and `e2eTests`).

Run the following commands in the respective package directory (e.g., `cd packages/webui`, `cd packages/webserver`, or `cd packages/e2eTests`):

- **`npm run format`** – Formats code with Prettier.
- **`npm run eslint`** – Lints code with ESLint.
- **`npm run eslint:fix`** – Lints and auto-fixes code with ESLint.

> **Tip:** Run these commands before committing code to ensure consistent style and catch potential issues early.

---

## Roman Numeral Converter: Development Journey
**Objective**: Develop a user-friendly and efficient application to convert numbers to Roman numerals, emphasizing modularity, scalability, and maintainability.
Requirement:
* Step 1: I decided to go with a monorepo structure, putting the frontend, backend, and end-to-end tests all in one place.
* Step 2: Frontend Development
  * For the frontend, I used React along with Vite to get fast development and optimized builds. 
  * To make the UI polished and accessible, I added Adobe React Spectrum components. 
  * I also added react-intl to support multiple languages (right now, English and Spanish) to cater to a global audience.
  * Added linting abnd prettier
* Step 3: Backend Development
  * I built the backend using Node.js and Express, which allowed me to set up a robust REST API for handling conversion requests. This stack gave me a solid and fast server-side framework to handle everything efficiently.
* Step 4: Backend and Frontend Integration
  * I connected the frontend and backend, making sure both parts worked smoothly together.
* Step 5: Logging and Metrics 
  * For logging, I integrated Winston on the backend to help keep track of events and make debugging easier. 
  * I also added Prometheus to track metrics like request counts, response times, and error rates—basically, to keep an eye on how the app is performing. 
  * On the frontend, I added Web Vitals to monitor key performance metrics, such as load times and responsiveness, to improve user experience and SEO. 
* Step 6: Added unit tests and integration tests for both the frontend and backend to ensure that each component works as expected. This included testing the conversion logic, API endpoints, and UI interactions. Moved variables to env files.
* Step 7: End-to-End Testing: To make sure everything was working correctly, I wrote end-to-end tests using Playwright. I covered all kinds of user scenarios, from valid inputs to edge cases and error handling, to ensure everything runs smoothly. 
* Step 8: Dockerization: I dockerized the whole app to make sure it ran consistently across different environments. Using Docker Compose, I made it super easy to run both the frontend and backend with a single command.
