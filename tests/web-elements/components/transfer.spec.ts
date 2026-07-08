import test, { expect, Page } from "@playwright/test";

test('Verify select rating', async ({ page }) => {
    await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/components/transfer');

    // Move from source to target
    let input = ['Apple', 'Banana']
    await transferDataByLabel('Transfer', input,'right', page);
    let currentSourceItem = await getPanelDataByLabel('Transfer', 'Source', page);
    let currentTargetItem = await getPanelDataByLabel('Transfer', 'Target', page);
    expect(isSubArray(currentSourceItem, input)).toBe(false);
    expect(isSubArray(currentTargetItem, input)).toBe(true);

    // Move from target to source
    input = ['Orange', 'Pineapple'];
    await transferDataByLabel('Transfer', input,'left', page);
    currentSourceItem = await getPanelDataByLabel('Transfer', 'Source', page);
    currentTargetItem = await getPanelDataByLabel('Transfer', 'Target', page);
    expect(isSubArray(currentSourceItem, input)).toBe(true);
    expect(isSubArray(currentTargetItem, input)).toBe(false);
});
 
async function transferDataByLabel(label: string, inputs: string[], direction: 'right' | 'left', page: Page){
    let currentPanel = direction == 'right' ? 'Source' : 'Target';
    let transferXpath =`//span[contains(concat(' ', @class, ' '), ' ant-divider-inner-text ') and normalize-space()='${label}']/following::div[contains(concat(' ', @class, ' '), ' ant-transfer ')]`;
    let transferLocator = page.locator(transferXpath);
    let panelXpath = `//div[contains(concat(' ', @class, ' '), ' ant-transfer-section ') and .//span[contains(concat(' ', @class, ' '), ' ant-transfer-list-header-title ') and normalize-space()='${currentPanel}']]`;
    let panelLocator = transferLocator.locator(panelXpath);
    for (let input of inputs) {
        let itemXpath = `(//span[contains(concat(' ', @class, ' '), ' ant-transfer-list-content-item-text ') and normalize-space()='${input}']/preceding::input)[last()]`;
        await panelLocator.locator(itemXpath).click();
    }
    let moveToTargetCss = `//button[.//span[@aria-label='${direction}']]`;
    await transferLocator.locator(moveToTargetCss).click();
}

async function getPanelDataByLabel(transferLabel: string, panelLabel: 'Source' | 'Target', page: Page){
    let transferXpath = `//span[contains(concat(' ', @class, ' '), ' ant-divider-inner-text ') and normalize-space()='${transferLabel}']/following::div[contains(concat(' ', @class, ' '), ' ant-transfer ')]`;
    let transferLocator = page.locator(transferXpath);
    let panelXpath = `//div[contains(concat(' ', @class, ' '), ' ant-transfer-section ') and .//span[contains(concat(' ', @class, ' '), ' ant-transfer-list-header-title ') and normalize-space()='${panelLabel}']]`;
    let panelLocator = transferLocator.locator(panelXpath);
    let items = await panelLocator.locator('.ant-transfer-list-content-item-text').allTextContents();
    return items;

}

function isSubArray(parent: string[], subArray: string[]){
    return subArray.every(el => parent.includes(el));
}
