import { test, expect, Page } from '@playwright/test';
import path from 'path';
import process from 'process';
import { CommonPage } from '../../src/pages/commonPage';
import { NewProductPage } from '../../src/pages/newProductPage';
import { LoginPage } from '../../src/pages/loginPage';

let commonPage: CommonPage;
let newProductPage: NewProductPage;
let loginPage: LoginPage;

test.beforeEach('Before each test', async({page}) => {
    commonPage = new CommonPage(page);
    newProductPage = new NewProductPage(page);
    loginPage = new LoginPage(page);
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
    await loginPage.isOnPage();
    await loginPage.adminLogin('long@gmail.com', '1234567890');
    
    //First case: Must use xpath with class
    await expect(page.locator('//h1[contains(concat(" ", @class, " "), " page-heading-title ")]')).toHaveText('Dashboard');
    //Seconde case: Must use xpath with text
    await expect(page.locator('//h1[text()="Dashboard"]')).toBeVisible();

    //Creat new product
    await commonPage.clickMenuItemByLabel('New Product');
    await newProductPage.isOnpage();
    await commonPage.inputTextByLabel('Product Name*', inputData.productName);
    await commonPage.inputTextByLabel('SKU*', inputData.sku);
    await commonPage.inputTextByLabel('Price*', inputData.price);
    await newProductPage.selectProductCategory('Women');
    await commonPage.selectDropdownByLabel('Tax Class*', 'Taxable Goods');

    let descriptionTypeXpath = "//*[local-name()='path' and @d='M0 10a2 2 0 0 1 2-2h44a2 2 0 0 1 2 2v28a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V10Z']";
    await page.locator(descriptionTypeXpath).click();
    let descriptionContent = `Playwright enables reliable web automation for testing, scripting, and AI agents.`
    await page.locator("//div[@data-placeholder-active='Type / to see the available blocks']").fill(descriptionContent);
    await commonPage.uploadImageByLabel('Media','playwright-ts\\resources\\images\\MagazineRack.PNG');
    await commonPage.selectRadioOptionByLabel('Status*', 'Disabled');
    await commonPage.selectRadioOptionByLabel('Visibility*', 'Not visible individually');
    await commonPage.selectRadioOptionByLabel('Manage Stock*', 'Yes');
    await commonPage.selectRadioOptionByLabel('Stock Availability*', 'Out of Stock');
    await commonPage.inputTextByLabel('Quantity*', inputData.quantity);
    await commonPage.selectCheckboxByLabel('No shipping required?', 'check')
    await commonPage.inputTextByLabel('URL Key*', inputData.urlKey);
    await commonPage.inputTextByLabel('Meta Title*', inputData.metaTitle);
    await commonPage.inputTextByLabel('Meta Description', inputData.metaDescription);
    await commonPage.selectDropdownByLabel('Attribute group*', 'Default');
    await commonPage.selectDropdownByLabel('Color', 'Black');
    await commonPage.selectDropdownByLabel('Size', 'XL');
    await commonPage.clickButtonByLabel('Save');
    await commonPage.verifyNotification('Product created successfully');
    await commonPage.clickMenuItemByLabel('Products');
    await commonPage.inputTextById('field-keyword', `${random}`);
    await page.keyboard.press('Enter');
    await page.getByText(inputData.productName).click();
    await expect(page.getByText(`Editing ${inputData.productName}`)).toBeVisible();
    expect(await commonPage.getInputValueByLabel('Product Name*')).toBe(inputData.productName);
    expect(await commonPage.getInputValueByLabel('SKU*')).toBe(inputData.sku);
    expect(await commonPage.getInputValueByLabel('Price*')).toBe(inputData.price);
    expect(await commonPage.getInputValueByLabel('URL Key*')).toBe(inputData.urlKey);
    expect(await commonPage.getInputValueByLabel('Quantity*')).toBe(inputData.quantity);
    expect(await commonPage.getInputValueByLabel('Meta Title*')).toBe(inputData.metaTitle);
    expect((await commonPage.getTextAreaValueByLabel('Meta Description'))?.trim()).toBe(inputData.metaDescription);

});
