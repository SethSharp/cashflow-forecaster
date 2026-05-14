# Cashflow Forecaster

A cashflow forecasting tool built with Vue 3, Composition API, TypeScript, and Pinia.
Users can define recurring income and expenses, project their cashflow over N months, and manage multiple entities with consolidated reporting.

## Getting Started

```sh
npm install
npm run dev
```

## Running Tests

Component and E2E tests are written in Cypress.

```sh
# Run all tests headless

# E2E
npm run cy:run

# Component
npm run cy:run -- --component

# Open Cypress UI
npm run cy:open
```

> Note: the E2E suite expects the dev server running on `http://localhost:5174`. Start it with `npm run dev` before running E2E tests.

## Tech Stack

- **Vue 3** - Composition API throughout
- **TypeScript** - strict types across components, stores, and composables
- **Pinia** - in-memory state for entries and entities
- **Chart.js + vue-chartjs** - balance line chart with income/expense bars
- **Tailwind CSS v4** - utility-first styling
- **Cypress** - component and E2E tests

## Architecture

Projection logic lives in `useProjection` - a composable rather than a store. This keeps the calculation pure and independently testable. The store owns the data; the composable owns the derived view.

Entity filtering happens at the projection layer (`useProjection`) rather than the data layer (`useEntryStore`). This means the store always holds all entries and the composable decides which ones are visible based on the active entity or consolidated mode.

```
useEntryStore        → raw entries + monthly normalisation
useEntityStore       → entities, active entity, consolidated toggle
useProjection        → filters snapshot by entity, computes monthly projections
ProjectionCalculation → renders chart + summary cards
```

## Assumptions

- **Frequency calculation** uses simplified monthly averages rather than exact calendar days:
  - Daily: `amount × 365 / 12`
  - Weekly: `amount × 52 / 12`
  - Monthly: `amount × 1`
- **Opening balance** defaults to zero. The projection reflects net cashflow only.
- **State is in-memory only** - refreshing the page resets all data.
- **Recurring entries are assumed to apply from month 1** - no start date support.

## Features

### Core
- Add recurring income and expenses with daily, weekly, or monthly frequency
- Project cashflow over N months (adjustable)
- Running balance chart with per-month income/expense breakdown
- Summary cards: total income, total expenses, net per month, final balance
- Colour-coded values - green for positive, red for negative

### Bonus
- **Multi-entity support** - create named entities and assign entries to them
- **Consolidated reporting** - "All" view combines entries across all entities into a single projection

## Known Limitations

- Edit and delete individual entries
- Persistent state via localStorage
- Inter-entity transfers that cancel out at the consolidated level
