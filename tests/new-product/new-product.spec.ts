import { test, expect, Page } from '@playwright/test';
import path from 'path';
import process from 'process';
import { clickButtonByLabel, clickMenuItemByLabel, getInputValueByLabel, getTextAreaValueByLabel, inputTextById, inputTextByLabel, selectCheckboxByLabel, selectDropdownByLabel, selectProductCategory, selectRadioOptionByLabel, uploadImageByLabel, verifyNotification } from '../../src/common/common';

test.beforeEach('Before each test', async({page}) => {
    await page.goto('http://localhost:3000/admin');
});

test('Verify user can creat a new product successfully', async ({page}) => {
    const random = new Date().getTime();
    const inputData = {
        productName: `Playwright - ${random}`,
        sku: `SKU-${random}`,
        price: '1000',
        quantity: '10',
        urlKey: `url-key-${random}`,
        metaTitle: 'Playwright',
        metaDescription: 'Testing tool for web automation'
    };
    let signInBtn = page.getByRole('button', {name: 'SIGN IN'});
    await expect(signInBtn).toBeVisible();
    await inputTextByLabel('Email*', 'long@gmail.com', page);
    await inputTextByLabel('Password*', '1234567890', page);
    await clickButtonByLabel('SIGN IN', page);
    
    //First case: Must use xpath with class
    await expect(page.locator('//h1[contains(concat(" ", @class, " "), " page-heading-title ")]')).toHaveText('Dashboard');
    //Seconde case: Must use xpath with text
    await expect(page.locator('//h1[text()="Dashboard"]')).toBeVisible();

    //Creat new product
    await clickMenuItemByLabel('New Product', page);
    await expect(page.locator('//h1[text()="Create a new product"]')).toBeVisible();
    await inputTextByLabel('Product Name*', inputData.productName, page);
    
    await inputTextByLabel('SKU*', inputData.sku, page);
    await inputTextByLabel('Price*', inputData.price, page);
    await selectProductCategory('Women', page);
    await selectDropdownByLabel('Tax Class*', 'Taxable Goods', page);

    let descriptionTypeXpath = "//*[local-name()='path' and @d='M0 10a2 2 0 0 1 2-2h44a2 2 0 0 1 2 2v28a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V10Z']";
    await page.locator(descriptionTypeXpath).click();
    let descriptionContent = `Playwright enables reliable web automation for testing, scripting, and AI agents.`
    await page.locator("//div[@data-placeholder-active='Type / to see the available blocks']").fill(descriptionContent);
    await uploadImageByLabel('Media','playwright-ts\\resources\\images\\MagazineRack.PNG', page);
    

    await selectRadioOptionByLabel('Status*', 'Disabled', page);
    await selectRadioOptionByLabel('Visibility*', 'Not visible individually', page);
    await selectRadioOptionByLabel('Manage Stock*', 'Yes', page);
    await selectRadioOptionByLabel('Stock Availability*', 'Out of Stock', page);
   
    await inputTextByLabel('Quantity*', inputData.quantity, page);
    await selectCheckboxByLabel('No shipping required?', 'check', page);
   
    await inputTextByLabel('URL Key*', inputData.urlKey, page);
    await inputTextByLabel('Meta Title*', inputData.metaTitle, page);
    await inputTextByLabel('Meta Description', inputData.metaDescription, page);

    await selectDropdownByLabel('Attribute group*', 'Default', page);

    await selectDropdownByLabel('Color', 'Black', page);
    await selectDropdownByLabel('Size', 'XL', page);

    await clickButtonByLabel('Save', page);
    await verifyNotification('Product created successfully', page);

    await clickMenuItemByLabel('Products', page);
    await inputTextById('field-keyword', `${random}`, page);
    await page.keyboard.press('Enter');
    await page.getByText(inputData.productName).click();
    await expect(page.getByText(`Editing ${inputData.productName}`)).toBeVisible();
    expect(await getInputValueByLabel('Product Name*', page)).toBe(inputData.productName);
    expect(await getInputValueByLabel('SKU*', page)).toBe(inputData.sku);
    expect(await getInputValueByLabel('Price*', page)).toBe(inputData.price);
    expect(await getInputValueByLabel('URL Key*', page)).toBe(inputData.urlKey);
    expect(await getInputValueByLabel('Quantity*', page)).toBe(inputData.quantity);
    expect(await getInputValueByLabel('Meta Title*', page)).toBe(inputData.metaTitle);
    expect((await getTextAreaValueByLabel('Meta Description', page))?.trim()).toBe(inputData.metaDescription);

});
