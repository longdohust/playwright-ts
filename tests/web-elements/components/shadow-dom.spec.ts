import {test, expect, Page } from '@playwright/test';

test('Verify shadow dom', async ({ page, context }) => {
    await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/shadow-dom');
    await page.getByLabel('Name:', {exact: true}).fill('Playwright');
    await page.getByRole('button', {name: 'Submit'}).click();
    await expect(page.getByText('What you just type: Playwright')).toBeVisible();
})