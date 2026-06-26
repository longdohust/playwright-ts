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
import newProductBody from "../../resources/data/product/new-product.json";

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


adminTest('Verify user can update a product successfully', async ({page, context}) => {
    const random = new Date().getTime();
    newProductBody.name = `Playwright - ${random}`;
    newProductBody.sku = `SKU-${random}`;
    newProductBody.url_key = `url-key-${random}`;
    await newProductPage.newProductByAPI(newProductBody, token);

    await newProductPage.clickMenuItemByLabel('Products');
    await newProductPage.inputTextById('field-keyword', `${random}`);
    await page.keyboard.press('Enter');
    await page.getByText(newProductBody.name).click();
    await expect(page.getByText(`Editing ${newProductBody.name}`)).toBeVisible();
    const productId = await editProductPage.getProductId();
    
    //Verify edit product
    const randomEdit = new Date().getTime();
    const editingData = {
        productName: `Playwright - ${randomEdit}`,
        sku: `SKU-${randomEdit}`,
        price: '2000'
    };
    await editProductPage.inputTextByLabel('Product Name*', editingData.productName);
    await editProductPage.inputTextByLabel('SKU*', editingData.sku);
    await editProductPage.inputTextByLabel('Price*', editingData.price);
    await editProductPage.clickButtonByLabel('Save');
    await editProductPage.verifyNotification('Product updated successfully');
    await editProductPage.clickMenuItemByLabel('Products');
    await editProductPage.inputTextById('field-keyword', `${randomEdit}`);
    await page.keyboard.press('Enter');
    await page.getByText(editingData.productName).click();
    await expect(page.getByText(`Editing ${editingData.productName}`)).toBeVisible();
    expect(await editProductPage.getInputValueByLabel('Product Name*')).toBe(editingData.productName);
    expect(await editProductPage.getInputValueByLabel('SKU*')).toBe(editingData.sku);
    expect(await editProductPage.getInputValueByLabel('Price*')).toBe(editingData.price);

    productIds.push(productId);

});

