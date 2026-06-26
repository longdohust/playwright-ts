import { test, expect, Page, request } from '@playwright/test';
import path from 'path';
import process from 'process';
import { CommonPage } from '../../src/pages/commonPage';
import { NewProductPage } from '../../src/pages/newProductPage';
import { LoginPage } from '../../src/pages/loginPage';
import { DashboardPage } from '../../src/pages/dashboardPage';
import { adminBaseUrl } from '../../src/utils/constants-ultils';
import { adminTest } from '../../src/fixtures/admin-fixture';
import { EditProductPage } from '../../src/pages/editProductPage';
import { Product } from '../../src/pages/productPage';

let dashboardPage: DashboardPage;
let newProductPage: NewProductPage;
let loginPage: LoginPage;
let editProductPage: EditProductPage;
let productPage: Product;
let productIds: string[] = [];
let token: string;

adminTest.beforeEach('Before each test', async({page}) => {
    dashboardPage = new DashboardPage(page);
    newProductPage = new NewProductPage(page);
    loginPage = new LoginPage(page);
    editProductPage = new EditProductPage(page);
    productPage = new Product(page);
    token = await editProductPage.getToken();
});

adminTest.afterAll('Teardown', async () => {
    for (let productId of productIds) {
        await productPage.deleteProductByAPI(token, productId)
    }
});


adminTest('Verify user can creat a new product successfully', async ({page, context}) => {
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
    //await loginPage.isOnPage();
    //await loginPage.defaultAdminLogin();
    
    await dashboardPage.isOnPage();
    await dashboardPage.clickMenuItemByLabel('New Product');

    await newProductPage.isOnPage();
    await newProductPage.inputTextByLabel('Product Name*', inputData.productName);
    await newProductPage.inputTextByLabel('SKU*', inputData.sku);
    await newProductPage.inputTextByLabel('Price*', inputData.price);
    await newProductPage.selectProductCategory('Women');
    await newProductPage.selectDropdownByLabel('Tax Class*', 'Taxable Goods');

    let descriptionTypeXpath = "//*[local-name()='path' and @d='M0 10a2 2 0 0 1 2-2h44a2 2 0 0 1 2 2v28a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V10Z']";
    await page.locator(descriptionTypeXpath).click();
    let descriptionContent = `Playwright enables reliable web automation for testing, scripting, and AI agents.`
    await page.locator("//div[@data-placeholder-active='Type / to see the available blocks']").fill(descriptionContent);
    await newProductPage.uploadImageByLabel('Media','playwright-ts\\resources\\images\\MagazineRack.PNG');
    await newProductPage.selectRadioOptionByLabel('Status*', 'Disabled');
    await newProductPage.selectRadioOptionByLabel('Visibility*', 'Not visible individually');
    await newProductPage.selectRadioOptionByLabel('Manage Stock*', 'Yes');
    await newProductPage.selectRadioOptionByLabel('Stock Availability*', 'Out of Stock');
    await newProductPage.inputTextByLabel('Quantity*', inputData.quantity);
    await newProductPage.selectCheckboxByLabel('No shipping required?', 'check')
    await newProductPage.inputTextByLabel('URL Key*', inputData.urlKey);
    await newProductPage.inputTextByLabel('Meta Title*', inputData.metaTitle);
    await newProductPage.inputTextByLabel('Meta Description', inputData.metaDescription);
    await newProductPage.selectDropdownByLabel('Attribute group*', 'Default');
    await newProductPage.selectDropdownByLabel('Color', 'Black');
    await newProductPage.selectDropdownByLabel('Size', 'XL');
    await newProductPage.clickButtonByLabel('Save');
    await newProductPage.verifyNotification('Product created successfully');
    await newProductPage.clickMenuItemByLabel('Products');
    await newProductPage.inputTextById('field-keyword', `${random}`);
    await page.keyboard.press('Enter');
    await page.getByText(inputData.productName).click();
    await expect(page.getByText(`Editing ${inputData.productName}`)).toBeVisible();
    const productId = await editProductPage.getProductId();
    expect(await editProductPage.getInputValueByLabel('Product Name*')).toBe(inputData.productName);
    expect(await editProductPage.getInputValueByLabel('SKU*')).toBe(inputData.sku);
    expect(await editProductPage.getInputValueByLabel('Price*')).toBe(inputData.price);
    expect(await editProductPage.getInputValueByLabel('URL Key*')).toBe(inputData.urlKey);
    expect(await editProductPage.getInputValueByLabel('Quantity*')).toBe(inputData.quantity);
    expect(await editProductPage.getInputValueByLabel('Meta Title*')).toBe(inputData.metaTitle);
    expect((await editProductPage.getTextAreaValueByLabel('Meta Description'))?.trim()).toBe(inputData.metaDescription);
    productIds.push(productId);

});

adminTest('Verify user can creat a new product successfully wwith shipping', async ({page, request, context}) => {
    const random = new Date().getTime();
    const inputData = {
        productName: `Playwright - ${random}`,
        sku: `SKU-${random}`,
        price: '1000',
        quantity: '10',
        weight : '16',
        urlKey: `url-key-${random}`,
        metaTitle: 'Playwright',
        metaDescription: 'Testing tool for web automation'
    };
    //await loginPage.isOnPage();
    //await loginPage.defaultAdminLogin();
    
    await dashboardPage.isOnPage();
    await dashboardPage.clickMenuItemByLabel('New Product');

    await newProductPage.isOnPage();
    await newProductPage.inputTextByLabel('Product Name*', inputData.productName);
    await newProductPage.inputTextByLabel('SKU*', inputData.sku);
    await newProductPage.inputTextByLabel('Price*', inputData.price);
    await newProductPage.selectProductCategory('Women');
    await newProductPage.selectDropdownByLabel('Tax Class*', 'Taxable Goods');

    let descriptionTypeXpath = "//*[local-name()='path' and @d='M0 10a2 2 0 0 1 2-2h44a2 2 0 0 1 2 2v28a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V10Z']";
    await page.locator(descriptionTypeXpath).click();
    let descriptionContent = `Playwright enables reliable web automation for testing, scripting, and AI agents.`
    await page.locator("//div[@data-placeholder-active='Type / to see the available blocks']").fill(descriptionContent);
    await newProductPage.uploadImageByLabel('Media','playwright-ts\\resources\\images\\MagazineRack.PNG');
    await newProductPage.selectRadioOptionByLabel('Status*', 'Disabled');
    await newProductPage.selectRadioOptionByLabel('Visibility*', 'Not visible individually');
    await newProductPage.selectRadioOptionByLabel('Manage Stock*', 'Yes');
    await newProductPage.selectRadioOptionByLabel('Stock Availability*', 'Out of Stock');
    await newProductPage.inputTextByLabel('Quantity*', inputData.quantity);
    await newProductPage.inputTextByLabel('Weight*', inputData.weight);
    await newProductPage.inputTextByLabel('URL Key*', inputData.urlKey);
    await newProductPage.inputTextByLabel('Meta Title*', inputData.metaTitle);
    await newProductPage.inputTextByLabel('Meta Description', inputData.metaDescription);
    await newProductPage.selectDropdownByLabel('Attribute group*', 'Default');
    await newProductPage.selectDropdownByLabel('Color', 'Black');
    await newProductPage.selectDropdownByLabel('Size', 'XL');
    await newProductPage.clickButtonByLabel('Save');
    await newProductPage.verifyNotification('Product created successfully');
    await newProductPage.clickMenuItemByLabel('Products');
    await productPage.isOnPage();
    await productPage.inputTextById('field-keyword', `${random}`);
    await page.keyboard.press('Enter');
    await page.getByText(inputData.productName).click();
    await expect(page.getByText(`Editing ${inputData.productName}`)).toBeVisible();
    const productId = await editProductPage.getProductId();
    expect(await editProductPage.getInputValueByLabel('Product Name*')).toBe(inputData.productName);
    expect(await editProductPage.getInputValueByLabel('SKU*')).toBe(inputData.sku);
    expect(await editProductPage.getInputValueByLabel('Price*')).toBe(inputData.price);
    expect(await editProductPage.getInputValueByLabel('URL Key*')).toBe(inputData.urlKey);
    expect(await editProductPage.getInputValueByLabel('Quantity*')).toBe(inputData.quantity);
    expect(await editProductPage.getInputValueByLabel('Meta Title*')).toBe(inputData.metaTitle);
    expect((await editProductPage.getTextAreaValueByLabel('Meta Description'))?.trim()).toBe(inputData.metaDescription);
    productIds.push(productId);

});

