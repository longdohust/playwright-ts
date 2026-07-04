# Playwright TypeScript Test Project

This project is an automated test suite built with Playwright and TypeScript, using Chromium as the default browser and integrating Allure reporting.

## Features

- Write tests in TypeScript
- Run tests with Playwright
- Generate Allure reports
- Support local and CI test execution

## System Requirements

- Node.js >= 18
- npm or yarn

## Installation

1. Install dependencies:

```bash
npm install
```

2. Install Playwright browsers:

```bash
npx playwright install
```

## Running Tests

### Run tests locally

```bash
npm run test:local
```

### Run tests in CI mode

```bash
npm run test:ci
```

## Viewing Allure Reports

After running the tests, you can generate a standalone report with:

```bash
npm run allure:single:report
```

The report will be generated in the `allure-report` folder.

## Project Structure

- `tests/` - Contains test cases
- `playwright.config.ts` - Playwright configuration
- `package.json` - Scripts and dependencies
- `allure-results/` - Raw results for Allure
- `allure-report/` - Generated report output

## Notes

- The configuration currently defines `chromium` as the default project.
- The default test timeout is 15 seconds.
- The current reporters are `line` and `allure-playwright`.
