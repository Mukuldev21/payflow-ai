import { test, expect } from '@playwright/test';

test.describe('PayFlow basic flows', ()=> {
  test('UI - initiate payment shows nextAction', async ({ page }) => {
    await page.goto('http://localhost:3000'); // ui-app
    await page.fill('input[placeholder="Your name"]', 'Mukul');
    await page.fill('input[placeholder="100"]', '2500');
    await page.click('button:has-text("Pay")');
    // wait for response area
    const pre = await page.waitForSelector('pre');
    const text = await pre.textContent();
    expect(text).toContain('transactionId');
  });

  test('API - initiatePayment returns transactionId', async ({ request }) => {
    const res = await request.post('http://localhost:3001/initiatePayment', { data: { amount: 500, payerName:'Test' }});
    expect(res.status()).toBe(200);
    const j = await res.json();
    expect(j).toHaveProperty('transactionId');
  });
});
