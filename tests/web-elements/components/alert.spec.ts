import {test, expect, Page } from '@playwright/test';

test('Verify alert', async ({ page }) => {
    await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/alerts');
    page.on('dialog', async (dialog) => {
        await dialog.accept();
    })
    await clickButtonByLabel("Show Alert", page);
})

test('Verify alert confirm', async ({ page }) => {
    await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/alerts');
    page.on('dialog', async (dialog) => {
        await dialog.dismiss();
    })
    await clickButtonByLabel("Show Confirm", page);
})
test('Verify alert text', async ({ page }) => {
    await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/alerts');
    page.on('dialog', async (dialog) => {
        await dialog.accept('Test');
    })
    await clickButtonByLabel("Show Prompt", page);
})
async function clickButtonByLabel(label: string, page: Page) {
    let xpath = `//button[normalize-space()="${label}"]`;
    await page.locator(xpath).click();
}