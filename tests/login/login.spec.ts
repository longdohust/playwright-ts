import {test, expect} from '@playwright/test';
import { CommonPage } from '../../src/pages/commonPage';
import { LoginPage } from '../../src/pages/loginPage';

let loginPage: LoginPage;

test.beforeEach('Before each test', async({page}) => {
    loginPage = new LoginPage(page);
    await page.goto('http://localhost:3000/admin');
});

test('Verify login successful', async ({page}) => {
    await loginPage.isOnPage();
    await loginPage.adminLogin('long@gmail.com', '1234567890')    //First case: Must use xpath with class
    await expect(page.locator('//h1[contains(concat(" ", @class, " "), " page-heading-title ")]')).toHaveText('Dashboard');
    //Second case: Must use xpath with text
    await expect(page.locator('//h1[text()="Dashboard"]')).toBeVisible();

});

test('Verify form empty', async ({page}) => {
    await loginPage.isOnPage();
    await loginPage.signInBtn.click();
    await expect.soft(page.locator("//div[text()='Email is required']")).toBeVisible();
    await expect.soft(page.locator("//div[text()='Password is required']")).toBeVisible();

});