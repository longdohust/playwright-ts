import {test, expect, Page } from '@playwright/test';

test('Verify select option  in auto complete field', async ({ page }) => {
    await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/components/auto-complete');
    await page.waitForTimeout(2000);
    await selectOptionAutoCompleteByLabel('Auto complete', 'Burns Bay Road', page);
    await expect(page.getByText('Value: Burns Bay Road was selected!')).toBeVisible();

})

async function selectOptionAutoCompleteByLabel(label: string, option: string, page: Page) {
    let inputXpath =`(//span[normalize-space()='${label}']/following::input)[1]`;
    let input = page.locator(inputXpath);
    //Click on textbox
    await input.click();
    //Input value
    await input.clear();
    await input.fill(option);
    //Click on option
    let optionXpath = `//div[contains(concat(' ', @class, ' '), ' ant-select-item ') and normalize-space()='${option}']`;
    await page.locator(optionXpath).click();
}