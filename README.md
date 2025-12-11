# PayFlow-AI 
Intelligent Payments Microservices Test Framework 

## What's included
- `ai-engine/paymentDataGenerator.js` : Node script that generates realistic payment test data (no external APIs).
- `mocks/payments.yaml` : Mokapi-style YAML mock endpoints for payments.
- `ui-app/` : Minimal React payment form (create-react-app style placeholder).
- `tests/playwright/` : Playwright (TypeScript) test examples (UI + API).
- `playwright.config.ts` : Playwright config.
- `docker-compose.yml` : Compose stub wiring services together.
- `LICENSE` : MIT

## How to use (local)
1. Node >=16, npm/yarn, and Playwright installed.
2. Generate sample data:
   ```bash
   node ai-engine/paymentDataGenerator.js --count 5
   ```
3. Start mocks (e.g., with Mokapi) using `mocks/payments.yaml`.
4. Run Playwright tests:
   ```bash
   npx playwright test
   ```

## Notes
- This is a starter template meant to be extended. AI generator is local (no cloud calls).
- Replace mokapi with your real mock server or integrate with mokapi.io.
