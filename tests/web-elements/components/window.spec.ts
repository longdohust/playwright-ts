import {test, expect, Page } from '@playwright/test';

test('Verify tab', async ({ page, context }) => {
    await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/windows');
    let pageEvent = context.waitForEvent('page');
    await clickButtonByLabel('Open New Tab', page);
    let newTab = await pageEvent;
    await expect(newTab.getByText('Welcome to Test With Me')).toBeVisible();

    // Van co the tuong tac duoc voi tab cu, tab cu va tab moi ton tai song song
    await page.getByText('Open New Tab').click();
})

async function clickButtonByLabel(label: string, page: Page) {
    let xpath = `//button[normalize-space()="${label}"]`;
    await page.locator(xpath).click();
}