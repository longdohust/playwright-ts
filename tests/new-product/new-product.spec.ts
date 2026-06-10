import { test, expect } from '@playwright/test';
import path from 'path';
import process from 'process';

test.beforeEach('Before each test', async({page}) => {
    await page.goto('http://localhost:3000/admin');
});

test('Verify user can creat a new product successfully', async ({page}) => {
    let signInBtn = page.getByRole('button', {name: 'SIGN IN'});
    await expect(signInBtn).toBeVisible();
    await page.locator('#field-email').fill('long@gmail.com');
    await page.locator('#field-password').fill('1234567890');
    await signInBtn.click();
    //First case: Must use xpath with class
    await expect(page.locator('//h1[contains(concat(" ", @class, " "), " page-heading-title ")]')).toHaveText('Dashboard');
    //Seconde case: Must use xpath with text
    await expect(page.locator('//h1[text()="Dashboard"]')).toBeVisible();

    //Creat new product
    await page.getByRole('link', {name: 'New Product'}).click();
    await expect(page.locator('//h1[text()="Create a new product"]')).toBeVisible();
    await page.locator('#field-name').fill('Playwright');
    const random = new Date().getTime();
    await page.locator('#field-sku').fill(`${random}`);
    await page.locator('#field-price').fill('1000');
    await page.getByRole('button', {name: "Select category"}).click();
    await page.getByPlaceholder('Search categories').fill('Women');
    await page.locator("//h3[normalize-space()='Women']/following::button[1][normalize-space()='Select']").click();
    await page.locator("#field-tax_class").click();
    await page.locator('//div[@role="option" and normalize-space()="Taxable Goods"]').click();
    let descriptionTypeXpath = "//*[local-name()='path' and @d='M0 10a2 2 0 0 1 2-2h44a2 2 0 0 1 2 2v28a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V10Z']";
    await page.locator(descriptionTypeXpath).click();
    let descriptionContent = `Playwright enables reliable web automation for testing, scripting, and AI agents.`
    await page.locator("//div[@data-placeholder-active='Type / to see the available blocks']").fill(descriptionContent);
    let uploadFileXpath = "//div[@data-slot='card-title' and normalize-space()='Media']/following::input[@type='file']"
    await page.locator(uploadFileXpath).setInputFiles(path.join(process.cwd(), 'playwright-ts\\resources\\images\\MagazineRack.PNG'));

    await page.locator("//div[@role='group' and .//label[normalize-space()='Status*']]//label[normalize-space()='Disabled']/preceding::span[@role='radio'][1]").click();
    await page.locator("//div[@role='group' and .//label[normalize-space()='Visibility*']]//label[normalize-space()='Not visible individually']/preceding::span[@role='radio'][1]").click();
    await page.locator("//div[@role='group' and .//label[normalize-space()='Manage Stock*']]//label[normalize-space()='Yes']/preceding::span[@role='radio'][1]").click();
    await page.locator("//div[@role='group' and .//label[normalize-space()='Stock Availability*']]//label[normalize-space()='Out of Stock']/preceding::span[@role='radio'][1]").click();
    await page.locator("#field-qty").fill('10');
    await page.locator("//label[normalize-space()='No shipping required?']/preceding::span[@role='checkbox'][1]").click();
   
    await page.locator("#field-url_key").fill(`${random}`);
    await page.locator("#field-meta_title").fill('Playwright');
    await page.locator("#field-meta_description").fill('Testing tool for web automation');

    await page.locator("#field-group_id").click();
    await page.locator('//div[@role="option" and normalize-space()="Default"]').click();

    await page.locator("//span[normalize-space()='Color']/following::button[@role='combobox'][1]").click();
    await page.locator('//div[@role="option" and normalize-space()="Black"]').click();

    await page.locator("//span[normalize-space()='Size']/following::button[@role='combobox'][1]").click();
    await page.locator('//div[@role="option" and normalize-space()="XL"]').click();

    await page.locator("//button[normalize-space()='Save']").click();
    await expect(page.locator("//div[@role='alert' and normalize-space()='Product created successfully']")).toBeVisible();
});